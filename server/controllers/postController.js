const { decodeBase64 } = require("bcryptjs")

module.exports = {
    getFilteredPosts: async (req, res) => {
        const {userposts, search} = req.body;
        const {id} = req.params;
        const db = req.app.get('db');
        let results = [];
        console.log(userposts, search, id)
        if (userposts) {
            if (search) {
                console.log(search)
                results = await db.find_title({search});
            } else {
                results = await db.get_all_posts();
            }
        } else {
            if (search) {
                results = await db.get_all_other_by_title({search, id});
            } else {
                results = await db.get_all_other({id});
            }
        }

        return res.status(200).send(results);
    },
    getPost: async (req, res) => {
        const {id} = req.params;
        const db = req.app.get('db');
        console.log(id);
        const post = await db.get_post({id});

        return res.status(200).send(post[0]);
    },
    createPost: (req, res) => {
        const {id} = req.params;
        const {title, img, content} = req.body;
        const db = req.app.get('db');

        db.create_post({id, title, img, content})
        .then(response => res.sendStatus(200));
    },
    deletePost: async (req, res) => {
        const {id} = req.params;

        const db = req.app.get('db');

        const updatedList = db.delete_post({id});

        res.status(200).send(updatedList);
    }
}