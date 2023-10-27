import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link, useNavigate } from 'react-router-dom'
import { setMyUser } from '../../redux/employeeSlice'

export default function Navbar() {
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const { myUser } = useSelector(state => state.allEmployee)
    return <>
        <nav className="navbar navbar-expand-lg bg-light">
            <div className="container">
                <a className="navbar-brand fs-4 fw-bold">ABC LOGIN</a>
                <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNavAltMarkup">
                    <span className="navbar-toggler-icon"></span>
                </button>
                <div className="collapse navbar-collapse" id="navbarNavAltMarkup">
                    <div className="navbar-nav gap-4">
                        <Link to="/" className="nav-link active">Home</Link>
                        <div class="dropdown">
                            <button class="btn btn-primary dropdown-toggle" type="button" id="dropdownMenuButton1" data-bs-toggle="dropdown" >
                                Admin
                            </button>
                            <ul class="dropdown-menu">
                                <li><a class="dropdown-item">Dashboard </a></li>
                                <li><a class="dropdown-item">Profile</a></li>
                            </ul>
                        </div>
                        {myUser && <div>
                            <button type="button" class="btn btn-danger"
                                onClick={e => {
                                    localStorage.removeItem('user')
                                    dispatch(setMyUser(null))
                                    navigate("/login")
                                }}
                            >Logout</button>
                        </div>}
                    </div>
                </div>

            </div>
        </nav>
    </>
}
