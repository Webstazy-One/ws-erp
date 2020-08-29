module.exports = mongoose => {
    var schema = mongoose.Schema(
      {
        brand_name: String,
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
  