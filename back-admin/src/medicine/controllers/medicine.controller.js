const db = require('../../../db')

class MedicineController {
    async createMedicine(req, res) {
        const dataFromRequest = req.body ?? {};

        try {
            if (dataFromRequest.name &&
                dataFromRequest.production_date &&
                dataFromRequest.expiration_date &&
                dataFromRequest.registration_num &&
                dataFromRequest.price) {

                const newMedicine = await db.query(`INSERT INTO medicine (name, production_date, expiration_date, registration_num, price) 
                                                    VALUES ('${dataFromRequest.name}',
                                                            '${dataFromRequest.production_date}',
                                                            INTERVAL '${dataFromRequest.expiration_date}',
                                                            '${dataFromRequest.registration_num}',
                                                            ${dataFromRequest.price})
                                                    RETURNING *`)

                res.status(201).json(newMedicine.rows[0]);
            } else {
                res.status(400).json({ error: "Bad request" });
            }
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    }

    //ToDo: сделать так чтобы время проверялось в get
    async getMedicines(req, res) {
        let requestToDB = `SELECT * FROM medicine 
                                  WHERE ($1::text IS NULL OR name ILIKE $1) 
                                  AND ($2::date IS NULL OR production_date::date = $2::date)
                                  AND ($3::interval IS NULL OR expiration_date = $3) 
                                  AND ($4::text IS NULL OR registration_num ILIKE $4) 
                                  AND ($5::decimal IS NULL OR price = $5)
        `;

        const { name, production_date, expiration_date, registration_num, price } = req.body ?? {};

        const values = [
            name ? `%${name}%` : null,
            production_date,
            expiration_date,
            registration_num ? `%${registration_num}%` : null,
            price,
        ]


        try {
            const medicines = await db.query(requestToDB, values);
            res.status(200).json(medicines.rows);
        } catch (error) {
            res.status(500).json({error: error.message})
        }
    }

    async getOneMedicine(req, res) {
        const id = req.params.id
        try {
            const medicine = await db.query(`SELECT * FROM medicine WHERE id = ${id}`);
            res.status(200).json(medicine.rows[0]);
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    }

    async updateMedicine(req, res) {
        const id = req.params.id

        const dataFromRequest = req.body ?? {};

        try {
            if(dataFromRequest.name &&
                dataFromRequest.production_date &&
                dataFromRequest.expiration_date &&
                dataFromRequest.registration_num &&
                dataFromRequest.price) {

                const medicine = await db.query(`UPDATE medicine 
                                                 SET name='${dataFromRequest.name}', 
                                                     production_date='${dataFromRequest.production_date}', 
                                                     expiration_date = INTERVAL '${dataFromRequest.expiration_date}', 
                                                     registration_num='${dataFromRequest.registration_num}', 
                                                     price=${dataFromRequest.price}
                                                 WHERE id=${id} 
                                                 RETURNING *'`)
                res.status(200).json(medicine.rows[0]);
            } else {
                res.status(400).json({ error: "Bad request" });
            }
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    }

    async deleteMedicine(req, res) {
        const id = req.params.id

        try {
            const medicine = await db.query(`DELETE FROM medicine WHERE id=${id}`)
        } catch (error) {
            res.status(500).send({error: error.message})
        }
    }
}

module.exports = new MedicineController();