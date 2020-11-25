const db = require("../models")
const { promo } = require("../models")
const Promo = db.promo
const Item = db.item

exports.create = (req, res) => {
  const promo = new Promo({
    desc: req.body.desc,
    type: req.body.type,
    rate: req.body.rate,
    startDate: req.body.startDate,
    endDate: req.body.endDate,
    calc: req.body.calc,
    amount: req.body.amount,
    appliedto: req.body.appliedto,
    _active: true
  })

  promo
    .save(promo)
    .then(data => {
      res.send(data)
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while creating the promo."
      })
    })
}

exports.findAll = (req, res) => {
  let promoar = {}
  let promoDet = []
  Promo.find()
    .then(data => {
      data.forEach(pro => {
        promoar = {
          promoId: pro.promoId,
          desc: pro.desc,
          calc: pro.calc,
          rate: pro.rate,
          totDiscount: pro.totDiscount,
          startDate: pro.startDate,
          endDate: pro.endDate,
          type: pro.type,
          _active: pro._active,
          appliedto: pro.appliedto
        }
        promoDet.push(promoar)
      })
      res.send(promoDet)
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving promo."
      })
    })
}



exports.findAllActive = (req, res) => {
  let promoar = {}
  let promoDet = []
  Promo.find({ _active: true })
    .then(data => {
      data.forEach(pro => {
        promoar = {
          promoId: pro.promoId,
          desc: pro.desc,
          calc: pro.calc,
          rate: pro.rate,
          totDiscount: pro.totDiscount,
          startDate: pro.startDate,
          endDate: pro.endDate,
          type: pro.type,
          _active: pro._active,
          appliedto: pro.appliedto
        }
        promoDet.push(promoar)
      })
      res.send(promoDet)
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving Promo."
      })
    })
}


exports.findByBrandName = (req, res) => {
  let promoar = {}
  let promoDet = []
  const appliedto = req.params.brandName
  var condition = appliedto
    ? {
      appliedto: { $regex: new RegExp(req.params.brandName), $options: "i" },
    }
    : {}

  Promo.find(condition)
    .populate('item')
    .then((data) => {
      data.forEach(pro => {
        promoar = {
          promoId: pro.promoId,
          desc: pro.desc,
          calc: pro.calc,
          rate: pro.rate,
          totDiscount: pro.totDiscount,
          startDate: pro.startDate,
          endDate: pro.endDate,
          type: pro.type,
          _active: pro._active,
          appliedto: pro.appliedto
        }
        promoDet.push(promoar)
      })
      res.send(promoDet)
    })
    .catch((err) => {
      res.status(500).send({
        message: err.message || "Some error occurred while retrieving Promo.",
      })
    })
}


exports.findOne = (req, res) => {
  const promoId = req.params.promoId
  Promo.findById(promoId)
    .then(data => {
      let pro = {
        promoId: data[0].promoId,
        desc: data[0].desc,
        calc: data[0].calc,
        rate: data[0].rate,
        totDiscount: data[0].totDiscount,
        startDate: data[0].startDate,
        endDate: data[0].endDate,
        type: data[0].type,
        _active: data[0]._active,
        appliedto: data[0].appliedto
      }
      if (!data)
        res.status(404).send({ message: "Not found promo with promoId " + promoId })
      else res.send(pro)
    })
    .catch(err => {
      res
        .status(500)
        .send({ message: "Error retrieving promo with promoId=" + promoId })
    })
}


exports.findByItemId = (req, res) => {
  let promoar = {}
  let promoDet = []
  const appliedto = req.params.itemId
  var condition = appliedto
    ? {
      appliedto: { $regex: new RegExp(req.params.itemId), $options: "i" },
    }
    : {}

  Promo.find(condition)
    .populate('item')
    .then((data) => {
      data.forEach(pro => {
        promoar = {
          promoId: pro.promoId,
          desc: pro.desc,
          calc: pro.calc,
          rate: pro.rate,
          totDiscount: pro.totDiscount,
          startDate: pro.startDate,
          endDate: pro.endDate,
          type: pro.type,
          _active: pro._active,
          appliedto: pro.appliedto
        }
        promoDet.push(promoar)
      })
      res.send(promoDet)
    })
    .catch((err) => {
      res.status(500).send({
        message: err.message || "Some error occurred while retrieving Promo.",
      })
    })
}

exports.DeleteFromPromoId = (req, res) => {
  const promoId = req.params.promoId

  Promo.findOneAndUpdate({ _id: promoId }, { $set: { _active: false } })
    .then(data => {

      if (!data) {
        res.status(404).send({
          message: `Cannot delete promo with promoId=${promoId}. Maybe promo was not found!`,
        })
      } else res.send(true)
    })
    .catch((err) => {
      res.status(500).send({
        message: "Error deleting promo with promoId =" + promoId,
      })
    })
}



// exports.findByBrandNameOrItemId  = (req, res) => {

//   Promo.find({
//     $or: [{ 'timeType': req.params.appliedto },
//     { 'locationName': req.query.locationName },
//     { 'salaryMax': req.query.salaryMin },
//     { 'salaryMin': req.query.salaryMin },
//     { 'local': req.query.local },
//     { 'duration': req.query.duration}]
//   }
//   ).then(data => {
//     res.send(data)
//   })
// }

// exports.findByBrandNameOrItemId = (req, res) => {
//   let promoar = {}
//   let promoDet = []
//   const appliedto = req.params.appliedto
//   var condition = appliedto
//     ? {
//       appliedto: appliedto,

//     }
//     : {}

//   Promo.find(condition)
//     .populate('item')
//     .then((data) => {
//   console.log(data[0].appliedto)
//   Item.find({ 

//     brandName : data[0].appliedto

//     // $or: [{ brandName : data[0].appliedto},
//     //      { _id: data[0].appliedto}
//     //   ]


//      })
//   .then((itemData) => {

//     // if (brandName=data[0].appliedto) {
//     //   data.push(itemData)
//     //   console.log(itemData) }

//     // } else 
//     //   if(brandName = data[0].appliedto){
//     //   data.push(itemData)
//     //   console.log("brandName")
//     // }
//     console.log(itemData)
//     // data
//   }) 
//   .catch((err) => {
//     res.status(500).send({
//       message: err.message || "Some error occurred while retrieving Item.",
//     });
//   });
//       res.send(data)
//     })
//     .catch((err) => {
//       res.status(500).send({
//         message: err.message || "Some error occurred while retrieving items.",
//       })
//     })
// }



// exports.findByBrandNameOrItemId = (req, res) => {
//   let promoar = {}
//   let promoDet = []
//   const appliedto = req.params.appliedto
//   // var condition = appliedto
//   //   ? {
//   //     appliedto: { $regex: new RegExp(req.params.brandName), $options: "i" },
//   //   }
//   //   : {}


//   Promo.find(
// appliedto 
//   )
//     .populate('item')
//     .then((data) => {

//       res.send(data)
//     })
//     .catch((err) => {
//       res.status(500).send({
//         message: err.message || "Some error occurred while retrieving Promo.",
//       })
//     })
// }


exports.findByBrandNameOrItemId = (req, res) => {
  const appliedto = req.params.appliedto

  Promo.find({
    _active: true,
    appliedto: appliedto
  }
  )
    .then(data => {
      console.log(data)

      res.send(data)
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving Promo."
      })
    })
}