// peticion http a htps://api.dvstudio.dev
const https = require("axios").default;
const BaseURL = 'https://api.dvstudio.dev/Login';

//funcion creadora de login
async function CreateLogin(Correo, Contraseña){
    let data = {Correo, Contraseña};    //body de la request
    let response = await https({
        method:'POST',
        url:BaseURL,
        data:data,
        headers: {'Content-Type': 'application/json; charset=utf-8'}//opcion necesarioa para post,put,delete
    });
    return response.data;//se retorna direnctamente la data, porque ya es un objeto javascript

}


//Exportacion de los metodos Login
module.exports = {CreateLogin}