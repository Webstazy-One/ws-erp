module.exports = (mongoose) => {
    var schema = mongoose.Schema({
        _active: Boolean,
        brandName: String,
        name: String,
        labelName : String,
        sfName: String,
        barcodePrefix: String,
        desc: String,
        cost: Number,
        price: Number,
        priceSGD: Number,
        priceCHF: Number,
        disValue: Number,
        actualPrice: Number,
        condition: {
            type: Boolean,
            default: true,
        },
        disputed: Boolean,
        booked: { type: Number, default: 0 },
        //watch subclass
        tag: [String],  // DIVING, CALEN, SECONDS, SOLAR, CHRONO
        mechanics: {
            type: String,
            enum : ['AUTOMATIC', 'QUARTZ', 'UNKNOWN'],
            default: 'UNKNOWN'
        },
        strap: {
            type: String,
            enum : ['AUTOMATIC','SOLAR', 'QUARTZ'],
            default: 'QUARTZ'
        },
        gen:{
            type: String,
            enum : ['GENTS', 'LADIES', 'UNI'],
            default: 'UNI'
        },
        waterDepth: Boolean,
        caseShape:{
            type: String,
            enum : ['ROUND', 'LADIES', 'UNI'],
            default: 'ROUND'
        },
    })

    schema.method("toJSON", function() {
        const { __v, _id, ...object } = this.toObject()
        object.id = _id
        return object
    })

    const Item = mongoose.model("item", schema)
    return Item
}