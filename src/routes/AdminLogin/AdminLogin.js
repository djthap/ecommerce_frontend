import React from 'react'
import AdminLoginPage from '../../components/AdminLoginPage'

function AdminLogin({loading,setloading}) {
  return (
    <div><AdminLoginPage loading={loading} setloading={setloading}/></div>
  )
}

export default AdminLogin