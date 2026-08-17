const User = require('../models/user');

const index = async (req, res) => {
    try {
        const user = await User.findById(req.params.id);
        res.render('applications/index.ejs', {applications: user.applications});
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

const show = async (req, res) => {
    try {
        const user = await User.findById(req.params.id);
        const application = user.applications.id(req.params.appId) 
        res.render('applications/show.ejs', { application });
    } catch (error) {
        res.redirect('/')
    }
}

const deleteApp = async (req, res) => {
    try {
       const user = await User.findById(req.params.id);
        user.applications.pull(req.params.appId);

        await user.save();
        res.redirect(`/users/${user._id}/applications`); 
    } catch (error) {
        console.log(error);
        res.redirect('/');
    }
    
}

module.exports = {
    index,
    newApp,
    create,
    show,
    deleteApp,
};