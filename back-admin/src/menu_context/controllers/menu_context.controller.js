const db = require('../../../db')

class MenuContextController {
    async getMenuContexts(req, res) {
        try {
            const menuContexts = await db.query(`SELECT * FROM menu_context ORDER BY id`);
            res.status(200).json(menuContexts.rows);
        } catch (error) {
            res.status(500).json({error: error.message})
        }
    }
}

module.exports = new MenuContextController();