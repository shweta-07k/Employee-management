import { createSlice } from "@reduxjs/toolkit";
import { addEmployee, deleteEmployees, getEmployees, updateEmployees } from "./employeeActions";

const initialValue = JSON.parse(localStorage.getItem("user"))


const employeeSlice = createSlice({
    name: "employee",
    initialState: {
        myUser: initialValue ? initialValue : null,
        employee: []
    },
    reducers: {
        setMyUser: (state, action) => {
            state.myUser = action.payload
        }
    },
    extraReducers: (builder) => {
        builder
            //FOR ADDING DATA 
            .addCase(addEmployee.pending, (state, { payload }) => {
                state.loading = true
            })
            .addCase(addEmployee.fulfilled, (state, { payload }) => {
                state.loading = false
                state.employeeAdded = state.employeeAdded ? false : true
            })
            .addCase(addEmployee.rejected, (state, { payload }) => {
                state.loading = false
                state.employeeAddError = payload
            })

            //FOR GET EMPLOYEE DATA
            .addCase(getEmployees.pending, (state, { payload }) => {
                state.loading = true
            })
            .addCase(getEmployees.fulfilled, (state, { payload }) => {
                state.loading = false
                state.employee = payload
            })
            .addCase(getEmployees.rejected, (state, { payload }) => {
                state.loading = false
                state.employeeAddError = payload
            })
            //FOR UPDATE THE EMPLOYEE
            .addCase(updateEmployees.pending, (state, { payload }) => {
                state.loading = true
            })
            .addCase(updateEmployees.fulfilled, (state, { payload }) => {
                state.loading = false
                state.updated = state.updated ? false : true
            })
            .addCase(updateEmployees.rejected, (state, { payload }) => {
                state.loading = false
                state.employeeUpdateError = payload
            })
            //FOR DELETE EMPLOYEE
            .addCase(deleteEmployees.pending, (state, { payload }) => {
                state.loading = true
            })
            .addCase(deleteEmployees.fulfilled, (state, { payload }) => {
                state.loading = false
                state.deleted = payload
            })
            .addCase(deleteEmployees.rejected, (state, { payload }) => {
                state.loading = false
                state.employeeDeleteError = payload
            })
    }
})
export const { setMyUser } = employeeSlice.actions
export default employeeSlice.reducer