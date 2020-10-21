const db = require("../models")
const Branch = db.branch


exports.create = (req, res) => {

  if (!req.body.branchCode) {
    res.status(400).send({ message: "Content can not be empty!" })
    return
  }

  const branch = new Branch({
    branchCode: req.body.branchCode,
    branchName: req.body.branchName,
    branchAddress: req.body.branchAddress,
    branchPhone: req.body.branchPhone,
    _active: true
  })


  branch
    .save(branch)
    .then(data => {
      res.status(201).send(data)
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while creating the Branch."
      })
    })
}


exports.findByBranchCode = (req, res) => {
  const branchCode = req.params.bc;
  console.log(req.query);
  var condition = branchCode
    ? {
      branchCode: branchCode,
      _active: true
    }
    : {};

  Branch.find(condition)
    .then((data) => {
      res.send(data);
    })
    .catch((err) => {
      res.status(500).send({
        message: err.message || "Some error occurred while retrieving branch."
      })
    })
}


exports.findAll = (req, res) => {
  Branch.find()
    .then(data => {
      res.send(data)
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving branch."
      })
    })
}


exports.findAllActive = (req, res) => {
  Branch.find({ _active: true })
    .then(data => {
      res.send(data)
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving branch."
      })
    })
}


exports.updateBranchbybranchCode = (req, res) => {
  const branchCode = req.params.branchCode;

  Branch.findOneAndUpdate({ branchCode: branchCode }, { $set: req.body })
    .then(data => {

      if (!data) {
        res.status(404).send({
          message: `Cannot update Branch with branchCode=${branchCode}. Maybe Branch was not found!`
        })
      } else res.send(true)
    })
    .catch((err) => {
      res.status(500).send({
        message: "Error updating Branch with branchCode=" + branchCode
      })
    })
}













