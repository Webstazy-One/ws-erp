module.exports = (mongoose) => {
    var schema = mongoose.Schema(
      {
        itemId : String,
        uploadFile : String,
        user : String,
        userTrack : String // Request
      },
      { timestamps: true }
    )
  
    schema.method("toJSON", function () {
      const { __v, _id, ...object } = this.toObject();
      object.id = _id;
  
      return object;
    })
  
    const ImageChangeLog = mongoose.model("ImageChangeLog", schema)
    return ImageChangeLog
  }
  