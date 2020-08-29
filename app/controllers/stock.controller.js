const db = require("../models");
const Stock = db.stock;

// Create and Save a new stock
exports.create = (req, res) => {
  // Validate request
  if (!req.body.branch_CODE) {
    res.status(400).send({ message: "Content can not be empty!" });
    return;
  }

  // Create a stock
  const stock = new Stock({
    branch_CODE: req.body.branch_CODE,
    iid: req.body.iid,
    current_stock: req.body.current_stock
  });

  // Save stock in the database
  stock
    .save(stock)
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while creating the stock."
      });
    });
};

// Retrieve all stock from the database.
exports.findAll = (req, res) => {
  const branch_CODE = req.query.branch_CODE;
  var condition = branch_CODE ? { branch_CODE: { $regex: new RegExp(branch_CODE), $options: "i" } } : {};

  Stock.find(condition)
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving stock."
      });
    });
};



// Find a single stock with branch id
exports.findOne = (req, res) => {
  const iid = req.params.iid;

  Stock.findById(iid)
    .then(data => {
      if (!data)
        res.status(404).send({ message: "Not found stock with branch code" + branch_CODE });
      else res.send(data);
    })
    .catch(err => {
      res
        .status(500)
        .send({ message: "Error retrieving stock with branch code" + branch_CODE });
    });
};

//Find stock by branch code

exports.findByBranchCode = (req, res) => {
  const branch_code = req.params.bc;
  console.log(req.query);
  var condition = branch_code
    ? {
      branch_code: branch_code,
    }
    : {};

  Stock.find(condition)
    .then((data) => {
      res.send(data);
    })
    .catch((err) => {
      res.status(500).send({
        message: err.message || "Some error occurred while retrieving items.",
      });
    });
};




// Update a Stock by the branch code in the request
exports.update = (req, res) => {
  if (!req.body) {
    return res.status(400).send({
      message: "Data to update can not be empty!"
    });
  }

  const branch_CODE = req.params.branch_CODE;

  Stock.findOneAndUpdate(branch_CODE, req.body, { useFindAndModify: false })
    .then(data => {
      if (!data) {
        res.status(404).send({
          message: `Cannot update Stock with current_stock=${branch_CODE}. Maybe Stock was not found!`
        });
      } else res.send({ message: "Stock was updated successfully." });
    })
    .catch(err => {
      res.status(500).send({
        message: "Error updating Stock with current_stock=" + branch_CODE
      });
    });
};

