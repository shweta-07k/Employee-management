const Employee = require("../model/employee")



// admin can see employee details 

exports.registerEmplyoee = async (req, res) => {
    try {
        if (!req.body.name ||
            !req.body.email ||
            !req.body.image ||
            !(req.body.active == false || req.body.active == true) ||
            !req.body.gender ||
            !req.body.Department ||
            !req.body.CategoryName ||
            !req.body.Password
        ) {
            return res.status(400).json({
                message: "all fields required"
            })
        }
        await Employee.create(req.body)

        res.status(201).json({
            message: "Employee Created Successfully"
        })

    } catch (error) {
        res.status(400).json({ message: "something went wrong " + error, error })
    }
}
exports.getEmployee = async (req, res) => {
    try {

        const result = await Employee.find().select("name email image active gender Department CategoryName")

        res.status(201).json({
            message: "Employee Data Fetched Successfully",
            result
        })

    } catch (error) {
        res.json({ message: "something went wrong", error })
    }

}
exports.updateEmployee = async (req, res) => {
    try {

        const result = await Employee.findByIdAndUpdate(req.params.employeeId, req.body, {
            new: true,
            runValidators: true
        })

        res.status(201).json({
            message: "Employee Data Updated Successfully",
        })

    } catch (error) {
        res.json({ message: "something went wrong " + error, error })
    }

}
exports.deleteEmployee = async (req, res) => {
    try {

        const result = await Employee.findByIdAndDelete(req.params.employeeId)

        res.status(201).json({
            message: "Employee Data Deleted Successfully",
            result
        })

    } catch (error) {
        res.json({ message: "something went wrong " + error, error })
    }

}
exports.deleteAllEmployee = async (req, res) => {
    try {

        const result = await Employee.deleteMany()

        res.status(201).json({
            message: " All Employee Data Deleted Successfully",
            result
        })

    } catch (error) {
        res.json({ message: "something went wrong " + error, error })
    }

}




