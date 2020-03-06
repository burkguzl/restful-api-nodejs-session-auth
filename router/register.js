const express = require('express');
const router = express.Router();

router.get('/', (req,res,next)=>{
    res.sendFile(require.main.path + '/views/register.html');
})

router.post('/', (req,res,next)=>{
    var users = req.app.get('USERS');
    if(!req.body.username || !req.body.password)
    {
        res.sendStatus(400).json({message:'Invalid details!', status:'400'});
    }
    else{
        var isExist = users.filter((user)=>{
            if(user.username === req.body.username)
            {
                return user;
            }
        })
        if(isExist[0])
        {
            res.send('User already exist !')
        }
        else{
            var newUser = {
                username : req.body.username,
                password : req.body.password
            }
            users.push(newUser);     
            res.redirect('./login');    
        }
    }
});

module.exports = router;