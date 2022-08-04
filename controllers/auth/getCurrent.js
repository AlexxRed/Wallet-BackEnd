const getCurrent = async(req, res)=> {
    const {email, name, _id} = req.user;
    res.json({
        email,
        name,
        id: _id
    })
}

module.exports = getCurrent;