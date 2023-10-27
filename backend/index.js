const express = require("express")
require("dotenv").config({ path: "./config/.env" })
const mongoose = require("mongoose")
mongoose.set("strictQuery", true)
mongoose.connect(process.env.MONGO_URL)
const app = express()
const cors = require("cors")

app.use(express.json())
app.use(cors())

// app.use("*", (req, res) => {
//     res.json({
//         message: "404 : Resource Not Found"
//     })
// })
app.use("/employee", require("./routes/employeeRoutes"))


mongoose.connection.once("open", () => {
    console.log("MONGO CONNECTED")
    app.listen(process.env.PORT, (err) => {
        if (err) {
            console.log("UNABLE TO START SERVER ", err)
        } else {
            console.log(`SERVER RUNNING http://localhost:${process.env.PORT}`)
        }
    })
})
mongoose.connection.on("error", (err) => {
    console.log(`Mongo Connection Error ${err}`)
})


