const { brand } = require("../models")
const db = require("../models")
const Brand = db.brand
const Item = db.item


exports.create = (req, res) => {

  if (!req.body.brandName) {
    res.status(400).send({ message: "brandName can not be empty!" })
    return
  }
  const brands = new Brand({

    brandName: req.body.brandName.toUpperCase(),
    _active: true,
    subCategory: req.body.subCategory,
    auditedDate: req.body.auditedDate
  })

  brands
    .save(brands)
    .then((data) => {
      res.send(data)
    })
    .catch((err) => {
      res.status(500).send({
        message: err.message || "Some error occurred while creating the brand.",
      })
    })
}


exports.findByBrandName = (req, res) => {
  let brandar = {}
  let brandDet = []
  const brandName = req.params.brandName
  var condition = brandName
    ? {
      brandName: { $regex: new RegExp(req.params.brandName), $options: "i" },
      _active: true
    }
    : {}

  Brand.find(condition).sort({ 'brandName': 1 })
    .then((data) => {
      data.forEach(brand => {
        brandar = {
          brandName: brand.brandName,
          subCategory: brand.subCategory,
          auditedDate: brand.auditedDate,
          _active: brand._active
        }

        brandDet.push(brandar)
      })
      res.send(brandDet)
    })
    .catch((err) => {
      res.status(500).send({
        message: err.message || "Some error occurred while retrieving brands.",
      })
    })
}

exports.findAll = (req, res) => {
  let brandar = {}
  let brandDet = []
  Brand.find().sort({ 'brandName': 1 })
    .then(data => {
      data.forEach(brand => {
        brandar = {
          brandName: brand.brandName,
          subCategory: brand.subCategory,
          auditedDate: brand.auditedDate,
          _active: brand._active
        }
        brandDet.push(brandar)
      })
      res.send(brandDet)
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving brand."
      })
    })
}

exports.findAllActive = (req, res) => {
  let brandar = {}
  let brandDet = []
  Brand.find({ _active: true }).sort({ 'brandName': 1 })
    .then(data => {
      data.forEach(brand => {
        brandar = {
          brandName: brand.brandName,
          subCategory: brand.subCategory,
          auditedDate: brand.auditedDate,
          _active: brand._active
        }
        brandDet.push(brandar)
      })
      res.send(brandDet)
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving Brand."
      })
    })
}


exports.findByName = (req, res) => {
  const name = req.params.name
  var condition = name
    ? {
      name: { $regex: new RegExp(req.params.name), $options: "i" },
      _active: true
    }
    : {}

  Item.find(condition)
    .then((data) => {
      console.log(data)
      res.send(data)
    })
    .catch((err) => {
      res.status(500).send({
        message: err.message || "Some error occurred while retrieving items.",
      })
    })
}


exports.updateBrandByBrandName = (req, res) => {
  const brandName = req.params.brandName;

  Brand.findOneAndUpdate({ brandName: brandName }, { $set: req.body })
    .then(data => {

      if (!data) {
        res.status(404).send({
          message: `Cannot update Brand with brandName=${brandName}. Maybe Brand was not found!`,
        })
      } else res.send(true)
    })
    .catch((err) => {
      res.status(500).send({
        message: "Error updating Brand with brandName=" + brandName,

      })
    })
}


exports.DeleteFromBrandName = (req, res) => {
  const brandName = req.params.brandName

  Brand.findOneAndUpdate({ brandName: brandName }, { $set: { _active: false } })
    .then(data => {

      if (!data) {
        res.status(404).send({
          message: `Cannot delete brand with brandName=${brandName}. Maybe brand was not found!`,
        })
      } else res.send(true)
    })
    .catch((err) => {
      res.status(500).send({
        message: err,
      })
    })
}


exports.findBySubcategory = (req, res) => {
  let subcatar = {}
  let subcatDet = []

  Brand.find({
    subCategory: req.params.subCategory,
    _active: true
  })
    .then((data) => {
      data.forEach(brand => {
        subcatar = {
          brandName: brand.brandName,
          subCategory: brand.subCategory,
          auditedDate: brand.auditedDate,
          _active: brand._active
        }
        subcatDet.push(subcatar)
      })
      res.send(subcatDet)
    })
    .catch((err) => {
      res.status(500).send({
        message: err.message || "Some error occurred while retrieving subCategory.",
      })
    })
}



checkBrandExisted = (req, res, next) => {

  Brand.findOne({
    brandName: req.body.brandName.toUpperCase(),
  }).exec((err, item) => {
    if (err) {
      res.status(500).send({ message: err })
      return
    }

    if (item) {
      res.status(400).send({ message: "Duplicate Entry !. Brand already exists" })
      return
    }


    next()

  })
}


