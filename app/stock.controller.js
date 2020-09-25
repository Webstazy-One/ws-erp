const { item } = require("../models")
const db = require("../models")
const Stock = db.stock
const Item = db.item

exports.create = (req, res) => {

  if (!req.body.branchCode) {
    res.status(400).send({ message: "Content can not be empty!" })
    return
  }

  const stock = new Stock({

    branchCode: req.body.branchCode,
    itemId: req.body.itemId,
    currentStock: req.body.currentStock
  });

  stock
    .save(stock)
    .then(data => {
      product = data.itemId
      console.log(product)
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while creating the stock."
      });
    });
};

exports.findByBranchCode = (req, res) => {
  const branchCode = req.params.bc;
  console.log(req.query);
  var condition = branchCode
    ? {
      branchCode: branchCode,
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

exports.findByItemId = (req, res) => {

  products = []

  const itemId = req.params.itemId;
  console.log(req.query);
  let condition = itemId
    ? {
      itemId: itemId,
    }
    : {};

  Stock.find(condition)
    .then((data) => {
      const id = req.params.itemId

      console.log(data)

      let stockDetails = {
        branchCode: data[0].branchCode,
        itemId: data[0].itemId,
        currentStock: data[0].currentStock


      }

      Item.findById(id)
        .then(itemData => {

          stockDetails.brandName = itemData.brandName,
            stockDetails.itemName = itemData.name

          console.log(products)
          if (!itemData) res.status(404).send({ message: "Not found stock with id " + id })

        })
        .catch(err => {
          res
            .status(500)
            .send({ message: err });
        }).finally(() => {
          res.send(stockDetails)
        })

    })

    .catch((err) => {
      res.status(500).send({
        message: err.message || "Some error occurred while creating the stock.",
      });
    });

}

exports.findAll = (req, res) => {
  Stock.find()
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


// exports.stockUpdated = (req, res) => {
//   const branchCode = req.params.branchCode
//   const itemId = req.params.itemId
//   Stock.updateOne({ branchCode: branchCode, itemId: itemId }, { $inc: { "currentStock": req.params.qty } })
//     .then(data => {
//       if (!data) {
//         res.status(404).send({
//           message: `Cannot update currentStock=${currentStock}`
//         })
//       } else res.send('K');
//     })
//     .catch((err) => {
//       res.status(500).send({
//         message: "Error updating currentStock=" + currentStock
//       })
//     })
// }

// exports.updateCurrentStock = (req, res) => {
//   const branchCode = req.params.branchCode;
//   const itemId = req.body.itemId;
//   const currentStock = req.params.currentStock;

//   Stock.updateOne({itemId:itemId },{$set: {currentStock:currentStock}})
//   .then(data => {

//         if (!data) {
//         res.status(404).send({
//           message: `Cannot update stock with current stock =${currentStock}`,
//         });
//       } else res.send(true);
//     })
//     .catch((err) => {
//       res.status(500).send({
//         message: "Error updating stock with current stock =" + currentStock,
//       });
//     });
// }


// exports.stockUpdate = (req, res) => {
//   const branchCode = req.params.branchCode;
//   const itemId = req.params.itemId;
//   const currentStock = req.params.currentStock;

//   Stock.findOneAndUpdate({branchCode: branchCode,itemId:itemId},{$inc: {currentStock:req.params.qty }})
//   .then(data => {
//          if (!data) {
//         res.status(404).send({
//           message: `Cannot update currentStock=${currentStock}`,
//         });
//       } else res.send(true);
//     })
//     .catch((err) => {
//       res.status(500).send({
//         message: "Error updating currentStock=" + currentStock,
//       });
//     });

// }

