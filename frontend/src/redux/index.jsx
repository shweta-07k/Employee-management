import { configureStore, createAsyncThunk } from "@reduxjs/toolkit"
import employeeSlice from "./employeeSlice"


const store = configureStore({
    reducer: {
        allEmployee: employeeSlice
    }
})
export default store