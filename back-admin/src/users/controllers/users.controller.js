const db = require('../../../db')

class UsersController {
    async createUser(req, res) {
        const dataFromRequest = req.body ?? {};

        try {
            if (dataFromRequest.login &&
                dataFromRequest.password) {
                const newUser = await db.query(`INSERT INTO users (login, password)
                                                    VALUES (`${dataFromRequest.login}`, crypt(`${dataFromRequest.password}`, gen_salt('md5'))) ;
                                                    RETURNING *`)

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
                                  WHERE ($1::text IS NULL OR login ILIKE $1)
        `;

        const { login } = req.body ?? {};

        const values = [
            login ? `%${login}%` : null,
        ]

        try {
            const users = await db.query(requestToDB, values);
            res.status(200).json(users.rows);
        } catch (error) {
            res.status(500).json({error: error.message})
        }
    }

    async getOneSupplier(req, res) {
        const dataFromRequest = req.body ?? {};

        try {
            const supplier = await db.query(`SELECT * FROM supplier WHERE id = ${id}`)
            res.status(200).json(supplier.rows[0])
        } catch (error) {
            res.status(500).json({error: error.message})
        }
    }

    async updateUser(req, res) {
        const dataFromRequest = req.body ?? {};

        try {
            if(dataFromRequest.login &&
                dataFromRequest.password &&
                dataFromRequest.login === dataFromRequest.loginToChange) {

                const suppliers = await db.query(`UPDATE accounts
                                                  SET password = crypt(`${dataFromRequest.password}`, gen_salt('md5')) 
                                                  WHERE login= `${dataFromRequest.login}`
                                                  RETURNING *'`)
                res.status(200).json(suppliers.rows[0]);
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
            const supplier = await db.query(`DELETE FROM supplier WHERE id=${id}`)
        } catch (error) {
            res.status(500).json({error: error.message})
        }
    }
}

module.exports = new SupplierController();