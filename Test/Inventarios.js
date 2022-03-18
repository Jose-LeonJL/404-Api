const https= require("axios").default;
const {CreateLogin}= require('./login')

//Funcion Creadora de Inventario
async function CreateInventario(Codigo,Nombre,Precio,Stock,Categoria,Marca){
    let data ={Codigo,Nombre,Precio,Stock,Categoria,Marca};
    let result = await CreateLogin('danielfunezflh@gmail.com', 'Password1');
    let response = await https({
        method:'POST',
        url:'https://api.dvstudio.dev/Inventario',
        data:data,
        headers:{'x-access-token':result.data.jwt}
    })
    return response.data;
}

//Funcion Get de Inventario
async function ObtenerInventario(){
    let result = await CreateLogin('danielfunezflh@gmail.com', 'Password1');
    let response = await https({
        method:'GET',
        url:'https://api.dvstudio.dev/Inventario',
        headers:{'Content-Type':'application/json; charset=utf-8','x-access-token':result.data.jwt}
    })
    return response.data;
}

async function ActualizarInventario(id,Codigo,Nombre,Precio,Stock,Categoria,Marca){
    let data ={id,data:{Codigo,Nombre,Precio,Stock,Categoria,Marca}};
    let result = await CreateLogin('danielfunezflh@gmail.com', 'Password1');
    let response = await https({
        method:'PUT',
        url:'https://api.dvstudio.dev/Inventario',
        data:data,
        headers:{'Content-Type':'application/json; charset=utf-8','x-access-token':result.data.jwt}
    })
    return response.data;
}

async function EliminarInventario(id){
    let result = await CreateLogin('danielfunezflh@gmail.com', 'Password1');
    let response = await https({
        method:'DELETE',
        url:`https://api.dvstudio.dev/Inventario/${id}`,
        headers:{'Content-Type':'application/json; charset=utf-8','x-access-token':result.data.jwt}
    });
    return response.data;

}


module.exports={CreateInventario,ObtenerInventario,ActualizarInventario,EliminarInventario}