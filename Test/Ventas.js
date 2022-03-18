const https = require("axios").default;
const {CreateLogin}= require('./login')


//Funcion Get de las Ventas
async function ObtenerVentas(){
    let result = await CreateLogin('danielfunezflh@gmail.com', 'Password1');
    let response = await https({
        method:'GET',
        url:'https://api.dvstudio.dev/Ventas',
        headers:{'x-access-token':result.data.jwt}
    })
    return response.data;
}

//Funcion Post de las ventas
async function CrearVentas(Codigo,Fecha,Cliente, Empleado,IVS,Productos,Total){
    let data={Codigo,Fecha,Cliente,
    Empleado,IVS,
    Productos,
    Total};
    let result = await CreateLogin('danielfunezflh@gmail.com', 'Password1');
    let response = await https({
        method:'POST',
        url:'https://api.dvstudio.dev/Ventas',
        data:data,
        headers:{'Content-Type':'application/json; charset=utf-8','x-access-token':result.data.jwt}
    })
    return response.data;
}

//Funcion Put De los Usuarios
async function ActualizarVentas(id,Codigo,Fecha,Cliente, Empleado,IVS,Productos,Total){
    let data={id,data:{Codigo,Fecha,Cliente, Empleado,IVS,Productos,Total}};
    let result = await CreateLogin('danielfunezflh@gmail.com', 'Password1');
    let response = await https({
        method:'PUT',
        url:'https://api.dvstudio.dev/Ventas',
        data:data,
        headers:{'Content-Type':'application/json; charset=utf-8','x-access-token':result.data.jwt}
    });
    return response.data;

}

//Funcion Del Eliminar Usuarios
async function EliminarVentas(id){
    let result = await CreateLogin('danielfunezflh@gmail.com', 'Password1');
    let response = await https({
        method:'DELETE',
        url:`https://api.dvstudio.dev/Ventas/${id}`,
        headers:{'Content-Type':'application/json; charset=utf-8','x-access-token':result.data.jwt}
    });
    return response.data;

}


module.exports={ObtenerVentas,CrearVentas,ActualizarVentas,EliminarVentas}