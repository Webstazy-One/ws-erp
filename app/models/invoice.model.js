module.exports = (mongoose) => {
  var schema = mongoose.Schema(
    {
      inv_id: Number,
      date: Date,
      user_name: String,
      method : Number,
      tot_discount: Number,
      tot_value: Number,
      cust_phone: String,
      branch_CODE: String,
    },
    { timestamps: true }
  );

  schema.method("toJSON", function () {
    const { __v, _id, ...object } = this.toObject();
    object.id = this.inv_id;

    return object;
  });

  const Exchange = mongoose.model("invoice", schema);
  return Exchange;
};