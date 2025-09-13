import Footer from '@/Components/Footer'
import OurTeamPage from '@/Components/OurTeam'
import AdminDashboardLayout from '@/layout/AdminDashboardLayout'
import AdminLayout from '@/layout/AdminLayout'
import React from 'react'
import { useSelector } from 'react-redux'

export default function ourTeamPage() {
  const authState = useSelector((state)=>state.auth)
  return (
    <AdminLayout>
      <AdminDashboardLayout>
        <OurTeamPage />


        {!authState.loggedIn &&<Footer />}
      </AdminDashboardLayout>

    </AdminLayout>
  )
}
