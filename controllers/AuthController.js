module.exports = {
    login: (req, res) =>  {
        const {username, password} = req.body;
    },
    register: (req, res) => {
        const {name, email, phone } = req
    }
}
