const router = require('express').Router();
let Image = require('../models/image.model');

router.route('/').get((req, res) => {
    Image.find()
        .then(images => res.json(images))
        .catch(err => res.status(400).json('Error: ' + err));
});

router.route('/add').post((req, res) => {
    const testcanvas = JSON.stringify({ 
        '2,0': '#404cbf',
        '3,0': '#99bf40',
        '1,0': '#d6e6b3',
        '0,0': '#d6e6b3',
        '2,1': '#40bf4a',
        '2,2': '#b3d8e6',
        '3,2': '#40bf4a',
        '1,2': '#40bf4a',
        '0,2': '#404cbf',
        '2,3': '#40bf4a',
        '2,4': '#bf40af',
        '3,4': '#d6e6b3',
        '1,4': '#b3d8e6',
        '0,4': '#b3d8e6',
        '2,5': '#bf40af',
        '2,6': '#4052bf',
        '3,6': '#4052bf',
        '1,6': '#6a862d',
        '0,6': '#b3d8e6',
        '2,7': '#b3d8e6',
        '6,4': '#d6e6b3',
        '7,4': '#9740bf',
        '5,4': '#d6e6b3',
        '4,4': '#d6e6b3',
        '6,5': '#d6e6b3',
        '6,6': '#40bf4c',
        '7,6': '#40bf4c',
        '5,6': '#d6e6b3',
        '4,6': '#d6e6b3',
        '6,7': '#40bf4c',
        '6,3': '#4052bf',
        '7,3': '#4052bf',
        '5,3': '#d6e6b3',
        '4,3': '#d6e6b3',
        '6,1': '#6a862d',
        '7,1': '#4052bf',
        '5,1': '#99bf40',
        '4,1': '#99bf40',
        '6,2': '#4052bf',
        '2,8': '#4052bf',
        '3,8': '#6a862d',
        '1,8': '#4052bf',
        '0,8': '#d6e6b3',
        '2,9': '#bf40af',
        '6,8': '#6a862d',
        '7,8': '#40bf4c',
        '5,8': '#99bf40',
        '4,8': '#99bf40',
        '6,9': '#99bf40',
        '8,0': '#d6e6b3',
        '9,0': '#d6e6b3',
        '7,0': '#9740bf',
        '6,0': '#99bf40',
        '8,1': '#4052bf',
        '8,2': '#4052bf',
        '9,2': '#bf40af',
        '7,2': '#b3d8e6',
        '8,3': '#6a862d',
        '8,4': '#b3d8e6',
        '9,4': '#b3d8e6',
        '8,5': '#b3d8e6',
        '8,6': '#6a862d',
        '9,6': '#b3d8e6',
        '8,7': '#40bf4c',
        '8,8': '#40bf4c',
        '9,8': '#d6e6b3',
        '8,9': '#d6e6b3',
        '4,7': '#9740bf',
        '5,7': '#bf40af',
        '3,7': '#4052bf',
        '4,5': '#d6e6b3',
        '5,5': '#d6e6b3',
        '3,5': '#d6e6b3',
        '4,9': '#99bf40',
        '5,9': '#99bf40',
        '3,9': '#99bf40',
        '4,10': '#bf40af',
        '1,9': '#d6e6b3',
        '0,9': '#d6e6b3',
        '2,10': '#bf40af',
        '1,7': '#4052bf',
        '0,7': '#bf40af',
        '1,5': '#b3d8e6',
        '0,5': '#b3d8e6',
        '3,3': '#40bf4a',
        '1,3': '#6a862d',
        '0,3': '#b3d8e6',
        '3,1': '#6a862d',
        '1,1': '#40bf4a',
        '0,1': '#d6e6b3',
        '5,2': '#bf40af',
        '4,2': '#bf40af',
        '5,0': '#99bf40',
        '4,0': '#99bf40',
        '9,9': '#d6e6b3',
        '7,9': '#9740bf',
        '9,7': '#bf40af',
        '7,7': '#b3d8e6',
        '9,5': '#b3d8e6',
        '7,5': '#9740bf',
        '9,1': '#d6e6b3',
        '9,3': '#b3d8e6',
        '3,-1': '#9740bf' 
    });
    const testposition = 2;

    const canvas = req.body.canvas;
    const positionid = req.body.position_id;
    // const userid = req.body.user_id;

    const newImg = new Image({testcanvas, testposition});

    // console.log('canvas...', canvas);
    // console.log('positionid...', positionid);

    // res.json('reached route!');

    newImg.save()
        .then(() => res.json('Image saved!'))
        .catch(err => res.status(400).json('Error: Image failed to save!', err));
});

module.exports = router;