const db = require("../models");
const Item = db.item;

exports.create = (req, res) => {

  if (!req.body.barcode) {
    res.status(400).send({ message: "Content can not be empty!" });
    return;
  }

  const item = new Item({
    name: req.body.name,
    barcode: req.body.barcode,
    desc: req.body.desc,
    price: req.body.price,
    _active: req.body._active,
    tag: req.body.tag,
    brandname: req.body.brandname,
  });

  item
    .save(item)
    .then((data) => {
      res.send(data);
    })
    .catch((err) => {
      res.status(500).send({
        message: err.message || "Some error occurred while creating the Item.",
      });
    });
};

exports.findOne = (req, res) => {

  Item.findById(req.params.id)
    .then(data => {
      if (data){
        
        res.send(data)
      }
      else res.status(404).send({ message: "Not found" })
    })
    .catch(err => {
      res
        .status(500)
        .send({ message: "Yikes! Error retrieving Item." });
    });
};

exports.update = (req, res) => {
  if (!req.body) {
    return res.status(400).send({
      message: "Data to update can not be empty!",
    });
  }

  const id = req.params.id;

  Item.findOneAndUpdate(id, req.body, { useFindAndModify: false })
    .then((data) => {
      if (!data) {
        res.status(404).send({
          message: `Cannot update item with id=${id}. Maybe Item was not found!`,
        });
      } else res.send({ message: "Item was updated successfully." });
    })
    .catch((err) => {
      res.status(500).send({
        message: "Error updating Item with id=" + id,
      });
    });
};

exports.findAllActive = (req, res) => {
  Item.find({ _active: true })
    .then((data) => {
      res.send(data);
    })
    .catch((err) => {
      res.status(500).send({
        message: err.message || "Some error occurred while retrieving Item.",
      });
    });
};

exports.findByBrand = (req, res) => {
  var condition = req.params.br
    ? {
      brandname: { $regex: new RegExp(req.params.br), $options: "i" },
    }
    : {};

  Item.find(condition)
    .then((data) => {
      res.send(data);
    })
    .catch((err) => {
      res.status(500).send({
        message: err.message || "Some error occurred while retrieving items.",
      });
    });
};

exports.findByName = (req, res) => {
  var condition = req.params.nm
    ? {
      name: { $regex: new RegExp(req.params.nm), $options: "i" },
    }
    : {};

  Item.find(condition)
    .then((data) => {
      res.send(data);
    })
    .catch((err) => {
      res.status(500).send({
        message: err.message || "Some error occurred while retrieving items.",
      });
    });
};

exports.findBybarcode = (req, res) => {
  const barcode = req.params.bc;
  var condition = barcode
    ? {
      barcode: { $regex: new RegExp(req.params.bc), $options: "i" },
    }
    : {};

  Item.find(condition)
    .then((data) => {
      res.send(data);
    })
    .catch((err) => {
      res.status(500).send({
        message: err.message || "Some error occurred while retrieving items.",
      });
    });
};

exports.findByItemId = (req, res) => {
  const id = req.params.id;
  var condition = id
    ? {
      _id : { $regex: new RegExp(id), $options: "i" },
    }
    : {};

  Item.find(condition)
    .then((data) => {
      res.send(data);
    })
    .catch((err) => {
      res.status(500).send({
        message: err.message || "Some error occurred while retrieving items.",
      });
    });
};

exports.updateOne = (req, res) => {
  const _active = req.params.du;
  var condition = _active
    ? {
      _active: true,
    }
    : {};
  Item.find(condition)
    .then((_active) => {
      res.send({ id: "i" }, { $set: { _active: "false" } });
    })

    .catch((err) => {
      res.status(500).send({
        message: err.message || "Some error occurred while updating active status as false.",
      });
    });
}