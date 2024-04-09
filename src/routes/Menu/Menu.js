import React from 'react'
import MenuList from '../../components/MenuList'

function Menu({loading,setloading}) {
  return (
    <div><MenuList  loading={loading} setloading={setloading} /></div>
  )
}

export default Menu