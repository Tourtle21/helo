const bcrypt = require('bcryptjs');

module.exports = {
    createUser: async (req, res) => {
        const db = req.app.get('db')
        const {username, password} = req.body
        const matchingUser = await db.check_username({username});
        if(matchingUser[0]) return res.status(400).send('Email already being used')
        const salt = bcrypt.genSaltSync(10);
        const hash = bcrypt.hashSync(password, salt);

        const newUser = await db.create_user({username, hash});
        return res.status(200).send(newUser[0]);
    },
    loginUser: async (req, res) => {
        const db = req.app.get('db');
        const {username, password} = req.body;

        const matchingUser = await db.check_username({username});
        if (!matchingUser[0]) return res.status(400).send('Username not found');

        const authentication = bcrypt.compareSync(password, matchingUser[0].password);
        if (!authentication) {
            return res.status(401).send('Password is incorrect');
        }

        delete matchingUser[0].password;
        res.status(202).send(matchingUser[0]);
    }
}