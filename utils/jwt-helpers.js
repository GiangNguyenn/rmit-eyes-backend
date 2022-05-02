const jwt = require('jsonwebtoken');

//Generate an access token and a refresh token for this database user
function jwtTokens({ user_id, user_name, user_email }) {
  const user = { user_id, user_name, user_email };
  const accessToken = jwt.sign(user, process.env.ACCESS_TOKEN_SECRET, { expiresIn: '86400s' });
  const refreshToken = jwt.sign(user, process.env.REFRESH_TOKEN_SECRET, { expiresIn: '5m' });
  return { accessToken, refreshToken };
}

module.exports = { jwtTokens };
