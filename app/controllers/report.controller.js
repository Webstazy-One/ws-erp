const db = require("../models")
const axios = require('axios')
const ItemController = require("./item.controller.js")
const PurchaseController = require("./purchase.controller.js")
const { stock } = require("../models")
const Purchase = db.purchase
const Item = db.item
const Promo = db.promo
const Brand = db.brand
const Stock = db.stock

exports.salesByBranch = (req, res) => {
  branchSalesCount = {}
  branchSalesCount['COLM5'] = 0
  branchSalesCount['OGFSL'] = 0
  branchSalesCount['BTTML'] = 0
  branchSalesCount['LIBPL'] = 0

  var endDate = new Date(req.params.endDate)
  endDate.setDate(endDate.getDate() + 1)
  console.log(endDate)
  Purchase.find({
    "dateTime": { "$gte": new Date(req.params.startDate), "$lt": endDate },
    _active: true
  })
    .then((data) => {
      data.forEach(sale => {
        // console.log("A sale of " + sale.qty + "has happened in " + sale.branchCode)
        branchSalesCount[sale.branchCode] += sale.qty
      });
      res.send(branchSalesCount)
    })
    .catch((err) => {
      res.status(500).send({
        message: err.message || "Some error with report"
      })
    })
}

exports.revenueByBranch = (req, res) => {
  branchRevenueCount = {}

  var dateTimeAfter = new Date(req.params.dateTimeAfter)
  dateTimeAfter.setDate(dateTimeAfter.getDate() + 1)
  console.log(dateTimeAfter)


  Purchase.find({
    "dateTime": { "$gte": new Date(req.params.dateTimeBefore), "$lt": dateTimeAfter },
    _active: true
  })
    .then((data) => {
      data.forEach(revenue => {

        console.log("A revenue of " + revenue.discPrice * revenue.qty + "has happened in " + revenue.branchCode)
        // branchRevenueCount[revenue.branchCode] += revenue.discPrice * revenue.qty
        branchRevenueCount[revenue.branchCode] = branchRevenueCount[revenue.branchCode] ? branchRevenueCount[revenue.branchCode] + revenue.discPrice * revenue.qty : revenue.discPrice * revenue.qty

      });
      res.send(branchRevenueCount)

    })
    .catch((err) => {
      res.status(500).send({
        message: "Some error with report"
      })
    })
}


exports.revenueByBrand = (req, res) => {
  brandRevenueCount = {}

  var endDate = new Date(req.params.endDate)
  endDate.setDate(endDate.getDate() + 1)
  console.log(endDate)
  Purchase.find({
    "dateTime": { "$gte": new Date(req.params.startDate), "$lt": endDate },
    _active: true
  })
    .then((data) => {
      data.forEach(revenue => {
        console.log(revenue)
        console.log("A revenue of " + revenue.discPrice * revenue.qty + "has happened in " + revenue.brandName)
        brandRevenueCount[revenue.brandName] = brandRevenueCount[revenue.brandName] ? brandRevenueCount[revenue.brandName] + revenue.discPrice * revenue.qty : revenue.discPrice * revenue.qty

      });
      res.send(brandRevenueCount)
    })
    .catch((err) => {
      res.status(500).send({
        message: err.message || "Some error with report"
      })
    })
}



exports.profitByBranch = (req, res) => {
  branchProfitCount = {}
  branchProfitCount['COLM5'] = 0
  branchProfitCount['OGFSL'] = 0
  branchProfitCount['BTTML'] = 0
  branchProfitCount['LIBPL'] = 0

  var endDate = new Date(req.params.endDate)
  endDate.setDate(endDate.getDate() + 1)
  console.log(endDate)

  Purchase.find({
    "dateTime": { "$gte": new Date(req.params.startDate), "$lt": endDate },
    _active: true

  })
    .then((data) => {
      let nDate = new Date().toISOString('en-US', {
        timeZone: 'Asia/Calcutta'
      });
      Item.findById(data[0].itemId)
        .then(itemData => {
          console.log(data[0].itemId)
          //   console.log(itemData)
          Promo.find(
            { appliedto: data[0].itemId, startDate: { $lt: nDate }, endDate: { $gte: nDate } }
          )
            .then(promoData => {
              console.log(data[0].itemId)
              if (!promoData[0] == null) {
                console.log(promoData)
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
                console.log("else")
                itemData.disValue = 0,
                  itemData.actualPrice = itemData.price
              }
              //   console.log(itemData)
              data.forEach(profit => {

                console.log("A profit of " + itemData.actualPrice * profit.qty + "has happened in " + profit.branchCode)
                branchProfitCount[profit.branchCode] += itemData.actualPrice * profit.qty - itemData.cost * profit.qty
              })
              res.send(branchProfitCount)
            }
            )
          // .finally(() => {
          //   res.send(itemData)
          //   //    itemData.disValue = itemData.price * promoData[0].rate
          // })
        })
        .catch(err => {
          res
            .status(500)
            .send({ message: "Error retrieving item with id=" + data[0].itemId + " " + err });
        });
    })
    .catch((err) => {
      res.status(500).send({
        message: "Some error with report"
      })
    })
}





exports.getDetailsOfPurchases = (req, res) => {

  var endDate = new Date(req.params.endDate)
  endDate.setDate(endDate.getDate() + 1)
  console.log(endDate)

  Purchase.find({
    dateTime: {
      $gte: req.params.startDate,
      $lt: endDate
    },
    _active: true
  })
    .then((data) => {
      res.send(data)
      console.log(data)
    })
    .catch((err) => {
      res.status(500).send({
        message: err.message || "Some error occurred while retrieving Purchase.",
      })
    })
}


