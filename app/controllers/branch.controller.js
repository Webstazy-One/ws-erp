const db = require("../models")
const Branch = db.branch


exports.create = (req, res) => {

  if (!req.body.branchCode) {
    res.status(400).send({ message: "branchCode can not be empty!" })
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
  const branchCode = req.params.bc
  var condition = branchCode
    ? {
      branchCode: branchCode,
      _active: true
    }
    : {}

  Branch.find(condition)
    .then((data) => {
      let branch = {
        branchCode: data[0].branchCode,
        branchName: data[0].branchName,
        branchAddress: data[0].branchAddress,
        branchPhone: data[0].branchPhone,
        _active: data[0]._active
      }

      res.send(branch)
    })
    .catch((err) => {
      res.status(500).send({
        message: err.message || "Some error occurred while retrieving branch.",
      })
    })
}

exports.findAll = (req, res) => {
  let branchar = {}
  let branchDet = []
  Branch.find()
    .then(data => {
      data.forEach(branch => {
        branchar = {
          branchCode: branch.branchCode,
          branchName: branch.branchName,
          branchAddress: branch.branchAddress,
          branchPhone: branch.branchPhone,
          _active: branch._active
        }

        branchDet.push(branchar)
      })
      res.send(branchDet)
    })

    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving branch."
      })
    })
}


exports.findAllActive = (req, res) => {
  let branchar = {}
  let branchDet = []
  Branch.find({ _active: true })
    .then(data => {
      data.forEach(branch => {
        branchar = {
          branchCode: branch.branchCode,
          branchName: branch.branchName,
          branchAddress: branch.branchAddress,
          branchPhone: branch.branchPhone,
          _active: branch._active
        }

        branchDet.push(branchar)
      })
      res.send(branchDet)
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving branch."
      })
    })
}


exports.updateBranchbybranchCode = (req, res) => {
  const branchCode = req.params.branchCode

  Branch.findOneAndUpdate({ branchCode: branchCode }, { $set: req.body })
    .then(data => {

      if (!data) {
        res.status(404).send({
          message: `Cannot update Branch with branchCode=${branchCode}. Maybe Branch was not found!`,
        })
      } else res.send(true)
    })
    .catch((err) => {
      res.status(500).send({
        message: "Error updating Branch with branchCode=" + branchCode,
      })
    })
}













