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
//funcion Post de usuario
async function RecuperarLogin(Correo){
    let data = {Correo};
    let response = await https({
       method:'POST',
       url:'https://api.dvstudio.dev/Login/Recovery',
       data:data,
       headers:{'Content-Type': 'application/json; charset=utf-8'} 
    });
    return response.data;
}

//funcion Update Contraseña
async function UpdateContraseña(id,correo,contraseña){
    let data={id,correo,contraseña};
    let response = await https({
        method:'PUT',
        url:'https://api.dvstudio.dev/Login/Recovery',
        data:data,
        headers:{'Content-Type': 'application/json; charset=utf-8'} 
    });
    return response.data
}

//Funcion get Validar Codigo Recuperacion


//Exportacion de los metodos Login
module.exports = {CreateLogin,RecuperarLogin,UpdateContraseña}