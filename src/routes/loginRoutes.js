const express = require('express');

const router = express.Router();

const validateLoginData = (req, res, next) => {
  const { email, password } = req.body;
  const regexValidateEmail = /\S+@\S+\.\S+/;

  if (!email) {
    return res.status(400).json({ message: 'O campo "email" é obrigatório' });
  }
  if (!regexValidateEmail.test(email)) {
    return res.status(400).json({ message: 'O "email" deve ter o formato "email@email.com"' });
  }
  if (!password) {
    return res.status(400).json({ message: 'O campo "password" é obrigatório' });
  }
  if (password.length < 6) {
    console.log(password.length);
    return res.status(400).json({ message: 'O "password" deve ter pelo menos 6 caracteres' });
  } 
    next();
};

router.post('/', validateLoginData, (req, res) => {
  const token = (Math.random().toString(16).substr(2) + Math.random().toString(16).substr(2))
    .slice(0, 16);
  return res.status(200).json({ token });
});

module.exports = router;