const axios = require('axios')
const db = require("../models")
const { customer, purchase, invoice } = require("../models")
const customers = require("../controllers/customer.controller.js")
const Invoice = db.invoice
const Customer = db.customer
const Item = db.item
const Purchase = db.purchase

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
        _active: true
      })
      // axios.post('http://wserp0-env.eba-mw8pswre.ap-southeast-1.elasticbeanstalk.com/api/purchase/', purcData)
      axios.post('http://localhost:8089/api/purchase/', purcData).catch(() => { });
      purch.push(purcData)
      const stockUpdate = {
        branchCode: req.body.branchCode,
        itemId: purc.itemId,
        qty: purc.qty
      }
      // axios.put('http://wserp0-env.eba-mw8pswre.ap-southeast-1.elasticbeanstalk.com/api/stock/dec/', stockUpdate);
      //   axios.put('http://localhost:8089/api/purchase/api/stock/dec/', stockUpdate).catch(() => {});;

      axios.put('http://localhost:8089/api/stock/update/' + req.body.branchCode + '/' + purc.itemId + '/' + purc.qty).catch(() => { });



    })
  }

  const latestInvoice = new Invoice({
    invId: req.body.invId,
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

  Invoice
    .save(latestInvoice)
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
  const dateTime = req.params.dt;
  console.log(req.query);
  var condition = dateTime
    ? {
      dateTime: dateTime,
    }
    : {};
  Invoice.find(condition)
    .then((data) => {
      res.send(data);
    })
    .catch((err) => {
      res.status(500).send({
        message: err.message || "Some error occurred while retrieving invoices.",
      });
    });
};
exports.findByDateRange = (req, res) => {
  Invoice.find({
    dateTime: {
      $gte: req.params.dateTimeBefore,
      $lt: req.params.dateTimeAfter
    }
  })
    .then((data) => {
      res.send(data);
    })
    .catch((err) => {
      res.status(500).send({
        message: err.message || "Some error occurred while retrieving invoice.",
      });
    });
};
exports.findByProfitAndDateRange = (req, res) => {
  res.send({
    message: `To be improved!`,
  });
}
exports.findByInvoiceId = (req, res) => {
  const invId = req.params.invId;
  console.log(req.query);
  var condition = invId
    ? {
      invId: invId,
    }
    : {};
  Invoice.find(condition)
    .then((data) => {
      res.send(data);
    })
    .catch((err) => {
      res.status(500).send({
        message: err.message || "Some error occurred while retrieving invoice with invoice id.",
      });
    });
};
exports.findByCustPhoneNo = (req, res) => {
  const phone = req.params.ph;
  console.log(req.query);
  var condition = phone
    ? {
      phone: { $regex: new RegExp(req.params.ph), $options: "i" },
    }
    : {};
  Customer.find(condition)
    .then((data) => {
      res.send(data);
    })
    .catch((err) => {
      res.status(500).send({
        message: err.message || "Some error occurred while retrieving Customer.",
      });
    });
};
exports.findAll = (req, res) => {
  Invoice.find()
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving invoice."
      });
    });
};
exports.findLast = (req, res) => {
  Invoice.findOne().sort({ 'createdAt': -1 }).limit(1).then(data => {
    res.send(data.invId);
  })
};
exports.DeleteFromInvoiceId = (req, res) => {
  const invId = req.params.invId;
  Invoice.findOneAndUpdate({ invId: invId }, { $set: { _active: false } })
    .then(data => {
      if (!data) {
        res.status(404).send({
          message: `Cannot delete Invoice with invId=${invId}. Maybe Invoice was not found!`,
        });
      } else res.send(true);
    })
    .catch((err) => {
      res.status(500).send({
        message: err,
      });
    });
}