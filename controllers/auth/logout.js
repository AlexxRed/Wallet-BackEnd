const {User} = require("../../models/user");

const logout = async(req, res)=> {
    const { _id } = req.user;
    const result = await User.findByIdAndUpdate(_id, { token: "" });
    console.log(result);
    res.status(204).json();
}

module.exports = logout;