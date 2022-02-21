//Conexion a la base de Datos en Firebase
require('dotenv').config()
const admin = require('firebase-admin');
const Account = require("./Credentials.json");
const app = admin.initializeApp({
    credential: admin.credential.cert(Account)
});
const bcrypt = require('bcryptjs');
const db = app.firestore();

//EMPLEADOS
//Funcion para escribir los Empleados
async function WriteUsuarios(CodigoUsuario = '', NombreCompletoUsuario = '', NumeroIdentidadUsuario = '', SueldoUsuario = 0, TelefonoUsuario = '', NombreUsuario = '', TipoUsuario = '', ContraseñaUsuario = '') {
    const Escribir = await db.collection('Usuarios').add({
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
            id: Escribir.id,
            message: 'Exito!'
        };
    } else {
        return {
            success: false,
            id: null,
            message: 'Can not write'
        };
    }
}
async function WriteUsuarios(Data) {
    const Check = await db.collection('Usuarios').where('Correo', '==', Data.Correo).get();
    if (Check.docs.length) return {
        success: false,
        id: null,
        message: 'El usuario ya existe'
    };
    const Escribir = await db.collection('Usuarios').add(Data);
    if (Escribir.id) {
        return {
            success: true,
            id: Escribir.id,
            message: 'Exito!'
        };
    } else {
        return {
            success: false,
            id: null,
            message: 'Can not write'
        };
    }
}
async function ReadUsuarios() {
    return await db.collection('Usuarios').get();
}
const GetIdUsuario = async (Correo='') => {
    try {
        const collection = await db.collection('Usuarios').where('Correo','==',Correo).get();
        if(!collection.docs.length) return {
            success: false,
            id: null,
            message:'sin ususarios'
        }
        return {
            success: true,
            id: collection.docs[0].id,
            data:collection.docs[0].data()
        };
    } catch (error) {
        return {
            success: false,
            id: null,
            message:error.toString()
        };
    }
}
async function UpdateUsuario(id = '', data) {
    try {
        const collection = await db.collection('Usuarios').doc(id);
        const Res = await collection.update(data);
        return {
            success: true,
            id: id
        };
    } catch (error) {
        return {
            success: false,
            id: null
        };
    }

}
async function DeleteUsuario(id = '', data) {
    try {
        const collection = await db.collection('Usuarios').doc(id).get();
        if (collection.exists) {

            const Res = await collection.ref.update(data);
            return {
                success: true,
                id: id
            };
        } else {
            return {
                success: false,
                id: id,
                message: 'no existe'
            };
        }
    } catch (error) {
        return {
            success: false,
            id: null,
            message: error.toString()
        };
    }

}

//------------------------------------------------------------------------------------------------------------------------------------------------------------------
async function WriteVentas(Data) {
    // const Check = await db.collection('Ventas').where('Correo','==',Data.Correo).get();
    // if (Check.docs.length) return {success:false, id:null, message:'El usuario ya existe'};
    const Escribir = await db.collection('Ventas').add(Data);
    if (Escribir.id) {
        return {
            success: true,
            id: Escribir.id,
            message: 'Exito'
        };
    } else {
        return {
            success: false,
            id: null,
            message: 'Can not write'
        };
    }
}
async function ReadVentas() {
    return await db.collection('Ventas').get();
}
async function UpdateVentas(id = '', data) {
    try {
        const collection = await db.collection('Ventas').doc(id).get();
        if (!collection.exists) return {
            success: false,
            id: null,
            message: 'El registro no existe'
        }
        const Res = await collection.ref.update(data);
        return {
            success: true,
            id: id,
            message: 'Exito'
        };
    } catch (error) {
        return {
            success: false,
            id: null,
            message: error.toString()
        };
    }

}
async function DeleteVentas(id = '', data) {
    try {
        const collection = await db.collection('Ventas').doc(id).get();
        if (collection.exists) {

            const Res = await collection.ref.update(data);
            return {
                success: true,
                id: id
            };
        } else {
            return {
                success: false,
                id: id,
                message: 'no existe'
            };
        }
    } catch (error) {
        return {
            success: false,
            id: null,
            message: error.toString()
        };
    }

}

//------------------------------------------------------------------------------------------------------------------------------------------------------------------
async function WriteInventario(Data) {
    const Escribir = await db.collection('Inventario').add(Data);
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
async function ReadInventario() {
    return await db.collection('Inventario').get();
}
async function UpdateInventario(id = '', data) {
    try {
        const collection = await db.collection('Inventario').doc(id);
        const Res = await collection.update(data);
        return {
            success: true,
            id: id
        };
    } catch (error) {
        return {
            success: false,
            id: null
        };
    }

}
async function DeleteInventario(id = '', data) {
    try {
        const collection = await db.collection('Inventario').doc(id).get();
        if (collection.exists) {

            const Res = await collection.ref.update(data.data);
            return {
                success: true,
                id: id,
                message: 'Exito'
            };
        } else {
            return {
                success: false,
                id: id,
                message: 'El registro no existe'
            };
        }
    } catch (error) {
        return {
            success: false,
            id: null,
            message: error.toString()
        };
    }

}

// Login
// --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
const Login = async (Data) => {
    let Pass = false;
    let User = false;
    try {
        const collection = await db.collection('Usuarios');
        const Busqueda = await collection.where('Correo', '==', Data.Correo).get();

        if (Busqueda.docs.length > 0) {
            User = true;
            Pass = await bcrypt.compare(Data.Contraseña, Busqueda.docs[0].data().Contraseña);
        }
        let Tipo = Busqueda.docs[0].data().Tipo;
        return {
            success: true,
            data: {
                User,
                Pass,
                Tipo
            }
        }
    } catch (error) {
        return {
            success: false,
            data: {
                User,
                Pass
            }
        };
    }
}
const CodeWrite = async (Data) => {
    const collections = await db.collection('CodeVerification').add(Data)
    if (collections.id) {
        return {
            success: true,
            id: collections.id
        };
    } else {
        return {
            success: false,
            id: null
        };
    }
}
const CodeCheck = async (Data) => {
    const collections = await db.collection('CodeVerification').where('Code', '==', Data.code).where('Correo', '==', Data.correo).get();
    if (collections.docs.length > 0) {
        return {
            success: true,
            id: collections.docs[0].id
        };
    } else {
        return {
            success: false,
            id: null
        };
    }
}
const CodeDelte = async (id = '') => {
    try {
        const collection = await db.collection('CodeVerification').doc(id).get();
        if (collection.exists) {

            const Res = await collection.ref.delete();
            return {
                success: true,
                id: id,
                message: 'Exito'
            };
        } else {
            return {
                success: false,
                id: id,
                message: 'El registro no existe'
            };
        }
    } catch (error) {
        return {
            success: false,
            id: null,
            message: error.toString()
        };
    }
}

//Necesario
module.exports = {
    WriteUsuarios,
    ReadUsuarios,
    UpdateUsuario,
    DeleteUsuario,
    WriteVentas,
    ReadVentas,
    UpdateVentas,
    DeleteVentas,
    WriteInventario,
    ReadInventario,
    UpdateInventario,
    DeleteInventario,
    Login,
    CodeCheck,
    CodeWrite,
    CodeDelte,
    GetIdUsuario
}