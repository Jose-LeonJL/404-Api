const Firebase = require('../DataBase/firestore');
const bcrypt = require('bcryptjs');
const {
    response
} = require('express');

// Controllador para la obtencion de los datos
const GetController = async (req, res) => {
    const Users = await Firebase.ReadVentas();
    res.json({
        status: 'success',
        code: 200,
        data: {
            sales: Users.docs.map(user => {
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
        const {
            Codigo,
            Fecha,
            Cliente,
            Empleado,
            IVS,
            Productos,
            Total
        } = req.body;
        const NewVenta = {
            Codigo,
            Fecha,
            Cliente,
            Empleado,
            IVS,
            Productos,
            Total
        }
        const Insercion = await Firebase.WriteVentas(NewVenta);
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
                    error: Insercion.message
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
        const collection = await Firebase.UpdateVentas(id, data)
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
        const id= req.params.id;
        const Response = await Firebase.DeleteVentas(id)
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