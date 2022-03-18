const{TestWatcher}= require('jest')
const {CrearVentas,ObtenerVentas, EliminarVentas, ActualizarVentas}=require('./Ventas')


//Test de Get
test('Devuelve informacion de usuarios',async()=>{
    let result= await ObtenerVentas();
    expect(result.status).toBe('success')
})

//Test de Post
test('Devuelve Estado de enviado y Recibido ventas',async()=>{
    let result=await CrearVentas(1,"12-12-2021",{"Nombre":"Pepito el rico","Identidad":"0988-1908-9123","Telefono":"9011-1232"},
    {"Codigo":1,"Nombre":"Pepito Nando","Identidad":"0543-2023-30022","Telefono":"0890-3456","Nick":"Pepito","Tipo":"Admin"},
    12000,
   [{"id":"asdasd"},{"id":"asdasd"}],
    10000)
    expect(result.status).toBe('success')
})

//TEST DE PUT
test('Devuelve Estado de Enviado y Recibido Actualizado Ventas', async()=>{
    let result= await ActualizarVentas('HOA7bgZH4ADg3ieupAA4',1,"13-13-2013",{"Nombre":"Pepito el rico","Identidad":"0988-1908-9123","Telefono":"9011-1232"},
    {"Codigo":1,"Nombre":"Pepito Nando","Identidad":"0543-2023-30022","Telefono":"0890-3456","Nick":"Pepito","Tipo":"Admin"},
    12000,
   [{"id":"asdasd"},{"id":"asdasd"}],
    10000)
    expect(result.status).toBe('success')
})

//TEST DEL
test('Devuelve Valor eliminado Falso', async()=>{
    let result= await EliminarVentas('FNGYk8TFMOmxNaQl5sqT')
    expect(result.status).toBe('success')
})