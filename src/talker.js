const fs = require('fs').promises;
const { join } = require('path');

const readTalkerFile = async () => {
  const path = '/talker.json';
  try {
    const contentFile = await fs.readFile(join(__dirname, path), 'utf-8');
    return JSON.parse(contentFile);
  } catch (error) {
    return [];
  }
};

const getAllTalkers = async () => readTalkerFile();

const getTalkerById = async (id) => {
  const talkers = await readTalkerFile();
  const talkerById = talkers.find((talker) => talker.id === id);
  return talkerById;
};

const validateTalkerToken = (req, res, next) => {
  const { authorization } = req.headers;
  if (!authorization) {
    return res.status(401).json({ message: 'Token não encontrado' });
  }
  if (authorization.length < 16) {
    return res.status(401).json({ message: 'Token inválido' });
  } 
  next();
};

const validateTalkerName = (req, res, next) => {
  const { name } = req.body;

  if (!name) {
    return res.status(400).json({ message: 'O campo "name" é obrigatório' });
  }
  if (name.length < 3) {
    return res.status(400).json({ message: 'O "name" deve ter pelo menos 3 caracteres' });
  }
  next();
};

const validateTalkerAge = (req, res, next) => {
  const { age } = req.body;

  if (!age) {
    return res.status(400).json({ message: 'O campo "age" é obrigatório' });
  }
  if (Number(age) < 18) {
    return res.status(400).json({ message: 'A pessoa palestrante deve ser maior de idade' });
  }
  next();
};

const validateTalk = (req, res, next) => {
  const { talk } = req.body;
  if (!talk) {
    return res.status(400).json({ message: 'O campo "talk" é obrigatório' });
  }
  next();
};

const validateWatchedAt = (req, res, next) => {
  const { talk } = req.body;
  const { watchedAt } = talk;
  const regexValidateDate = /^[0-9]{2}\/[0-9]{2}\/[0-9]{4}$/;

  if (!talk) {
    return res.status(400).json({ message: 'O campo "talk" é obrigatório' });
  }
  if (!watchedAt) {
    return res.status(400).json({ message: 'O campo "watchedAt" é obrigatório' });
  }
  if (!regexValidateDate.test(watchedAt)) {
    return res.status(400).json({ message: 'O campo "watchedAt" deve ter o formato "dd/mm/aaaa"' });
  }
  next();
};

const validateTalkRate = (req, res, next) => {
  const { talk } = req.body;
  const { rate } = talk;

  if (rate < 1 || rate > 5) {
    return res.status(400).json({ message: 'O campo "rate" deve ser um inteiro de 1 à 5' });
  }
  if (!rate) {
    return res.status(400).json({ message: 'O campo "rate" é obrigatório' });
  }
  next();
};

const updateTalker = async (id, updatedTalkerData) => {
  const oldTalkers = await readTalkerFile();
  const updatedTalker = { id, ...updatedTalkerData };
  const updatedTalkers = oldTalkers.reduce((talkersList, currentTalker) => {
    if (currentTalker.id === updatedTalker.id) return [...talkersList, updatedTalker];
    return [...talkersList, currentTalker];
  }, []);

  const updateData = JSON.stringify(updatedTalkers);
  try {
    await fs.writeFile('./src/talker.json', updateData);
    return updatedTalker;
  } catch (error) {
    console.error(error);
  }
};

const deleteTalker = async (id) => {
  const oldTalkers = await readTalkerFile();
  const updatedTalkers = oldTalkers.reduce((talkersList, currentTalker) => {
    if (currentTalker.id === id) return [...talkersList];
    return [...talkersList, currentTalker];
  }, []);

  const updateData = JSON.stringify(updatedTalkers);
  try {
    await fs.writeFile('./src/talker.json', updateData);
    return 204;
  } catch (error) {
    console.error(error);
  }
};

module.exports = {
  getAllTalkers,
  getTalkerById,
  validateTalkerToken,
  validateTalkerName,
  validateTalkerAge,
  validateTalk,
  validateWatchedAt,
  validateTalkRate,
  readTalkerFile,
  updateTalker,
  deleteTalker,
};