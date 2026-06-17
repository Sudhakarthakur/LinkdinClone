import { useRouter } from 'next/router'
import React, { useEffect, useState } from 'react'

export default function Dashboard() {
    const router = useRouter();

    useEffect(() => {
        const token = localStorage.getItem('token');
        if (token) {
            router.push("/dashboard")
        } else {
            router.push("/login")
        }
    }, [router])

    return (
        <>

            <div>
                <h2>my dashboard</h2>
            </div>

        </>
    )
}
