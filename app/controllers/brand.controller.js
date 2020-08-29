const db = require("../models");
const Brand = db.brand;

// Create and Save a new brand
exports.create = (req, res) => {
  // Validate request
  if (!req.body.brand_name) {
    res.status(400).send({ message: "Content can not be empty!" });
    return;
  }

  // Create a brand
  const brands = new Brand({
    brand_name: req.body.brand_name,
    _active: req.body._active,
  });

  // Save Brand in the database
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

// Retrieve all brand from the database.
exports.findAll = (req, res) => {
  const brand_name = req.query.brand_name;
  var condition = brand_name
    ? { brand_name: { $regex: new RegExp(brand_name), $options: "i" } }
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

// Find a single brand with brand name
exports.findOne = (req, res) => {
  const brand_name = req.params.brand_name;

  Brand.findById(brand_name)
    .then((data) => {
      if (!data)
        res
          .status(404)
          .send({ message: "Not found brand with brand name " + brand_name });
      else res.send(data);
    })
    .catch((err) => {
      res.status(500).send({
        message: "Error retrieving brand with brand name=" + brand_name,
      });
    });
};

// Update a brand by the brand name
exports.update = (req, res) => {
  if (!req.body) {
    return res.status(400).send({
      message: "Data to update can not be empty!",
    });
  }

  const id = req.params.id;

  Brand.findOneAndUpdate(id, req.body, { useFindAndModify: false })
    .then((data) => {
      if (!data) {
        res.status(404).send({
          message: `Cannot update brand with id=${id}. Maybe brand was not found!`,
        });
      } else res.send({ message: "Brand was updated successfully." });
    })
    .catch((err) => {
      res.status(500).send({
        message: "Error updating brand with id=" + id,
      });
    });
};

// Delete a brand with brand name in the request
exports.delete = (req, res) => {
  const id = req.params.id;

  Brand.findOneAndRemove(id, { useFindAndModify: false })
    .then((data) => {
      if (!data) {
        res.status(404).send({
          message: `Cannot delete Brand with id=${id}. Maybe Brand was not found!`,
        });
      } else {
        res.send({
          message: "Brand  was deleted successfully!",
        });
      }
    })
    .catch((err) => {
      res.status(500).send({
        message: "Could not delete Brand with id=" + id,
      });
    });
};
