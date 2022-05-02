const queries = require('../models/database');

module.exports = {
  get: async (req, res) => {
    const a = await queries.isExistingUser();
    console.log(a);
    res.send('hello world');
  },
};
