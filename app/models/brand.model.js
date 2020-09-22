module.exports = mongoose => {
    var schema = mongoose.Schema(
      {
        brandName: String,
        _active: Boolean
      },
     
    );
  
    schema.method("toJSON", function() {
      const { _id, ...object } = this.toObject();
      object.id = _id;
      return object;
    });
  
    const Brand = mongoose.model("brands", schema);
    return Brand;
  };
  