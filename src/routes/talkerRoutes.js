const express = require('express');
const talker = require('../talker');

const router = express.Router();

router.get('/', async (_req, res) => {
  const talkers = await talker.getAllTalkers();
  res.status(200).json(talkers);
});

router.get('/:id', async (req, res) => {
  const id = Number(req.params.id);
  const talkerById = await talker.getTalkerById(id);
  if (talkerById) {
    return res.status(200).json(talkerById);
  } 
  res.status(404).json({
    message: 'Pessoa palestrante não encontrada',
  });
});

module.exports = router;