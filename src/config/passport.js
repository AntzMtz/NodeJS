const pass = require('passport');
const passlocal = require('passport-local').Strategy;
const usr = require('../models/users');

pass.use(new passlocal({
    usernameField: 'nombre'
}, async (nombre, password, done)=>{
    //console.log(nombre + ' ' +password);
    const usuario = await usr.findOne({nombre: nombre});
    console.log(nombre);
    if(!usuario){
        
        return done(null,false,{message: 'No existe el usuario'});
    }else{
        const match = await usuario.desencpassword(password);
        if(match){
            return done(null,usuario,{message: "usuarioGlo"});
        }else{
            return done(null,false,{message: 'Password incorrecto'});
        }
    }
}));

pass.serializeUser((user,done) => {
    done(null, user.id);
});

pass.deserializeUser((id,done) => {
    usr.findById(id,(err,user)=>{
        done(err, user);
    });
});
