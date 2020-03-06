const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const session = require('express-session');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:false}));
app.use(session({secret: 'secret', 
                 saveUninitialized: true,
                 resave: true}));

//Routers
const loginRouter = require('./router/login');
const registerRouter = require('./router/register');
const protectedRouter = require('./router/protected');

//Users object
var users = [];
var testUser ={
    username:'asd',
    password:'123'
}
users.push(testUser);

//Global object
app.set('USERS',users);

//Routers
app.use('/login', loginRouter);
app.use('/register', registerRouter);
app.use('/protected',checkSignIn, protectedRouter);
app.use('/logout',(req,res,next)=>{
    req.session.destroy();
    res.redirect('./login');
})

//Authentication middleware
function checkSignIn (req,res,next) {
    if(req.session.user)
     {
         next();
     }
     else{   
         var err = new Error('Not logged in !');
         next(err);
     }
}

//Error handler
app.use('/',(err,req,res,next)=>{
    res.send(err.message);
})

app.listen(8081);