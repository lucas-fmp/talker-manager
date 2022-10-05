const express = require('express');
const fs = require('fs').promises;
const talker = require('../talker');

const router = express.Router();

const {
  validateTalkerToken,
  validateTalkerName,
  validateTalkerAge,
  validateWatchedAt,
  validateTalkRate,
  validateTalk,
  readTalkerFile,
} = talker;

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

router.post('/',
  validateTalkerToken,
  validateTalkerName,
  validateTalkerAge,
  validateTalk,
  validateWatchedAt,
  validateTalkRate,
  async (req, res) => {
    const { body } = req;
    const data = await readTalkerFile();
    const newId = data.length + 1;
    const newTalker = { id: newId, ...body };
    const newData = [...data, newTalker];
    await fs.writeFile('./src/talker.json', JSON.stringify(newData));
    return res.status(201).json(newTalker);
});

router.put('/:id',
  validateTalkerToken,
  validateTalkerName,
  validateTalkerAge,
  validateTalk,
  validateWatchedAt,
  validateTalkRate,
  async (req, res) => {
    const { id } = req.params;
    const { body } = req;
    
    const updatedTalker = await talker.updateTalker(Number(id), body);

    return res.status(200).json(updatedTalker);
});

module.exports = router;