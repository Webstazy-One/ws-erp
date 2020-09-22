module.exports = (mongoose) => {
  var schema = mongoose.Schema({

    invId: String,
    pid: String,
    condition:["GOOD","AVERAGE","BAD"],
    amount: Number,
    appliedInv: String,   
  });

  schema.method("toJSON", function () {
    const { __v, _id, ...object } = this.toObject();
    object.exchangeId = _id;
    return object;
  });

  const Exchange = mongoose.model("exchange", schema);
  return Exchange;
};
