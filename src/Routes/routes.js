const Routes = require('express').Router();
const Usuario = require('./Usuarios.route');
const Login = require('./Login.Route');
const Ventas = require('./Ventas.Route');
const Inventario = require('./Inventarios.Route');

//Ruta home
Routes.get('/',(req,res)=>{
    res.json({
        status:'success',
        code:200,
        msg:'Bienvenido a DVStudio'
    });
});

//Rutas Usuarios
Routes.get('/Usuarios', Usuario.GetUsers);
Routes.post('/Usuarios', Usuario.CreateUser);
Routes.put('/Usuarios', Usuario.UpdateUser);
Routes.delete('/Usuarios', Usuario.DeleteUser);

// Rutas Ventas
Routes.get('/Ventas', Ventas.GetSales);
Routes.post('/Ventas', Ventas.CreateSale);
Routes.put('/Ventas', Ventas.UpdateSale);
Routes.delete('/Ventas', Ventas.DeleteSale);

// Rutas Inventarios
Routes.get('/Inventario', Inventario.GetProducts);
Routes.post('/Inventario', Inventario.CreateProduct);
Routes.put('/Inventario', Inventario.UpdateProduct);
Routes.delete('/Inventario', Inventario.DeleteProduct);

module.exports = Routes;