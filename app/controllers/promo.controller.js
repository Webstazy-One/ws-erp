const db = require("../models");
const { promo } = require("../models");
const Promo = db.promo;
const Item = db.item;

exports.create = (req, res) => {

  const promo = new Promo({
    desc: req.body.desc,
    type: req.body.type,
    rate: req.body.rate,
    startDate: req.body.startDate,
    endDate: req.body.endDate,
    calc: req.body.calc,
    amount: req.body.amount,
    appliedto: req.body.appliedto,
    _active: true
  })

  promo
    .save(promo)
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while creating the promo."
      })
    })
}

exports.findAll = (req, res) => {
  Promo.find()
    .then(data => {
      res.send(data)
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving promo."
      });
    });
};



exports.findAllActive = (req, res) => {
  Promo.find({ _active: true })
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


exports.findByBrandName = (req, res) => {
  const appliedto = req.params.brandName;
  console.log(req.query);
  var condition = appliedto
    ? {
      appliedto: { $regex: new RegExp(req.params.brandName), $options: "i" },
    }
    : {};

  Promo.find(condition)
    .populate('item')
    .then((data) => {
      res.send(data);
    })
    .catch((err) => {
      res.status(500).send({
        message: err.message || "Some error occurred while retrieving Promo.",
      });
    });
};


exports.findOne = (req, res) => {
  const promoId = req.params.promoId;

  Promo.findById(promoId)
    .then(data => {
      if (!data)
        res.status(404).send({ message: "Not found promo with promoId " + promoId });
      else res.send(data);
    })
    .catch(err => {
      res
        .status(500)
        .send({ message: "Error retrieving promo with promoId=" + promoId });
    });
};


exports.findByItemId = (req, res) => {
  const appliedto = req.params.itemId;
  console.log(req.query);
  var condition = appliedto
    ? {
      appliedto: { $regex: new RegExp(req.params.itemId), $options: "i" },
    }
    : {};

  Promo.find(condition)
    .populate('item')
    .then((data) => {
      res.send(data);
    })
    .catch((err) => {
      res.status(500).send({
        message: err.message || "Some error occurred while retrieving Promo.",
      });
    });
};

exports.DeleteFromPromoId = (req, res) => {
  const promoId = req.params.promoId;

  Promo.findOneAndUpdate({ _id: promoId }, { $set: { _active: false } })
    .then(data => {

      if (!data) {
        res.status(404).send({
          message: `Cannot delete promo with promoId=${promoId}. Maybe promo was not found!`,
        });
      } else res.send(true);
    })
    .catch((err) => {
      res.status(500).send({
        message: "Error deleting promo with promoId =" + promoId,
      });
    });
}




