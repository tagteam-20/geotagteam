require('dotenv').config();
const express = require('express'),
    multer = require('multer'),
    upload = multer({}),
    massive = require('massive'),
    session = require('express-session'),
    {SERVER_PORT, CONNECTION_STRING, SESSION_SECRET} = process.env,
    app = express(),
    authCont = require('./controllers/auth');

app.use(express.json());

//Set up sessions -=-==--=-=-=-=-=-=-
app.use(session({
    resave: false,
    saveUninitialized: true,
    secret: SESSION_SECRET,
    cookie: {maxAge: 1000 * 60 * 60 * 24 * 365}
}));

//Endpoints =-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-

//Auth
app.post('/api/register', authCont.register); //Register
app.post('/api/login', authCont.login); //Login
app.get('/api/session', authCont.getSession); //Get session
app.get('/api/logout', authCont.logout); //Logout


//Connect to server
massive({
    connectionString: CONNECTION_STRING,
    ssl: {rejectUnauthorized: false}
}).then(db=>{
    app.set('db',db);
    console.log('DB Connected');
    app.listen(SERVER_PORT, console.log(`Server listening on port ${SERVER_PORT}`));
})