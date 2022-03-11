const Controller = require('../Controllers/Usuarios.controller');

//Get
const GetUsers = async (req, res) => {
    await Controller.GetController(req, res);
}

//Post
const CreateUser = async (req, res) => {
    await Controller.CreateController(req,res);
}

//Put
const UpdateUser = async (req, res) => {
    await Controller.UpdateController(req,res);
}

//Delete
const DeleteUser = async (req, res) => {
    await Controller.DeleteController(req,res);
}

module.exports = {GetUsers,CreateUser,UpdateUser,DeleteUser}