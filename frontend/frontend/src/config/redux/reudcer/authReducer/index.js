import { createSlice } from "@reduxjs/toolkit"
import { loginUser, registerUser } from "../../action/authAction"


const InitalState = {
    user: [],
    isError: false,
    isSuccess: false,
    isLoading: false,
    loggedIn: false,
    message: "",
    profileFeatch: false,
    connections: [],
    connectionRequest: []
}

const authSlice = createSlice(
    {
        name: "auth",
        initialState: InitalState,
        reducers: {
            reset: () => InitalState,
            handleLoginUser: (state) => {
                state.message = "hello"
            },
            emptyMessage: (state) => {
                state.message = "";
            },
        },
        extraReducers: (builder) => {
            builder.addCase(loginUser.pending, (state) => {
                state.isLoading = true
                state.message = "Knocking the door ....."
            })
                .addCase(loginUser.fulfilled, (state, action) => {
                    state.isLoading = false
                    state.isError = false
                    state.loggedIn = true
                    state.isSuccess = true
                    state.message = "LoggedIn succesfull"
                })
                .addCase(loginUser.rejected, (state, action) => {
                    state.isLoading = false
                    state.isError = true
                    state.message = action.payload?.message || "Login failed"
                })
                .addCase(registerUser.pending, (state) => {
                    state.isLoading = true
                    state.message = "registering you"
                })
                .addCase(registerUser.fulfilled, (state, action) => {
                    state.isLoading = false
                    state.isError = false
                    state.isSuccess = true
                    state.message = "register succesfull ,please login in"
                })
                .addCase(registerUser.rejected, (state, action) => {
                    state.isLoading = false
                    state.isError = true
                    state.message = action.payload?.message || "Registration failed"
                })
        }
    }
)

export const { emptyMessage, reset } = authSlice.actions;

export default authSlice.reducer;