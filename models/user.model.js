module.exports = mongoose => {
    let userSchema = mongoose.Schema(
            {
                name: String,
                age: String,
                cargo: String
            },
            { timestamps: true }
        );

    userSchema.method("toJSON", function() {
        const { __v, _id, ...object } = this.toObject();
        object.id = _id;
        return object;
    });

    const User = mongoose.model("user", userSchema);
    return User;

}