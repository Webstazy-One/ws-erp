const { item, stock } = require("../models")
const db = require("../models")
const { findLast } = require("./invoice.controller")
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
  })
  stock
    .save(stock)
    .then(data => {
      if (req.body.branchCode == "WAREH") {
        data.lastBarcode = 0
      }
      product = data.itemId
      console.log(product)
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while creating the stock."
      })
    })
}

exports.findByBranchCode = (req, res) => {
  const branchCode = req.params.bc;
  console.log(req.query);
  var condition = branchCode
    ? {
      branchCode: branchCode
    }
    : {};
  Stock.find(condition)
    .then((data) => {
      res.send(data)
    })
    .catch((err) => {
      res.status(500).send({
        message: err.message || "Some error occurred while retrieving items."
      })
    })
}

exports.findByItemId = (req, res) => {
  products = []
  const itemId = req.params.itemId
  console.log(req.query)
  let condition = itemId
    ? {
      itemId: itemId
    }
    : {}
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
          stockDetails.brandName = itemData.brandName
          stockDetails.itemName = itemData.name
          console.log(products)
          if (!itemData) res.status(404).send({ message: "Not found stock with id " + id })
        })
        .catch(err => {
          res
            .status(500)
            .send({ message: err })
        }).finally(() => {
          res.send(stockDetails)
        })
    })
    .catch((err) => {
      res.status(500).send({
        message: err.message || "Some error occurred while creating the stock."
      })
    })
}

exports.findAll = (req, res) => {
  Stock.find()
    .populate('itemId')
    .then(data => {
      res.send(data)
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving stock."
      })
    })
}

exports.findOne = (req, res) => {

  const branchCode = req.params.branchCode
  const itemId = req.params.itemId

  Stock.find({ branchCode: branchCode, itemId: itemId })
    .populate('itemId')
    .then(data => {
      res.send(data)
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving stock."
      })
    })
}


exports.stockPlus = (req, res) => {

  const branchCode = req.params.branchCode
  const itemId = req.params.itemId
  Stock.updateOne({ branchCode: branchCode, itemId: itemId }, { $inc: { "currentStock": req.params.qty } })
    .then(data => {
      if (!data) {
        res.status(404).send({
          message: `Cannot update currentStock=${currentStock}`
        })
      } else res.send('K')
    })
    .catch((err) => {
      res.status(500).send({
        message: "Error updating currentStock=" + currentStock
      })
    })

  if (req.params.qty > 0) Item.updateOne({ itemId: itemId }, { $inc: { "historicalCount": req.params.qty } })
  
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
  // // }
  // exports.findBarcodesForItemList = (req, res) => {
  //   barcodeList = []
  //   const branchCode = req.params.branchCode;
  //   console.log(req.query);
  //   let condition = branchCode
  //     ? {
  //       branchCode: branchCode,
  //     }
  //     : {};
  //   Stock.find(condition)
  //     .then((data) => {
  //       const branchCode = req.params.branchCode
  //       console.log(data)
  //       let stockDetails = {
  //         branchCode: data[0].branchCode,
  //         itemId: data[0].itemId,
  //         currentStock: data[0].currentStock
  //       }
  //       Item.findById(id)
  //         .then(itemData => {
  //           stockDetails.brandName = itemData.brandName,
  //           stockDetails.itemName = itemData.name
  //           stockDetails.barcode = itemData.barcode
  //           console.log(products)
  //           if (!itemData) res.status(404).send({ message: "Not found stock with id "  })
  //         })
  //         .catch(err => {
  //           res
  //             .status(500)
  //             .send({ message: err });
  //         }).finally(() => {
  //           res.send(stockDetails)
  //         })
  //     })
  //     .catch((err) => {
  //       res.status(500).send({
  //         message: err.message || "Some error occurred while creating the stock.",
  //       });
  //     });
}




exports.findBarcodeItem = (req, res) => {
  const itemId = req.params.itemId;
  const amount = req.params.amount;
  // let condition = itemId
  //   ? {
  //     itemId: itemId,
  //   }
  //   : {};
  Stock.findOne({ branchCode: 'WAREH', itemId: req.params.itemId })
    .then(data => {
      if (data.currentStock >= amount) {


        // console.log(warehouseData.currentStock)
        const id = req.params.itemId
        let bCodes = []
        Item.findById(id)
          .then(itemData => {

            //   if (amount < (itemData.historicalCount - findLast)) {

            let barcode = 0
            let amount = req.params.amount;

            for (let i = 0; i < amount; i++) {
              function padLeadingZeros(i, size) {
                let barcode = i + "";
                while (barcode.length < size) barcode = "0" + barcode
                return barcode
              }
              barcode = barcode + 1;
              hexString = barcode.toString(16)
              barcodehex = parseInt(hexString, 16)
              bCode = itemData.barcodePrefix + padLeadingZeros(hexString, 5)

              let bcPrint = {
                itemName: itemData.name,
                price: itemData.price,
                barcodeStr: bCode
              }
              bCodes.push(bcPrint)

            }
            // barcodeDetails.barcodelast = 
            if (!itemData) res.status(404).send({ message: "Not found stock with id " })
          }
          )
          .catch(err => {
            res
              .status(500)
              .send({ message: err });
          }).finally(() => {
            res.send(bCodes)
          })
      }

    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving stock."
      })
    })
}


exports.findLast = (req, res) => {
  Stock.findOne().sort({ 'createdAt': -1 }).limit(1).then(data => {
    res.send(data.currentStock);
    console.log(data.currentStock)
  })
}
