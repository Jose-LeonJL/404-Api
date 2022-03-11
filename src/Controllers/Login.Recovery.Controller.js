require('dotenv').config();
const Config = require('../Configs/Configs');
const Firestore = require('../DataBase/firestore');
const Mailer = require('nodemailer');
const bcrypt = require('bcryptjs')
const ServerMailer = {
    host: process.env.mail_host,
    port: process.env.mail_port,
    auth: {
        user: process.env.mail,
        pass: process.env.mail_pass
    }
}
const Transport = Mailer.createTransport(ServerMailer);
// Controllador para la obtencion de los datos
const GetController = async (req, res) => {
    try {
        const {
            code,
            correo
        } = req.query
        const check = await Firestore.CodeCheck({
            code,
            correo
        });

        if (!check.success) {
            return res.json({
                status: 'error',
                code: 401,
                data: {
                    error: 'El codigo de verificacion invalido'
                }
            });
        }
        res.json({
            status: 'succes',
            code: 200,
            data: {
                message: 'Codigo de verificacion valido'
            }
        });
    } catch (error) {
        res.json({
            status: 'error',
            code: 401,
            data: {
                error: error.toString()
            }
        });
    }
}

const CreateController = async (req, res) => {
    try {
        const {
            Correo
        } = req.body;
        if (!Correo) res.json({
            status: 'error',
            code: 401,
            data: {
                error: 'No se envio el parametro correo'
            }
        });
        let credenciales = await Firestore.Login({
            Correo: Correo,
            Contraseña: 's'
        });
        if (!credenciales.data.User) res.json({
            status: 'error',
            code: 401,
            data: {
                error: 'No existe el correo'
            }
        });
        const codigo = `${Config.random(1000,9999)}-${Config.random(1000,9999)}`
        const mensaje = {
            from: process.env.mail,
            to: Correo,
            subject: 'Codigo de recuperacion | DVStudio',
            html: Config.HTML(codigo)
        }
        Transport.sendMail(mensaje, async (err, info) => {
            if (err) {
                res.json({
                    status: 'error',
                    code: 401,
                    data: {
                        error: err.toString()
                    }
                });
            } else {
                const savecode = await Firestore.CodeWrite({
                    Correo: Correo,
                    Code: codigo
                });
                if (savecode.success) {
                    res.json({
                        status: 'Success',
                        code: 200,
                        data: {
                            message: 'Codigo de verificacion enviado',
                            id: savecode.id
                        }
                    });
                } else {
                    res.json({
                        status: 'Error',
                        code: 400,
                        data: {
                            error: 'No se pudo guardar el codigo de verificacion'
                        }
                    });
                }

            }
        })

    } catch (error) {
        res.json({
            status: 'error',
            code: 401,
            data: {
                error: error.toString()
            }
        });
    }
}

const UpdateController = async (req, res) => {
    try {
        const {
            contraseña,
            correo,
            id
        } = req.body;
        const UserInfo = await Firestore.GetIdUsuario(correo);
        if (!UserInfo.success) {
            return res.json({
                status: 'error',
                code: 401,
                data: {
                    error: 'No se envio el parametro correo'
                }
            });
        }
        const salt = await bcrypt.genSalt(10);
        const PassHash = await bcrypt.hash(contraseña, salt);
        const codestatus = await Firestore.CodeDelte(id);
        if (!codestatus.success) return res.json({
            status: 'error',
            code: 401,
            data: {
                error: 'No se pudo eliminar el codigo'
            }
        });
        const userstatus = await Firestore.UpdateUsuario(UserInfo.id, {
            Contraseña: PassHash
        });
        if(!userstatus.success) return res.json({
            status: 'error',
            code: 401,
            data: {
                error: 'No se pudo actualizar la contraseña'
            }
        });
        res.json({
            status: 'success',
            code: 200,
            data: {
                message: 'Cambio completado'
            }
        });
    } catch (error) {
        res.json({
            status: 'error',
            code: 401,
            data: {
                error: error.toString()
            }
        });
    }
}

module.exports = {
    GetController,
    CreateController,
    UpdateController
}