const bcrypt = require('bcryptjs');

module.exports = {
    register: async(req, res) => {
        const { firstName, lastName, email, password, address1 , address2, city, state, zipCode } = req.body;
        const db = req.app.get('db');

        const [foundUser] = await db.users.check_user({email})
        if(foundUser){
            return res.status(401).send('Email is already in use')
        }

        let salt = bcrypt.genSaltSync(10);
        const hash = bcrypt.hashSync(password, salt);

        const [newUser] = await db.users.register_user({firstName,lastName, email, hash, address1, address2, city, state, zipCode});

        req.session.user = newUser;
        res.status(200).send(req.session.user);
    },
    login: async(req, res) => {
        const { email, password} = req.body;
        const db = req.app.get('db');

        const [foundUser] = await db.users.check_user({email})
        if(!foundUser){
            return res.status(401).send(alert('Account not found.Try a different email or register'))
        }

        const authenticated = bcrypt.compareSync(password, foundUser.password);
        if(!authenticated){
            res.status(403).send(alert('Incorrect password'))
        }
        delete foundUser.password;
        req.session.user = foundUser
        res.status(202).send(req.session.user)
    },
    logout: async(req, res) => {
        req.session.destroy()
        res.sendStatus(200)
    }
}