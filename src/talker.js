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

module.exports = {
  getAllTalkers,
  getTalkerById,
};