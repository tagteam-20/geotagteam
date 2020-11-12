require('dotenv').config();
const express = require('express'),
    multer = require('multer'),
    upload = multer({}),
    massive = require('massive'),
    session = require('express-session'),
    {SERVER_PORT, CONNECTION_STRING, SESSION_SECRET} = process.env,
    app = express(),
    authCont = require('./controllers/auth'),
    authMiddle = require('./middleware/auth'),
    pinCont = require('./controllers/pins'),
    userCont = require('./controllers/user'),
    path = require('path');

app.use(express.json());

//Set up sessions -=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=
app.use(session({
    resave: false,
    saveUninitialized: true,
    secret: SESSION_SECRET,
    cookie: {maxAge: 1000 * 60 * 60 * 24 * 365}
}));

//Endpoints -=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=

//Auth
app.post('/api/register', upload.single('image'), authCont.register); //Register
app.post('/api/login', authCont.login); //Login
app.get('/api/session', authCont.getSession); //Get session
app.get('/api/logout', authCont.logout); //Logout

//Pins
app.post('/api/pin', upload.single('image'), authMiddle.loggedIn, pinCont.newPin); //Post a new pin
app.get('/api/pins', pinCont.getAll); //Get all pins
app.get('/api/pin/:id', pinCont.getSingle); //Get a single pin
app.get('/api/favorites/:id', pinCont.getUserFavorite); //Get the favorite pins from a user
app.post('/api/favorite', authMiddle.loggedIn, pinCont.favorite); //Favorite or unfavorite a pin

//User
app.get('/api/user/:id', userCont.getUser); //Get user data

//Send react app -=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=
app.use(express.static(__dirname +'/../build'));
app.get('*', (req,res)=>{
    res.sendFile(path.join(__dirname,'../build/index.html'));
});
//Connect to server -=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=
massive({
    connectionString: CONNECTION_STRING,
    ssl: {rejectUnauthorized: false}
}).then(db=>{
    app.set('db',db);
    console.log('DB Connected');
    app.listen(SERVER_PORT, console.log(`Server listening on port ${SERVER_PORT}`));
})