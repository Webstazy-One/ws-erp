const db = require("../models")
const GRN = db.goodreceivednote
const Stock = db.stock
const Item = db.item



exports.create = (req, res) => {

  const goodreceivednote = new GRN({
    itemid : req.body.itemid ,
    branchCode: req.body.branchCode,
    dateTime: req.body.dateTime,
    qty : req.body.qty

  })
  goodreceivednote
    .save(goodreceivednote)
    .then(data => {
      res.status(201).send(data)
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while creating the GRN."
      })
    })

    Stock.findOneAndUpdate({ itemId: req.body.itemid, branchCode: req.body.branchCode }, { $inc: { currentStock: req.body.qty} })
    .then
    (data => {

      if (!data) {
        res.status(404).send({
          message: `Cannot update Stock with branchCode. Maybe Stock was not found!`,
        });
      } else {
        console.log("Stock updated suceesfully!")
      }
    })
    .catch((err) => {
      res.status(500).send({
        message: "Error updating Stock with branchCode" +err
      })
    })


    if (req.body.qty > 0) Item.updateOne({ itemId: req.body.itemid}, { $inc: { "historicalCount": req.body.qty } })

}

exports.findAll = (req, res) => {
  GRN.find()
      .then(data => {
        res.send(data)
      })
      .catch(err => {
        res.status(500).send({
          message:
            err.message || "Some error occurred while retrieving GRN."
        })
      })
  }
  
  exports.findOne = (req, res) => {
    const GRNId = req.params.GRNId
  
    GRN.findById(GRNId)
      .then(data => {
        if (!data)
          res.status(404).send({ message: "Not found GRN with GRNId " + GRNId })
        else res.send(data)
      })
      .catch(err => {
        res
          .status(500)
          .send({ message: "Error retrieving GRN with GRNId=" + GRNId })
      })
  }
  










