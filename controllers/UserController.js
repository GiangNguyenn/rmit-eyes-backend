const database = require('../models/database')
const {isExistingAdmin, getUsers} = require("../models/database");

module.exports = {
    getUsers: async (req, res) => {
        const result = await getUsers()
        console.log('result ', result)
        return res.json(result.rows)
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
