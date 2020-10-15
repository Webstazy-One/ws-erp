const db = require("../models")
const axios = require('axios')
const ItemController = require("./item.controller.js")
const PurchaseController = require("./purchase.controller.js")
const Purchase = db.purchase
const Item = db.item
const Promo = db.promo
const Brand = db.brand

exports.salesByBranch = (req, res) => {
  branchSalesCount = {}
  branchSalesCount['COLM5'] = 0
  branchSalesCount['OGFSL'] = 0
  branchSalesCount['BTTML'] = 0
  branchSalesCount['LIBPL'] = 0
  branchSalesCount['EXSHCOL'] = 0
  
  Purchase.find({
    "dateTime": { "$gte": new Date(req.params.startDate), "$lt": new Date(req.params.endDate) }
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
  branchRevenueCount['COLM5'] = 0
  branchRevenueCount['OGFSL'] = 0
  branchRevenueCount['BTTML'] = 0
  branchRevenueCount['LIBPL'] = 0
  branchRevenueCount['EXSHCOL'] = 0
  
  Purchase.find({
    "dateTime": { "$gte": new Date(req.params.startDate), "$lt": new Date(req.params.endDate) }
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
              data.forEach(revenue => {
                console.log(itemData.actualPrice)
                console.log("A revenue of " + itemData.actualPrice + "has happened in " + revenue.branchCode)
                branchRevenueCount[revenue.branchCode] += itemData.actualPrice
              });
              res.send(branchRevenueCount)
            }
            ).finally(() => {
              res.send(itemData)
              //    itemData.disValue = itemData.price * promoData[0].rate
            })
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
exports.profitByBranch = (req, res) => {
  branchProfitCount = {}
  branchProfitCount['COLM5'] = 0
  branchProfitCount['OGFSL'] = 0
  branchProfitCount['BTTML'] = 0
  branchProfitCount['LIBPL'] = 0
  branchProfitCount['EXSHCOL'] = 0

  Purchase.find({
    "dateTime": { "$gte": new Date(req.params.startDate), "$lt": new Date(req.params.endDate) }
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
                // console.log(itemData.actualPrice)
                // console.log(itemData.cost)
                console.log("A profit of " + itemData.actualPrice + "has happened in " + profit.branchCode)
                branchProfitCount[profit.branchCode] += itemData.actualPrice - itemData.cost
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


exports.revenueByBrand = (req, res) => {
  brandRevenueCount = {}

  
  Purchase.find({
    "dateTime": { "$gte": new Date(req.params.startDate), "$lt": new Date(req.params.endDate) }
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
              data.forEach(revenue => {
                console.log(itemData.actualPrice)
                console.log("A revenue of " + itemData.actualPrice + "has happened in " + revenue.brandName)
                brandRevenueCount[revenue.brandName] = brandRevenueCount[revenue.brandName] ? brandRevenueCount[revenue.brandName] + itemData.actualPrice : itemData.actualPrice

              //  brandRevenueCount[revenue.brandName] += itemData.actualPrice
              });
              res.send(brandRevenueCount)
            }
            )
             // res.send(itemData)
              //    itemData.disValue = itemData.price * promoData[0].rate
            
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

// exports.salesByBrand = (req, res) => {

//   const getBrands = () => {

//     return Brand.find()
//       .then(brandData => {

//         let bNameList = []

//         brandData.forEach(brand =>
//           bNameList[brand.brandName] = 0
//         )

//         return bNameList

//       })
//   }

//   const getPurchaseCounts = (bNameList) => {
//     console.log(bNameList)

//     return Purchase.find({
//       "dateTime": { "$gte": new Date(req.params.startDate), "$lt": new Date(req.params.endDate) }
//     }).then((sales) => {
//       sales.forEach(sale => {
//         bNameList[sale.brandName] += sale.qty
//       })
//     }).catch((err) => {
//       res.status(500).send({
//         message: err.message || "Some error with report"
//       })
//     }).finally(() => {
//       return bNameList
//     }
//     )

//   }

//   const report = getBrands().then((bNameList) => { getPurchaseCounts(bNameList) })

//   report.then(() => { res.send(report) })
// }





exports.getDetailsOfPurchases = (req, res) => {

  Purchase.find({
    dateTime: {
      $gte: req.params.startDate,
      $lt: req.params.endDate
    }
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


  Purchase.find({
    brandName: req.params.brandName,
    dateTime: {
      $gte: req.params.startDate,
      $lt: req.params.endDate,
    },


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

//*************************************************************


exports.salesByBrands = (req, res) => {
  brandSalesCount = {}

  Purchase.find({
    "dateTime": { "$gte": new Date(req.params.startDate), "$lt": new Date(req.params.endDate) }
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


exports.getDetailsOfPurchasesByBranch =(req,res) =>{
  Purchase.find({
    branchCode: req.params.branchCode,
    dateTime: {
      $gte: req.params.startDate,
      $lt: req.params.endDate,
    },


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

exports.getDetailsOfPurchasesByBrandInBranch =(req,res) =>{
  Purchase.find({
    branchCode: req.params.branchCode,
    brandName: req.params.brandName,
    dateTime: {
      $gte: req.params.startDate,
      $lt: req.params.endDate,
    },


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


//***********************************/

exports.brandByBranch =(req,res)=>{

  Stock.find

}

exports.salesByItems = (req, res) => {
  ItemSalesCount = {}
  ItemName = {}
  itemDetails = []

  Purchase.find({

  }).sort({ 'qty': -1 }).limit(100)
    .then((data) => {

      data.forEach(sale => {

        //console.log("A sale of " + sale.qty + "has happened in " + sale.itemId)
        ItemSalesCount[sale.itemId] = ItemSalesCount[sale.itemId] ? ItemSalesCount[sale.itemId] + sale.qty : sale.qty



        let nDate = new Date().toISOString('en-US', {
          timeZone: 'Asia/Calcutta'
        })

        Item.findById(sale.itemId)
          .then(itemData => {



            console.log(sale.itemId)



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
            // itemDetails.push(itemData)

            console.log(itemDetails)
          
            return itemDetails = itemData


          })
          .catch(err => {
            res
              .status(500)
              .send({ message: "Error retrieving item " });
          });






      })
      // res.send(itemDetails)

      // console.log(ItemSalesCount)
      // console.log(itemDetails)

    })
    .catch((err) => {
      res.status(500).send({
        message: err.message || "Some error with report"
      })
    })
}
