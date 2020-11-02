module.exports = (mongoose) => {
  var schema = mongoose.Schema({


    jobcardId: String,
    custPhone: { type: mongoose.Schema.Types.Mixed, ref: 'customer' },
    custPhone2: String,
    iid: String,
    description: String,
    remark: [Boolean, Boolean, Boolean, Boolean, Boolean, Boolean, Boolean, Boolean, Boolean],
    deliveryDate: Date,
    cost: Number,
    payment: [String],
    paymethod: {
      type: [String],
      enum: ["CASH",
        "VISA",
        "MASTER_CARD",
        "AMEX",
        "ONLINE"
      ],
      default: "CASH",

    },
    status: {
      type: String,
      enum: ["ACCEPTED",
        "STARTED",
        "AWAITING",
        "COMPLETED",
        "CALL",
        "HANDED_OVER",
      ],
      default: "ACCEPTED",

    },

  }, { timestamps: true });

  schema.method("toJSON", function () {
    const { _id, ...object } = this.toObject();
    object.id = _id;
    return object;
  });

  const Repair = mongoose.model("repair", schema);
  return Repair;
};
