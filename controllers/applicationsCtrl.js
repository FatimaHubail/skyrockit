const User = require('../models/user');

const index = async (req, res) => {
    try {
        res.render('application/index.ejs');
    } catch (error) {
        res.redirect('/')
    }
}

module.exports = {
    index,
};