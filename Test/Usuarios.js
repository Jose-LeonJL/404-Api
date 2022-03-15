const https = require("axios").default;
const {CreateLogin}= require('./login')





//Funcion get de los Usuarios
async function ObtenerUsuarios(){
    let result = await CreateLogin('danielfunezflh@gmail.com', 'Password1');
    let response = await https({
        method:'GET',
        url:'https://api.dvstudio.dev/Usuarios',
        headers:{'x-access-token':result.data.jwt}
    })
    return response.data;
}

//Funcion Post de los Usuarios
async function CrearUsuarios(Correo,Codigo,Nombre,Identidad,Sueldo,Telefono,Nick,Tipo,Contraseña){
    let data={Correo,Codigo,Nombre,Identidad,Sueldo,Telefono,Nick,Tipo,Contraseña};
    let result = await CreateLogin('danielfunezflh@gmail.com', 'Password1');
    let response = await https({
        method:'POST',
        url:'https://api.dvstudio.dev/Usuarios',
        data:data,
        headers:{'Content-Type':'application/json; charset=utf-8','x-access-token':result.data.jwt}
    });
    return response.data;

}
module.exports ={ObtenerUsuarios,CrearUsuarios}