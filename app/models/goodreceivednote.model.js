module.exports = (mongoose) => {
  var schema = mongoose.Schema({
    itemId: { type: mongoose.Schema.Types.Mixed, ref: 'item' },
    branchCode: { type: mongoose.Schema.Types.Mixed, ref: 'branch' },
    qty: Number,
    datetime: Date,

  });

  schema.method("toJSON", function () {
    const { __v, _id, ...object } = this.toObject();
    object.GRNId = _id;
    return object;
  });

  const GRN = mongoose.model("goodreceivednote", schema,);
  return GRN;
};
