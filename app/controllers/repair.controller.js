const db = require("../models")
const Repair = db.repair


exports.create = (req, res) => {

    const repair = new Repair({
        jobcardId: req.body.jobcardId,
        custPhone: req.body.custPhone,
        custPhone2: req.body.custPhone2,
        iid: req.body.iid,
        description: req.body.description,
        remark: req.body.remark ? req.body.remark : [false, false, false, false, false, false, false, false, false],
        deliveryDate: req.body.deliveryDate,
        cost: req.body.cost,
        payment: req.body.payment,
        paymethod: req.body.paymethod,
        status: req.body.status ? req.body.status : "ACCEPTED",
        technicianName: req.body.technicianName,
        internalNotes: req.body.internalNotes,
        branchCode: req.body.branchCode,
        acceptedBranchCode: req.body.acceptedBranchCode
    })


    repair
        .save(repair)
        .then(data => {
            res.send(data)
        })
        .catch(err => {
            res.status(500).send({
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
                    iid: rep.iid,
                    description: rep.description,
                    remark: rep.remark,
                    deliveryDate: rep.deliveryDate,
                    cost: rep.cost,
                    payment: rep.payment,
                    status: rep.status,
                    technicianName: rep.technicianName,
                    internalNotes: rep.internalNotes,
                    branchCode: rep.branchCode,
                    acceptedBranchCode: rep.acceptedBranchCode
                }
                repDet.push(repar)
            })
            res.send(repDet)
        })
        .catch(err => {
            res.status(500).send({
                message: err.message || "Some error occurred while retrieving repair."
            })
        })
}


exports.findByJobCardId = (req, res) => {
    const jobcardId = req.params.jobcardId
    console.log(req.query)
    var condition = jobcardId ? {
        jobcardId: jobcardId
    } : {}

    Repair.find(condition)
        .then((data) => {
            let rep = {
                jobcardId: data[0].jobcardId,
                custPhone: data[0].custPhone,
                iid: data[0].iid,
                description: data[0].description,
                remark: data[0].remark,
                deliveryDate: data[0].deliveryDate,
                cost: data[0].cost,
                payment: data[0].payment,
                status: data[0].status,
                technicianName: data[0].technicianName,
                internalNotes: data[0].internalNotes,
                branchCode: data[0].branchCode,
                acceptedBranchCode: data[0].acceptedBranchCode
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
    var condition = custPhone ? {
        custPhone: custPhone
    } : {}

    Repair.find(condition)
        .then((data) => {
            data.forEach(rep => {
                repar = {
                    jobcardId: rep.jobcardId,
                    custPhone: rep.custPhone,
                    iid: rep.iid,
                    description: rep.description,
                    remark: rep.remark,
                    deliveryDate: rep.deliveryDate,
                    cost: rep.cost,
                    payment: rep.payment,
                    status: rep.status,
                    technicianName: rep.technicianName,
                    internalNotes: rep.internalNotes,
                    branchCode: rep.branchCode,
                    acceptedBranchCode: rep.acceptedBranchCode

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

    Repair.findOneAndUpdate({ jobcardId: jobcardId }, {
            $set:

            {
                jobcardId: req.body.jobcardId,
                custPhone: req.body.custPhone ? req.body.custPhone : data[0].custPhone,
                iid: req.body.iid ? req.body.iid : data[0].iid,
                description: req.body.description ? req.body.description : data[0].description,
                status: req.body.status ? req.body.status : data[0].status,
                deliveryDate: req.body.deliveryDate ? req.body.deliveryDate : data[0].deliveryDate,
                cost: req.body.cost ? req.body.cost : data[0].cost,
                technicianName: req.body.technicianName ? req.body.technicianName : data[0].technicianName,
                internalNotes: req.body.internalNotes ? req.body.internalNotes : data[0].internalNotes,
                branchCode: req.body.branchCode ? req.body.branchCode : data[0].branchCode,
                acceptedBranchCode: req.body.acceptedBranchCode ? req.body.acceptedBranchCode : data[0].acceptedBranchCode

            }
        }, { useFindAndModify: false })
        .then(data => {

            if (!data) {
                res.status(404).send({
                    message: `Cannot update Repair with jobcardId=${jobcardId}. Maybe Repair was not found!`
                })
            } else {



                Repair.find({ jobcardId: req.params.jobcardId })
                    .then((data) => {


                        if (req.body.payment != null) {
                            let paymentnew = []

                            let paymentold = req.body.payment
                            paymentold.toString()
                            paymentnew = data[0].payment


                            paymentnew.push(paymentold.toString())


                            Repair.findOneAndUpdate({ jobcardId: req.params.jobcardId }, { $set: { payment: paymentnew } }, { useFindAndModify: false })
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
                    })
                    .catch((err) => {
                        res.status(500).send({
                            message: err.message || "Some error occurred while searching repair with jobcardId."
                        })
                    })
            }
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
    Repair.find({ status: req.params.status })
        .then((data) => {
            data.forEach(rep => {
                repar = {
                    jobcardId: rep.jobcardId,
                    custPhone: rep.custPhone,
                    iid: rep.iid,
                    description: rep.description,
                    remark: rep.remark,
                    deliveryDate: rep.deliveryDate,
                    cost: rep.cost,
                    payment: rep.payment,
                    status: rep.status,
                    technicianName: rep.technicianName,
                    internalNotes: rep.internalNotes,
                    branchCode: rep.branchCode,
                    acceptedBranchCode: rep.acceptedBranchCode
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