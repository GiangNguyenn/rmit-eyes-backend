const dotenv = require("dotenv");
dotenv.config()

const {Client} = require("pg");
const databaseConfig = {
    ssl: {
        ssl: { rejectUnauthorized: false }
    },
    connectionString: process.env.DB_CONNECTION_STRING
};

const database = new Client(databaseConfig)
database.connect()



module.exports = {
    isExistingUser: async () => await database
        .query('SELECT * FROM super_users;')
}
