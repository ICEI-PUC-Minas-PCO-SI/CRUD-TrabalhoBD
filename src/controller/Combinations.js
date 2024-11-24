const CombinationsModel = require("../model/Combinations");

async function CombinationsController(req, res) {
    const {base, filling, size, description} = req.body;

    try{
        const CombinationID = await CombinationsModel.checkCombination(base, filling, size, description);
        res.status(201).json(CombinationID);
    }
    catch(error){
        res.status(500).json({ error: 'Combinação não encontrada' });
    }
}

module.exports = {
    CombinationsController
}