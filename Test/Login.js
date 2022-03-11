// peticion http a htps://api.dvstudio.dev
const assert = require("assert");
const { response, json } = require("express");
const { JsonWebTokenError } = require("jsonwebtoken");
const https = require("request");


 function CreateLogin(Correo,Contraseña){
   let data={Correo,Contraseña};
    let resultado=null;
    https({
       url:'https://api.dvstudio.dev/Login',
       method:'POST',
       json:true,
       body:data
   },function(error,response,body){
    if(error){
        return null;
    }
    //console.log(response.body);
        resultado= response.body;
   });
   console.log(response.body);
   return JSON.parse(resultado);
}
async function xd(Correo, Contraseña){
   let data={Correo,Contraseña};
   let resultado=null;
    await https({
        url:'https://api.dvstudio.dev/Login',
        method:'POST',
        json:true,
        body:data
    },function(error,response,body){
     if(error){
         return null;
     }
     //console.log(response.body);
         resultado= response.body;
    });
    return resultado;
}
// console.log(CreateLogin('danielfunezflh@gmail.com','Password1'));
xd('danielfunezflh@gmail.com','Password1')
.then((res)=>{
    console.log(res)
})
.catch()
console.log();
module.exports={CreateLogin};












const suma = (num1=0, num2=0)=>{
    return (num1 + num2);
}

const testsuma =()=>{
    if(suma(2,2) == 4){
        console.log("✅")
    }else{
        console.log("❌")
    }
}

testsuma();



module.exports={suma};