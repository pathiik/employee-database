import React from 'react'
import AddUserForm from '../../components/addUserForm/AddUserForm'
import Header from '../../components/header/Header'
import Footer from '../../components/footer/Footer'

const AddUserPage = () => {
    return (
        <>
            <Header />
            <main className='add-user-main'>
                <AddUserForm />
            </main>
            <Footer />
        </>
    )
}

export default AddUserPage