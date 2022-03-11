const https = require("axios").default;
const BaseURL = 'https://api.dvstudio.dev/';

//funcion que regresa los datos de bienvenida
async function GetBienvenida(){
    let response = await https({
        method:'GET',//el recomienda como escribir el metodo usa ctrl + space
        url:BaseURL,
    });
    return response.data;//se retorna direnctamente la data, porque ya es un objeto javascript

}

module.exports = {GetBienvenida}