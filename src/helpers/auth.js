const helpers = {};

helpers.autenticar = (req, res, next )=>{
    if(req.isAuthenticated()){
        return next();
    }else{
        req.flash('error', 'No estas autorizado');
        res.redirect('/users/signin');
    }
};

helpers.noAutenticado = (req, res, next )=>{
    if(!req.isAuthenticated()){
        return next();
    }else{
        req.flash('error', 'Debes de salir de la aplicación');
        res.redirect('/notes');
    }
};

module.exports = helpers;