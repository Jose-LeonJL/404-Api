const Controller = require('../Controllers/Ventas.Controller');

//Get
const GetSales = async (req, res) => {
    await Controller.GetController(req, res);
}

//Post
const CreateSale = async (req, res) => {
    await Controller.CreateController(req,res);
}

//Put
const UpdateSale = async (req, res) => {
    await Controller.UpdateController(req,res);
}

//Delete
const DeleteSale = async (req, res) => {
    await Controller.DeleteController(req,res);
}

module.exports = {GetSales,CreateSale,UpdateSale,DeleteSale}