module.exports = mongoose => {
    var schema = mongoose.Schema(
      {
        STNid : Number,
        sourceBranch : String,
        destinBranch : String,
        itemCount : Number
      }
     
    )
  
    schema.method("toJSON", function() {
      const { _id, ...object } = this.toObject();
      object.id = _id;
      return object;
    })
  
    const STN = mongoose.model("STN", schema)
    return STN
  }
  