const db = require("../models")
const Customer = db.customer


exports.create = (req, res) => {
  if (!req.body.name) {
    res.status(400).send({ message: "Name can not be empty!" })
    return
  }

  const customer = new Customer({
    phone: req.body.phone,
    name: req.body.name,
    address: req.body.address
  })


  customer
    .save(customer)
    .then((data) => {
      res.send(data)
    })
    .catch((err) => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while creating the customer."
      })
    })
}


exports.findByPhone = (req, res) => {
  const phone = req.params.ph
  console.log(req.query)
  var condition = phone
    ? {
      phone: { $regex: new RegExp(req.params.ph), $options: "i" }
    }
    : {}

  Customer.find(condition)
    .then((data) => {
      res.send(data)
    })
    .catch((err) => {
      res.status(500).send({
        message: err.message || "Some error occurred while retrieving customer."
      })
    })
}

exports.findAll = (req, res) => {
  Customer.find()
    .then(data => {
      res.send(data)
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving customer."
      })
    })
}


exports.updateByCustomerPhone = (req, res) => {
  const phone = req.params.phone

  Customer.findOneAndUpdate({ phone: phone }, { $set: req.body })
    .then(data => {

      if (!data) {
        res.status(404).send({
          message: `Cannot update customer with phone=${phone}.`
        });
      } else res.send(true);
    })
    .catch((err) => {
      res.status(500).send({
        message: "Error updating customer with phone=" + phone
      })
    })
}




