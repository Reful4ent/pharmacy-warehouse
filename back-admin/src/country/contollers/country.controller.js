const db = require('../../../db');

class CountryController {

    async createCountry(req, res) {
        const dataFromRequest = req.body ?? {};

        try {
            if (dataFromRequest.name) {
                const newCountry = await db.query(`INSERT INTO country (name) VALUES ('${dataFromRequest.name}') RETURNING *`);
                res.status(201).json(newCountry.rows[0]);
            } else {
                res.status(400).json({ error: "Bad request" });
            }
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    }

    async getCountries(req, res) {
        let requestToDB = `SELECT * FROM country 
                                  WHERE ($1::text IS NULL OR name ILIKE $1)
        `;

        const { name } = req.body;

        const values = [
            name ? `%${name}%` : null,
        ]

        try {
            const countries = await db.query(requestToDB, values);
            res.status(200).json(countries.rows);
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    }

    async getOneCountry(req, res) {
        const id = req.params.id;
        try {
            const country = await db.query(`SELECT * FROM country WHERE id=${id}`);
            res.status(200).json(country.rows[0]);
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    }

    async updateCountry(req, res) {
        const id = req.params.id;
        const dataFromRequest = req.body ?? {};

        try {
            if(dataFromRequest.name) {
                const country = await db.query(`UPDATE country SET name='${dataFromRequest.name}' WHERE id=${id} RETURNING *`);
                res.status(200).json(country.rows[0]);
            } else {
                res.status(400).json({ error: "Bad request" });
            }
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    }

    async deleteCountry(req, res) {
        const id = req.params.id;

        try {
            const country = await db.query(`DELETE FROM country WHERE id=${id}`);
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    }
}

module.exports = new CountryController();