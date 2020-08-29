module.exports = (mongoose) => {
  var schema = mongoose.Schema({
    purchase_id_iid: String,
    inv_id: String,
    _active:Boolean,
    qty: Number,
    disc: Number,
    disc_price: Number,
    unit_price: Number,
    branch_CODE: String,
  });

  schema.method("toJSON", function () {
    const { __v, _id, ...object } = this.toObject();
    object.id = _id;
    return object;
  });

  const Purchase = mongoose.model("purchase", schema);
  return Purchase;
};
