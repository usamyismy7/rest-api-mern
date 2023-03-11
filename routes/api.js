const express = require('express');
const router = express.Router();
const Data = require('../models/data');

// get a list of dataset from the db
router.get('/dataset', function (req, res, next) {
    // res.send({ type: 'GET' });
    // Data.find({}).then(function (data) {
    //     res.send(data);
    // })
    Data.geoNear({ type: "Point", coordinates: [parseFloat(req.query.lng), parseFloat(req.query.lat)] },
        { maxDistance: 100000, spherical: true }).then(function (data) {
            res.send(data);
        }
        );
})

// add a new data to the db
router.post('/dataset', function (req, res, next) {
    // console.log(req.body);
    // var data = new Data(req.body);
    // data.save();
    Data.create(req.body).then(function (data) {
        res.send(data);
    }).catch(next);
    // res.send({
    //     type: 'POST',
    //     name: req.body.name,
    //     rank: req.body.rank
    // });
})

// update a data in the db
router.put('/dataset/:id', function (req, res, next) {
    Data.findByIdAndUpdate({ _id: req.params.id }, req.body).then(function () {
        Data.findOne({ _id: req.params.id }).then(function (data) {
            res.send(data);
        })
    })
    // res.send({ type: 'PUT' });
})

// delete a data from the db
router.delete('/dataset/:id', function (req, res, next) {
    // console.log(req.params.id);
    Data.findByIdAndRemove({ _id: req.params.id }).then(function (data) {
        res.send(data);
    })
    // res.send({ type: 'DELETE' });
})

module.exports = router;