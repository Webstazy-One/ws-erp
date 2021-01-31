const axios = require('axios')
const db = require("../models")
const { customer, purchase, invoice } = require("../models")
const customers = require("../controllers/customer.controller.js")
const Invoice = db.invoice
const Customer = db.customer
const Item = db.item
const Purchase = db.purchase
const Stock = db.stock

const dbLinks = require("../config/db.config.js")


exports.create = (req, res) => {
  if (!req.body.invId) { res.status(400).send({ message: "Content can not be empty!" }); return }

  purch = []

  if (req.body.purchases) {
    req.body.purchases.forEach(purc => {
      const purcData = new Purchase({
        invId: req.body.invId,
        itemId: purc.itemId,
        unitPrice: purc.unitPrice,
        qty: purc.qty,
        disc: purc.disc,
        discPrice: purc.discPrice,
        dateTime: req.body.dateTime,
        _active: true,
        brandName: purc.brandName,
        branchCode: req.body.branchCode
      })


      axios.post(dbLinks.serverUrl + '/api/purchase/', purcData).catch(() => { })
      purch.push(purcData)
      const stockUpdate = {
        branchCode: req.body.branchCode,
        itemId: purc.itemId,
        qty: purc.qty
      }


      axios.put(dbLinks.serverUrl + '/api/stock/update/' + req.body.branchCode + '/' + purc.itemId + '/' + (0 - purc.qty)).catch(() => { })

      // axios.put('http://localhost:8089/api/stock/update/' + req.body.branchCode + '/' + purc.itemId + '/' + (0 - purc.qty)).catch(() => { })

    })
  }

  const invoice = new Invoice({
    invId:  req.body.invId,
    dateTime: req.body.dateTime,
    payMethod: req.body.payMethod,
    username: req.body.username,
    totDiscount: req.body.totDiscount,
    totValue: req.body.totValue,
    customer: req.body.customer,
    branchCode: req.body.branchCode,
    totalItems: req.body.totalItems,
    purchases: purch,
    _active: true
  })

  invoice
    .save(invoice)
    .then(data => {
      res.send(data)
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while creating the Invoice."
      })
    })


}

exports.findBydateTime = (req, res) => {
  let invar = {}
  let invDet = []
  const dateTime = req.params.dt
  var condition = dateTime
    ? {
      dateTime: dateTime,
      _active: true,
    }
    : {}
  Invoice.find(condition)
    .then((data) => {
      data.forEach(inv => {
        invar = {
          invId: inv.invId,
          dateTime: inv.dateTime,
          username: inv.username,
          payMethod: inv.payMethod,
          totDiscount: inv.totDiscount,
          totValue: inv.totValue,
          customer: inv.customer,
          branchCode: inv.branchCode,
          totalItems: inv.totalItems,
          _active: inv._active,
          purchases: inv.purchases
        }
        invDet.push(invar)
      })
      res.send(invDet)
    })
    .catch((err) => {
      res.status(500).send({
        message: err.message || "Some error occurred while retrieving invoices."
      })
    })
}

exports.findByDateRange = (req, res) => {
  let invar = {}
  let invDet = []
  var dateTimeAfter = new Date(req.params.dateTimeAfter)
  dateTimeAfter.setDate(dateTimeAfter.getDate() + 1)
  console.log(dateTimeAfter)
  Invoice.find({
    dateTime: {
      $gte: req.params.dateTimeBefore,
      $lt: dateTimeAfter,

    },
    _active: true
  })
    .then((data) => {
      data.forEach(inv => {
        invar = {
          invId: inv.invId,
          dateTime: inv.dateTime,
          username: inv.username,
          payMethod: inv.payMethod,
          totDiscount: inv.totDiscount,
          totValue: inv.totValue,
          customer: inv.customer,
          branchCode: inv.branchCode,
          totalItems: inv.totalItems,
          _active: inv._active,
          purchases: inv.purchases
        }
        invDet.push(invar)
      })
      res.send(invDet)
    })
    .catch((err) => {
      res.status(500).send({
        message: err.message || "Some error occurred while retrieving invoice."
      })
    })
}

