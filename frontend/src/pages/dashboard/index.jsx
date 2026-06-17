// import { useRouter } from 'next/router'
import { useRouter } from 'next/navigation'
import React, { useEffect } from 'react'

export default function Dashboard() {

    // const router = useRouter();
    const router = useRouter();
    //  this is not work proprly this is crash btween login and dashboard page

    // useEffect(() => {
    //     if (localStorage.getItem('token') === null) {
    //         router.push("/login")
    //     }
    // })

    return (
        <div>
            <h2>my dahsboard</h2>
        </div>
    )
}
