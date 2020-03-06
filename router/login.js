const express = require('express');
const router = express.Router();

router.get('/', (req,res,next)=>{
    res.sendFile(require.main.path + '/views/login.html');
})

router.post('/', (req,res,next)=>{
    var users = req.app.get('USERS');
    if(!req.body.username || !req.body.password)
    {
        res.send('Invalid details !');
    }
    else{
        var auth = users.filter((user)=>{
            if(user.username === req.body.username && user.password === req.body.password)
            {
                return user;
            }
        }); 
        if(auth[0]){
            req.session.user = auth[0];
            res.redirect('./protected');             
        }
        else{
            res.send('Wrong username or password !');
        }
    }
})

module.exports = router;