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
    newPin: async (req,res)=>{
        if(!req.file)
            return res.status(406).send('You must upload an image');
        const {y,x,description,title} = req.body;
        if(!y || !x || !description || !title)
            return res.status(406).send('Missing a field');
        const author = req.session.user.id;

        //Image uploading
        const currentTime = new Date().getTime();
        const url = `uploads/${currentTime}.jpeg`;
        const buff = await imagemin.buffer(req.file.buffer, {
            plugins: [
                imageminMozjpeg({quality: 75})
            ]
        });
        await getImageUrl(url, buff.toString('base64'));
        img = 'https:///hidden-gems-application.s3-us-west-2.amazonaws.com/'+url;

        //upload to database
        const data = {lat: y,lng: x,img,description,title,author};
        const db = req.app.get('db');
        const pin = await db.new_pin(data);
        res.status(200).send(pin[0]);
    },
    getAll: async (req,res)=>{
        const db = req.app.get('db');
        const all = await db.get_all();
        res.status(200).send(all);
    },
    getSingle: async(req,res)=>{
        const id = req.params.id;
        const db = req.app.get('db');
        const pin = await db.get_single_pin({id});
        res.status(200).send(pin[0]);
    },
    getUserFavorite: async(req,res)=>{
        const id = req.params.id;
        const db = req.app.get('db');
        const favorites = await db.get_favorites({id});
        res.status(200).send(favorites);
    }
}