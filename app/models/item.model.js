module.exports = (mongoose) => {
  var schema = mongoose.Schema({

    brandName: String,
    name: String,
    barcode: String,
    desc: String,
    tag: [String],
    cost: Number,
    price: Number,
    _active: Boolean,
    disValue : Number,
    actualPrice : Number,
  });

  schema.method("toJSON", function () {
    const { __v, _id, ...object } = this.toObject();
    object.id = _id;
    return object;
  });

  const Item = mongoose.model("item", schema);
  return Item;
};
