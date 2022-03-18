const Firebase = require('../DataBase/firestore');
const bcrypt = require('bcryptjs');
const {
    response
} = require('express');

// Controllador para la obtencion de los datos
const GetController = async (req, res) => {
    const Users = await Firebase.ReadInventario();
    res.json({
        status: 'success',
        code: 200,
        data: {
            products: Users.docs.map(user => {
                let Data = user.data();
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
        const {
            Codigo,
            Nombre,
            Precio,
            Stock,
            Categoria,
            Marca
        } = req.body;
        const NewUser = {
            Codigo,
            Nombre,
            Precio,
            Stock,
            Categoria,
            Marca
        }
        const Insercion = await Firebase.WriteInventario(NewUser);
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
        const collection = await Firebase.UpdateInventario(id, data)
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
        const id = req.params.id;
        const Response = await Firebase.DeleteInventario(id)
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
                    error: Response.message
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