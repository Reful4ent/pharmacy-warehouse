const db = require('../../../db')

class UsersPermissionsController {

    async getUsersPermissions(req, res) {
        let requestToDB = `SELECT * FROM users_permissions
        `;

        try {
            const permissions = await db.query(requestToDB);
            res.status(200).json(permissions.rows);
        } catch (error) {
            res.status(500).json({error: error.message})
        }
    }

    async getOneUserPermissions(req, res) {
        const { id } = req.body;
        try {
            const permissions = await db.query(`SELECT 
                                                    users_permissions.id,
                                                    user_id,
                                                    menu_item_id,
                                                    read_permission,
                                                    write_permission,
                                                    edit_permission,
                                                    delete_permission,
                                                    mc."function",
                                                    mc.name
                                                FROM 
                                                    users_permissions
                                                JOIN 
                                                    menu_context mc ON users_permissions.menu_item_id = mc.id
                                                WHERE 
                                                    users_permissions.user_id = ${id}
                                                ORDER BY
                                                    menu_item_id;
`);
            res.status(200).json(permissions.rows);
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    }

    async updateUserPermission(req, res) {
        const dataFromRequest = req.body ?? {};
        console.log(dataFromRequest);
        try {
            if(dataFromRequest.id &&
                dataFromRequest.user_id &&
                dataFromRequest.menu_item_id &&
                (dataFromRequest.read_permission != null) &&
                (dataFromRequest.write_permission != null) &&
                (dataFromRequest.edit_permission != null)  &&
                (dataFromRequest.delete_permission != null)) {
                console.log(dataFromRequest)
                const usersPermissions = await db.query(`UPDATE users_permissions 
                                                        SET 
                                                            read_permission = ${dataFromRequest.read_permission}, 
                                                            write_permission = ${dataFromRequest.write_permission}, 
                                                            edit_permission = ${dataFromRequest.edit_permission}, 
                                                            delete_permission = ${dataFromRequest.delete_permission} 
                                                        WHERE 
                                                            id = ${dataFromRequest.id} 
                                                        RETURNING *;`)
                res.status(200).json(usersPermissions.rows[0]);
            } else {
                res.status(400).json({ error: "Bad request" });
            }
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    }
}

module.exports = new UsersPermissionsController();