exports.findByProfitAndDateRange = (req, res) => {
  res.send({
    message: `To be improved!`,
  })
}
exports.findByInvoiceId = (req, res) => {
  const invId = req.params.invId
  var condition = invId
    ? {
      invId: invId,
      _active: true
    }
    : {}
  Invoice.find(condition)
    .then((data) => {
      let inv = {
        invId: data[0].invId,
        dateTime: data[0].dateTime,
        username: data[0].username,
        payMethod: data[0].payMethod,
        totDiscount: data[0].totDiscount,
        totValue: data[0].totValue,
        customer: data[0].customer,
        branchCode: data[0].branchCode,
        totalItems: data[0].totalItems,
        _active: data[0]._active,
        purchases: data[0].purchases
      }
      res.send(inv)
    })
    .catch((err) => {
      res.status(500).send({
        message: err.message || "Some error occurred while retrieving invoice with invoice id."
      })
    })
}
exports.findByCustPhoneNo = (req, res) => {
  let custar = {}
  let custDet = []
  const phone = req.params.ph
  console.log(req.query)
  var condition = phone
    ? {
      phone: { $regex: new RegExp(req.params.ph), $options: "i" }
    }
    : {}
  Customer.find(condition)
    .then((data) => {
      data.forEach(customer => {
        custar = {
          phone: customer.phone,
          name: customer.name,
          address: customer.address
        }
        custDet.push(custar)
      })
      res.send(custDet)
    })
    .catch((err) => {
      res.status(500).send({
        message: err.message || "Some error occurred while retrieving Customer.",
      })
    })
}

exports.findAll = (req, res) => {
  let invar = {}
  let invDet = []
  Invoice.find()
    .then(data => {
      data.forEach(inv => {
        invar = {
          invId: inv.invId,
          dateTime: inv.dateTime,
          username: inv.username,
          payMethod: inv.payMethod,
          totDiscount: inv.totDiscount,
          totValue: inv.totValue,
          customer: inv.customer,
          branchCode: inv.branchCode,
          totalItems: inv.totalItems,
          _active: inv._active,
          purchases: inv.purchases
        }
        invDet.push(invar)
      })
      res.send(invDet)
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving invoice."
      })
    })
}


exports.findAllActive = (req, res) => {
  let invar = {}
  let invDet = []
  Invoice.find({ _active: true })
    .then(data => {
      data.forEach(inv => {
        invar = {
          invId: inv.invId,
          dateTime: inv.dateTime,
          username: inv.username,
          payMethod: inv.payMethod,
          totDiscount: inv.totDiscount,
          totValue: inv.totValue,
          customer: inv.customer,
          branchCode: inv.branchCode,
          totalItems: inv.totalItems,
          _active: inv._active,
          purchases: inv.purchases
        }
        invDet.push(invar)
      })
      res.send(invDet)
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving Invoice."
      })
    })
}

exports.findLast = (req, res) => {
  Invoice.findOne({branchCode : req.params.branchCode }).sort({ 'createdAt': -1 }).limit(1).then(data => {
    res.send(data.invId);
  })
}

exports.DeleteFromInvoiceId = (req, res) => {
  const invId = req.params.invId;
  Invoice.findOneAndUpdate({ invId: invId }, { $set: { _active: false } })
    .then(data => {
      if (!data) {
        res.status(404).send({
          message: `Cannot delete Invoice with invId=${invId}. Maybe Invoice was not found!`,
        })
      } else res.send(true);
    })
    .catch((err) => {
      res.status(500).send({
        message: err
      })
    })
  Purchase
    .findOneAndUpdate({ invId: invId }, { $set: { _active: false } })
    .then(pData => {
      console.log("stock")
      Stock.findOneAndUpdate({ itemId: pData.itemId, branchCode: pData.branchCode }, { $inc: { currentStock: pData.qty } })
        .then
        (data => {
          if (!data) {
            res.status(404).send({
              message: `Cannot update Stock with branchCode. Maybe Stock was not found!`,
            })
          } else res.send(pData)
        }).catch(() => { })


      if (!data) {
        res.status(404).send({
          message: `Cannot delete Invoice with invId=${invId}. Maybe Invoice was not found!`,
        })
      } else res.send(true)
    }).catch(() => { })

}