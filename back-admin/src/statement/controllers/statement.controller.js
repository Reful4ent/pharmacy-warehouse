const db = require('../../../db')

class StatementController {
    async createStatement(req, res) {
        const dataFromRequest = req.body ?? {};

        console.log(dataFromRequest);

        try {
            if (dataFromRequest.number_of_statement &&
                dataFromRequest.receipt_date &&
                dataFromRequest.supplier_id &&
                dataFromRequest.total_sum >=0 ) {

                const newStatement = await db.query(`INSERT INTO statements (number, receipt_date, supplier_id, total_sum) 
                                                    VALUES ('${dataFromRequest.number_of_statement}',
                                                            '${dataFromRequest.receipt_date}',
                                                            ${dataFromRequest.supplier_id},
                                                            ${dataFromRequest.total_sum})
                                                    RETURNING *`)

                res.status(201).json(newStatement.rows[0]);
            } else {
                res.status(400).json({ error: "Bad request" });
            }
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    }

    async getStatements(req, res) {
        let requestToDB = `SELECT
                                        statements.id,
                                        statements.number,
                                        statements.receipt_date,
                                        statements.total_sum,
                                        supplier.id AS supplier_id,
                                        supplier.name AS supplier_name
                                  FROM 
                                        statements 
                                  JOIN
                                        supplier ON statements.supplier_id = supplier.id
                                  WHERE 
                                        ($1::text IS NULL OR number ILIKE $1) 
                                        AND ($2::date IS NULL OR receipt_date::date = $2::date)
                                        AND ($3::text IS NULL OR supplier.name ILIKE $3) 
                                        AND ($4::decimal IS NULL OR total_sum = $4);
        `;

        const { number, receipt_date, supplier_name, total_sum } = req.body ?? {};

        const values = [
            number ? `%${number}%` : null,
            receipt_date,
            supplier_name ? `%${supplier_name}%` : null,
            total_sum,
        ]

        try {
            const statements = await db.query(requestToDB, values);
            res.status(200).json(statements.rows);
        } catch (error) {
            res.status(500).json({error: error.message})
        }

    }

    async getOneStatement(req, res) {
        const id = req.params.id

        try {
            const statement = await db.query(`SELECT
                                                    statements.id,
                                                    statements.number,
                                                    statements.receipt_date,
                                                    statements.total_sum,
                                                    supplier.id AS supplier_id,
                                                    supplier.name AS supplier_name
                                              FROM 
                                                    statements 
                                              JOIN
                                                    supplier ON statements.supplier_id = supplier.id
                                              WHERE statements.id = ${id}`);
            res.status(200).json(statement.rows[0]);
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    }

    async updateStatement(req, res) {
        const id = req.params.id
        const dataFromRequest = req.body ?? {};

        try {
            if(dataFromRequest.number_of_statement &&
                dataFromRequest.receipt_date &&
                dataFromRequest.supplier_id &&
                dataFromRequest.total_sum >= 0) {

                const statement = await db.query(`UPDATE statements 
                                                 SET number='${dataFromRequest.number_of_statement}', 
                                                     receipt_date='${dataFromRequest.receipt_date}', 
                                                     supplier_id=${dataFromRequest.supplier_id}, 
                                                     total_sum=${dataFromRequest.total_sum}
                                                 WHERE id=${id} 
                                                 RETURNING *`)
                res.status(200).json(statement.rows[0]);
            } else {
                res.status(400).json({ error: "Bad request" });
            }
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    }

    async deleteStatement(req, res) {
        const id = req.params.id

        try {
            const statement = await db.query(`DELETE FROM statements WHERE id = ${id}`);
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    }
}

module.exports = new StatementController();