module.exports = mongoose => {
    autoIncrement = require('mongoose-auto-increment')
    const dbLinks = require("../config/db.config.js")
    var connection = mongoose.createConnection(dbLinks.url, {
        useNewUrlParser: true,
        useUnifiedTopology: true
    })
    autoIncrement.initialize(connection)
    var schema = mongoose.Schema({
        voucherId: Number,
        amount: String,
        date: Date,
        type: {
            type: String,
            enum: ["ADVANCE", "GIFT"],

        },
        itemId: String,
        active: Boolean
    })

    schema.plugin(autoIncrement.plugin, {
        model: 'voucher',
        field: 'voucherId',
        startAt: 1,
        incrementBy: 1,
    });
    schema.method("toJSON", function() {
        const { _id, ...object } = this.toObject();        object.id = _id;
        return object;
    });

    const Voucher = mongoose.model("voucher", schema);
    return Voucher;
};