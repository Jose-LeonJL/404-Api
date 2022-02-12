const Firebase = require('../DataBase/firestore');
const bcrypt = require('bcryptjs');
const {
    response
} = require('express');

// Controllador para la obtencion de los datos
const GetController = async (req, res) => {
    const Users = await Firebase.ReadUsuarios();
    res.json({
        status: 'success',
        code: 200,
        data: {
            users: Users.docs.map(user => {
                let Data = user.data()
                return {
                    Data,
                    id: user.id
                }
            })
        }
    });
}

const CreateController = async (req, res) => {
    try {
        console.log('body : ', req.body)
        const {
            Codigo,
            Nombre,
            Identidad,
            Sueldo,
            Telefono,
            Nick,
            Tipo,
            Contraseña
        } = req.body;
        const salt = await bcrypt.genSalt(10);
        const PassHash = await bcrypt.hash(Contraseña, salt);
        const NewUser = {
            'Codigo': Codigo,
            'Nombre': Nombre,
            'Identidad': Identidad,
            'Sueldo': Sueldo,
            'Telefono': Telefono,
            'Nick': Nick,
            'Tipo': Tipo,
            'Contraseña': PassHash
        }
        const Insercion = await Firebase.WriteUsuarios(NewUser);
        if (Insercion.success) {
            res.json({
                status: 'success',
                code: 200,
                data: {
                    id: Insercion.id
                }
            });
        } else {
            res.json({
                status: 'error',
                code: 400,
                data: {
                    error: 'undefined'
                }
            });
        }
    } catch (error) {
        console.error(error)
        res.json({
            status: 'error',
            code: 400,
            data: {
                error: error.toString()
            }
        });
    }
}

const UpdateController = async (req, res) => {
    try {
        const {
            id,
            data
        } = req.body;
        console.log(id)
        const collection = await Firebase.UpdateUsuario(id, data)
        if (collection.success) {
            res.json({
                status: 'success',
                code: 200,
                data: {
                    id: collection.id
                }
            });
        } else {
            res.json({
                status: 'error',
                code: 400,
                data: {
                    error: 'can not update'
                }
            });
        }

    } catch (error) {
        res.json({
            status: 'error',
            code: 400,
            data: {
                error: error.toString()
            }
        });
    }
}

const DeleteController = async (req, res) => {
    try {
        const {
            id
        } = req.body;
        const Response = await Firebase.DeleteUsuario(id)
        if (Response.success) {
            res.json({
                status: 'success',
                code: 200,
                data: {
                    id: Response.id
                }
            });
        } else {
            res.json({
                status: 'error',
                code: 400,
                data: {
                    error: 'can not delete'
                }
            });
        }
    } catch (error) {
        res.json({
            status: 'error',
            code: 400,
            data: {
                error: error.toString()
            }
        });
    }
}

module.exports = {
    CreateController,
    GetController,
    UpdateController,
    DeleteController
}