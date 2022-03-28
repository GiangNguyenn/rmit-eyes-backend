const database = require('../models/database')
const {isExistingUser} = require("../models/database");
module.exports = {
    login: (req, res) =>  {
        const {username, password} = req.body;
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
