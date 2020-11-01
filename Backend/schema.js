const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const sch = {
    name: {
        type: String,
        required: [true, "Field is required"]
    },
    age: {
        type: Number,
        required: [true, "Field is required"]
    },
    gender: {
        type: String,
        required: [true, "Field is required"]
    },
    mno: {
        type: Number,
        required: [true, "Field is required"],
        unique: true
    }
}

module.exports = new Schema(sch, { timestamps: true, strict: true });