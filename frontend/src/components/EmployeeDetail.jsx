import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { deleteEmployees } from '../redux/employeeActions'

export default function EmployeeDetail({ selectedEmployee, setshowUpdateCard, setselectedEmployee }) {
    const dispatch = useDispatch()



    return <>
        <div class="card">
            <div class="card-header d-flex justify-content-between">Details
                <button type="button" onClick={e => setshowUpdateCard(true)} class="btn btn-warning">Edit</button>
                <button type="button" class="btn btn-outline-info" data-bs-toggle="modal"
                    data-bs-target="#deleteModal">Delete</button></div>

            <div class="card-body">
                <div className='d-flex justify-content-center'>
                    <img src={selectedEmployee.image} alt="User Profile" className='rounded-circle border border-5 border-info' style={{ height: "100px", width: "100px" }} />
                </div>
                <ul class="list-group">
                    <li class="list-group-item">
                        <h3>{selectedEmployee.name}</h3>
                        <p className='text-primary'>Email: {selectedEmployee.email}</p>
                        <p className='text-danger'>Gender: {selectedEmployee.gender}</p>
                        <p className='text-info'>Department:<strong> {selectedEmployee.Department}</strong></p>
                        <p className='text-dark'>Category:<strong> {selectedEmployee.CategoryName}</strong></p>
                        <p className='text-success'>Status:<strong> {selectedEmployee.active ? "active" : "Inactive"}</strong></p>
                    </li>
                </ul>
            </div>



            <div class="modal fade" id="deleteModal" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
                <div class="modal-dialog">
                    <div class="modal-content">
                        <div class="modal-header">
                            <h5 class="modal-title" id="exampleModalLabel">Delete Employee</h5>
                            <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                        </div>
                        <div class="modal-body">
                            <h4>Are You Sure Want To Delete?</h4>
                            <div className=" btn-group w-100">
                                <button data-bs-dismiss="modal" onClick={e => {
                                    dispatch(deleteEmployees(selectedEmployee._id))
                                    setselectedEmployee(false)
                                }} type="button" class="w-100 btn btn-outline-primary">Yes</button>
                                <button data-bs-dismiss="modal" type="button" class="w-100 btn btn-secondary">No</button>
                            </div>
                        </div>

                    </div>
                </div>
            </div>
        </div>
    </>
}
