import React from 'react'
import CheckoutPage from '../../components/CheckoutPage'

export default function Checkout({loading, setloading}) {
  return (
    <div><CheckoutPage loading={loading}
    setloading={setloading} /></div>
  )
}
