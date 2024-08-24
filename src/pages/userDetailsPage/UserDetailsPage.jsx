import React from 'react'
import Header from '../../components/header/Header'
import Footer from '../../components/footer/Footer'
import UserDetails from '../../components/userDetails/UserDetails'

import './userDetailsPage.css'

function UserDetailsPage() {
  return (
    <>
    <Header />
    <div className="container">
      <main className='user-details-page-main'>
        <h1>User Details</h1>
        <UserDetails />
      </main>
    </div>
    <Footer />
    </>
  )
}

export default UserDetailsPage