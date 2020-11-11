const bcrypt = require('bcryptjs');

//AWS
const AWS = require('aws-sdk'),
    {AWS_ACCESS_KEY_ID, AWS_SECRET_ACCESS_KEY} = process.env,
    imagemin = require('imagemin'),
    imageminMozjpeg = require('imagemin-mozjpeg');
AWS.config.update({
    accessKeyId: AWS_ACCESS_KEY_ID,
    secretAccessKey: AWS_SECRET_ACCESS_KEY,
    region: 'us-west-2'
});
const s3Bucket = new AWS.S3({params: {Bucket: 'hidden-gems-application'}});

const getImgBuffer = (base64)=>{
    const base64str = base64.replace(/^data:image\/\w+;base64,/,'');
    return Buffer.from(base64str,'base64');
}
const imageUpload = (path,buffer) =>{
    const data = {
        Key: path,
        Body: buffer,
        ContentEncoding: 'base64',
        ContentType: 'image/jpeg',
        ACL: 'public-read'
    };
    new Promise((resolve,reject)=>{
        s3Bucket.putObject(data, (err) => {
            if(err) {
                return reject(err);
            }else{
                return resolve('https:///hidden-gems-application.s3-us-west-2.amazonaws.com/' + path);
            }
        });
    });
}
const getImageUrl = async(type,base64Image) => {
    const buffer = getImgBuffer(base64Image);   
    return imageUpload(`${type}`, buffer);
}

module.exports = {
    register: async (req,res)=>{
        const {username,password} = req.body;
        if(!username || !password)
            return res.status(406).send('Please fill out all of the inputs.');
        
        const db = req.app.get('db'); //db
        let profile_pic = null;

        const foundUser = await db.check_user({username});
        if(foundUser[0])
            return res.status(400).send('Username already in use');

        console.log(req.file);
        //Image handling
        if(req.file){
            const currentTime = new Date().getTime();
            const url = `profile-pictures/${currentTime}.jpeg`;
            const buff = await imagemin.buffer(req.file.buffer, {
                plugins: [
                    imageminMozjpeg({quality: 75})
                ]
            });
            await getImageUrl(url, buff.toString('base64'));
            profile_pic = 'https:///hidden-gems-application.s3-us-west-2.amazonaws.com/'+url;
        }

        const salt = bcrypt.genSaltSync(10);
        const hash = bcrypt.hashSync(password,salt);

        const user = await db.register_user({username, hash, profile_pic});
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