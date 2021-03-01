module.exports = mongoose => {
    var schema = mongoose.Schema(
      {
        brandName: String,
        _active: Boolean,

        subCategory: {
          type: String,
          enum: ["WATCHES",
          "WALLCLOCKS",
          "BATTERIES_ACCESOORIES",
          "DIGITAL",
          "OTHER"
        ],
          default: "WATCHES",
        
        },
        
        auditedDate: {
          type: Date,
          default: "2000-01-01"
          
        }

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
  