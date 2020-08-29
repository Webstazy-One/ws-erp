module.exports = (mongoose) => {
  var schema = mongoose.Schema({
    tag: [String]
  
  });

  schema.method("toJSON", function () {
    const { _id, ...object } = this.toObject();
    object.id = _id;
    return object;
  });

  const Tag = mongoose.model("tag", schema);
  return Tag;
};
