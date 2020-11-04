const db = require("../models")
const cust_mergeModel = require("../models/cust_merge.model")
const Cust_merge = db.cust_merge


exports.create = (req, res) => {

  if (!req.body.phone) {
    res.status(400).send({ message: "Content can not be empty!" })
    return
  }


  const cust_merge = new Cust_merge({
    phone: req.body.phone,
    phone1: req.body.phone1

  })


  cust_merge
    .save(cust_merge)
    .then(data => {
      res.send(data)
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while creating the cust_merge."
      })
    })
}

