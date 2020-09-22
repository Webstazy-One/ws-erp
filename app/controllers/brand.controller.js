const db = require("../models");
const Brand = db.brand;


exports.create = (req, res) => {

  if (!req.body.brandName) {
    res.status(400).send({ message: "Content can not be empty!" });
    return;
  }
  const brands = new Brand({

    brandName: req.body.brandName.toUpperCase(),
    _active: true,
  });


  brands
    .save(brands)
    .then((data) => {
      res.send(data);
    })
    .catch((err) => {
      res.status(500).send({
        message: err.message || "Some error occurred while creating the brand.",
      });
    });
};


exports.findByBrandName = (req, res) => {
  const brandName = req.params.brandName;
  console.log(req.query);
  var condition = brandName
    ? {
      brandName: { $regex: new RegExp(req.params.brandName), $options: "i" },
    }
    : {};

  Brand.find(condition)
    .then((data) => {
      res.send(data);
    })
    .catch((err) => {
      res.status(500).send({
        message: err.message || "Some error occurred while retrieving brands.",
      });
    });
};


exports.findAll = (req, res) => {
  Brand.find()
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving brand."
      });
    });
};

exports.findAllActive = (req, res) => {
  Brand.find({ _active: true })
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving Brand."
      });
    });
};


exports.updateBrandByBrandName = (req, res) => {
  const brandName = req.params.brandName;

  Brand.findOneAndUpdate({brandName: brandName},{$set: req.body})
  .then(data => {

     if (!data) {
        res.status(404).send({
          message: `Cannot update Brand with brandName=${brandName}. Maybe Brand was not found!`,
        });
      } else res.send(true);
    })
    .catch((err) => {
      res.status(500).send({
        message: "Error updating Brand with brandName=" + brandName,


      });
    });
}


exports.DeleteFromBrandName = (req, res) => {
  const brandName= req.params.brandName;
 
  Brand.findOneAndUpdate({brandName: brandName},{$set:{_active: false} })
  .then(data => {
 
         if (!data) {
        res.status(404).send({
          message: `Cannot delete brand with brandName=${brandName}. Maybe brand was not found!`,
        });
      } else res.send(true);
    })
    .catch((err) => {
      res.status(500).send({
        message: err,
      });
    });
 }