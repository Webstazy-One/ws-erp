const db = require("../models")
const Voucher = db.voucher
const { findLast } = require("./invoice.controller")
const Uplog = db.uplog
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
    const itemId = req.params.itemId

    Item.findOneAndUpdate({ itemId: itemId }, { $inc: { itemId: req.params.booked } })
        .then(data => {

            if (!data) {
                res.status(404).send({
                    message: `Cannot update Stock with branchCode. Maybe Stock was not found!`
                })
            } else res.send(true)
        })
        .catch((err) => {
            res.status(500).send({
                message: "Error updating Stock with branchCode"
            })
        })


    Item.findOneAndUpdate({ itemId: itemId }, { $inc: { itemId: req.params.booked * +1 } })
        .then(data => {

            if (!data) {
                res.status(404).send({
                    message: `Cannot update Stock with branchCode. Maybe Stock was not found!`
                })
            } else res.send(true)
        })
        .catch((err) => {
            res.status(500).send({
                message: "Error updating Stock with branchCode"
            })
        })

    // Item.updateOne({ itemId: itemId }, { $inc: { "booked": req.params.booked * +1 } })
    //     .then(data => {
    //         if (!data) {
    //             res.status(404).send({
    //                 message: `Cannot update currentStock=${currentStock}`
    //             })
    //         } else res.send('K')
    //     })
    //     .catch((err) => {
    //         res.status(500).send({
    //             message: "Error updating currentStock=" + currentStock
    //         })
    //     })

    // if (req.params.booked > 0) Item.updateOne({ itemId: itemId }, { $inc: { "booked": req.params.booked * +1 } })

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