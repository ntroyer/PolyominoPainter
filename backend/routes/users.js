const router = require('express').Router();
let User = require('../models/user.model');

router.route('/').get((req, res) => {
    User.find()
        .then(users => res.json(users))
        .catch(err => res.status(400).json('Error: ' + err));
});

router.route('/add').post((req, res) => {
    const username = req.body.username;
    // todo - need some kind of hashing for the user's password obv
    const password = req.body.password;
    const newUser = new User({username, password});

    newUser.save()
        .then(() => res.status(200).json('User added!'))
        .catch(err => res.status(400).json('Error: ' + err));
});

// we don't need this route anymore
/*router.route('/updateimages').post((req, res) => {
    // todo - need to write update code for the user.
    // this code should only update their user images right now
    const userid = req.body.userid;

    User.findByIdAndUpdate(userid, {image_ids: req.body.image_ids})
        .then(() => res.json('Images updated for user!'))
        .catch(err => res.status(400).json('Cannot update images for user.'));
});*/

router.route('/login').post((req, res) => {

    // todo - login goes here... need a kind of hashing algoritm for passwords, maybe bcrypt...
});

module.exports = router;
