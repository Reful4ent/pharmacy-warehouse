const db = require('../../../db');
const data = require("pg/lib/query");

class CountryController {
    async createCountry(req, res) {
        const dataFromRequest = req.body ?? {};

        try {
            if (dataFromRequest.name) {
                const newCountry = await db.query(`INSERT INTO country (name) VALUES ('${dataFromRequest.name}') RETURNING *`);
                res.status(201).json(newCountry.rows[0]);
            }
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    }

    async getCountries(req, res) {
        let requestToDB = `SELECT *
                                  FROM country`;

        const dataFromRequest = req.query ?? {};

        if (dataFromRequest.name) {
            console.log("sadsa");
            requestToDB += ` WHERE name
                             ILIKE '%${dataFromRequest.name}%'`;
        }


        try {
            const countries = await db.query(requestToDB);
            res.status(200).json(countries.rows);
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    }

    async getCountry(req, res) {
        const id = req.params.id;
        try {
            const country = await db.query(`SELECT * FROM country WHERE id=${id} RETURNING *`);
            res.status(200).json(country.rows[0]);
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    }

    async updateCountry(req, res) {
        const id = req.params.id;
        const dataFromRequest = req.body ?? {};

        try {
            const country = await db.query(`UPDATE country SET name='${data.name}' WHERE id=${id} RETURNING *`);
            res.status(200).json(country.rows[0]);
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