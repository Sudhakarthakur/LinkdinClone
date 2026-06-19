import React from 'react'
import styles from './index.module.css';
import { useRouter } from 'next/router';

export default function NavBarComponents() {
    const router = useRouter();
    return (
        <div className={styles.container}>
            <nav className={styles.navBar}>
                <h2 style={{ cursor: "pointer" }} onClick={() => {
                    router.push("/");
                }}>Connect with us</h2>
                <div className={styles.navBarOptionContainer}>
                    <div onClick={() => {
                        router.push("/login")
                    }} className={styles.buttonJoin}>
                        <p>Be a Part</p>
                    </div>
                </div>

            </nav>
        </div>
    )
}
