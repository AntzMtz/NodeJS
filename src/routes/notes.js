const express = require('express');
const router = express.Router();
const note =  require('../models/Note');
const {autenticar} = require('../helpers/auth');

router.get('/notes/add', autenticar , (req, res) => {
    res.render('notes/add-notes')
});

router.post('/notes/add', autenticar , async (req, res) => {
    const { titulo, descripcion } = req.body;
    const errors = [];
    if (!titulo) {
        errors.push({ text: 'Inserta Titulo' })
    }
    if (!descripcion) {
        errors.push({ text: 'Inserta Descripción' })
    }
    console.log(titulo);
    if (errors.length > 0) {
        res.render('notes/add-notes', {
            errors,
            titulo,
            descripcion
        });
    } else {
        const usuario = req.user.nombre;
        const notas = new note({titulo, descripcion,usuario});
        await notas.save();
        req.flash('exitoso_mensaje',"Se agrego de forma satisfactoria");
        res.redirect('/notes');
    }

});

router.get('/notes',autenticar, async (req, res) => {
    const NotasL = await note.find({usuario: req.user.nombre}).sort({fecha:'desc'});
    res.render('notes/notes', {NotasL})
});

router.get('/notes/edit/:id',autenticar, async (req, res)=>{
    const dato = req.params.id;
    const notes =  await note.find({"_id":dato})
    res.render('notes/ed-notes',{notes});
});

router.get('/notes/delete/:id',autenticar, async (req, res) => {
    const dato = req.params.id;
    try{
        
        await note.findByIdAndDelete({_id: dato});
        req.flash('exitoso_mensaje','Se Borro de forma correcta la tarea');
    }catch(e){
        console.log(e);
    }
    res.redirect('/notes');
    
});

router.post('/notes/edit/:id',autenticar, async (req, res) => {
    const { titulo, descripcion } = req.body;
    const dato = req.params.id;
    const errors = [];
    if (!titulo) {
        errors.push({ text: 'Inserta Titulo' })
    }
    if (!descripcion) {
        errors.push({ text: 'Inserta Descripción' })
    }
    try{
        await note.findOneAndUpdate({ _id: dato }, { $set: { titulo: titulo, descripcion: descripcion } })
        req.flash('exitoso_mensaje','Se Actualizo De Forma Correcta La Tarea');
    }catch(e){
        console.log(e);
    }
    res.redirect('/notes');

});
module.exports = router;