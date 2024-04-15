import React from 'react'
import Product from '../../components/Product'

export default function ViewProduct({loading,setloading}) {
  return (
    <div>
    <Product loading={loading}
							setloading={setloading}/>
    </div>
  )
}
