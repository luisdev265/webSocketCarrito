const actionModel = require('../models/action');

async function getActions(req, res) {
  try {
    const limit = req.query.limit ? parseInt(req.query.limit) : 100;
    const actions = await actionModel.getActions(limit);
    res.json(actions);
  } catch (error) {
    console.error('Error al obtener acciones:', error);
    res.status(500).json({ error: 'Error al obtener acciones' });
  }
}

module.exports = {
  getActions
};