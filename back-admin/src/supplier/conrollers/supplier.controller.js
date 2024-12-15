const db = require('../../../db')

class SupplierController {
    async createSupplier(req, res) {
        const dataFromRequest = req.body ?? {};

        try {
            if (dataFromRequest.name &&
                dataFromRequest.bank_id &&
                dataFromRequest.street_id &&
                dataFromRequest.phone_number &&
                dataFromRequest.current_account &&
                dataFromRequest.tin) {

                const newSupplier = await db.query(`INSERT INTO supplier (name, bank_id, street_id, phone_number, current_account, tin) 
                                                    VALUES ('${dataFromRequest.name}',
                                                            ${dataFromRequest.bank_id},
                                                            ${dataFromRequest.street_id},
                                                            '${dataFromRequest.phone_number}',
                                                            '${dataFromRequest.current_account}',
                                                            '${dataFromRequest.tin}')
                                                    RETURNING *`)

                res.status(201).json(newSupplier.rows[0]);
            } else {
                res.status(400).json({ error: "Bad request" });
            }
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    }

    async getSuppliers(req, res) {
        let requestToDB = `SELECT 
                                      supplier.id,
                                      supplier.name,
                                      supplier.phone_number,
                                      supplier.current_account,
                                      supplier.tin,
                                      bank.id AS bank_id,
                                      bank.name AS bank_name,
                                      street.id AS street_id,
                                      street.name AS street_name
                                  FROM 
                                      supplier
                                  JOIN 
                                      bank ON supplier.bank_id = bank.id
                                  JOIN
                                      street ON supplier.street_id = street.id 
                                  WHERE ($1::text IS NULL OR supplier.name ILIKE $1) 
                                  AND ($2::text IS NULL OR bank.name ILIKE $2)
                                  AND ($3::text IS NULL OR street.name ILIKE $3) 
                                  AND ($4::text IS NULL OR phone_number ILIKE $4)
                                  AND ($5::text IS NULL OR current_account ILIKE $5) 
                                  AND ($6::text IS NULL OR tin ILIKE $6)
        `;

        const { name, bank_name, street_name, phone_number, current_account, tin } = req.body ?? {};

        const values = [
            name ? `%${name}%` : null,
            bank_name ? `%${bank_name}%` : null,
            street_name ? `%${street_name}%` : null,
            phone_number ? `%${phone_number}%` : null,
            current_account ? `%${current_account}%` : null,
            tin ? `%${tin}%` : null,
        ]

        console.log(phone_number)
        try {
            const suppliers = await db.query(requestToDB, values);
            res.status(200).json(suppliers.rows);
        } catch (error) {
            res.status(500).json({error: error.message})
        }
    }

    async getOneSupplier(req, res) {
        const id = req.params.id

        try {
            const supplier = await db.query(`SELECT * FROM supplier WHERE id = ${id}`)
            res.status(200).json(supplier.rows[0])
        } catch (error) {
            res.status(500).json({error: error.message})
        }
    }

    async updateSupplier(req, res) {
        const id = req.params.id

        const dataFromRequest = req.body ?? {};

        try {
            if(dataFromRequest.name &&
                dataFromRequest.bank_id &&
                dataFromRequest.street_id &&
                dataFromRequest.phone_number &&
                dataFromRequest.current_account &&
                dataFromRequest.tin) {

                const suppliers = await db.query(`UPDATE supplier 
                                                 SET name='${dataFromRequest.name}', 
                                                     bank_id=${dataFromRequest.bank_id}, 
                                                     street_id=${dataFromRequest.street_id}, 
                                                     phone_number='${dataFromRequest.phone_number}', 
                                                     current_account='${dataFromRequest.current_account}',
                                                     tin='${dataFromRequest.tin}'
                                                 WHERE id=${id} 
                                                 RETURNING *`)
                res.status(200).json(suppliers.rows[0]);
            } else {
                res.status(400).json({ error: "Bad request" });
            }
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    }
    async deleteSupplier(req, res) {
        const id = req.params.id

        try {
            const supplier = await db.query(`DELETE FROM supplier WHERE id=${id}`)
            res.status(200).json(supplier.rows[0]);
        } catch (error) {
            res.status(500).json({error: error.message})
        }
    }
}

module.exports = new SupplierController();