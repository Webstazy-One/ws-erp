const db = require("../models")
const { invoice } = require("../models")
const Purchase = db.purchase
const Invoice = db.invoice
const axios = require('axios')

const dbLinks = require("../config/db.config.js")
exports.create = (req, res) => {
    posDet = []
    const purchase = new Purchase({

            invId: req.body.invId,
            qty: req.body.qty,
            disc: req.body.disc,
            discPrice: req.body.discPrice,
            unitPrice: req.body.unitPrice,
            itemId: req.body.itemId,
            dateTime: req.body.dateTime,
            _active: true,
            brandName: req.body.brandName,
            branchCode: req.body.branchCode,
            payMethod: req.body.payMethod

        }

    )
    purchase
        .save(purchase)
        .then(data => {

            console.log(req.body.payMethod)

            if (req.body.branchCode == "OGFSL" && req.body.payMethod != "ONLINE") {

                console.log("req.body.payMethod")
                const newcheckout = {

                    amount: req.body.amount,
                    receiptNumber: req.body.receiptNumber,
                    receiptDateTime: req.body.dateTime,
                    posId: req.body.posId,

                }

                axios.post(dbLinks.OGFSLRewardUrl + '/integration/api/setup2/Checkout/' + req.body.branchCode + '/' + req.body.receiptNumber + '/' + req.body.dateTime + '/' + req.body.posId, newcheckout).catch(() => {})

                console.log("data sent")

                const newsalestransaction = {

                    AppCode: req.query.AppCode,
                    PropertyCode: req.query.PropertyCode,
                    ClientID: req.query.ClientID,
                    ClientSecret: req.query.ClientSecret,
                    POSInterfaceCode: req.query.POSInterfaceCode,
                    BatchCode: req.body.BatchCode,
                    PosSales: posDet,

                }


                itemDet = []

                if (req.body.PosSales) {

                    req.body.PosSales.forEach(posSale => {
                        const posData = new PosSales({

                                PropertyCode: req.body.PropertyCode,
                                POSInterfaceCode: req.body.POSInterfaceCode,
                                ReceiptDate: req.body.ReceiptDate,
                                ReceiptTime: req.body.ReceiptTime,
                                ReceiptNo: req.body.ReceiptNo,
                                NoOfItems: req.body.NoOfItems,
                                SalesCurrency: req.body.SalesCurrency,
                                TotalSalesAmtB4Tax: req.body.TotalSalesAmtB4Tax,
                                TotalSalesAmtAfterTax: req.body.TotalSalesAmtAfterTax,
                                SalesTaxRate: req.body.SalesTaxRate,
                                ServiceChargeAmt: req.body.ServiceChargeAmt,
                                PaymentAmt: req.body.PaymentAmt,
                                PaymentCurrency: req.body.PaymentCurrency,
                                PaymentMethod: req.body.PaymentMethod,
                                SalesType: req.body.SalesType,
                                Items: itemDet

                            }

                        )
                        if (req.body.items) {
                            req.body.items.foreach(item => {

                                const itemData = new Item({

                                    ItemDesc: req.body.ItemDesc,
                                    ItemAmt: req.body.ItemAmt,
                                    ItemDiscoumtAmt: req.body.ItemDiscoumtAmt

                                })

                                itemDet.push(itemData)


                            })

                        }
                        posDet.push(posData)

                    })

                }
            }
            res.send(data)
        })
        .catch(err => {
            res.status(500).send({
                message: err.message || "Some error occurred while creating the Purchase."
            })
        })

}

exports.findOne = (req, res) => {
    const purchaseId = req.params.purchaseId

    Purchase.findById(purchaseId)
        .then(data => {
            if (!data)
                res.status(404).send({ message: "Not found purchase with id " + purchaseId })
            else res.send(data)
        })
        .catch(err => {
            res
                .status(500)
                .send({ message: "Error retrieving purchase with id=" + purchaseId })
        })
}

exports.findByInvoiceId = (req, res) => {
    const invId = req.params.invId
    var condition = invId ? {
        invId: invId,
        _active: true
    } : {}

    Purchase.find(condition)
        .then((data) => {
            res.send(data)
        })
        .catch((err) => {
            res.status(500).send({
                message: err.message || "Some error occurred while retrieving purchase by invoce id.",
            })
        })
}

exports.findAll = (req, res) => {
    Purchase.find()
        .then(data => {
            res.send(data)
        })
        .catch(err => {
            res.status(500).send({
                message: err.message || "Some error occurred while retrieving Purchase."
            })
        })
}

exports.findAllActive = (req, res) => {
    Purchase.find({ _active: true })
        .then(data => {
            res.send(data)
        })
        .catch(err => {
            res.status(500).send({
                message: err.message || "Some error occurred while retrieving purchase."
            })
        })
}


exports.findByDateRange = (req, res) => {

    Purchase.aggregate([{
            "$match": {
                dateTime: {
                    $gte: req.params.dateTimeBefore,
                    $lt: req.params.dateTimeAfter
                }
            }
        },
        {
            "$group": {
                "_id": { "$dayOfYear": "$createdDate" },
                "totalSales": { "$sum": "$qty" }
            }
        }
    ], )

    .catch((err) => console.log(err))

    .then(($qty) => {
            res.send($qty)
        })
        .catch((err) => {
            res.status(500).send({
                message: err.message || "Some error occurred while retrieving .",
            })
        })
}