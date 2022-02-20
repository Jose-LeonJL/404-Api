const Controller = require('../Controllers/Login.Controller');

//Post
const CreateLogin = async (req, res) => {
    await Controller.PostController(req,res);
}

module.exports = {CreateLogin}