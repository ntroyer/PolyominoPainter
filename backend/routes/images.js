const router = require('express').Router();
let Image = require('../models/image.model');

router.route('/add').post((req, res) => {
    const canvas = req.body.canvas;
    const positionid = req.body.position_id;
    const userid = req.body.user_id;

    const newImg = Image({
        userid,
        positionid,
        canvas
    });

    newImg.save()
        .then(() => res.status(200).json('Image saved!'))
        .catch(err => res.status(400).json('Error: Image failed to save!', err));
});

module.exports = router;