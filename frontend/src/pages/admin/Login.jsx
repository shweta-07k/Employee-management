import { useFormik } from 'formik'
import React from 'react'
import { Link, json, useNavigate } from 'react-router-dom'
import * as Yup from 'yup';
import Navbar from './Navbar';
import { toast } from 'react-toastify';
import { useDispatch } from 'react-redux';
import { setMyUser } from '../../redux/employeeSlice';
import axios from 'axios';

function Login() {
    const navigate = useNavigate()
    const dispatch = useDispatch()
    const formik = useFormik({
        initialValues: {
            email: "",
            password: ""
        },
        validationSchema: Yup.object({
            email: Yup.string().email('Invalid email address').required('Required'),
            password: Yup.string().required("Please enter password"),
        }),
        onSubmit: (values) => {
            values.roleId = 2
            if (values.email == "admin") {
                values.roleId = 1
            }
            loginUser(values, navigate, dispatch)



        }
    })
    return <>
        <Navbar />
        <div class="container">
            <div class="row">
                <div class="col-sm-6 offset-sm-3 mt-5">
                    <div class="card">
                        <div class="card-header fw-bold">Login</div>
                        <div class="card-body">
                            <form onSubmit={formik.handleSubmit}>
                                <div>
                                    <label htmlFor="email" name="email" class="form-label"> Email</label>
                                    <input
                                        type="text"
                                        class="form-control"
                                        id="email"
                                        value={formik.values.email}
                                        onChange={formik.handleChange}
                                        onBlur={formik.handleBlur}
                                        placeholder="Enter Your Email"
                                    />
                                    {formik.errors.email && formik.touched.email ? <p className='form-error text-danger'>{formik.errors.email}</p> : null}
                                    <div class="valid-feedback">Looks good!</div>
                                    <div class="invalid-feedback">Please choose a username.</div>
                                </div>
                                <div class="mt-2">
                                    <label htmlFor="password" name="password" class="form-label">Password</label>
                                    <input
                                        type="password"
                                        class="form-control"
                                        id="password"
                                        value={formik.values.password}
                                        onChange={formik.handleChange}
                                        onBlur={formik.handleBlur}
                                        placeholder="Enter Your Password"
                                    />
                                    {formik.errors.password && formik.touched.password ? <p className='form-error text-danger'>{formik.errors.password}</p> : null}
                                    <div class="valid-feedback">Looks good!</div>
                                    <div class="invalid-feedback">Please choose a username.</div>
                                </div>
                                <button type="submit" class="btn btn-primary w-100 mt-3">
                                    Login
                                </button>
                            </form>
                            <p class="text-center mt-3">
                                Dont Have Account? <Link to="/">Register here</Link>
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </div>

    </>
}

async function loginUser(values, navigate, dispatch) {
    try {
        const { data } = await axios.post("http://localhost:5000/employee/login", values)
        if (data.data.roleId && data.data.roleId == 1) {
            navigate("/admin/dashboard")
        } else {
            navigate("/employee/dashboard")
        }
        localStorage.setItem("user", JSON.stringify(data.data))
        dispatch(setMyUser(data.data))
        toast.success(data.message)

    } catch (error) {
        toast.error(error.response.data.message)
        console.log(error);
    }
}

export default Login