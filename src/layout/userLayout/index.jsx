import NavBarComponents from '@/components/Navbar'
import React from 'react'
function UserLayout({ children }) {
    return (
        <div>
            <NavBarComponents />
            {children}

        </div>
    )
}

export default UserLayout