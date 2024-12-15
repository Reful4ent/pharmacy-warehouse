const db = require('../../../db')

class InvoiceController {
    async createInvoice(req, res) {
        const dataFromRequest = req.body ?? {};

        try {
            if (dataFromRequest.number_of_invoice &&
                dataFromRequest.discharge_date &&
                dataFromRequest.employee_id &&
                dataFromRequest.buyer_id &&
                dataFromRequest.total_sum >= 0) {
                const newInvoice = await db.query(`INSERT INTO invoice (number, discharge_date, employee_id, buyer_id, total_sum) 
                                                    VALUES ('${dataFromRequest.number_of_invoice}',
                                                            '${dataFromRequest.discharge_date}',
                                                            ${dataFromRequest.employee_id},
                                                            ${dataFromRequest.buyer_id},
                                                            ${dataFromRequest.total_sum})
                                                    RETURNING *`)

                res.status(201).json(newInvoice.rows[0]);
            } else {
                res.status(400).json({ error: "Bad request" });
            }
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    }

    async getInvoices(req, res) {
        let requestToDB = `SELECT
                                        invoice.id,
                                        invoice.number,
                                        invoice.discharge_date,
                                        invoice.total_sum,
                                        employee.surname AS employee_surname,
                                        employee.id AS employee_id,
                                        buyer.name AS buyer_name,
                                        buyer.id AS buyer_id
                                    FROM
                                        invoice
                                    JOIN 
                                        employee ON invoice.employee_id = employee.id
                                    JOIN
                                        buyer ON invoice.buyer_id = buyer.id
                                    WHERE 
                                        ($1::text IS NULL OR invoice.number ILIKE $1) 
                                        AND ($2::date IS NULL OR invoice.discharge_date::date = $2::date)
                                        AND ($3::text IS NULL OR employee.surname ILIKE $3) 
                                        AND ($4::text IS NULL OR buyer.name ILIKE $4) 
                                        AND ($5::decimal IS NULL OR invoice.total_sum = $5);

        `;

        const { number, discharge_date, employee_surname, buyer_name, total_sum } = req.body ?? {};

        const values = [
            number ? `%${number}%` : null,
            discharge_date,
            employee_surname ? `%${employee_surname}%` : null,
            buyer_name  ? `%${buyer_name}%` : null,
            total_sum,
        ]

        try {
            const invoices = await db.query(requestToDB, values);
            res.status(200).json(invoices.rows);
        } catch (error) {
            res.status(500).json({error: error.message})
        }

    }

    async getOneInvoice(req, res) {
        const id = req.params.id

        try {
            const invoice = await db.query(`SELECT
                                                invoice.id,
                                                invoice.number,
                                                invoice.discharge_date,
                                                invoice.total_sum,
                                                employee.surname AS employee_surname,
                                                employee.id AS employee_id,
                                                buyer.name AS buyer_name,
                                                buyer.id AS buyer_id
                                            FROM
                                                invoice
                                            JOIN 
                                                employee ON invoice.employee_id = employee.id
                                            JOIN
                                                buyer ON invoice.buyer_id = buyer.id
                                            WHERE invoice.id = ${id}`);
            res.status(200).json(invoice.rows[0]);
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    }

    async updateInvoice(req, res) {
        const id = req.params.id

        const dataFromRequest = req.body ?? {};

        try {
            if(dataFromRequest.number_of_invoice &&
                dataFromRequest.discharge_date &&
                dataFromRequest.employee_id &&
                dataFromRequest.buyer_id &&
                dataFromRequest.total_sum >= 0) {

                const invoice = await db.query(`UPDATE invoice 
                                                 SET number='${dataFromRequest.number_of_invoice}', 
                                                     discharge_date='${dataFromRequest.discharge_date}', 
                                                     employee_id=${dataFromRequest.employee_id}, 
                                                     buyer_id=${dataFromRequest.buyer_id}, 
                                                     total_sum=${dataFromRequest.total_sum}
                                                 WHERE id=${id} 
                                                 RETURNING *`)
                res.status(200).json(invoice.rows[0]);
            } else {
                res.status(400).json({ error: "Bad request" });
            }
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    }

    async deleteInvoice(req, res) {
        const id = req.params.id

        try {
            const invoice = await db.query(`DELETE FROM invoice WHERE id=${id}`)
        } catch (error) {
            res.status(500).send({error: error.message})
        }
    }
}

module.exports = new InvoiceController();