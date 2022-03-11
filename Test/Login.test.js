const {TestWatcher} = require('jest')
const {CreateLogin} = require('./Login')

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