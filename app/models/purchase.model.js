module.exports = (mongoose) => {
  var schema = mongoose.Schema({

    invId: String,
    qty: Number,
    disc: Number,
    discPrice: Number,
    unitPrice: Number,
    itemId: String,
    dateTime : Date,
    _active: Boolean,

  });

  schema.method("toJSON", function () {
    const { __v, _id, ...object } = this.toObject();
    object.purchaseId = _id;
    return object;
  });

  const Purchase = mongoose.model("purchase", schema);
  return Purchase;
};
