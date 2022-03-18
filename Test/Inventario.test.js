const {TestWatcher}=require('jest')
const {CreateInventario,ObtenerInventario, ActualizarInventario, EliminarInventario}=require('./Inventarios')

//TEST DE POST
test('Devuelve Estado de Enviado y Recibido', async()=>{
    let result= await CreateInventario('1','Jabon',50,15,'Higiene','Zote');
    expect(result.status).toBe('success')
})


//TEST DE GET
test('Devuelve informacion de usuarios',async()=>{
    let result= await ObtenerInventario();
    expect(result.status).toBe('success')
})

//TEST DE PUT
test('Devuelve Estado de Enviado y Recibido Actualizado', async()=>{
    let result= await ActualizarInventario('DoAUEZmsv4iXd8xhqAqT','1','Jabon',50,15,'Higiene','Zote');
    expect(result.status).toBe('success')
})

//TEST DEL
test('Devuelve Valor eliminado Falso', async()=>{
    let result= await EliminarInventario('GEmzbrcbBZJQcOIpgVtP')
    expect(result.status).toBe('success')
})
