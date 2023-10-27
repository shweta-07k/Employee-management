import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { setMyUser } from '../../../redux/employeeSlice'
import { useNavigate } from 'react-router-dom'

function EmployeeDash() {
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const { myUser } = useSelector(state => state.allEmployee)
    useEffect(() => {
        if (!myUser) {
            navigate("/login")
        }
    }, [])

    return (
        <div className='container'>
            <h1>WelCome Google IT solution pvt</h1>
            {myUser && <div className="d-flex justify-content-end">
                <button type="button" class="btn btn-danger"
                    onClick={e => {
                        localStorage.removeItem('user')
                        dispatch(setMyUser(null))
                        navigate("/login")
                    }}
                >Logout</button>
            </div>}
        </div>
    )
}

export default EmployeeDash
