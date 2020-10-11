module.exports = (mongoose) => {
  var schema = mongoose.Schema(
    {
      data: String
    },
    { timestamps: true }
  )

  schema.method("toJSON", function () {
    const { _id, ...object } = this.toObject()
    object.id = _id
    return object
  })

  const Stock = mongoose.model("stock", schema)
  return Stock
}
