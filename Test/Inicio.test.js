const {GetBienvenida} = require('./inicio');

//test crear login con un usuario correcto
test('Test de la ruta inicial, Bienvenida', async () => {
    let result = await GetBienvenida();
    expect(result.status).toBe("success")
})