exports.getDetailsOfPurchasesByBrand = (req, res) => {

  var endDate = new Date(req.params.endDate)
  endDate.setDate(endDate.getDate() + 1)
  console.log(endDate)

  Purchase.find({
    brandName: req.params.brandName,
    dateTime: {
      $gte: req.params.startDate,
      $lt: endDate,
    },

    _active: true
  })
    .then((data) => {
      res.send(data);
    })
    .catch((err) => {
      res.status(500).send({
        message: err.message || "Some error occurred while retrieving Purchase.",
      })
    })


}




exports.salesByBrands = (req, res) => {
  brandSalesCount = {}

  var endDate = new Date(req.params.endDate)
  endDate.setDate(endDate.getDate() + 1)
  console.log(endDate)

  Purchase.find({
    "dateTime": { "$gte": new Date(req.params.startDate), "$lt": endDate },
    _active: true
  })
    .then((data) => {
      data.forEach(sale => {
        console.log("A sale of " + sale.qty + "has happened in " + sale.brandName)
        brandSalesCount[sale.brandName] = brandSalesCount[sale.brandName] ? brandSalesCount[sale.brandName] + sale.qty : sale.qty
      });
      res.send(brandSalesCount)
    })
    .catch((err) => {
      res.status(500).send({
        message: err.message || "Some error with report"
      })
    })
}


exports.getDetailsOfPurchasesByBranch = (req, res) => {

  var endDate = new Date(req.params.endDate)
  endDate.setDate(endDate.getDate() + 1)
  console.log(endDate)

  Purchase.find({
    branchCode: req.params.branchCode,
    dateTime: {
      $gte: req.params.startDate,
      $lt: endDate,
    },

    _active: true
  })
    .then((data) => {
      console.log(data)
      res.send(data)
    })
    .catch((err) => {
      res.status(500).send({
        message: err.message || "Some error occurred while retrieving Purchase.",
      })
    })
}

exports.getDetailsOfPurchasesByBrandInBranch = (req, res) => {

  var endDate = new Date(req.params.endDate)
  endDate.setDate(endDate.getDate() + 1)
  console.log(endDate)

  Purchase.find({
    branchCode: req.params.branchCode,
    brandName: req.params.brandName,
    dateTime: {
      $gte: req.params.startDate,
      $lt: endDate,
    },
    _active: true

  })
    .then((data) => {
      console.log(data)
      res.send(data)
    })
    .catch((err) => {
      res.status(500).send({
        message: err.message || "Some error occurred while retrieving Purchase.",
      })
    })
}



exports.brandByBranch = (req, res) => {

  findBrandwiseCount = () => {

    return Stock.find({
      branchCode: req.params.branchCode,
    }).populate('itemId').then((stockData) => {

      brandwiseCount = []

      stockData.forEach(stockEntry => {
        if (!stockEntry.itemId) return

        //   brandSalesCount[sale.brandName] = brandSalesCount[sale.brandName] ? brandSalesCount[sale.brandName] + sale.qty : sale.qty

        brandwiseCount[stockEntry.itemId.brandName] = brandwiseCount[stockEntry.itemId.brandName] ? brandwiseCount[stockEntry.itemId.brandName] + stockEntry.currentStock : stockEntry.currentStock
      })



      return brandwiseCount
    })

  }

  findBrandwiseCount().then((data) => {
    res.send(Object.assign({}, data))
  }).catch((err) => {
    console.log(err)
  })

}

exports.salesByItems = (req, res) => {
  ItemSalesCount = {}
  ItemName = {}
  itemDetails = []

  Purchase.find({
    _active: true
  }).sort({ 'qty': -1 }).limit(100)
    .then((data) => {
      data.forEach(sale => {
        ItemSalesCount[sale.itemId] = ItemSalesCount[sale.itemId] ? ItemSalesCount[sale.itemId] + sale.qty : sale.qty

        let nDate = new Date().toISOString('en-US', {
          timeZone: 'Asia/Calcutta'
        })

        Item.findById(sale.itemId)
          .then(itemData => {
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

              }).catch(() => { })
            console.log(itemDetails)

            return itemDetails = itemData
          })
          .catch(err => {
            res
              .status(500)
              .send({ message: "Error retrieving item " })
          })

      })
      res.send(ItemSalesCount)
    })
    .catch((err) => {
      res.status(500).send({
        message: err.message || "Some error with report"
      })
    })
}

exports.salesByOneItem = (req, res) => {
  ItemSalesCount = {}
  ItemName = {}
  itemDetails = []


  Purchase.find({
    _active: true,
    itemId: req.params.itemId
  }).sort({ 'qty': -1 })
    .then((data) => {
      console.log(data)
      if (!data[0]) {

        console.log("A sale of " + 0 + "has happened in " + req.params.itemId)

        ItemSalesCount[req.params.itemId] = 0
        res.send(ItemSalesCount)

      } else {
        data.forEach(sale => {
          let nDate = new Date().toISOString('en-US', {
            timeZone: 'Asia/Calcutta'
          })

          Item.findById(sale.itemId)
            .then(itemData => {
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
                }).catch(() => { })
              console.log(itemDetails)

              return itemDetails = itemData
            })

            .catch(err => {
              res
                .status(500)
                .send({ message: "Error retrieving item " })
            })
          console.log("A sale of " + sale.qty + "has happened in " + sale.itemId)
          ItemSalesCount[sale.itemId] = ItemSalesCount[sale.itemId] ? ItemSalesCount[sale.itemId] + sale.qty : sale.qty
        })
      }
      res.send(ItemSalesCount)
    })
    .catch((err) => {
      res.status(500).send({
        message: err.message || "Some error with report"
      })
    })
}


