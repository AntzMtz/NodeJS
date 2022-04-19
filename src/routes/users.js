const express = require('express');
const router = express.Router();
const usr = require('../models/users');
const pastport = require('passport');
const {noAutenticado} = require('../helpers/auth');

router.get('/users/signin',noAutenticado, (req, res) => {
    res.render('users/signin');
});

router.post('/users/signin',noAutenticado, pastport.authenticate('local',{
    successRedirect: '/notes',
    failureRedirect: '/users/signin',
    failureFlash: true,  
    successFlash: true  
}));

router.get('/users/signup',noAutenticado, (req, res) => {
    res.render('users/signup');
});

router.post('/users/signup',noAutenticado, async (req, res) => {
    const { nombre, correo, password, password2 } = req.body;
    const error1 = [];
    //res.send('gh');
    
    if (!nombre) {
        error1.push({ text: 'Ingresa Usuario' })
    }
    if (!correo) {
        error1.push({ text: 'Ingresa Email' })
    }
    if (!password) {
        error1.push({ text: 'Ingresa Password' })
    }
    if (!password2) {
        error1.push({ text: 'Ingresa Confirmación de Password' })
    }
    if (password2!=password) {
        error1.push({ text: 'Password No Coincide' })
    }
    
    console.log("error1: "+ error1.length);

   // res.redirect('/users/signup');
    
    if (error1.length > 0) {
        
        res.render('users/signup',{
            error1,
            nombre,
            correo
        }) 
        
    }  else {
        //const _id = nombre;
        try{
            const user = new usr({ nombre,correo,password});
            user.password  = await user.encriptpass(password);
            await user.save();
            req.flash('exitoso_mensaje', "Se agrego de forma satisfactoria");
            res.redirect('/users/signin');
        
        }catch(e){
            
            if(e.code == "11000"){
                req.flash('fallido_mensaje', "Usuario Ya Existe Ingrese Otro Por Fvor");   
                error1.push({ text: 'Usuario Ya Existe Ingrese Otro Por Fvor' })
            }else{
                req.flash('fallido_mensaje', e);
                error1.push({ text: e })
                console.log(e);
            }
            res.render('users/signup', {
                error1,
                n