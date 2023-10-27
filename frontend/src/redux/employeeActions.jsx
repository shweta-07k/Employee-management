import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios"




export const addEmployee = createAsyncThunk("employee/add", async (employeeData, { rejectWithValue, getState }) => {
    try {
        const { data } = await axios.post("http://localhost:5000/employee/register", employeeData)
        // console.log(data);
    } catch (error) {
        return rejectWithValue(error);
    }
})
export const getEmployees = createAsyncThunk("employee/get", async (arg, { rejectWithValue, getState }) => {
    try {
        const { data } = await axios.get("http://localhost:5000/employee")
        // console.log(data);
        return data.result
    } catch (error) {
        return rejectWithValue(error);
    }
})
export const updateEmployees = createAsyncThunk("employee/update", async (employeeData, { rejectWithValue, getState }) => {
    try {
        console.log(employeeData);
        const { data } = await axios.put(`http://localhost:5000/employee/edit/${employeeData._id}`, employeeData)
        return data
    } catch (error) {
        return rejectWithValue(error);
    }
})
export const deleteEmployees = createAsyncThunk("employee/delete", async (employeeID, { rejectWithValue, getState }) => {
    try {
        const { data } = await axios.delete(`http://localhost:5000/employee/remove/${employeeID}`)
        return data
    } catch (error) {
        return rejectWithValue(error);
    }
})