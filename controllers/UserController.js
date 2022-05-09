const database = require('../models/database')
const {isExistingAdmin, getUsers, getUsersWithStatus, getUsersNotWithStatus, updateUserStatus, checkInUser, getCheckInRecords} = require("../models/database");

module.exports = {
    getUsers: async (req, res) => {
        const {status} = req.query;
        if (status){
            if (status.includes('-')){
                console.log('status.substring(1, status.length)', status.substring(1, status.length))
              const result = await getUsersNotWithStatus(status.substring(1, status.length))
              return res.json(result.rows)
            }
            const result = await getUsersWithStatus(status)
             return res.json(result.rows)
         }
        const result = await getUsers()
        return res.json(result.rows)
        },
    getUser: async (req, res) => {
        const {user_id} = req.query
        const user = await isExistingAdmin(user_id);
        if (user && user.rows.length) {
            console.log(user.rows[0])
            return res.json(user.rows[0])
        }
    },
    updateUserStatus: async (req, res) => {
        const {status, sid} = req.body;
        if (status){
            const result = await updateUserStatus(sid, status)
            return res.json(result)
        }
    },
    checkIn: async (req, res) => {
        const {sid, temperature} = req.body;
        const checkin_time = new Date().toISOString();
        const result = await checkInUser(sid, temperature, checkin_time);
        return res.send('success')
    },
    getCheckInRecords: async (req,res) => {
        const result = await getCheckInRecords()
        return res.json(result.rows)
}
}
