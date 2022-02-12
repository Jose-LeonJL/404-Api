const Firebase = require('../DataBase/firestore');
const encrypt = require('bcryptjs');

// Controllador para la obtencion de los datos
const GetController = async (req, res) => {
    res.json({
        data: 'data user'
    })
}

const CreateController = async (req, res) => {
    try {
        const {
            Codigo,
            Nombre,
            Identidad,
            Sueldo,
            Telefono,
            Nick,
            Tipo,
            Contraseña
        } = req.body
        const NewUser = {
            'Codigo': Codigo,
            'Nombre': Nombre,
            'Identidad': Identidad,
            'Sueldo': Sueldo,
            'Telefono': Telefono,
            'Nick': Nick,
            'Tipo': Tipo,
            'Contraseña': async () => {
                const salt = await encrypt.getSalt(10);
                return await encrypt.hash(Contraseña, salt);
            }
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
        res.json({
            status: 'error',
            code: 400,
            data: {
                error: error
            }
        });
    }
}

module.exports={CreateController}