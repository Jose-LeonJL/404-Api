require('dotenv').config();
const jwt = require('jsonwebtoken');
const firestore = require('../DataBase/firestore');

const VerifyToken = async (req, res, next) => {
    const token = req.headers["x-access-token"];
    if (!token) {
        return res.status(403).json({
            status: 'error',
            code: 403,
            data: {
                error: 'No se encontro token'
            }
        });
    }
    try {
        const decode = jwt.verify(token, process.env.secret);
        const verify = await firestore.Login({
            Correo: decode.id,
            Contraseña: 's'
        });
        if (!verify.data.User) return res.status(403).json({
            status: 'error',
            code: 403,
            data: {
                error: 'El token no es desconocido'
            }
        });

    } catch (error) {
        return res.status(403).json({
            status: 'error',
            code: 403,
            data: {
                error: error.toString()
            }
        });
    }
    next();
}

module.exports = {
    VerifyToken
}