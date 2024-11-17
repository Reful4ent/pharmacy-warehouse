const db = require('../../../db')

class MedicineCategoryController {
    async createMedicineCategory(req, res) {
        const dataFromRequest = req.body ?? {};

        try {
            if (dataFromRequest.medicine_id &&
                dataFromRequest.category_id) {

                const newMedicineCategory = await db.query(`INSERT INTO medicine_category (medicine_id, category_id) 
                                                    VALUES (${dataFromRequest.medicine_id},
                                                            ${dataFromRequest.category_id})
                                                    RETURNING *`)

                res.status(201).json(newMedicineCategory.rows[0]);
            } else {
                res.status(400).json({ error: "Bad request" });
            }
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    }

    async getMedicineCategories(req, res) {
        let requestToDB = `SELECT * FROM medicine_category 
                                  WHERE (medicine_id = $1) 
                                  AND ($2::int IS NULL OR category_id = $2)
        `;


        const { medicine_id, category_id } = req.body ?? {};

        const values = [
            medicine_id,
            category_id,
        ]

        try {
            if(medicine_id) {
                const medicineCategory = await db.query(requestToDB, values);
                res.status(200).json(medicineCategory.rows);
            } else {
                res.status(400).json({ error: "Bad request" });
            }
        } catch (error) {
            res.status(500).json({error: error.message})
        }
    }

    async getOneMedicineCategory(req, res) {
        const id = req.params.id

        try {
            const medicineCategory = await db.query(`SELECT * FROM medicine_category WHERE id=${id}`);
            res.status(200).json(medicineCategory.rows[0]);
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    }

    async updateMedicineCategory(req, res) {
        const id = req.params.id

        const dataFromRequest = req.body ?? {};

        try {
            if (dataFromRequest.medicine_id &&
                dataFromRequest.category_id)  {

                const medicineCategory = await db.query(`UPDATE medicine_category 
                                                 SET medicine_id=${dataFromRequest.medicine_id}, 
                                                     category_id=${dataFromRequest.category_id}
                                                 WHERE id=${id} 
                                                 RETURNING *'`)
                res.status(200).json(medicineCategory.rows[0]);
            } else {
                res.status(400).json({ error: "Bad request" });
            }
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    }

    async deleteMedicineCategory(req, res) {
        const id = req.params.id

        try {
            const medicineCategory = await db.query(`DELETE FROM medicine_category WHERE id = ${id}`);
        } catch (error) {
            res.status(500).json({error: error.message})
        }
    }
}

module.exports = new MedicineCategoryController();