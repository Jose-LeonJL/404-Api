const Routes = require('express').Router();
const Usuario = require('./Usuarios.route');
const Login = require('./Login.Route');
const LoginRecovery = require('./Login.Route.Recovery');
const Ventas = require('./Ventas.Route');
const Inventario = require('./Inventarios.Route');
const {
    VerifyToken
} = require('../Middleware/Auth.Token')

//Ruta home
Routes.get('/', (req, res) => {
    res.json({
        status: 'success',
        code: 200,
        msg: 'Bienvenido a DVStudio'
    });
});

//Rutas Usuarios
Routes.get('/Usuarios', VerifyToken, Usuario.GetUsers);
Routes.post('/Usuarios', VerifyToken, Usuario.CreateUser);
Routes.put('/Usuarios', VerifyToken, Usuario.UpdateUser);
Routes.delete('/Usuarios', VerifyToken, Usuario.DeleteUser);

// Rutas Ventas
Routes.get('/Ventas', VerifyToken, Ventas.GetSales);
Routes.post('/Ventas', VerifyToken, Ventas.CreateSale);
Routes.put('/Ventas', VerifyToken, Ventas.UpdateSale);
Routes.delete('/Ventas', VerifyToken, Ventas.DeleteSale);

// Rutas Inventarios
Routes.get('/Inventario', VerifyToken, Inventario.GetProducts);
Routes.post('/Inventario', VerifyToken, Inventario.CreateProduct);
Routes.put('/Inventario', VerifyToken, Inventario.UpdateProduct);
Routes.delete('/Inventario/:id', VerifyToken, Inventario.DeleteProduct);

//Rutas Login
Routes.post('/Login', Login.CreateLogin);
Routes.post('/Login/Recovery', LoginRecovery.CreateLoginRecovery);
Routes.get('/Login/Recovery', LoginRecovery.GetLoginRecovery);
Routes.put('/Login/Recovery', LoginRecovery.UpdateLoginRecovery);

module.exports = Routes;