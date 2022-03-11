const Controller = require('../Controllers/Inventario.Controller');

//Get
const GetProducts = async (req, res) => {
    await Controller.GetController(req, res);
}

//Post
const CreateProduct = async (req, res) => {
    await Controller.CreateController(req,res);
}

//Put
const UpdateProduct = async (req, res) => {
    await Controller.UpdateController(req,res);
}

//Delete
const DeleteProduct = async (req, res) => {
    await Controller.DeleteController(req,res);
}

module.exports = {GetProducts,CreateProduct,UpdateProduct,DeleteProduct}