module.exports = (mongoose) => {
  var schema = mongoose.Schema({
    desc: String,
    calc: String,
    // ************ This should be a  enum. because of the urgent , this named as String*****************
    // calc: {
    //   type: String,
    //   enum: ["FLAT", "PERCENTAGE"],
    //   default: "FLAT",
    // },
    rate: Number,
    startDate: Date,
    endDate: Date,
    type: String,
    // ************ This should be a  enum. because of the urgent , this named as String*****************
    // type: {
    //   type: String,
    //   enum: ["BRAND", "ITEM"],
    //   default: "ITEM",
    // },
    _active: Boolean,
// appliedTo: { $in: [
//   { type: mongoose.Schema.Types.ObjectId, ref: 'item' },
//   { type: mongoose.Schema.Types.Mixed, ref: 'brand' },
//   ]},

  //   appliedto : { 
  //     ITEM : 
      
  //         { type: mongoose.Schema.Types.ObjectId, ref: 'item' },
          
      
  //         BRAND : 
      
  //         { type: mongoose.Schema.Types.Mixed, ref: 'brand' },
               
      
  // },
    
   
 appliedto: String,
  });
  schema.method("toJSON", function () {
    const { _id, ...object } = this.toObject();
    object.promoId = _id;
    return object;
  });
  const Promo = mongoose.model("promo", schema);
  return Promo;
};