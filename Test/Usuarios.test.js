const { expectCt } = require('helmet');
const {TestWatcher} = require('jest')
const {ObtenerUsuarios} = require('./Usuarios')

test('Devuelve informacion de usuarios',async()=>{
    let result= await ObtenerUsuarios();
    expect(result.status).toBe('success')
})