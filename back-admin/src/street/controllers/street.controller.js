const db = require('../../../db');

class StreetController {
    async createStreet(req, res) {
        const dataFromRequest = req.body ?? {};

        try {
            if (dataFromRequest.name) {
                const newStreet = await db.query(`INSERT INTO street (name) VALUES ('${dataFromRequest.name}') RETURNING *`);
                res.status(201).json(newStreet.rows[0]);
            }
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    }

    async getStreets(req, res) {
        let requestToDB = `SELECT *
                                  FROM street`;

        const dataFromRequest = req.query ?? {};

        if (dataFromRequest.name) {
            requestToDB += ` WHERE name
                             ILIKE '%${dataFromRequest.name}%'`;
        }


        try {
            const streets = await db.query(requestToDB);
            res.status(200).json(streets.rows);
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    }

    async getOneStreet(req, res) {
        const id = req.params.id;
        try {
            const street = await db.query(`SELECT * FROM street WHERE id=${id} RETURNING *`);
            res.status(200).json(street.rows[0]);
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    }

    async updateStreet(req, res) {
        const id = req.params.id;
        const dataFromRequest = req.body ?? {};

        try {
            const street = await db.query(`UPDATE street SET name='${dataFromRequest.name}' WHERE id=${id} RETURNING *`);
            res.status(200).json(street.rows[0]);
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