const db = require('../../../db');

class PostController {
    async createPost(req, res) {
        const dataFromRequest = req.body ?? {};

        try {
            if (dataFromRequest.name) {
                const newPost = await db.query(`INSERT INTO post (name) VALUES ('${dataFromRequest.name}') RETURNING *`);
                res.status(201).json(newPost.rows[0]);
            } else {
                res.status(400).json({ error: "Bad request" });
            }
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    }

    async getPosts(req, res) {
        let requestToDB = `SELECT * FROM post 
                                  WHERE ($1::text IS NULL OR name ILIKE $1)
        `;

        const { name } = req.body;

        const values = [
            name ? `%${name}%` : null,
        ]


        try {
            const posts = await db.query(requestToDB, values);
            res.status(200).json(posts.rows);
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    }

    async getOnePost(req, res) {
        const id = req.params.id;
        try {
            const post = await db.query(`SELECT * FROM post WHERE id=${id}`);
            res.status(200).json(post.rows[0]);
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    }

    async updatePost(req, res) {
        const id = req.params.id;
        const dataFromRequest = req.body ?? {};

        try {
            if (dataFromRequest.name) {
                const post = await db.query(`UPDATE post SET name='${dataFromRequest.name}' WHERE id=${id} RETURNING *`);
                res.status(200).json(post.rows[0]);
            } else {
                res.status(400).json({ error: "Bad request" });
            }
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    }

    async deletePost(req, res) {
        const id = req.params.id;

        try {
            const post = await db.query(`DELETE FROM post WHERE id=${id}`);
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    }
}

module.exports = new PostController();