module.exports = (mongoose) => {
  var schema = mongoose.Schema({

    brandName: String,
    name: String,
    sfName : String,
    barcodePrefix: String,
    desc: String,
    tag: [String],
    cost: Number,
    price: Number,
    _active: Boolean,
    disValue : Number,
    actualPrice : Number,
    disputed : Boolean
  })

  schema.method("toJSON", function () {
    const { __v, _id, ...object } = this.toObject()
    object.id = _id
    return object
  })

  const Item = mongoose.model("item", schema)
  return Item
}
