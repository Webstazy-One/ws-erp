module.exports = mongoose => {
    var schema = mongoose.Schema(
      {
        brandName: String,
        _active: Boolean,

        itemId: String,
        prevPrice : Number,
        newPrice : Number,
        chDate: Date,
        chUser: String,
        barcodeBatch : Number

      }
     
    )
  
    schema.method("toJSON", function() {
      const { _id, ...object } = this.toObject();
      object.id = _id;
      return object;
    })
  
    const PCN = mongoose.model("PCN", schema)
    return PCN
  }
  