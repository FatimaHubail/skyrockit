const User = require('../models/user');

const index = async (req, res) => {
    try {
        res.render('applications/index.ejs');
    } catch (error) {
        res.redirect('/')
    }
}

const newApp = async (req, res) => {
    try {
        res.render('applications/new.ejs');
    } catch (error) {
        res.redirect('/');
    }
}

const create = async (req, res) => {
    try {
        const user = await User.findById(req.params.id);

        user.applications.push(req.body);
        await user.save();
        res.redirect('/users/:id/applications');
    } catch (error) {
        console.log(error);
        res.redirect('/users/:id/applications/new');
    }
}

module.exports = {
    index,
    newApp,
    create,
};