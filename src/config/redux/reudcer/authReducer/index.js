import { createSlice } from "@reduxjs/toolkit"
import { getAllUsers, loginUser, registerUser } from "../../action/authAction"
import { getAboutUser } from "../../action/postAction"


const InitalState = {
    user: undefined,
    all_users: [],
    isError: false,
    isSuccess: false,
    isLoading: false,
    loggedIn: false,
    isTokenThere: false,
    message: "",
    profileFeatch: false,
    connections: [],
    connectionRequest: [],
    all_profiles_fetched: false
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
            setTokenIsThere: (state) => {
                state.isTokenThere = true;
            },
            setTokenIsNotThere: (state) => {
                state.isTokenThere = false;
            }
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
                .addCase(getAboutUser.fulfilled, (state, action) => {
                    state.isLoading = false;
                    state.isError = false;
                    state.profileFeatch = true;
                    state.user = action.payload;
                    state.connections = action.payload.connections;
                    state.connectionRequest = action.payload.connectionRequest
                })
                .addCase(getAllUsers.fulfilled, (state, action) => {
                    state.isLoading = false;
                    state.isError = false;
                    state.all_profiles_fetched = true;
                    state.all_users = action.payload.profiles;
                })
        }
    }
)

export const { emptyMessage, reset, setTokenIsNotThere, setTokenIsThere } = authSlice.actions;

export default authSlice.reducer;