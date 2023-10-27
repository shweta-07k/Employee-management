import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'

import EmployeeDetail from '../../components/EmployeeDetail'
import { addEmployee, getEmployees, updateEmployees } from '../../redux/employeeActions'
import Navbar from './Navbar'
import { ToastContainer, toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css';
import { useNavigate } from 'react-router-dom'

export default function Dashoard() {
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const { employee, employeeAdded, updated, deleted } = useSelector(state => state.allEmployee)

    const [employeeData, setemployeeData] = useState({
        name: "john",
        email: "john@gmail.com",
        image: "https://images.unsplash.com/photo-1570295999919-56ceb5ecca61?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1780&q=80",
        gender: "male",
        active: true,
        Department: "ipangram",
        CategoryName: "HR",
        Password: '12345678'
    })
    const [showUpdateCard, setshowUpdateCard] = useState(false)        //editchya button vr click kelyvr update ch card disnyasthi
    const [selectedEmployee, setselectedEmployee] = useState()         //he usestate detailchya button vr click sathi
    const [updateEmployeeData, setUpdateEmployeeData] = useState({
        name: "",
        email: "",
        image: "",
        gender: "",
        active: "",
        Department: "",
        CategoryName: ""
    })
    const handleSubmit = e => {
        e.preventDefault()
        dispatch(addEmployee(employeeData))
        setemployeeData({
            name: "john",
            email: "john@gmail.com",
            image: "https://images.unsplash.com/photo-1570295999919-56ceb5ecca61?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1780&q=80",
            gender: "male",
            active: true,
            Department: "ipangram",
            CategoryName: "HR"
        })
        toast("Emplyoee Added Successfully", { position: 'top-right', theme: "dark" })
    }
    const handleUpdateSubmit = e => {
        e.preventDefault()
        dispatch(updateEmployees(selectedEmployee))
        setshowUpdateCard(false)
        toast("Emplyoee updated Successfully", { position: 'top-right', theme: "dark" })
    }
    const { myUser } = useSelector(state => state.allEmployee)
    useEffect(() => {
        if (!myUser) {
            navigate("/login")
        }
    }, [])

    useEffect(() => {

        dispatch(getEmployees())

    }, [employeeAdded, updated, deleted])

    return <div >
        <Navbar />

        {/* <pre>
            {JSON.stringify(selectedEmployee, null, 2)}
        </pre> */}

        <div className="container-fluid">
            <div className="d-flex justify-content-end">
                <button type="button" class="btn btn-primary my-4" data-bs-toggle="modal" data-bs-target="#exampleModal">Add Employee</button>
            </div>
            <div className="row">

                <div className="col-sm-4">
                    <div class="card">
                        <div class="card-header">Employees</div>
                        <div class="card-body">
                            <ul class="list-group">
                                {
                                    employee && employee.map(item => item.name != 'admin' && <>
                                        <li class="list-group-item d-flex justify-content-between">
                                            <img src={item.image} height={60} width={60} alt="User Profile" />
                                            <h3> {item.name}</h3>
                                            <button onClick={e => {
                                                setselectedEmployee(item)
                                                setshowUpdateCard(false)
                                            }} type="button" class="btn btn-warning">Details</button>
                                        </li>
                                    </>
                                    )
                                }

                            </ul>
                        </div>
                    </div>
                </div>
                <div className="col-sm-4">
                    {
                        selectedEmployee
                            ? <EmployeeDetail selectedEmployee={selectedEmployee} setshowUpdateCard={setshowUpdateCard} setselectedEmployee={setselectedEmployee} />
                            : <h3>No Selected Employee</h3>

                    }
                </div>
                {/* edit user */}
                <div className="col-sm-4">
                    {
                        showUpdateCard
                            ? <div class="card">
                                <div class="card-header">Edit</div>
                                <div class="card-body">
                                    <form onSubmit={handleUpdateSubmit}>
                                        <div>
                                            <label htmlFor="name" class="form-label">First name</label>
                                            <input
                                                onChange={e => setselectedEmployee({ ...selectedEmployee, name: e.target.value })}
                                                value={selectedEmployee.name}
                                                type="text" class="form-control" id="name" placeholder="Enter Your Name" />

                                        </div>
                                        <div className='my-3'>
                                            <label htmlFor="email" class="form-label">Email</label>
                                            <input
                                                onChange={e => setselectedEmployee({ ...selectedEmployee, email: e.target.value })}
                                                value={selectedEmployee.email}
                                                type="email" class="form-control" id="email" placeholder="Enter Your Email" />

                                        </div>
                                        <div className='my-3'>
                                            <label htmlFor="image" class="form-label">Image</label>
                                            <input
                                                onChange={e => setselectedEmployee({ ...selectedEmployee, image: e.target.value })}
                                                value={selectedEmployee.image}
                                                type="text" class="form-control" id="image" placeholder="Enter Your Image" />

                                        </div>
                                        <div class="form-check form-check-inline">
                                            <input
                                                onChange={e => setselectedEmployee({ ...selectedEmployee, gender: e.target.value })}
                                                checked={selectedEmployee.gender === "male" ? true : false} value="male" class="form-check-input" type="radio" name="gender" id="gender" />
                                            <label class="form-check-label" for="name">
                                                Male
                                            </label>
                                        </div>
                                        <div class="form-check form-check-inline">
                                            <input
                                                onChange={e => setselectedEmployee({ ...selectedEmployee, gender: e.target.value })}
                                                checked={selectedEmployee.gender === "female" ? true : false} value="female" class="form-check-input" type="radio" name="gender" id="gender" />
                                            <label class="form-check-label" for="name">
                                                FeMale
                                            </label>
                                        </div>
                                        <div class="form-check form-switch my-3">
                                            <input
                                                onChange={e => setselectedEmployee({ ...selectedEmployee, active: selectedEmployee.active ? false : true })}
                                                checked={selectedEmployee.active ? true : false} class="form-check-input" type="checkbox" id="active" />
                                            <label class="form-check-label" htmlFor="active">Active</label>
                                        </div>
                                        <select onChange={e => setselectedEmployee({ ...selectedEmployee, Department: e.target.value })}
                                            value={selectedEmployee.Department} class="form-select">
                                            <option >Select Department</option>
                                            <option value="ipangram">Ipangram</option>
                                            <option value="facebook">Facebook</option>
                                            <option value="wipro">Wipro</option>
                                            <option value="wallmart">Wallmart</option>
                                        </select>
                                        <select onChange={e => setselectedEmployee({ ...selectedEmployee, CategoryName: e.target.value })}
                                            value={selectedEmployee.CategoryName} class="form-select">
                                            <option >Select CategoryName</option>
                                            <option value="HR">HR</option>
                                            <option value="IT">IT</option>
                                            <option value="sales">Sales</option>
                                            <option value="product">Product</option>
                                            <option value="marketing">Marketing</option>
                                        </select>
                                        <button type="submit" class="btn btn-dark w-100 btn-lg mt-3">Update User</button>
                                    </form>
                                </div>

                            </div>
                            : <h3>No Employee Selected</h3>
                    }
                </div>
            </div>
            {/* Add user */}
            <div class="modal fade" id="exampleModal">
                <div class="modal-dialog">
                    <div class="modal-content">
                        <div class="modal-header">
                            <h5 class="modal-title" id="exampleModalLabel"> Add Employee</h5>
                            <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                        </div>
                        <div class="modal-body">
                            <form onSubmit={handleSubmit} >
                                <div>
                                    <label htmlFor="name" class="form-label">First name</label>
                                    <input onChange={e => setemployeeData({ ...employeeData, name: e.target.value })}
                                        value={employeeData.name}
                                        type="text" class="form-control" id="name" placeholder="Enter Your Name" />
                                </div>
                                <div className='my-3'>
                                    <label htmlFor="email" class="form-label">Email</label>
                                    <input onChange={e => setemployeeData({ ...employeeData, email: e.target.value })}
                                        value={employeeData.email}
                                        type="email" class="form-control" id="email" placeholder="Enter Your Email" />
                                    <div class="valid-feedback">Looks good!</div>
                                    <div class="invalid-feedback">Please choose a username.</div>
                                </div>
                                <div className='my-3'>
                                    <label htmlFor="Password" class="form-label">Password</label>
                                    <input onChange={e => setemployeeData({ ...employeeData, Password: e.target.value })}
                                        value={employeeData.Password}
                                        type="Password" class="form-control" id="Password" placeholder="Enter Your Password" />
                                    <div class="valid-feedback">Looks good!</div>
                                    <div class="invalid-feedback">Please choose a username.</div>
                                </div>
                                <div className='my-3'>
                                    <label htmlFor="image" class="form-label">Image</label>
                                    <input onChange={e => setemployeeData({ ...employeeData, image: e.target.value })}
                                        value={employeeData.image}
                                        type="text" class="form-control" id="image" placeholder="Enter Your Image" />
                                    <div class="valid-feedback">Looks good!</div>
                                    <div class="invalid-feedback">Please choose a image.</div>
                                </div>
                                <div class="form-check form-check-inline">
                                    <input
                                        onChange={e => setemployeeData({ ...employeeData, gender: e.target.value })}
                                        // value={employeeData.gender}
                                        value="male"
                                        class="form-check-input"
                                        type="radio"
                                        name="gender"
                                        id="male" />
                                    <label class="form-check-label" for="name">
                                        Male
                                    </label>
                                </div>
                                <div class="form-check form-check-inline">
                                    <input
                                        onChange={e => setemployeeData({ ...employeeData, gender: e.target.value })}
                                        // value={employeeData.gender}
                                        value="female"
                                        class="form-check-input"
                                        type="radio"
                                        name="gender"
                                        id="female" />
                                    <label class="form-check-label" for="name">
                                        FeMale
                                    </label>
                                </div>
                                <div class="form-check form-switch my-3">
                                    <input
                                        onChange={e => setemployeeData({
                                            ...employeeData,
                                            active: employeeData.active ? false : true
                                        })}
                                        // checked={employeeData.active}
                                        class="form-check-input"
                                        type="checkbox"
                                        id="active" />
                                    <label class="form-check-label" htmlFor="eactive">Active</label>
                                </div>
                                <select
                                    onChange={e => setemployeeData({ ...employeeData, Department: e.target.value })}
                                    value={employeeData.Department}
                                    class="form-select">
                                    <option>Select Department</option>
                                    <option value="ipangram">Ipangram</option>
                                    <option value="facebook">Facebook</option>
                                    <option value="wipro">Wipro</option>
                                    <option value="wallmart">Wallmart</option>
                                </select>
                                <select onChange={e => setemployeeData({ ...employeeData, CategoryName: e.target.value })}
                                    value={employeeData.CategoryName} class="form-select">
                                    <option >Select CategoryName</option>
                                    <option value="HR">HR</option>
                                    <option value="IT">IT</option>
                                    <option value="sales">Sales</option>
                                    <option value="product">Product</option>
                                    <option value="marketing">Marketing</option>
                                </select>
                                <button type="submit" class="btn btn-dark w-100 btn-lg mt-3" data-bs-dismiss="modal">Add User</button>

                            </form>
                        </div>

                    </div>
                </div>
            </div></div>

    </div>
}
