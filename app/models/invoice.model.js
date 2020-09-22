module.exports = (mongoose) => {
  var schema = mongoose.Schema(
    {
      invId: String,
      dateTime: Date,
      username: String,
      payMethod:
        ["CASH", "VISA", "MASTER_CARD", "AMEX"],
      totDiscount: Number,
      totValue: Number,
      customer: { type: mongoose.Schema.Types.Mixed, ref: 'customer'},
      branchCode: String,
      totalItems: Number,
      _active: Boolean,
      purchases :[{ type: mongoose.Schema.Types.Mixed, ref: 'purchase'}]
    },
    { timestamps: true }
  );

  schema.method("toJSON", function () {
    const { __v, _id, ...object } = this.toObject();
    object.id = _id;

    return object;
  });

  const Invoice = mongoose.model("invoice", schema);
  return Invoice;
};
