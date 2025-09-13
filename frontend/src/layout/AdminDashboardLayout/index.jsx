import React, { useEffect } from 'react'
import styles from './index.module.css'
import { useRouter } from 'next/router'
import SidebarLayout from '../SidebarLayout';
import { setTokenIsThere } from '@/config/redux/reducer/authReducer';
import Footer from '@/Components/Footer';
import { useSelector } from 'react-redux';

export default function AdminDashboardLayout({ children }) {


  const authState = useSelector((state)=>state.auth);
 if(authState.loggedIn) {
  return (

    
    
    <SidebarLayout>
     {children}
    
    </SidebarLayout>
    
  )

 }else {
  return(
<div>
  {children}
  </div>
  )
  
 }
}
