module.exports = {
    getUser: async(req,res)=>{
        const id = req.params.id;
        const db = req.app.get('db');
        const userData = await db.get_user_data({id});
        return res.status(200).send(userData[0])
    }
}