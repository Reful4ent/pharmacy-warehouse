const db = require('../../../db');

class BankController {

    async createBank(req, res) {
        const dataFromRequest = req.body ?? {};

        try {
            const newBank = await db.query(`INSERT INTO bank (name) VALUES ('${dataFromRequest.name}') RETURNING *`);
            res.status(201).json(newBank.rows[0]);
        } catch (error) {
            res.status(500).json({error: error.message})
        }
    }

    async getBanks(req, res) {
        let requestToDB = `SELECT *
                                  FROM bank`;

        const dataFromRequest = req.query ?? {};

        if (dataFromRequest.name) {
            requestToDB += ` WHERE name
                             ILIKE '%${dataFromRequest.name}%'`;
        }


        try {
            const banks = await db.query(requestToDB);
            res.status(200).json(banks.rows);
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    }

    async getOneBank(req, res) {
        const id = req.params.id;
        try {
            const bank = await db.query(`SELECT * FROM bank WHERE id=${id} RETURNING *`);
            res.status(200).json(bank.rows[0]);
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    }

    async updateBank(req, res) {
        const id = req.params.id;
        const dataFromRequest = req.body ?? {};

        try {
            const bank = await db.query(`UPDATE bank SET name='${dataFromRequest.name}' WHERE id=${id} RETURNING *`);
            res.status(200).json(bank.rows[0]);
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    }

    async deleteBank(req, res) {
        const id = req.params.id;

        try {
            const bank = await db.query(`DELETE FROM bank WHERE id=${id}`);
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    }
}

module.exports = new BankController();