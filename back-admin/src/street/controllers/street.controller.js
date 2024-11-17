const db = require('../../../db');

class StreetController {
    async createStreet(req, res) {
        const dataFromRequest = req.body ?? {};

        try {
            if (dataFromRequest.name) {
                const newStreet = await db.query(`INSERT INTO street (name) VALUES ('${dataFromRequest.name}') RETURNING *`);
                res.status(201).json(newStreet.rows[0]);
            } else {
                res.status(400).json({ error: "Bad request" });
            }
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    }

    async getStreets(req, res) {
        let requestToDB = `SELECT * FROM street 
                                  WHERE ($1::text IS NULL OR name ILIKE $1)
        `;

        const { name } = req.body;

        const values = [
            name ? `%${name}%` : null,
        ]

        try {
            const streets = await db.query(requestToDB, values);
            res.status(200).json(streets.rows);
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    }

    async getOneStreet(req, res) {
        const id = req.params.id;
        try {
            const street = await db.query(`SELECT * FROM street WHERE id=${id}`);
            res.status(200).json(street.rows[0]);
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    }

    async updateStreet(req, res) {
        const id = req.params.id;
        const dataFromRequest = req.body ?? {};

        try {
            if (dataFromRequest.name) {
                const street = await db.query(`UPDATE street SET name='${dataFromRequest.name}' WHERE id=${id} RETURNING *`);
                res.status(200).json(street.rows[0]);
            } else {
                res.status(400).json({ error: "Bad request" });
            }
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    }

    async deleteStreet(req, res) {
        const id = req.params.id;

        try {
            const street = await db.query(`DELETE FROM street WHERE id=${id}`);
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    }
}

module.exports = new StreetController();