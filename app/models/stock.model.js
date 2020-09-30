module.exports = (mongoose) => {
  var schema = mongoose.Schema(
    {
      branchCode: String,
      itemId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "item"
      },
      currentStock: { type: Number, default: 0 },
     
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
