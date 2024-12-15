const db = require("../../../db");

class EmployeeController {
    async createEmployee(req, res) {
        const dataFromRequest = req.body ?? {};
        try {
            if ( dataFromRequest.surname && dataFromRequest.post_id) {
                const newEmployee = await db.query(`INSERT INTO employee (surname, post_id) 
                                                    VALUES ('${dataFromRequest.surname}', 
                                                             ${dataFromRequest.post_id}) 
                                                    RETURNING *`)
                res.status(201).json(newEmployee.rows[0]);
            } else {
                res.status(400).json({ error: "Bad request" });
            }
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    }

    async getOneEmployee(req, res) {
        const id = req.params.id;

        try {
            const employee = await db.query(`SELECT * FROM employee WHERE id = ${id}`);
            res.status(200).json(employee.rows[0]);
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    }

    async getEmployees(req, res) {
        let requestToDB = `SELECT 
                                      employee.id,
                                      employee.surname,
                                      post.name AS post_name,
                                      post.id AS post_id
                                  FROM 
                                      employee
                                  JOIN 
                                      post ON employee.post_id = post.id
                                  WHERE ($1::text IS NULL OR employee.surname ILIKE $1)
                                  AND ($2::text IS NULL OR post.name ILIKE $2)
        `;

        const { surname, post_name } = req.body ?? {};

        const values = [
            surname ? `%${surname}%` : null,
            post_name ? `%${post_name}%` : null,
        ]

        try {
            const employees = await db.query(requestToDB, values);
            res.status(200).json(employees.rows);
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    }

    async updateEmployee(req, res) {
        const id = req.params.id;

        const dataFromRequest = req.body ?? {};

        try {
            if (dataFromRequest.surname &&
                dataFromRequest.post_id) {
                const employee = await db.query(`UPDATE employee
                                                    SET surname='${dataFromRequest.surname}', 
                                                        post_id=${dataFromRequest.post_id}
                                                    WHERE id=${id}
                                                    RETURNING *`);
                res.status(200).json(employee.rows[0]);
            } else {
                res.status(400).json({ error: "Bad request" });
            }
        } catch (error) {
            res.status(500).json({ error: error.message });
        }


    }

    async deleteEmployee(req, res) {
        const id = req.params.id;
        try {
            const employee = await db.query(`DELETE FROM employee WHERE id = ${id}`);
            res.status(200).json(employee.rows[0]);
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    }
}

module.exports = new EmployeeController();