import mongoose from "mongoose";

const tokenSchema = mongoose.Schema({
    uid: {
        type: mongoose.SchemaTypes.ObjectId,
        ref: "auth_user",
        required: true
    },

    refreshToken:{
        type: String,
        required: true,
        default: null
    },

    generatedOn: {
        type: Date,
        required: true,
        default: Date.now,
        immutable: true
    },
});

const tokenModel = mongoose.model("user_token", tokenSchema);

export default tokenModel;
