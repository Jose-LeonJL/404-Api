const { TestWatcher } = require('jest')
const {suma,CreateLogin} = require('./Login')


test('Devuelve una suma de 2+2',()=> {
   
    expect(suma(2,2)).toBe(4);
})

test('Devuelve un token',()=>{
    console.log(CreateLogin('danielfunezflh@gmail.com','Password1'));
    expect(CreateLogin('danielfunezflh@gmail.com','Password1')).toBe(undefined)
})