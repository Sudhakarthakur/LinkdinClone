import React from 'react'
import styles from './index.module.css';
import { useRouter } from 'next/router';
import { useDispatch, useSelector } from 'react-redux';
import { reset } from '@/config/redux/reudcer/authReducer';

export default function NavBarComponents() {
    const authState = useSelector((state) => state.auth)
    const dispatch = useDispatch();
    const router = useRouter();
    return (
        <div className={styles.container}>
            <nav className={styles.navBar}>
                <h2 style={{ cursor: "pointer" }} onClick={() => {
                    router.push("/");
                }}>Connect with us</h2>


                {authState.profileFeatch && <div>
                    <div style={{ gap: "1.2rem", display: "flex" }}>
                        <p>Hey{authState.user.userId.name}</p>
                        <p style={{ fontWeight: "bold", cursor: "pointer" }}>Profile</p>
                        <p onClick={() => {
                            localStorage.removeItem("token")
                            router.push("/login")
                            dispatch(reset());

                        }}
                            style={{ fontWeight: "bold", cursor: "pointer" }}>Logout</p>
                    </div>
                </div>}
                {!authState.profileFeatch &&
                    <div className={styles.navBarOptionContainer}>
                        <div onClick={() => {
                            router.push("/login")
                        }} className={styles.buttonJoin}>
                            <p>Be a Part</p>
                        </div>
                    </div>
                }

            </nav>
        </div>
    )
}
