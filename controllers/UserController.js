const database = require('../models/database')
const {isExistingAdmin, login} = require("../models/database");

module.exports = {
    get: (req, res) => {
        res.send('vo gia bao ')
    },
    getUser: async (req, res) => {
        const {user_id} = req.params
        console.log('user id', req.params)
        const user = await isExistingAdmin(user_id);
        if (user) {
            res.json(user)
        }
    }
}
