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
                                                            '${dataFromRequest.expiration_date}',
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

    async getMedicines(req, res) {
        let requestToDB = `SELECT 
                                      medicine.id,
                                      medicine.name,
                                      medicine.production_date,
                                      medicine.expiration_date,
                                      medicine.registration_num,
                                      medicine.price,
                                      producer.name AS producer_name,
                                      STRING_AGG(DISTINCT category.name, ', ') AS category_names,
                                      package.name AS package_name,
                                      country.name AS country_name
                                  FROM 
                                      medicine
                                  LEFT JOIN 
                                      medicine_producer ON medicine.id = medicine_producer.medicine_id
                                  LEFT JOIN 
                                      producer ON medicine_producer.producer_id = producer.id
                                  LEFT JOIN 
                                      medicine_category ON medicine.id = medicine_category.medicine_id
                                  LEFT JOIN 
                                      category ON medicine_category.category_id = category.id
                                  LEFT JOIN 
                                      medicine_package ON medicine.id = medicine_package.medicine_id
                                  LEFT JOIN 
                                      package ON medicine_package.package_id = package.id
                                  LEFT JOIN 
                                      country ON producer.country_id = country.id
                                  WHERE ($1::text IS NULL OR medicine.name ILIKE $1)
                                  AND ($2::text IS NULL OR medicine.registration_num ILIKE $2)
                                  GROUP BY 
                                      medicine.id, 
                                      medicine.name, 
                                      medicine.production_date, 
                                      medicine.expiration_date, 
                                      medicine.registration_num, 
                                      medicine.price, 
                                      producer.name, 
                                      package.name, 
                                      country.name; 
        `;

        const { name, registration_num } = req.body ?? {};

        const values = [
            name ? `%${name}%` : null,
            registration_num ? `%${registration_num}%` : null,
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
                                                     expiration_date = '${dataFromRequest.expiration_date}', 
                                                     registration_num='${dataFromRequest.registration_num}', 
                                                     price=${dataFromRequest.price}
                                                 WHERE id=${id} 
                                                 RETURNING *`)
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
            res.status(200).json(medicine.rows[0]);
        } catch (error) {
            res.status(500).send({error: error.message})
        }
    }
}

module.exports = new MedicineController();