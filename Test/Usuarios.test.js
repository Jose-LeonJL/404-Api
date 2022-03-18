const {Chance}= require('chance')
const {TestWatcher} = require('jest')
const {ObtenerUsuarios,CrearUsuarios,ActualizarUsuarios,EliminarUsuarios} = require('./Usuarios')

const email=new Chance();

//TEST DE GET
test('Devuelve informacion de usuarios',async()=>{
    let result= await ObtenerUsuarios();
    expect(result.status).toBe('success')
})

//TES DE POST
test('Devuelve Estado de Enviado y Recibido', async()=>{
    let result= await CrearUsuarios(email.email(),1,'Jose David','0601-2000-03450',50000,'9940-1215','Jose','Admin','Password1')
    expect(result.status).toBe('success')
})

//TEST DE PUT
 test('Devuelve Estado de Enviado y Recibido Actualizado', async()=>{
    let result= await ActualizarUsuarios('tinacTV73aW7iM2QX1Pb',email.email(),16,'Jose David','0601-2000-03450',50000,'9940-1215','Jose','Admin','Password1')
    expect(result.status).toBe('success')
})

//TEST DEL
test('Devuelve Valor eliminado Falso', async()=>{
    let result= await EliminarUsuarios('tinacTV73aW7iM2QX1Pb')
    expect(result.status).toBe('success')
})

