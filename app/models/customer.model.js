module.exports = mongoose => {
  var schema = mongoose.Schema(
    {
      phone:String,
      name: String,
      address: String,
     
    },
    { timestamps: true }
  );

  schema.method("toJSON", function() {
    const {  _id, ...object } = this.toObject();
    object.id = _id;
    return object;
  });

  const Customer = mongoose.model("customer", schema);
  return Customer;
};
