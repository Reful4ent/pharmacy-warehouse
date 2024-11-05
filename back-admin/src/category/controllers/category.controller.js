const db = require('../../../db');

class CategoryController {
    async createCategory(req, res) {
        const dataFromRequest = req.body ?? {};

        try {
            if (dataFromRequest.name) {
                const newCategory = await db.query(`INSERT INTO category (name) VALUES ('${dataFromRequest.name}') RETURNING *`);
                res.status(201).json(newCategory.rows[0]);
            }
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    }

    async getCategories(req, res) {
        let requestToDB = `SELECT *
                                  FROM category`;

        const dataFromRequest = req.query ?? {};

        if (dataFromRequest.name) {
            requestToDB += ` WHERE name
                             ILIKE '%${dataFromRequest.name}%'`;
        }


        try {
            const categories = await db.query(requestToDB);
            res.status(200).json(categories.rows);
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    }

    async getOneCategory(req, res) {
        const id = req.params.id;
        try {
            const category = await db.query(`SELECT * FROM category WHERE id=${id} RETURNING *`);
            res.status(200).json(category.rows[0]);
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    }

    async updateCategory(req, res) {
        const id = req.params.id;
        const dataFromRequest = req.body ?? {};

        try {
            const category = await db.query(`UPDATE category SET name='${dataFromRequest.name}' WHERE id=${id} RETURNING *`);
            res.status(200).json(category.rows[0]);
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    }

    async deleteCategory(req, res) {
        const id = req.params.id;

        try {
            const category = await db.query(`DELETE FROM category WHERE id=${id}`);
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    }
}

module.exports = new CategoryController();