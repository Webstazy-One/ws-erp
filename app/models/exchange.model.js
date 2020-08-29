module.exports = (mongoose) => {
  var schema = mongoose.Schema({
    applied_inv: String,
    amount: String,
    pid: String,
    iid: String,
    inv_id: String,
  });

  schema.method("toJSON", function () {
    const { __v, _id, ...object } = this.toObject();
    object.id = _id;
    return object;
  });

  const Exchange = mongoose.model("exchange", schema);
  return Exchange;
};
