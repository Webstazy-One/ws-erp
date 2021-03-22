module.exports = (mongoose) => {
    var schema = mongoose.Schema({
        originName: String,
    });
    schema.method("toJSON", function() {
        const { _id, ...object } = this.toObject();
        object.id = _id;

        return object;
    });

    const Origin = mongoose.model("origin", schema);
    return Origin;
};