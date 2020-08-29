const db = require("../models");
const Tag = db.tag;


exports.create = (req, res) => {
  // Create a Tag
  const tag = new Tag
    ({
      tag: req.body.tag
    });

  // Save Tag in the database
  tag
    .save(tag)
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send
        ({
          message: err.message || "Some error occurred while creating the Tag data"
        });
    });
};

//Retrieve all Tags find by tags from the database:
exports.findAll = (req, res) => {
  const tag = req.query.tag;
  var condition = tag ? { tag: { $regex: new RegExp(tag), $options: "i" } } : {};

  Tag.find(condition)
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message: err.message || "Some error occurred while retrieving Tags."
      });
    });
};

//Find a single Reapir with an id:
exports.findOne = (req, res) => {
  const id = req.params.id;

  Tag.findById(id)
    .then(data => {
      if (!data)
        res.status(404).send({ message: "Not found Item with tag id " + id });
      else res.send(data);
    })

    .catch(err => {
      res
        .status(500)
        .send({ message: "Error retrieving Tag with id=" + id });
    });
};

//update value using ID
exports.update = (req, res) => {
  if (!req.body) {
    return res.status(400).send
      ({
        message: "Data to update can not be empty!"
      });
  }

  const id = req.params.id;
  Tag.findByIdAndUpdate(id, req.body, { useFindAndModify: false })
    .then(data => {
      if (!data) {
        res.status(404).send({
          message: `Cannot update Tag with id=${id}. Maybe Tag was not found!`
        });
      }
      else res.send({ message: "Tag was updated successfully." });
    })
    .catch(err => {
      res.status(500).send
        ({
          message: "Error updating Tag with id=" + id
        });
    });
};


//Delete a Tag with the specified id:
exports.delete = (req, res) => {
  const id = req.params.id;

  Tag.findByIdAndRemove(id)
    .then(data => {
      if (!data) {
        res.status(404).send({
          message: `Cannot delete Tag with id=${id}. Maybe Tag was not found!`
        });
      }
      else {
        res.send({
          message: "Tag was deleted successfully!"
        });
      }
    })
    .catch(err => {
      res.status(500).send({
        message: "Could not delete Tag with id=" + id
      });
    });
};

//Delete all Repairs from the database:
exports.deleteAll = (req, res) => {
  Tag.deleteMany({})
    .then(data => {
      res.send({
        message: `${data.deletedCount} Tag were deleted successfully!`
      });
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while removing all tags."
      });
    });
};