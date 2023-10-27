
const Employee = require("../model/employee")


// login user

exports.loginUser = async (req, res) => {
    try {
        if (!req.body.email || !req.body.password) {
            return res.status(400).json({
                message: "login successfully"
            })
        }
        const result = await Employee.findOne({ email: req.body.email, Password: req.body.password })
        if (!result) {
            return res.status(400).json({
                message: "login Failed"
            })
        }
        delete result.Password
        return res.status(201).json({
            message: "Login Successful",
            data: result
        })

    } catch (error) {
        res.json({ message: "something went wrong", error })
    }

}