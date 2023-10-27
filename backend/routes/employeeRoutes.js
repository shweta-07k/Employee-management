const { getEmployee, registerEmplyoee, updateEmployee, deleteEmployee, deleteAllEmployee } = require("../controllers/EmployeeController")
const { loginUser } = require("../controllers/UserController")

const router = require("express").Router()

router
    .get("/", getEmployee)
    .post("/register", registerEmplyoee)
    .put("/edit/:employeeId", updateEmployee)
    .delete("/remove/:employeeId", deleteEmployee)
    .delete("/remove", deleteAllEmployee)

    // userlogin
    .post("/login", loginUser)

module.exports = router