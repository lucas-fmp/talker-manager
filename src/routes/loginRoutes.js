const express = require('express');
const talker = require('../talker');

const router = express.Router();

router.post('/', (req, res) => {
  const requiredProperties = ['email', 'password'];
  if (requiredProperties.every((property) => property in req.body)) {
    const token = (Math.random().toString(16).substr(2) + Math.random().toString(16).substr(2))
      .slice(0, 16);
    return res.status(200).json({ token });
  }
});

module.exports = router;