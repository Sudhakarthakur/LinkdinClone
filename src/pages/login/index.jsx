import React, { useEffect, useState } from 'react'
import UserLayout from '@/layout/userLayout'
import { useDispatch, useSelector } from 'react-redux'
import { useRouter } from 'next/router';
import styles from "./index.module.css";
import { loginUser, registerUser } from '@/config/redux/action/authAction';
import { emptyMessage } from '@/config/redux/reudcer/authReducer';


export default function LoginComponent() {

    const authState = useSelector((state) => state.auth)

    const router = useRouter();
    const dispatch = useDispatch();

    const [userLogginMethode, setUserLogginMethode] = useState(false)
    const [email, setEmail] = useState("");
    const [username, setUsername] = useState("");
    const [name, setName] = useState("");
    const [password, setPassword] = useState("");


    useEffect(() => {
        if (authState.loggedIn) {
            router.push("/dashboard")
        }
    }, [authState.loggedIn, router])


    useEffect(() => {
        dispatch(emptyMessage())
    }, [userLogginMethode, dispatch])

    useEffect(() => {
        if (localStorage.getItem("token")) {
            router.push("/dashboard")
        }
    }, [router])

    const handleRegister = () => {
        console.log("register");

        dispatch(registerUser({
            username,
            name,
            email, password
        }))
    }

    const handleLogin = () => {
        dispatch(loginUser({ email, password }))
    }

    return (
        <UserLayout>
            <div className={styles.container}>
                <div className={styles.cardContainer}>
                    <div className={styles.cardContainer__left}>
                        <p className={styles.cardleft_heading}>{userLogginMethode ? "Sign In" : "Sign up"}</p>
                        <p style={{ color: authState.isError ? "red" : "green" }}> {authState.message}</p>
                        <div className={styles.inputContainer}>
                            {!userLogginMethode && <div className={styles.inputRow}>
                                <input onChange={(e) => setUsername(e.target.value)} className={styles.inputfield} type='text' placeholder='Username' />
                                <input onChange={(e) => setName(e.target.value)} className={styles.inputfield} type='text' placeholder='Name' />
                            </div>}
                            <input onChange={(e) => setEmail(e.target.value)} className={styles.inputfield} type='email' placeholder='Email' />
                            <input onChange={(e) => setPassword(e.target.value)} className={styles.inputfield} type='password' placeholder='Password' />


                            <div onClick={() => {
                                if (userLogginMethode) {
                                    handleLogin();
                                } else {
                                    handleRegister();
                                }
                            }} className={styles.buttonContaier} >
                                <p>
                                    {userLogginMethode ? "Sign In " : "Sign up"}
                                </p>
                            </div>
                        </div>

                    </div>
                    <div className={styles.cardContainer__right}>
                        <div style={{ color: "white", textAlign: "center", padding: "1rem" }}>
                            {userLogginMethode ? <p>Don't Have an Account</p> : <p>Already Have an Account</p>}
                            <div onClick={() => {
                                setUserLogginMethode(!userLogginMethode)
                            }} >
                                <p style={{ marginTop: "1rem", cursor: "pointer", background: "white", color: "black", fontSize: "0.9rem", padding: "0.3rem", borderRadius: "10px", textAlign: "center" }}>
                                    {userLogginMethode ? "Sign up " : "Sign in"}
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </UserLayout>

    )
}
