import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./reudcer/authReducer";


// Step for state management
// Submit Action
// Handle action an it's reducer
// register Here Reducer



export const store = configureStore({
    reducer: {
        auth: authReducer
    }
})