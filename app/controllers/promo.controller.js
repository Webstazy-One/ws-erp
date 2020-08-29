const db = require("../models");
const { promo } = require("../models");
const Promo = db.promo;

exports.create = (req, res) => {
  if (!req.body.promoid) {
    res.status(400).send({ message: "Promo Content can not be empty!" });
    return;
  }

  const promo = new Promo({
    promoid: req.body.promoid,
    type: req.body.type,
    calc: req.body.calc,
    rate: req.body.rate,
    startdate: req.body.startdate,
    enddate: req.body.enddate,
    amount: req.body.amount,
    active: req.body.active ? req.body.active : false,
    applied_to_brand_name_iid: req.body.applied_to_brand_name_iid,
    desc: req.body.desc,
    calc: req.body.calc
  });

  promo
    .save(promo)
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while creating the promo."
      });
    });
};



// Find a single Promo with a promo id
exports.findOne = (req, res) => {
  const promoid = req.params.promoid;

  Promo.findById(promoid)
    .then(data => {
      if (!data)
        res.status(404).send({ message: "Not found Promo with promoid " + promoid });
      else res.send(data);
    })
    .catch(err => {
      res
        .status(500)
        .send({ message: "Error retrieving Promo with promoid=" + promoid });
    });
};

exports.update = (req, res) => {
  if (!req.body) {
    return res.status(400).send({
      message: "Data to update can not be empty!"
    });
  }

  const promoid = req.params.promoid;

  Promo.findOneAndUpdate(promoid, req.body, { useFindAndModify: false })
    .then(data => {
      if (!data) {
        res.status(404).send({
          message: `Cannot update Promo with id=${promoid}. Maybe Tutorial was not found!`
        });
      } else res.send({ message: "Promo was updated successfully." });
    })
    .catch(err => {
      res.status(500).send({
        message: "Error updating Promo with id=" + promoid
      });
    });
};

exports.delete = (req, res) => {
  const promoid = req.params.promoid;

  Promo.findOneAndRemove(promoid, { useFindAndModify: false })
    .then(data => {
      if (!data) {
        res.status(404).send({
          message: `Cannot delete promo with promoid=${promoid}. Maybe Promo was not found!`
        });
      } else {
        res.send({
          message: "Promo was deleted successfully!"
        });
      }
    })
    .catch(err => {
      res.status(500).send({
        message: "Could not delete Promo with promoid=" + promoid
      });
    });
};

exports.findAllActive = (req, res) => {
  Promo.find({ active: true })
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving Promo."
      });
    });
};
