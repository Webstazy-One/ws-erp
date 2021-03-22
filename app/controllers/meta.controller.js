const db = require("../models")
const Meta = db.meta


exports.updateSGDRate = (req, res) => {
    const k = req.params.k;
    const value = req.params.v;

    Meta.findOneAndUpdate({ k: "SGDRate" }, { $set: req.body })
        .then(data => {

            if (!data) {
                res.status(404).send({
                    message: `Cannot update Key with value=${value}. Maybe Key was not found!`,
                })
            } else res.send(true)
        })
        .catch((err) => {
            res.status(500).send({
                message: "Error updating Key with Value=" + k,

            })
        })
}

exports.updateSGDInc = (req, res) => {
    const k = req.params.k;
    const value = req.params.v;

    Meta.findOneAndUpdate({ k: "SGDInc" }, { $set: req.body })
        .then(data => {

            if (!data) {
                res.status(404).send({
                    message: `Cannot update Key with value=${value}. Maybe Key was not found!`,
                })
            } else res.send(true)
        })
        .catch((err) => {
            res.status(500).send({
                message: "Error updating Key with Value=" + k,

            })
        })
}


exports.findByName = (req, res) => {
    const k = req.params.k
    var condition = k ? {
        k: { $regex: new RegExp(k), $options: "i" },
    } : {}

    Meta.find(condition)
        .then((data) => {
            res.send(data)
        })
        .catch((err) => {
            res.status(500).send({
                message: err.message || "Some error occurred while retrieving meta.",
            })
        })
}

exports.findAll = (req, res) => {
    Meta.find()
        .then(data => {
            res.send(data)
        })
        .catch(err => {
            res.status(500).send({
                message: err.message || "Some error occurred while retrieving Meta."
            })
        })
}