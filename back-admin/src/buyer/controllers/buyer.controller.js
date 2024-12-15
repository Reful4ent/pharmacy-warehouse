const db = require('../../../db')

class BuyerController {
    async createBuyer(req, res) {
        const dataFromRequest = req.body ?? {};

        try {
            if (dataFromRequest.name &&
                dataFromRequest.bank_id &&
                dataFromRequest.street_id &&
                dataFromRequest.phone_number &&
                dataFromRequest.tin) {

                const newBuyer = await db.query(`INSERT INTO buyer (name, bank_id, street_id, phone_number, tin) 
                                                    VALUES ('${dataFromRequest.name}',
                                                            ${dataFromRequest.bank_id},
                                                            ${dataFromRequest.street_id},
                                                            '${dataFromRequest.phone_number}',
                                                            '${dataFromRequest.tin}')
                                                    RETURNING *`)

                res.status(201).json(newBuyer.rows[0]);
            } else {
                res.status(400).json({ error: "Bad request" });
            }
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    }

    async getBuyers(req, res) {
        let requestToDB = `SELECT 
                                      buyer.id,
                                      buyer.name,
                                      buyer.phone_number,
                                      buyer.tin,
                                      bank.id AS bank_id,
                                      bank.name AS bank_name,
                                      street.id AS street_id,
                                      street.name AS street_name
                                  FROM 
                                      buyer
                                  JOIN 
                                      bank ON buyer.bank_id = bank.id
                                  JOIN
                                      street ON buyer.street_id = street.id 
                                  WHERE ($1::text IS NULL OR buyer.name ILIKE $1) 
                                  AND ($2::text IS NULL OR bank.name ILIKE $2)
                                  AND ($3::text IS NULL OR street.name ILIKE $3) 
                                  AND ($4::text IS NULL OR phone_number ILIKE $4) 
                                  AND ($5::text IS NULL OR tin ILIKE $5)
        `;

        const { name, bank_name, street_name, phone_number, tin } = req.body ?? {};

        const values = [
            name ? `%${name}%` : null,
            bank_name ? `%${bank_name}%` : null,
            street_name ? `%${street_name}%` : null,
            phone_number ? `%${phone_number}%` : null,
            tin ? `%${tin}%` : null,
        ]

        try {
            const buyers = await db.query(requestToDB, values);
            res.status(200).json(buyers.rows);
        } catch (error) {
            res.status(500).json({error: error.message})
        }
    }

    async getOneBuyer(req, res) {
        const id = req.params.id

        try {
            const buyer = await db.query(`SELECT * FROM buyer WHERE id = ${id}`)
            res.status(200).json(buyer.rows[0])
        } catch (error) {
            res.status(500).json({error: error.message})
        }
    }

    async updateBuyer(req, res) {
        const id = req.params.id

        const dataFromRequest = req.body ?? {};

        console.log(dataFromRequest);
        try {
            if(dataFromRequest.name &&
                dataFromRequest.bank_id &&
                dataFromRequest.street_id &&
                dataFromRequest.phone_number &&
                dataFromRequest.tin) {

                const buyer = await db.query(`UPDATE buyer 
                                                 SET name='${dataFromRequest.name}', 
                                                     bank_id=${dataFromRequest.bank_id}, 
                                                     street_id=${dataFromRequest.street_id}, 
                                                     phone_number='${dataFromRequest.phone_number}', 
                                                     tin='${dataFromRequest.tin}'
                                                 WHERE id=${id} 
                                                 RETURNING *`)
                res.status(200).json(buyer.rows[0]);
            } else {
                res.status(400).json({ error: "Bad request" });
            }
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    }


    async deleteBuyer(req, res) {
        const id = req.params.id

        try {
            const buyer = await db.query(`DELETE FROM buyer WHERE id = ${id}`);
            res.status(200).json(buyer.rows[0]);
        } catch (error) {
            res.status(500).json({error: error.message})
        }
    }
}

module.exports = new BuyerController();