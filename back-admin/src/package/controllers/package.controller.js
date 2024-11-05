const db = require('../../../db');

class PackageController {
    async createPackage(req, res) {
        const dataFromRequest = req.body ?? {};

        try {
            if (dataFromRequest.name) {
                const newPackage = await db.query(`INSERT INTO package (name) VALUES ('${dataFromRequest.name}') RETURNING *`);
                res.status(201).json(newPackage.rows[0]);
            }
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    }

    async getPackages(req, res) {
        let requestToDB = `SELECT *
                                  FROM package`;

        const dataFromRequest = req.query ?? {};

        if (dataFromRequest.name) {
            requestToDB += ` WHERE name
                             ILIKE '%${dataFromRequest.name}%'`;
        }


        try {
            const packages = await db.query(requestToDB);
            res.status(200).json(packages.rows);
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    }

    async getOnePackage(req, res) {
        const id = req.params.id;
        try {
            const onePackage = await db.query(`SELECT * FROM package WHERE id=${id} RETURNING *`);
            res.status(200).json(onePackage.rows[0]);
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    }

    async updatePackage(req, res) {
        const id = req.params.id;
        const dataFromRequest = req.body ?? {};

        try {
            const onePackage = await db.query(`UPDATE package SET name='${dataFromRequest.name}' WHERE id=${id} RETURNING *`);
            res.status(200).json(onePackage.rows[0]);
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    }

    async deletePackage(req, res) {
        const id = req.params.id;

        try {
            const onePackage = await db.query(`DELETE FROM package WHERE id=${id}`);
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    }
}

module.exports = new PackageController();