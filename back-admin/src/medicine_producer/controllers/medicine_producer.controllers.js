const db = require('../../../db')

class MedicineProducerController {
    async createMedicineProducer(req, res) {
        const dataFromRequest = req.body ?? {};

        try {
            if (dataFromRequest.medicine_id &&
                dataFromRequest.producer_id) {

                const newMedicineProducer = await db.query(`INSERT INTO medicine_producer (medicine_id, producer_id) 
                                                    VALUES (${dataFromRequest.medicine_id},
                                                            ${dataFromRequest.producer_id})
                                                    RETURNING *`)

                res.status(201).json(newMedicineProducer.rows[0]);
            } else {
                res.status(400).json({ error: "Bad request" });
            }
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    }

    async getMedicineProducers(req, res) {
        let requestToDB = `SELECT * FROM medicine_producer 
                                  WHERE (medicine_id = $1) 
                                  AND ($2::int IS NULL OR producer_id = $2)
        `;


        const { medicine_id, producer_id } = req.body ?? {};

        const values = [
            medicine_id,
            producer_id,
        ]

        try {
            if(medicine_id) {
                const medicineProducer = await db.query(requestToDB, values);
                res.status(200).json(medicineProducer.rows);
            } else {
                res.status(400).json({ error: "Bad request" });
            }
        } catch (error) {
            res.status(500).json({error: error.message})
        }
    }

    async getOneMedicineProducer(req, res) {
        const id = req.params.id

        try {
            const medicineProducer = await db.query(`SELECT * FROM medicine_producer WHERE id=${id}`);
            res.status(200).json(medicineProducer.rows[0]);
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    }

    async updateMedicineProducer(req, res) {
        const id = req.params.id

        const dataFromRequest = req.body ?? {};

        try {
            if (dataFromRequest.medicine_id &&
                dataFromRequest.producer_id)  {

                const medicineProducer = await db.query(`UPDATE medicine_package
                                                 SET medicine_id=${dataFromRequest.medicine_id}, 
                                                     producer_id=${dataFromRequest.producer_id}
                                                 WHERE id=${id} 
                                                 RETURNING *'`)
                res.status(200).json(medicineProducer.rows[0]);
            } else {
                res.status(400).json({ error: "Bad request" });
            }
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    }

    async deleteMedicineProducer(req, res) {
        const id = req.params.id

        try {
            const medicineProducer = await db.query(`DELETE FROM medicine_producer WHERE id = ${id}`);
        } catch (error) {
            res.status(500).json({error: error.message})
        }
    }
}

module.exports = new MedicineProducerController();