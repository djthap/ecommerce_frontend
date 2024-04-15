import React from 'react'
import Test from '../../components/Test'
import CheckoutPage from '../../components/CheckoutPage'

export default function Checkout({loading, setloading}) {
  return (
    <div><CheckoutPage loading={loading}
    setloading={setloading} /></div>
  )
}
