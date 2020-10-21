const db = require("../models")
const Repair = db.repair


exports.create = (req, res) => {

  const repair = new Repair
    ({
      jobcardId: req.body.jobcardId,
      custPhone: req.body.custPhone,
      iid: req.body.iid,
      description: req.body.description,
      remark: req.body.remark ? req.body.remark : [false, false, false, false, false, false, false, false,false],
      deliveryDate: req.body.deliveryDate,
      cost: req.body.cost,
      payment: req.body.payment,
      status: req.body.status ? req.body.status : "ACCEPTED"
    })


  repair
    .save(repair)
    .then(data => {
      res.send(data)
    })
    .catch(err => {
      res.status(500).send
        ({
          message: err.message || "Some error occurred while creating the Repair data"
        })
    })
}



exports.findAll = (req, res) => {
  Repair.find()
    .then(data => {
      res.send(data)
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving repair."
      })
    })
}


exports.findByJobCardId = (req, res) => {
  const jobcardId = req.params.jobcardId
  console.log(req.query)
  var condition = jobcardId
    ? {
      jobcardId: jobcardId
    }
    : {}

  Repair.find(condition)
    .then((data) => {
      res.send(data)
    })
    .catch((err) => {
      res.status(500).send({
        message: err.message || "Some error occurred while searching repair with jobcardId."
      })
    })
}

exports.findByCustNo = (req, res) => {
  const custPhone = req.params.custno
  console.log(req.query)
  var condition = custPhone
    ? {
      custPhone: custPhone
    }
    : {}

  Repair.find(condition)
    .then((data) => {
      res.send(data);
    })
    .catch((err) => {
      res.status(500).send({
        message: err.message || "Some error occurred while searching repair with phone number."
      })
    })
}

exports.updateRepairByJcId = (req, res) => {
  const jobcardId = req.params.jobcardId

  Repair.findOneAndUpdate({ jobcardId: jobcardId }, { $set: req.body })
    .then(data => {

      if (!data) {
        res.status(404).send({
          message: `Cannot update Repair with jobcardId=${jobcardId}. Maybe Repair was not found!`
        })
      } else res.send(true);
    })
    .catch((err) => {
      res.status(500).send({
        message: "Error updating Repair with jobcardIdCode=" + jobcardId,


      })
    })
}



exports.findLast = (req, res) => {
  Repair.findOne().sort({ 'createdAt': -1 }).limit(1).then(data => {
    res.send(data.jobcardId)
  })
}

exports.DeleteFromJobCardId = (req, res) => {
  const jobcardId = req.params.jobcardId

  Repair.findOneAndRemove({ jobcardId: jobcardId }, { $set: req.body })
    .then(data => {

      if (!data) {
        res.status(404).send({
          message: `Cannot delete repair details=${jobcardId}.`
        })
      } else res.send(true)
    })
    .catch((err) => {
      res.status(500).send({
        message: err
      })
    })
}

exports.findAwaitRepairs = (req, res) => {
  Repair.find({ status : req.params.status })
    .then((data) => {
      res.send(data);
    })
    .catch((err) => {
      res.status(500).send({
        message: err.message || "Some error occurred while retrieving repair."
      })
    })
}

