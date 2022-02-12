//Conexion a la base de Datos en Firebase
require('dotenv').config()
const admin = require('firebase-admin');
const Account = require("./credentials.json");
const app = admin.initializeApp({
    credential: admin.credential.cert(Account)
});
const db = app.firestore();

//Funcion para escribir los Empleados
async function WriteUsuarios(CodigoUsuario = '', NombreCompletoUsuario = '', NumeroIdentidadUsuario = '', SueldoUsuario = 0, TelefonoUsuario = '', NombreUsuario = '', TipoUsuario = '', ContraseñaUsuario = '') {
    const Escribir = await db.collection('Empleados').add({
        CodigoUsuario: Data.CodigoUsuario,
        NombreCompletoUsuario: Data.NombreCompletoUsuario,
        NumeroIdentidadUsuario: Data.NNumeroIdentidadUsuario,
        SueldoUsuario: Data.SueldoUsuario,
        TelefonoUsuario: Data.TelefonoUsuario,
        NombreUsuario: Data.NombreUsuario,
        TipoUsuario: Data.TipoUsuario,
        ContraseñaUsuario: Data.TipoUsuario
    });
    if (Escribir.id) {
        return {
            success: true,
            id: Escribir.id
        };
    } else {
        return {
            success: false,
            id: null
        };
    }
}
async function WriteUsuarios(Data) {
    const Escribir = await db.collection('Empleados').add(Data);
    if (Escribir.id) {
        return {
            success: true,
            id: Escribir.id
        };
    } else {
        return {
            success: false,
            id: null
        };
    }
}
//Necesario
module.exports = {
    WriteUsuarios
}