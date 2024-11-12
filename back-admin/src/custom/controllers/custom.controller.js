const db = require('../../../db');

class CustomController {
    async getCustomQuery(req, res) {
        const dataFromRequest = req.body ?? {};
        try {
            if(dataFromRequest.query) {
                const countries = await db.query(dataFromRequest.query);
                res.status(200).json(countries.rows);
            }
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    }
}

module.exports = new CustomController();