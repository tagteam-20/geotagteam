const bcrypt = require('bcryptjs');

module.exports = {
    register: async (req,res)=>{
        const {username,password} = req.body;
        if(!username || !password)
            return res.status(406).send('Please fill out all of the inputs.');
        
        const db = req.app.get('db'); //db

        const foundUser = await db.check_user({username});
        if(foundUser[0])
            return res.status(400).send('Username already in use');

        const salt = bcrypt.genSaltSync(10);
        const hash = bcrypt.hashSync(password,salt);

        const user = await db.register_user({username, hash});
        delete user[0].password;
        req.session.user = user[0];
        return res.status(200).send(req.session.user);
    },
    login: async (req,res)=>{
        const {password, username} = req.body;
        if(!password || !username)
            return res.status(406).send('Username or password is empty');
        
        const db = req.app.get('db');
        const foundUser = await db.check_user({username});
        if(!foundUser[0])
            return res.status(401).send('Username or password incorrect');
        
        const auth = bcrypt.compareSync(password, foundUser[0].password);
        if(!auth)
            return res.status(401).send('Username or password incorrect');
        
        delete foundUser[0].password;
        req.session.user = foundUser[0];
        return res.status(200).send(req.session.user);
    },
    getSession: async (req,res)=>{
        return res.status(200).send(req.session.user);
    },
    logout: async (req,res)=>{
        req.session.destroy();
        res.sendStatus(200);
    }
}