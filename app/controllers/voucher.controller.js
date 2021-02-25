const db = require("../models")
const Voucher = db.voucher
const { findLast } = require("./invoice.controller")
const Item = db.item

exports.create = (req, res) => {

    const voucher = new Voucher({
        voucherId: req.body.voucherId,
        amount: req.body.amount,
        date: req.body.date,
        type: req.body.type,
        itemId: req.body.itemId,
        active: true

    })

    if (voucher.type == "ADVANCE") {

        const itemId = req.params.itemId;
        Item.findOneAndUpdate({ itemId: itemId }, { $inc: { booked: 1 } })
            .then(data => {

                if (!data) {
                    res.status(404).send({
                        message: `Cannot update Item with Item Id . Maybe Item was not found!` + err,
                    });
                } else {
                    console.log("Item updated suceesfully!")
                }
            })
            .catch((err) => {
                res.status(500).send({
                    message: "Error updating Item with itemId "
                })
            })
    }
    voucher
        .save(voucher)
        .then(data => {
            res.status(201).send(data)
        })
        .catch(err => {
            res.status(500).send({
                message: err.message || "Some error occurred while creating the Voucher."
            })
        })



}

exports.findAll = (req, res) => {
    Voucher.find()
        .then((data) => {
            res.send(data)
        })
        .catch((err) => {
            res.status(500).send({
                message: err.message || "Some error occurred while retrieving Voucher.",
            })
        })
}



exports.findAllActive = (req, res) => {
    Voucher.find({ _active: true })
        .then((data) => {
            res.send(data)
        })
        .catch((err) => {
            res.status(500).send({
                message: err.message || "Some error occurred while retrieving Voucher.",
            })
        })
}


exports.findOne = (req, res) => {
    const voucherId = req.params.voucherId

    Voucher.find({ voucherId: voucherId })
        .then((data) => {
            if (!data)
                res.status(404).send({
                    message: "Not found voucher with voucherId " + voucherId,
                })
            else res.send(data)
        })
        .catch((err) => {
            res.status(500).send({
                message: "Error retrieving voucher with voucherId=" + voucherId,
            })
        })
}

exports.findByType = (req, res) => {
    const type = req.params.type

    Voucher.find({ type: type })
        .then((data) => {
            if (!data)
                res.status(404).send({
                    message: "Not found voucher with type " + type,
                })
            else res.send(data)
        })
        .catch((err) => {
            res.status(500).send({
                message: "Error retrieving voucher with type=" + type,
            })
        })
}

exports.update = (req, res) => {
    const voucherId = req.params.voucherId

    Voucher.findOneAndUpdate({ voucherId: voucherId }, { $set: req.body })
        .then((data) => {
            if (!data) {
                res.status(404).send({
                    message: `Cannot update Voucher with voucherId=${voucherId}. Maybe Customer was not found!`,
                })
            } else res.send(true)
        })
        .catch((err) => {
            res.status(500).send({
                message: "Error updating Voucher with voucherId=" + voucherId,
            })
        })
}

exports.delete = (req, res) => {
    const voucherId = req.params.voucherId

    Voucher.findOneAndUpdate({ voucherId: voucherId }, { $set: { _active: false } })
        .then((data) => {
            if (!data) {
                res.status(404).send({
                    message: `Cannot delete Voucher with voucherId=${voucherId}. Maybe Customer was not found!`,
                })
            } else res.send(true)
        })
        .catch((err) => {
            res.status(500).send({
                message: err,
            })
        })
}