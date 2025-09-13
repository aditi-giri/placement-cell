import AdminDashboardLayout from '@/layout/AdminDashboardLayout'
import AdminLayout from '@/layout/AdminLayout'
import ContactUs from '@/components/ContactUs' // Import the new component
import Footer from '@/Components/Footer'
import { useSelector } from 'react-redux'

export default function ContactUsPage() {
  const authState = useSelector((state)=>state.auth);
  return (
    <AdminLayout>
      <AdminDashboardLayout>
      
        <ContactUs />
        {!authState.loggedIn &&
        <Footer/>
        }
        
        </AdminDashboardLayout>
    </AdminLayout>


  )
}