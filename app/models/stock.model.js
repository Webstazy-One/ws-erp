module.exports = (mongoose) => {
  var schema = mongoose.Schema(
    {
      branchCode: String,
      itemId:String,
      currentStock: { type: Number, default: 0 }
    },
    { timestamps: true }
  );

  schema.method("toJSON", function () {
    const { _id, ...object } = this.toObject();
    object.id = _id;
    return object;
  });

  const Stock = mongoose.model("stock", schema);
  return Stock;
};
