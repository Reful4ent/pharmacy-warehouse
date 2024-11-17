const db = require('../../../db')

class MedicinePackageController {
    async createMedicinePackage(req, res) {
        const dataFromRequest = req.body ?? {};

        try {
            if (dataFromRequest.medicine_id &&
                dataFromRequest.package_id) {

                const newMedicinePackage = await db.query(`INSERT INTO medicine_package (medicine_id, package_id) 
                                                    VALUES (${dataFromRequest.medicine_id},
                                                            ${dataFromRequest.package_id})
                                                    RETURNING *`)

                res.status(201).json(newMedicinePackage.rows[0]);
            } else {
                res.status(400).json({ error: "Bad request" });
            }
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    }

    async getMedicinePackages(req, res) {
        let requestToDB = `SELECT * FROM medicine_package 
                                  WHERE (medicine_id = $1) 
                                  AND ($2::int IS NULL OR package_id = $2)
        `;


        const { medicine_id, package_id } = req.body ?? {};

        const values = [
            medicine_id,
            package_id,
        ]

        try {
            if(medicine_id) {
                const medicinePackage = await db.query(requestToDB, values);
                res.status(200).json(medicinePackage.rows);
            } else {
                res.status(400).json({ error: "Bad request" });
            }
        } catch (error) {
            res.status(500).json({error: error.message})
        }
    }

    async getOneMedicinePackage(req, res) {
        const id = req.params.id

        try {
            const medicinePackage = await db.query(`SELECT * FROM medicine_package WHERE id=${id}`);
            res.status(200).json(medicinePackage.rows[0]);
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    }

    async updateMedicinePackage(req, res) {
        const id = req.params.id

        const dataFromRequest = req.body ?? {};

        try {
            if (dataFromRequest.medicine_id &&
                dataFromRequest.package_id)  {

                const medicinePackage = await db.query(`UPDATE medicine_package
                                                 SET medicine_id=${dataFromRequest.medicine_id}, 
                                                     package_id=${dataFromRequest.package_id}
                                                 WHERE id=${id} 
                                                 RETURNING *'`)
                res.status(200).json(medicinePackage.rows[0]);
            } else {
                res.status(400).json({ error: "Bad request" });
            }
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    }

    async deleteMedicinePackage(req, res) {
        const id = req.params.id

        try {
            const medicinePackage = await db.query(`DELETE FROM medicine_package WHERE id = ${id}`);
        } catch (error) {
            res.status(500).json({error: error.message})
        }
    }
}

module.exports = new MedicinePackageController();