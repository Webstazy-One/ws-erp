module.exports = (mongoose) => {
  var schema = mongoose.Schema({
    promoid: String,
    desc: String,
    type: {
      type: String,
      enum: ["flat", "percentage", "select"],
      default: "select",
    },
    rate: Number,
    startdate: Date,
    enddate: Date,
    calc: String,
    amount: Number,
    active: Boolean,
    applied_to: String,
  });

  schema.method("toJSON", function () {
    const { _id, ...object } = this.toObject();
    object.id = _id;
    return object;
  });

  const Promo = mongoose.model("promo", schema);
  return Promo;
};
