require('dotenv').config();
const Firebase = require('../DataBase/firestore');
const jwt = require('jsonwebtoken');

// Controllador para la obtencion de los datos
const PostController = async (req, res) => {
    const Login = await Firebase.Login(req.body);
    if (Login.success) {
        if (Login.data.User && !Login.data.Pass) {
            res.json({
                status: 'error',
                code: 401,
                data: {
                    error: 'Contraseña Incorrecta'
                }
            });
        } else if (!Login.data.User) {
            res.json({
                status: 'error',
                code: 402,
                data: {
                    error: 'Usuario Incorrecta'
                }
            });
        } else {
            const token = () => {
                return jwt.sign({id:req.body.Correo},process.env.secret,{
                    expiresIn:86400
                })
            }
            res.json({
                status: 'success',
                code: 200,
                data: {
                    jwt: token(),
                    login: true,
                    tipo:Login.data.Tipo
                }
            });
        }
    } else {
        res.json({
            status: 'error',
            code: 400,
            data: {
                error: 'Acceso no realizado'
            }
        });

    }
}

module.exports = {
    PostController
}