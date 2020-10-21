const db = require("../models")
const Item = db.item
const Promo = db.promo
const Counter = db.counter
const axios = require('axios')
const { count } = require("../models/user.model")
const { item } = require("../models")
const Brand = db.brand

exports.create = (req, res) => {

  saveItem = (item) => {

    return item
      .save(item)
      .then((data) => {
        return data
      })
      .catch((err) => {
        res.status(500).send({
          message: err.message || "Some error occurred while creating the Item."
        })
      })

  }

  // const sfName = req.body.name.replace(' ', '').replace('.', '').replace('/', '').replace('\\', '').replace('-', '').replace('=', '').replace(' ', '').replace('.', '').replace('/', '').replace('\\', '').replace('-', '').replace('=', '').replace(' ', '').replace('.', '').replace('/', '').replace('\\', '').replace('-', '').replace('=', '').replace(' ', '').replace('.', '').replace('/', '').replace('\\', '').replace('-', '').replace('=', '').replace(' ', '').replace('.', '').replace('/', '').replace('\\', '').replace('-', '').replace('=', '')
  const sfNameLast = req.body.name.replace(/[^\w\s+]/gi, '');
  const sfName = sfNameLast.replace(/\s/g, "");

  const item = new Item({
    barcodePrefix: req.body.barcodePrefix,
    brandName: req.body.brandName,
    name: req.body.name,
    name: req.body.name,
    sfName: sfName,
    desc: req.body.desc,
    tag: req.body.tag,
    price: req.body.price,
    cost: req.body.cost,
    historicalCount: 0,
    _active: true

  })

  saveItem(item).then((data) => {

    if (!req.body.barcodePrefix) {

      itemBarcode = data.barcodePrefix = ((data.id.substr(17, 14)))

      Item.findOneAndUpdate({ _id: data.id }, { $set: { barcodePrefix: itemBarcode } })
        .then(data => {

          if (!data) {
            res.status(404).send({
              message: `Cannot update item with barcodePrefix . Maybe item was not found!`
            })
          } else res.send(data.id)
        })
        .catch((err) => {
          res.status(500).send({
            message: "Error updating item with barcodePrefix"
          })
        })
    }

  }).catch((err) => {
    res.status(500).send({
      message: err.message || "Error updating barcode prefix"
    })
  })

}



exports.findByBrand = (req, res) => {
  var condition = req.params.br
    ? {
      brandName: req.params.br,
      _active: true
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
      barcodePrefix: { $regex: new RegExp(req.params.bc), $options: "i" },
      _active: true
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
  //const sfName = req.params.name.replace(' ', '').replace('.', '').replace('/', '').replace('\\', '').replace('-', '').replace('=', '')

  const sfNameLast = req.params.name.replace(/[^\w\s+]/gi, '')
  const sfName = sfNameLast.replace(/\s/g, "")


  var condition = sfName
    ? {
      //  sfName: req.params.name,
      sfName: { $regex: new RegExp(sfName), $options: "ix" },
      _active: true
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
<<<<<<< HEAD

      console.log(itemData)

=======
      console.log(itemData)
>>>>>>> dev
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
          if (itemData._active == true) {
            res.send(itemData)
          }
         else{
          res
          .status(500)
          .send({ message: "Not Found item with id=" + req.params.id + " "  });
         }

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
      const sfNameLast = data.name.replace(/[^\w\s+]/gi, '');
      sfNamef = sfNameLast.replace(/\s/g, "");
      Item.findOneAndUpdate({ _id: id }, { $set: { sfName: sfNamef } })
        .then(data => {

          if (!data) {
            res.status(404).send({
              message: `Cannot update item with sfName`,
            });
          } else res.send(true);
        })
        .catch((err) => {
          res.status(500).send({
            message: "Error updating item with sfNamef"
          })
        })

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

  Item.findByIdAndUpdate({ _id: id }, { $set: { _active: false } })
    .then(data => {

      if (!data) {
        res.status(404).send({
          message: `Cannot delete item with id=${_id}. Maybe item was not found!`
        })
      } else res.send(true)
    })
    .catch((err) => {
      res.status(500).send({
        message: err
      })
    })
}

exports.hotfix1 = (req, res) => {

  Item.find()
    .then(data => {

    })
    .catch((err) => {
      res.status(500).send({
        message: err
      })
    })
}




exports.findTopItems = (req, res) => {
  Item.find().sort({ price: -1 }).limit(100)
    .then(data => {
      res.send(data)

    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving Item."
      });
    });
};



exports.findBySubcategory = (req, res) => {
  let itemDt = []
 
  Brand.find({
    subCategory: req.params.subCategory,
    _active: true
  })
    .then((data) => {



      data.forEach(itemEntry => {
        if (!itemEntry.brandName || itemEntry.brandName === null) return
        var condition = itemEntry.brandName
          ? {
            brandName: itemEntry.brandName,
            _active: true
          }
          : {}

        Item.find(condition)
          .then((data) => {
            if (!data[0] || data === null) return
            itemDt = data

            // return itemDt
            console.log(data)
            
            res.send(data)
          }).catch(() => { })
          
      
      })


    }) 
    .catch((err) => {
      res.status(500).send({
        message: err.message || "Some error occurred while retrieving subCategory.",
      });
    });
}


checkItemnameBrandExisted = (req, res, next) => {

  Item.findOne({
    name: req.body.name,
    brandName: req.body.brandName
  }).exec((err, item) => {
    if (err) {
      res.status(500).send({ message: err });
      return;
    }

    if (item) {
      res.status(400).send({ message: "Duplicate Entry !. Item already exists" });
      return;
    }


    next();

  });
};

