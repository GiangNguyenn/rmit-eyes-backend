const database = require('../models/database')
const {isExistingUser, login} = require("../models/database");
module.exports = {
    login: async (req, res) =>  {
        console.log('start login', req.body)
        const {username, password} = req.body;
        const user = await database.login(username, password);
        if (user.rows.length) return res.json(user.rows[0]);
        return false;
    },
    register: async (req, res) => {
        const {name, email, phone, sid, image, imageWithMask, vaccineDocument} = req.body;
        const user = await database.isExistingUser(sid);
        if (!user.rows.length) {
            await database.addUser(name, phone, email, sid)
            const user = await isExistingUser(sid);
            const uid = user.rows[0].uid;
            await database.addUserImage(uid, image, imageWithMask, vaccineDocument);
        }
    }
}
