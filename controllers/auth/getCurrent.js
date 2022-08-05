const getCurrent = async(req, res)=> {
    const {email, name, balance, _id} = req.user;
    res.json({
        email,
        name,
        balance,
        id: _id
    })
}

module.exports = getCurrent;