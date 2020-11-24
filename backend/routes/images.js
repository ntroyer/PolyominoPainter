const router = require('express').Router();
let Image = require('../models/image.model');

router.route('/add').post((req, res) => {
    // todo - this is a json string, right?
    // const images = JSON.parse(req.body.images);
    console.log('adding images...', req.body);

    /*images.forEach( function(image) {
        // create an object for each and save it
        console.log(image);
        // let image = new Image({image.canvas, image.save_id});
    });*/
});

module.exports = router;