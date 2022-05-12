const database = require('../models/database')
const {isExistingUser, login, updateUserData} = require("../models/database");
module.exports = {
    login: async (req, res) =>  {
        const {username, password} = req.body;
        const user = await database.login(username, password).catch(e => console.log(e));
        console.log('user', user.rows[0])
        if (user.rows.length) return res.json(user.rows[0]);
        return false;
    },
    register: async (req, res) => {
        console.log('register')
        const {name, email, phone, sid, image, imageWithMask, vaccineDocument,imageDescriptor, imageWithMaskDescriptor} = req.body;
        const user = await database.isExistingUser(sid);
        if (!user.rows.length) {
            await database.addUser(name, phone, email, sid)
            const user = await isExistingUser(sid);
            const uid = user.rows[0].uid;
            await database.addUserImage(uid, image, imageWithMask, vaccineDocument,imageDescriptor, imageWithMaskDescriptor);
            res.send("success!")
        }
        else {
            await updateUserData(sid, name, phone, email)
            const user = await isExistingUser(sid);
            const uid = user.rows[0].uid;
            await database.updateUserImage(uid, image, imageWithMask, imageDescriptor, imageWithMaskDescriptor, vaccineDocument);
            res.send("success!")
        }
    }
}
