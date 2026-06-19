import DashboardLayout from '@/layout/dashboardLayout'
import UserLayout from '@/layout/userLayout'
import React from 'react'

export default function MyConnections() {
    return (
        <UserLayout>
            <DashboardLayout>
                <h2>Connection</h2>
            </DashboardLayout>
        </UserLayout>
    )
}
