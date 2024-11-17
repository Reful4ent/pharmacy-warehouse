const db = require('../../../db')

class InvoiceMedicineController {
    async createInvoiceMedicine(req, res) {
        const dataFromRequest = req.body ?? {};

        try {
            if (dataFromRequest.invoice_id &&
                dataFromRequest.medicine_id &&
                dataFromRequest.price_that_time &&
                dataFromRequest.quantity) {

                const newInvoiceMedicine = await db.query(`INSERT INTO invoice_medicine (invoice_id, medicine_id, price_that_time, quantity) 
                                                    VALUES (${dataFromRequest.invoice_id},
                                                            ${dataFromRequest.medicine_id},
                                                            ${dataFromRequest.price_that_time},
                                                            ${dataFromRequest.quantity})
                                                    RETURNING *`)

                res.status(201).json(newInvoiceMedicine.rows[0]);
            } else {
                res.status(400).json({ error: "Bad request" });
            }
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    }

    async getInvoiceMedicines(req, res) {
        let requestToDB = `SELECT * FROM invoice_medicine 
                                  WHERE (invoice_id = $1) 
                                  AND ($2::int IS NULL OR medicine_id = $2)
                                  AND ($3::decimal IS NULL OR price_that_time = $3) 
                                  AND ($4::int IS NULL OR quantity = $4)
        `;


        const { invoice_id, medicine_id, price_that_time, quantity } = req.body ?? {};

        const values = [
            invoice_id,
            medicine_id,
            price_that_time,
            quantity,
        ]

        try {
            if(invoice_id) {
                const invoiceMedicines = await db.query(requestToDB, values);
                res.status(200).json(invoiceMedicines.rows);
            } else {
                res.status(400).json({ error: "Bad request" });
            }
        } catch (error) {
            res.status(500).json({error: error.message})
        }
    }

    async getOneInvoiceMedicine(req, res) {
        const id = req.params.id

        try {
            const invoiceMedicine = await db.query(`SELECT * FROM invoice_medicine WHERE id=${id}`);
            res.status(200).json(invoiceMedicine.rows[0]);
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    }

    async updateInvoiceMedicine(req, res) {
        const id = req.params.id

        const dataFromRequest = req.body ?? {};

        try {
            if(dataFromRequest.invoice_id &&
                dataFromRequest.medicine_id &&
                dataFromRequest.price_that_time &&
                dataFromRequest.quantity) {

                const invoice = await db.query(`UPDATE invoice_medicine 
                                                 SET invoice_id=${dataFromRequest.invoice_id}, 
                                                     medicine_id=${dataFromRequest.medicine_id}, 
                                                     price_that_time=${dataFromRequest.price_that_time}, 
                                                     quantity=${dataFromRequest.quantity}
                                                 WHERE id=${id} 
                                                 RETURNING *'`)
                res.status(200).json(invoice.rows[0]);
            } else {
                res.status(400).json({ error: "Bad request" });
            }
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    }


    async deleteInvoiceMedicine(req, res) {
        const id = req.params.id

        try {
            const invoiceMedicine = await db.query(`DELETE FROM invoice_medicine WHERE id = ${id}`);
        } catch (error) {
            res.status(500).json({error: error.message})
        }
    }
}

module.exports = new InvoiceMedicineController();