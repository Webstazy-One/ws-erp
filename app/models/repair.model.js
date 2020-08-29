module.exports = (mongoose) => {
  var schema = mongoose.Schema({
    jobcardid: String,
    pid: String,
    custphone: String,
    date_time: Date,
    description: String,
    status: {
      type: String,
      enum: [
        "accepted",
        "unrepairable",
        "completed",
        "handed_over",
        "await",
        "select",
      ],
      default: "select",
    },
  });

  schema.method("toJSON", function () {
    const { _id, ...object } = this.toObject();
    object.id = _id;
    return object;
  });

  const Repair = mongoose.model("repair", schema);
  return Repair;
};
