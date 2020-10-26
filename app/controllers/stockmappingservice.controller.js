const { stock, item } = require("../models")
const db = require("../models")
const Item = db.item
const Stock = db.stock


// exports.findMatchingInStock = (req, res) => {
//   details ={}
//   recyclestock = []
//   Stock.find()

//     .then(stockData => {
//      Item.find()

//      .then(itemData => {

//       itemDet = []
//       stockDet = []
//       console.log()

//       stockData.forEach(stockEntry => {
//         if (
//           stockEntry.itemId !== itemData._id
//         ) {
//           stockDet.push(stockEntry)

// console.log(itemData[0].id)
//         }else if(
//           stockEntry.itemId == itemData._id
//         ){
//                   recyclestock.push(stockEntry)

//         }



// details ={
//   hangingStock : recyclestock
// }
//       })
//       res.send(details)
// //console.log(stockDet)
//      })

//     })
//     .catch(err => {
//       res.status(500).send({
//         message:
//           err.message || "Some error occurred while retrieving stock."
//       })
//     })
// }

exports.findMatchingInItem = (req, res) => {

  Item.find()
    .then(itemData => {

      itemData.forEach(item => {
        if (Stock.find({ itemId: item._id })

        ) {
          res.status(200).send({
            message: `There are no any hanging items.`,
          })


        } else {


          const stockCOLM5 = new Stock({
            branchCode: "COLM5",
            itemId: item._id,
            currentStock: 0
          })
          stockCOLM5
            .save(stockCOLM5)
            .then(data => {
              console.log(stockCOLM5)
            })
          const stockOGFSL = new Stock({
            branchCode: "OGFSL",
            itemId: item._id,
            currentStock: 0
          })
          stockOGFSL
            .save(stockOGFSL)
            .then(data => {
              console.log("stock created in OGFSL" + data)

            })
          const stockBTTML = new Stock({
            branchCode: "BTTML",
            itemId: item._id,
            currentStock: 0
          })
          stockBTTML
            .save(stockBTTML)
            .then(data => {
              console.log("stock created in BTTML" + data)

            })
          const stockLIBPL = new Stock({
            branchCode: "LIBPL",
            itemId: item._id,
            currentStock: 0
          })
          stockLIBPL
            .save(stockLIBPL)
            .then(data => {
              console.log("stock created in LIBPL" + data)

            })
          const stockWAREH = new Stock({
            branchCode: "WAREH",
            itemId: item._id,
            currentStock: 0
          })
          stockWAREH
            .save(WAREH)
            .then(data => {
              console.log("stock created in WAREH" + data)
              data.lastBarcode = 0

            })
        }

      })

    }

    )


  Stock.find({})
    .then(stockData => {
      stockData.forEach(stockEntry => {
        if (item.find({ _id: stockEntry.itemId })
        ) {
          console.log("There are no any hanging stocks")
        } else {
          Stock.findOneAndRemove(stockEntry.itemId).then((data) => {
            res.send(true)
          })

        }
      })
    }
    )
}




