import mongoose from "mongoose";
const { Schema, model } = mongoose;

const linkSchema = new mongoose.Schema({
    linkName: String,
    url: String
  });

const userSchema = new Schema({
    username: {
        type: String,
        required: true,
        unique: true,
    },
    fullname: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
    },
    password: {
        type: String,
        required: true,
    },
    links: [linkSchema],
    createdAt: {
        type: Date,
        default: Date.now,
    },
})

export default mongoose.models.User || model("User", userSchema);