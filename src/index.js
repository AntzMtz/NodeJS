const express = require('express');
const morgan = require('morgan');
const exphbs = require('express-handlebars');
const path = require('path');
const flash = require('connect-flash');
const session = require('express-session');
const msySqlstore = require('express-mysql-session');
const metoOver = require('method-override');
const passport = require('passport');
const hbs = require('hbs');
require('dotenv').config();


const app = express();
//require('./database');
require('./config/passport');

const mongoose = require('mongoose');
const { nextTick } = require('process');


//Configuraciones
app.set('port', process.env.PORT || 5000);


app.set('views', path.join(__dirname, 'views'));
app.engine('.hbs', exphbs.engine({
    defaultLayout: 'main',
    layoutsDir: path.join(app.get('views'), 'layouts'),
    partialsDir: path.join(app.get('views'), 'partials'),
    extname: '.hbs',
    runtimeOptions: {
        allowProtoPropertiesByDefault: true,
        allowProtoMethodsByDefault: true,
    }
}));
app.set('view engine', '.hbs');

app.use(express.urlencoded({ extended: true }));
app.use(metoOver('_method'));
app.use(session({
    secret: 'AntzMtz',
    resave: false,
    saveUninitialized: false
}));
app.use(passport.initialize());
app.use(passport.session());
app.use(flash());

//Variable Global
app.use((req,res)=>{
    res.locals.exitoso_mensaje = req.flash('exitoso_mensaje');
    res.locals.fallido_mensaje = req.flash('fallido_mensaje');
    res.locals.error = req.flash('error');
    res.locals.error1 = req.flash('error1');
    res.locals.usuarioGlo = req.user || null;
    req.next();
});

//rutas
app.use(require('./routes/index'));
app.use(require('./routes/users'));
app.use(require('./routes/notes'));

// Static Fields
app.use(express.static(path.join(__dirname, 'public')));

//Conexion
mongoose
    .connect(process.env.MONGODB_URI)
    .then(() => console.log("Conecto a BD"))
    .catch((error) => console.error(error));


//Start servidor
app.listen(app.get('port'), () => {
    console.log("El servidor corre en el puerto: " + app.get('port'));
    console.log(path.join(__dirname, 'public'));
})
