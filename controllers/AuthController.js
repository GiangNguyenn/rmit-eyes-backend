const bcrypt = require('bcrypt');
const database = require('../models/database');
const { isExistingUser, login } = require('../models/database');
const { jwtTokens } = require('../utils/jwt-helpers');
module.exports = {
  login: async (req, res) => {
    try {
      const { username, password } = req.body;
      const user = await login(username).catch((e) => console.log(e));
      if (user.rows.length === 0) return res.status(401).json({ error: 'Id is incorrect' });

      const validatePassword = await bcrypt.compare(password, user.rows[0].password);
      if (!validatePassword) return res.status(401).json({ error: 'Incorrect password' });
      let tokens = jwtTokens(user.rows[0]); 
      console.log('res.json(tokens)', tokens);
      return res.json(tokens);
    } catch (error) {
      res.status(401).json({ error: error.message });
    }
  },

  register: async (req, res) => {
    const {
      name,
      email,
      phone,
      sid,
      image,
      imageWithMask,
      vaccineDocument,
      imageDescriptor,
      imageWithMaskDescriptor,
    } = req.body;
    const user = await database.isExistingUser(sid);
    if (!user.rows.length) {
      await database.addUser(name, phone, email, sid);
      const user = await isExistingUser(sid);
      const uid = user.rows[0].uid;
      await database.addUserImage(
        uid,
        image,
        imageWithMask,
        vaccineDocument,
        imageDescriptor,
        imageWithMaskDescriptor,
      );
    }
  },
};
