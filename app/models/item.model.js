module.exports = (mongoose) => {
  var itemschema = mongoose.Schema({
    brandname: String,
    name: String,
    barcode: String,
    desc: String,
    tag: [String],
    price: Number,
    disc : {},
    disc_price : Number
  });

  itemschema.method("toJSON", function () {
    const { __v, _id, ...object } = this.toObject();
    object.id = _id;
    return object;
  });

  const Item = mongoose.model("item", itemschema);
  return Item;
};
