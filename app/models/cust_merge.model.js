module.exports = mongoose => {
    var schema = mongoose.Schema(
      {
        phone: String,
        phone1: String
       
      },
     
    );
  
    schema.method("toJSON", function() {
      const {  _id, ...object } = this.toObject();
      object.id = _id;
      return object;
    });
  
    const Cust_merge = mongoose.model("cust_merge", schema);
    return Cust_merge;
  };
  