import React from 'react'
import Footer from './Footer'
import Header from './Header'
import '../../css/Header.css'
function Layout({element, loading, setloading}) {
	return (
		<div>
			<Header loading={loading} setloading={setloading} />
			<div className="page">{element}</div>
			<Footer />
		</div>
	)
}

export default Layout
