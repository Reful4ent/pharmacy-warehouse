const db = require('../../../db')

class StatementMedicineController {
    async createStatementMedicine(req, res) {
        const dataFromRequest = req.body ?? {};

        try {
            if (dataFromRequest.statements_id &&
                dataFromRequest.medicine_id &&
                dataFromRequest.price_that_time &&
                dataFromRequest.quantity) {

                const newStatementMedicine = await db.query(`INSERT INTO statements_medicine (statements_id, medicine_id, price_that_time, quantity) 
                                                    VALUES (${dataFromRequest.statements_id},
                                                            ${dataFromRequest.medicine_id},
                                                            ${dataFromRequest.price_that_time},
                                                            ${dataFromRequest.quantity})
                                                    RETURNING *`)

                res.status(201).json(newStatementMedicine.rows[0]);
            } else {
                res.status(400).json({ error: "Bad request" });
            }
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    }

    async getStatementMedicines(req, res) {
        let requestToDB = `SELECT * FROM statements_medicine 
                                  WHERE (statements_id = $1) 
                                  AND ($2::int IS NULL OR medicine_id = $2)
                                  AND ($3::decimal IS NULL OR price_that_time = $3) 
                                  AND ($4::int IS NULL OR quantity = $4)
        `;


        const { statements_id, medicine_id, price_that_time, quantity } = req.body ?? {};

        const values = [
            statements_id,
            medicine_id,
            price_that_time,
            quantity,
        ]

        try {
            if(statements_id) {
                const statementMedicine = await db.query(requestToDB, values);
                res.status(200).json(statementMedicine.rows);
            } else {
                res.status(400).json({ error: "Bad request" });
            }
        } catch (error) {
            res.status(500).json({error: error.message})
        }
    }

    async getOneStatementMedicine(req, res) {
        const id = req.params.id

        try {
            const statementMedicine = await db.query(`SELECT
                                                             medicine.id,
                                                             medicine.name,
                                                             medicine.production_date,
                                                             medicine.registration_num,
                                                             medicine.expiration_date,
                                                             statements_medicine.price_that_time,
                                                             statements_medicine.quantity
                                                       FROM
                                                             statements_medicine
                                                       JOIN
                                                             medicine ON statements_medicine.medicine_id = medicine.id
                                                       WHERE
                                                             statements_medicine.statements_id = ${id}`);
            res.status(200).json(statementMedicine.rows);
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    }

    async updateStatementMedicine(req, res) {
        const id = req.params.id

        const dataFromRequest = req.body ?? {};

        try {
            if(dataFromRequest.statements_id &&
                dataFromRequest.medicine_id &&
                dataFromRequest.price_that_time &&
                dataFromRequest.quantity) {

                const statement = await db.query(`UPDATE statements_medicine 
                                                 SET statements_id=${dataFromRequest.statements_id}, 
                                                     medicine_id=${dataFromRequest.medicine_id}, 
                                                     price_that_time=${dataFromRequest.price_that_time}, 
                                                     quantity=${dataFromRequest.quantity}
                                                 WHERE id=${id} 
                                                 RETURNING *'`)
                res.status(200).json(statement.rows[0]);
            } else {
                res.status(400).json({ error: "Bad request" });
            }
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    }

    async deleteStatementMedicine(req, res) {
        const id = req.params.id

        try {
            const statementMedicine = await db.query(`DELETE FROM statements_medicine WHERE id = ${id}`);
            res.status(200).json(statementMedicine.rows[0]);
        } catch (error) {
            res.status(500).json({error: error.message})
        }
    }
}

module.exports = new StatementMedicineController();