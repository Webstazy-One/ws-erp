module.exports = (mongoose) => {
  var schema = mongoose.Schema(
    {
      branch_CODE: String,
      iid: String,
      current_stock: String,
    },
    { timestamps: true }
  );

  schema.method("toJSON", function () {
    const { _id, ...object } = this.toObject();
    object.id = _id;
    return object;
  });

  const stock = mongoose.model("stock", schema);
  return stock;
};
