import Footer from '@/Components/Footer'
import NavbarComponent from '@/Components/Navbar'
import React from 'react'

function StudentLayout({children}) {
  return (
    <div>
      <NavbarComponent>

      </NavbarComponent>
      {children}
     
    </div>
  )
}

export default StudentLayout
