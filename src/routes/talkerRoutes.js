const express = require('express');
const talker = require('../talker');

const router = express.Router();

router.get('/', async (req, res) => {
  const talkers = await talker.getAllTalkers();
  res.status(200).json(talkers);
});

module.exports = router;