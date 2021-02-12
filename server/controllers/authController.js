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
        // console.log(newUser)
        await db.bag.add_bag({user_id:newUser.user_id})
        req.session.user = newUser;
        res.status(200).send(req.session.user);
    },
    login: async(req, res) => {
        const { email, password} = req.body;
        const db = req.app.get('db');

        const [foundUser] = await db.users.check_user({email})
        if(!foundUser){
            return res.status(401).send('Account not found.Try a different email or register')
        }

        const authenticated = bcrypt.compareSync(password, foundUser.password);
        if(!authenticated){
            res.status(403).send('Incorrect password')
        }
        delete foundUser.password;
        req.session.user = foundUser
        // console.log(req.session.user)
        res.status(202).send(req.session.user)
    },
    logout: async(req, res) => {
        req.session.destroy()
        res.sendStatus(200)
    },
    getUser:(req, res) => {
        if(!req.session.user){
            return res.status(403).send('User not found')
        }
        res.status(200).send(req.session.user)
    }
    
}