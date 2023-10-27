import React from 'react'
import * as Yup from "yup";
import { toast } from 'react-toastify';
import { Link, useNavigate } from 'react-router-dom';
import { useFormik } from 'formik';




const Register = () => {
    const navigate = useNavigate()
    const { values, handleBlur, handleChange, touched, handleSubmit, errors } = useFormik({
        initialValues: {
            firstName: "",
            lastName: "",
            gender: "",
            hobbies: "",
        },
        validationSchema: Yup.object({
            firstName: Yup.string().required("Please Fill Your First Name"),
            lastName: Yup.string().required("Please Fill Your Last Name"),
            gender: Yup.string().required("Please select gender"),
            hobbies: Yup.string().required("Please Enter Hobbies")
        }),
        onSubmit: (values, { resetForm }) => {

            console.log(values);
            resetForm()
            toast.success("User Registered Successfully", { autoClose: 2000 })
            setTimeout(() => {
                navigate("/login")
            }, 3000);
        }
    })
    return <>
        {
            // JSON.stringify(values, null)
        }
        <div class="container">
            <div class="row">
                <div class="col-sm-6 offset-sm-3 mt-5">
                    <div class="card">
                        <div class="card-header fw-bold">Signup</div>
                        <div class="card-body">
                            <form onSubmit={handleSubmit}>
                                <div class="card-body">
                                    <div>
                                        <label htmlFor="firstName" className="form-label">First Name</label>
                                        <input

                                            type="text" className="form-control" id="firstName" name="firstName"
                                            placeholder="Enter Your First Name"
                                            value={values.firstName}
                                            onChange={handleChange}
                                            onBlur={handleBlur} />
                                        {errors.firstName && touched.firstName ? <p className='form-error text-danger'>{errors.firstName}</p> : null}

                                    </div>
                                    <div className='my-4'>
                                        <label htmlFor="lastName" className="form-label">Last Name</label>
                                        <input

                                            type="text" className="form-control" id="lastName" name="lastName"
                                            placeholder="Enter Your Last Name"
                                            value={values.lastName}
                                            onChange={handleChange}
                                            onBlur={handleBlur} />
                                        {errors.lastName && touched.lastName ? <p className='form-error text-danger'>{errors.lastName}</p> : null}
                                    </div>
                                    <div className='my-4'>
                                        <div class="form-check form-check-inline">
                                            <input
                                                value={values.gender}
                                                onChange={e => values.gender = "male"}
                                                onBlur={handleBlur}
                                                class="form-check-input"
                                                type="radio" name="gender" id="male" />
                                            <label class="form-check-label" htmlFor="male">
                                                Male
                                            </label>
                                        </div>
                                        <div class="form-check">
                                            <input
                                                value={values.gender}
                                                onChange={e => values.gender = "female"}
                                                onBlur={handleBlur}
                                                class="form-check-input" type="radio" name="gender" id="female" />
                                            <label class="form-check-label" htmlFor="female">
                                                FeMale
                                            </label>
                                        </div>
                                        {errors.gender && touched.gender ? <p className='form-error text-danger'>{errors.gender}</p> : null}
                                    </div>
                                    <div className='my-4'>
                                        <label htmlFor="hobbies" className="form-label">Hobbies</label>
                                        <select class="form-select"

                                            value={values.hobbies}
                                            onChange={handleChange}
                                            onBlur={handleBlur}
                                            name='hobbies'
                                            id='hobbies'
                                        >

                                            <option selected value="">Please Select Hobbies</option>
                                            <option value="Dance">Dance</option>
                                            <option value="singing">Singing</option>
                                            <option value="travelling">Travelling</option>
                                        </select>
                                        {errors.hobbies && touched.hobbies ? <p className='form-error text-danger'>{errors.hobbies}</p> : null}
                                    </div>
                                    <div className='text-end'>
                                        <button type="submit" class="btn btn-lg btn-success mx-3">Sign Up</button>
                                        <p>Already have an account? <Link to="/login">Login</Link></p>
                                    </div>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </>
}

export default Register



