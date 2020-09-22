module.exports = (mongoose) => {
  var schema = mongoose.Schema({

    jobcardId: String,
    custPhone: String,
    iid: String,
    description: String,
    remark: [Boolean,Boolean,Boolean,Boolean,Boolean,Boolean,Boolean,Boolean],
    deliveryDate: Date,
    cost: Number,
    payment: [String],
    status: {
      type: String,
      enum: ["ACCEPTED",
      "UNREPAIRABLE",
      "COMPLETED",
      "HANDED OVER",
      "AWAIT",
      "STARTED",],
      default: "STARTED",
    
    },
    
  },{ timestamps: true });

  schema.method("toJSON", function () {
    const { _id, ...object } = this.toObject();
    object.id = _id;
    return object;
  });

  const Repair = mongoose.model("repair", schema);
  return Repair;
};
