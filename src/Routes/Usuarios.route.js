const Controller = require('../Controllers/Usuarios.controller');

//Get
const GetUsers = async (req, res) => {
    res.json();
}
//Post
const CreateUser = async (req, res) => {
    await Controller.CreateController(req,res);
}
//Put
const UpdateUser = async (req, res) => {

}
//Delete
const DeleteUser = async (req, res) => {

}

module.exports = {GetUsers,CreateUser,UpdateUser,DeleteUser}