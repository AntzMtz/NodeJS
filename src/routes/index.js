const express =  require('express');
const router = express.Router();
const {noAutenticado} = require('../helpers/auth');
router.get('/',noAutenticado,(req,res)=>{
    res.render('index');
})

router.get('/about',noAutenticado,(req,res)=>{
    res.render('about');
})

module.exports = router;