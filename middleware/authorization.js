const jwt = require('jsonwebtoken');
const { isExistingAdmin } = require('../models/database');

function authenticateToken(req, res, next) {
  const authHeader = req.headers['authorization']; //Bearer TOKEN
  const token = authHeader && authHeader.split(' ')[1];
  if (token == null) {
    return res.status(401).json({ error: 'Null token' });
  } else {
    jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (error, decoding) => {
      if (error) return res.status(403).json({ error: error.message });
      const user = isExistingAdmin(decoding.user_id);
      !user ? res.status(404).json({ error: 'No such user' }) : (req.user = user);
      next();
    });
  }
}

export { authenticateToken };
