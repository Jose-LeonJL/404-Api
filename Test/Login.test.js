const {TestWatcher} = require('jest')
const {CreateLogin,RecuperarLogin, UpdateContraseña} = require('./Login')


//test crear login con un usuario correcto
test('Usando un usuario valido devuelve un estado success', async () => {
    let result = await CreateLogin('danielfunezflh@gmail.com', 'Password1');
    expect(result.status).toBe("success")
})

//test crear login con un usuario incorrecto
test('Devuelve un token', async () => {
    let result = await CreateLogin('danielfunezflhs@gmail.com', 'Password1');
    expect(result.status).toBe("error")
})
let Id;

//test verificar usuario correcto
test('Usando un usuario valido devuelve un correo de verificacion', async()=>{
    let result = await RecuperarLogin('danielfunezflh@gmail.com');
    expect(result.status).toBe("Success")
    Id=result.data.id;

})


//test verificar usuario correcto
test('Usando un usuario invalido devuelve un correo de verificacion', async()=>{
    let result = await RecuperarLogin('danielfunezflhs@gmail.com');
    expect(result.status).toBe("error")
})

//test de cambio de contraseña success
test('Verificacion de un cambio de contraseña',async()=>{
    let result=await UpdateContraseña(Id,'danielfunezflh@gmail.com','Password1')
    expect(result.status).toBe("success") 
})

