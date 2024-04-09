import React from 'react'
import CartPage from '../../components/CartPage'

export default function Cart({loading,setloading}) {
  return (
    <div><CartPage loading={loading}
    setloading={setloading}/></div>
  )
}
