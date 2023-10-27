const mongoose = require("mongoose")

module.exports = mongoose.model("employee", mongoose.Schema({
    name: String,
    email: String,
    image: String,
    active: Boolean,
    gender: String,
    Department: String,
    CategoryName: String,
    Password: String
}))