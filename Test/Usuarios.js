const https = require("axios").default;
const { token } = require("morgan");
const {CreateLogin}= require('./login')

let Token;



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
module.exports ={ObtenerUsuarios}