const database = require('../models/database')
const {isExistingAdmin, login} = require("../models/database");

module.exports = {
    get: (req, res) => {
        res.send('vo gia bao ')
    },
    getUser: async (req, res) => {
        const {user_id} = req.query
        const user = await isExistingAdmin(user_id);
        if (user && user.rows?.length) {
            console.log(user.rows[0])
            return res.json(user.rows[0])
        }
    }
}
