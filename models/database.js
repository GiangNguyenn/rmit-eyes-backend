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
    addUser: async (name, phone, email, sid) => await database.query(`INSERT INTO users(student_name, phone, email, sid, status) VALUES ('${name}', '${phone}', '${email}', '${sid}', 'pending_to_approve')`),
    isExistingUser: async (sid) => await database.query(`SELECT * FROM users WHERE users.sid='${sid}'`),
    addUserImage: async (uid, image, imageWithMask, vaccineDocument) => {
        await database.query(`INSERT INTO images(uid, image, image_with_mask, vaccine_document) VALUES('${uid}', '${image}', '${imageWithMask}', '${vaccineDocument}')`)
    }

}
