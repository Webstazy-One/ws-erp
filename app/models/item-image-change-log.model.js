module.exports = (mongoose) => {
    var schema = mongoose.Schema(
      {
        itemId : String,
        uploadFile : String,
        user : String,
        userTrack : String
      },
      { timestamps: true }
    )
  
    schema.method("toJSON", function () {
      const { __v, _id, ...object } = this.toObject();
      object.id = _id;
  
      return object;
    })
  
    const Invoice = mongoose.model("invoice", schema)
    return Invoice
  }
  