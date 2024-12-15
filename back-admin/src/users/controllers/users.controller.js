const db = require('../../../db')

class UsersController {
    async createUser(req, res) {
        const dataFromRequest = req.body ?? {};

        try {
            if (dataFromRequest.login &&
                dataFromRequest.password) {
                const newUser = await db.query(`INSERT INTO users (login, password) 
                                                VALUES ('${dataFromRequest.login}',
                                                 crypt('${dataFromRequest.password}', gen_salt('md5')));
                                                    `)

                res.status(201).json(newUser.rows[0]);
            } else {
                res.status(400).json({ error: "Bad request" });
            }
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    }

    async getUsers(req, res) {
        let requestToDB = `SELECT * FROM users 
                                  WHERE ($1::int IS NULL OR id = $1)
                                  AND ($2::text IS NULL OR login ILIKE $2)
        `;

        const { id, login, } = req.body ?? {};

        const values = [
            id,
            login ? `%${login}%` : null,
        ]
        try {
            const users = await db.query(requestToDB, values);
            res.status(200).json(users.rows);
        } catch (error) {
            res.status(500).json({error: error.message})
        }
    }

    async getOneUser(req, res) {
        const dataFromRequest = req.body.data ?? {};
        try {
            const is_current = await db.query(`SELECT (password = crypt('${dataFromRequest.password}',password))
                                               AS password_match
                                               FROM users
                                               WHERE login = '${dataFromRequest.login}'`);
            if (is_current.rows[0]['password_match']) {
                const user = await db.query(`SELECT id, login
                                               FROM users
                                               WHERE login = '${dataFromRequest.login}'`);
                res.status(200).json({user: user.rows[0], canSignIn: is_current.rows[0]});
                return
            }
            res.status(200).json({canSignIn: is_current.rows[0]})
        } catch (error) {
            res.status(500).json({error: error.message})
        }
    }

    async updateUser(req, res) {
        const dataFromRequest = req.body ?? {};
        try {
            if(dataFromRequest.id &&
                dataFromRequest.login &&
                dataFromRequest.password) {

                const users = await db.query(`UPDATE users
                                              SET password=crypt('${dataFromRequest.password}',gen_salt('md5')) 
                                              WHERE login='${dataFromRequest.login}' AND id=${dataFromRequest.id}
                                              RETURNING *`);
                res.status(200).json(users.rows[0]);
            } else {
                res.status(400).json({ error: "Bad request" });
            }
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    }

    async deleteUser(req, res) {
        const id = req.params.id

        try {
            const users = await db.query(`DELETE FROM users WHERE id=${id}`)
        } catch (error) {
            res.status(500).json({error: error.message})
        }
    }
}

module.exports = new UsersController();