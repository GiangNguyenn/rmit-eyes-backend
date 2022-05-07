const dotenv = require("dotenv");
dotenv.config()

const {Client} = require("pg");
const databaseConfig = {
    ssl: {
        ssl: {rejectUnauthorized: false}
    },
    connectionString: process.env.DB_CONNECTION_STRING
};

const database = new Client(databaseConfig)
database.connect()


module.exports = {
    getUsers: async () => await database.query(`SELECT * FROM users, images WHERE users.uid::varchar = images.uid;`),
    getUsersWithStatus: async (status) => await database.query(`SELECT * FROM users, images WHERE users.uid::varchar = images.uid and users.status = '${status}';`),
    getUsersNotWithStatus: async (status) => await database.query(`SELECT * FROM users, images WHERE NOT users.status = '${status}' AND users.uid::varchar = images.uid;`),
    addUser: async (name, phone, email, sid) => await database.query(`INSERT INTO users(student_name, phone, email, sid, status) VALUES ('${name}', '${phone}', '${email}', '${sid}', 'pending_to_approve')`),
    isExistingUser: async (sid) => await database.query(`SELECT * FROM users WHERE users.sid='${sid}'`),
    addUserImage: async (uid, image, imageWithMask, vaccineDocument, imageDescriptor, imageWithMaskDescriptor) => {
        await database
            .query(`INSERT INTO images(uid, image, image_with_mask, vaccine_document, image_descriptor, image_with_mask_descriptor) VALUES ('${uid}', '${image}', '${imageWithMask}', '${vaccineDocument}','${imageDescriptor}', '${imageWithMaskDescriptor}')`)
    },
    login: async (username, password) => {
        return await database.query(`SELECT * FROM super_users WHERE user_name='${username}' AND password='${password}'`)
            .catch(error => console.log('some thing wrong', error))
    },
    isExistingAdmin: async (user_id) => await database.query(`SELECT * FROM super_users WHERE user_id='${user_id}'`),
    updateUserStatus: async (sid, status) => await database.query(`UPDATE users SET status='${status}' WHERE sid = '${sid}'`).catch(e => console.log('error: ', e)),
    checkInUser: async (sid, temp, checkin_time) => {
        await database
            .query(`INSERT INTO check_in(sid, checkin_time ,temperature) VALUES ('${sid}', '${checkin_time}', '${temp}')`)

    },
    updateUserData: async (sid, name, phone, email, image) =>
        await database.query(`UPDATE users SET student_name='${name}', phone='${phone}', email='${email}' WHERE sid ='${sid}'`).catch(e => console.log('error: ', e)),
    updateUserImage: async (uid, image, image_with_mask, image_descriptor, imageWithMaskDescriptor, vaccine_document) => await database.query(`UPDATE images SET image='${image}', image_with_mask='${image_with_mask}', vaccine_document='${vaccine_document}', image_descriptor='${image_descriptor}', image_with_mask_descriptor='${imageWithMaskDescriptor}'  WHERE uid ='${uid}'`).catch(e => console.log('error: ', e)),


}
