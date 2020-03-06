const express = require('express');
const router = express.Router();

router.get('/',(req,res,next)=>{
    res.sendFile(require.main.path + '/views/protected_page.html');
})

module.exports = router;