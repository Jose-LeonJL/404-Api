require('dotenv').config();
const Express = require('express');
const morgan = require('morgan');
const App = Express();

// Configuracion Express
App.use(morgan('dev'));
App.use(Express.json());

//Configuracion de Rutas
App.use(require('../Routes/routes'))

App.listen(process.env.Port,()=>{
    console.log('server en puerto ',process.env.Port)
});
