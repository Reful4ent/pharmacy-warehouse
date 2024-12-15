const db = require('../../../db')

class ProducerController {
    async createProducer(req, res) {
        const dataFromRequest = req.body ?? {};

        try {
            if (dataFromRequest.name &&
                dataFromRequest.country_id) {

                const newProducer = await db.query(`INSERT INTO producer (name, country_id) 
                                                    VALUES ('${dataFromRequest.name}',
                                                            ${dataFromRequest.country_id})
                                                    RETURNING *`)

                res.status(201).json(newProducer.rows[0]);
            } else {
                res.status(400).json({ error: "Bad request" });
            }
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    }

    async getProducers(req, res) {
        const requestToDB = `SELECT 
                                        producer.id,
                                        producer.name,
                                        country_id AS country_id,
                                        country.name AS country_name
                                    FROM 
                                        producer
                                    JOIN 
                                        country ON producer.country_id = country.id
                                    WHERE ($1::text IS NULL OR producer.name ILIKE $1) 
                                    AND ($2::text IS NULL OR country.name ILIKE $2)
        `;

        const { name, country_name } = req.body ?? {};

        const values = [
            name ? `%${name}%` : null,
            country_name ? `%${country_name}%` : null,
        ]

        try {
            const producers = await db.query(requestToDB, values);
            res.status(200).json(producers.rows);
        } catch (error) {
            res.status(500).json({ error: error.message });
        }

    }

    async getOneProducer(req, res) {
        const id = req.params.id

        try {
            const producer = await db.query(`SELECT * FROM producer WHERE id=${id}`);
            res.status(200).json(producer.rows[0]);
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    }

    async updateProducer(req, res) {
        const id = req.params.id;

        const dataFromRequest = req.body ?? {};

        try {
            if(dataFromRequest.name &&
               dataFromRequest.country_id) {
                const producer = await db.query(`UPDATE producer 
                                                   SET name='${dataFromRequest.name}', 
                                                       country_id=${dataFromRequest.country_id} 
                                                 WHERE id=${id} 
                                                 RETURNING *`)
                res.status(200).json(producer.rows[0]);
            } else {
                res.status(400).json({ error: "Bad request" });
            }
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    }

    async deleteProducer(req, res) {
        const id = req.params.id;

        try {
            const producer = await db.query(`DELETE FROM producer WHERE id=${id}`);
            res.status(200).json(supplier.rows[0]);
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    }
}

module.exports = new ProducerController();