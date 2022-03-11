const Controller = require('../Controllers/Login.Recovery.Controller');

//Get
const GetLoginRecovery = async (req, res) => {
    await Controller.GetController(req, res);
}

//Post
const CreateLoginRecovery = async (req, res) => {
    await Controller.CreateController(req,res);
}

//Put
const UpdateLoginRecovery = async (req, res) => {
    await Controller.UpdateController(req,res);
}

module.exports = {GetLoginRecovery,CreateLoginRecovery,UpdateLoginRecovery}
