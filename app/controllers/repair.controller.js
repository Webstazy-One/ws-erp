const db = require("../models")
const Repair = db.repair


exports.create = (req, res) => {

  const repair = new Repair
    ({
      jobcardId: req.body.jobcardId,
      custPhone: req.body.custPhone,
      custPhone2: req.body.custPhone2,
      iid: req.body.iid,
      description: req.body.description,
      remark: req.body.remark ? req.body.remark : [false, false, false, false, false, false, false, false,false],
      deliveryDate: req.body.deliveryDate,
      cost: req.body.cost,
      payment: req.body.payment,
      paymethod: req.body.paymethod,
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
  let repar = {}
  let repDet = []
  Repair.find()
    .then(data => {
      data.forEach(rep => {
        repar = {
          jobcardId: rep.jobcardId,
          custPhone: rep.custPhone,
          custPhone2: rep.custPhone2,
          paymethod:  rep.paymethod,
          iid: rep.iid,
          description: rep.description,
          remark: rep.remark,
          deliveryDate: rep.deliveryDate,
          cost: rep.cost,
          payment: rep.payment,
          status: rep.status
        }
        repDet.push(repar)
      })
      res.send(repDet)
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
      let rep = {
        jobcardId: data[0].jobcardId,
        custPhone: data[0].custPhone,
        custPhone2: data[0].custPhone2,
        paymethod: data[0].paymethod,
        iid: data[0].iid,
        description: data[0].description,
        remark: data[0].remark,
        deliveryDate: data[0].deliveryDate,
        cost: data[0].cost,
        payment: data[0].payment,
        status: data[0].status
      }
      res.send(rep)
    })
    .catch((err) => {
      res.status(500).send({
        message: err.message || "Some error occurred while searching repair with jobcardId."
      })
    })
}

exports.findByCustNo = (req, res) => {
  let repar = {}
  let repDet = []
  const custPhone = req.params.custno
  console.log(req.query)
  var condition = custPhone
    ? {
      custPhone: custPhone
    }
    : {}

  Repair.find(condition)
    .then((data) => {
      data.forEach(rep => {
        repar = {
          jobcardId: rep.jobcardId,
          custPhone: rep.custPhone,
          custPhone2: rep.custPhone2,
          paymethod:  rep.paymethod,
          iid: rep.iid,
          description: rep.description,
          remark: rep.remark,
          deliveryDate: rep.deliveryDate,
          cost: rep.cost,
          payment: rep.payment,
          status: rep.status
        }
        repDet.push(repar)
      })
      res.send(repDet)
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
      } else res.send(true)
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
  let repar = {}
  let repDet = []
  Repair.find({ status : req.params.status })
    .then((data) => {
      data.forEach(rep => {
        repar = {
          jobcardId: rep.jobcardId,
          custPhone: rep.custPhone,
          custPhone2: rep.custPhone2,
          paymethod:  rep.paymethod,
          iid: rep.iid,
          description: rep.description,
          remark: rep.remark,
          deliveryDate: rep.deliveryDate,
          cost: rep.cost,
          payment: rep.payment,
          status: rep.status
        }
        repDet.push(repar)
      })
      res.send(repDet)
    })
    .catch((err) => {
      res.status(500).send({
        message: err.message || "Some error occurred while retrieving repair."
      })
    })
}

