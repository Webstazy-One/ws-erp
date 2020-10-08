const db = require("../models");
const Item = db.item
const Promo = db.promo
const Counter = db.counter
const axios = require('axios');
const { count } = require("../models/user.model");
const { item } = require("../models");



exports.create = (req, res) => {


  const item = new Item({
    barcodePrefix: req.body.barcodePrefix,
    brandName: req.body.brandName,
    name: req.body.name,
    desc: req.body.desc,
    tag: req.body.tag,
    price: req.body.price,
    cost: req.body.cost,
    historicalCount: 0,
    _active: true

  })

  item
    .save(item)
    .then((data) => {
      console.log(data.id)
      itemBarcode = data.barcodePrefix = ((data.id.substr(17, 14)))

      if (!req.body.barcodePrefix) {

        Item.findOneAndUpdate({ _id: data.id }, { $set: { barcodePrefix: itemBarcode } })
          .then(data => {

            if (!data) {
              res.status(404).send({
                message: `Cannot update item with barcodePrefix . Maybe item was not found!`
              })
            } else res.send(true)
          })
          .catch((err) => {
            res.status(500).send({
              message: "Error updating item with barcodePrefix"
            })
          })
      }
      console.log(data.barcodePrefix)
      res.status(201).send(data)

    })
    .catch((err) => {
      res.status(500).send({
        message: err.message || "Some error occurred while creating the Item."
      })
    })
}



exports.findByBrand = (req, res) => {
  var condition = req.params.br
    ? {
      brandName: { $regex: new RegExp(req.params.br), $options: "i" }
    }
    : {}

  Item.find(condition)
    .then((data) => {
      res.send(data);
    })
    .catch((err) => {
      res.status(500).send({
        message: err.message || "Some error occurred while retrieving items."
      })
    })
}

exports.findBybarcode = (req, res) => {
  const barcodePrefix = req.params.bc;
  console.log(req.query);
  var condition = barcodePrefix
    ? {
      barcodePrefix: { $regex: new RegExp(req.params.bc), $options: "i" }
    }
    : {}

  Item.find(condition)
    .then((data) => {
      res.send(data);
    })
    .catch((err) => {
      res.status(500).send({
        message: err.message || "Some error occurred while retrieving items."
      })
    })
}


exports.findByName = (req, res) => {
  const name = req.params.name
  console.log(req.query)
  var condition = name
    ? {
      name: { $regex: new RegExp(req.params.name), $options: "i" }
    }
    : {}

  Item.find(condition)
    .then((data) => {
      res.send(data)
    })
    .catch((err) => {
      res.status(500).send({
        message: err.message || "Some error occurred while retrieving items."
      })
    })
}


exports.findOne = (req, res) => {


  let nDate = new Date().toISOString('en-US', {
    timeZone: 'Asia/Calcutta'
  })

  Item.findById(req.params.id)
    .then(itemData => {

      console.log(itemData)

      Promo.find(


        { appliedto: req.params.id, startDate: { $lt: nDate }, endDate: { $gte: nDate } }


      )
        .then(promoData => {


          if (!promoData[0] == null) {

            if (promoData[0].type == "ITEM") {

              if (promoData[0].calc == "PERCENTAGE") {
                console.log("ITEM Percentage")
                itemData.disValue = itemData.price * promoData[0].rate,
                  itemData.actualPrice = itemData.price - itemData.disValue


              } else if (promoData[0].calc == "FLAT") {
                console.log("ITEM FLAT")

                itemData.disValue = promoData[0].rate,
                  itemData.actualPrice = itemData.price - promoData[0].rate
              }


            } else if (promoData[0].type == "BRAND") {

              console.log("BRAND type")

              if (promoData[0].calc == "PERCENTAGE") {
                console.log("BRAND Percentage")
                itemData.disValue = itemData.price * promoData[0].rate,
                  itemData.actualPrice = itemData.price - itemData.disValue


              } else if (promoData[0].calc == "FLAT") {
                console.log("BRAND FLAT")

                itemData.disValue = promoData[0].rate,
                  itemData.actualPrice = itemData.price - promoData[0].rate
              }



            }
          } else {
            itemData.disValue = 0
            itemData.actualPrice = itemData.price
          }


        }

        ).finally(() => {
          res.send(itemData)

          //    itemData.disValue = itemData.price * promoData[0].rate
        })

    })
    .catch(err => {
      res
        .status(500)
        .send({ message: "Error retrieving item with id=" + req.params.id + " " + err })
    })
}

exports.findAll = (req, res) => {
  Item.find()
    .then(data => {
      res.send(data)
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving promo."
      })
    })
}

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

exports.update = (req, res) => {
  if (!req.body) {
    return res.status(400).send({
      message: "Data to update can not be empty!"
    });
  }

  const id = req.params.id;

  Item.findByIdAndUpdate(id, req.body, { useFindAndModify: false })
    .then(data => {
      if (!data) {
        res.status(404).send({
          message: `Cannot update Item with id=${id}. Maybe Item was not found!`
        });
      } else res.send(true);
    })
    .catch(err => {
      res.status(500).send({
        message: "Error updating Item with id=" + id
      })
    })
}


exports.updatePriceById = (req, res) => {
  const id = req.params.id
  const price = req.params.price

  Item.findOneAndUpdate({ _id: id }, { $set: { price: price } })
    .then(data => {

      if (!data) {
        res.status(404).send({
          message: `Cannot update item with price=${price}. Maybe item was not found!`,
        });
      } else res.send(true);
    })
    .catch((err) => {
      res.status(500).send({
        message: "Error updating item with price=" + price
      })
    })
}

exports.DeleteFromItemId = (req, res) => {
  const id = req.params.iid

  Item.findByIdAndUpdate({ id: id }, { $set: { _active: false } })
    .then(data => {

      if (!data) {
        res.status(404).send({
          message: `Cannot delete item with id=${id}. Maybe item was not found!`
        })
      } else res.send(true)
    })
    .catch((err) => {
      res.status(500).send({
        message: err
      })
    })
}



