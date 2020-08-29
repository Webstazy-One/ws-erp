const db = require("../models");
const Repair = db.repair;


exports.create = (req, res) =>     // Validate request
{
  if (!req.body.jobcardid) {
    res.status(400).send({ message: "Content can not be empty!" });
    return;
  }

  // Create a Repair
  const repair = new Repair
    ({
      jobcardid: req.body.jobcardid,
      pid: req.body.pid,
      custphone: req.body.custphone,
      date_time: req.body.date_time,
      description: req.body.description,
      status: req.body.status
    });

  // Save Repair in the database
  repair
    .save(repair)
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send
        ({
          message: err.message || "Some error occurred while creating the Repair data"
        });
    });
};

//Retrieve all Repairs/ find by repair from the database:
exports.findAll = (req, res) => {
  const repair = req.query.jobcardid;
  var condition = repair ? { jobcardid: { $regex: new RegExp(jobcardid), $options: "i" } } : {};

  Repair.find(condition)
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message: err.message || "Some error occurred while retrieving repair."
      });
    });
};

//Find a single Reapir with an id:
exports.findOne = (req, res) => {
  const id = req.params.id;

  Repair.findById(id)
    .then(data => {
      if (!data)
        res.status(404).send({ message: "Not found Item with id " + id });
      else res.send(data);
    })

    .catch(err => {
      res
        .status(500)
        .send({ message: "Error retrieving Reapir with id=" + id });
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
  Repair.findByIdAndUpdate(id, req.body, { useFindAndModify: false })
    .then(data => {
      if (!data) {
        res.status(404).send({
          message: `Cannot update Repair with id=${id}. Maybe Repair was not found!`
        });
      }
      else res.send({ message: "Repair was updated successfully." });
    })
    .catch(err => {
      res.status(500).send
        ({
          message: "Error updating Repair with id=" + id
        });
    });
};


//Delete a Repair with the specified id:
exports.delete = (req, res) => {
  const id = req.params.id;

  Repair.findByIdAndRemove(id)
    .then(data => {
      if (!data) {
        res.status(404).send({
          message: `Cannot delete Repair with id=${id}. Maybe Reapir was not found!`
        });
      }
      else {
        res.send({
          message: "Repair was deleted successfully!"
        });
      }
    })
    .catch(err => {
      res.status(500).send({
        message: "Could not delete Reapir with id=" + id
      });
    });
};

//Delete all Repairs from the database:
exports.deleteAll = (req, res) => {
  Repair.deleteMany({})
    .then(data => {
      res.send({
        message: `${data.deletedCount} Repair were deleted successfully!`
      });
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while removing all reapirs."
      });
    });
};