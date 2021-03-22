module.exports = (mongoose) => {
    var schema = mongoose.Schema({

        k: String,
        v: String

    })

    schema.method("toJSON", function() {
        const { _id, ...object } = this.toObject();
        object.id = _id;

        return object;
    })

    const Meta = mongoose.model("meta", schema);
    return Meta;
};