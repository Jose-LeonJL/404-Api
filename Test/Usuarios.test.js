const {Chance}= require('chance')
const {TestWatcher} = require('jest')
const {ObtenerUsuarios,CrearUsuarios} = require('./Usuarios')

const email=new Chance();

test('Devuelve informacion de usuarios',async()=>{
    let result= await ObtenerUsuarios();
    expect(result.status).toBe('success')
})

test('Devuelve Estado de Enviado y Recibido', async()=>{
    let result= await CrearUsuarios(email.email(),1,'Jose David','0601-2000-03450',50000,'9940-1215','Jose','Admin','Password1')
    expect(result.status).toBe("success")
})