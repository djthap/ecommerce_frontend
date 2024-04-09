import './App.css'
import { Routes, Route } from 'react-router-dom'
import Home from './routes/Home/Home'
import Navigation from './routes/navigation/Navigation'
import PageNotFound from './routes/pageNotFound/PageNotFound'
import Layout from './components/layout/Layout'
import AboutUs from './routes/AboutUs/AboutUs'

import Login from './routes/Login/Login'
import Register from './routes/Register/Register'
import { useState } from 'react'
import Dashboard from './routes/Dashboard/Dashboard'
import ManageCategory from './routes/Category/ManageCategory'
import CreateMenuItem from './components/CreateMenuItem'
import ManageMenuItem from './routes/manageMenuItem/ManageMenuItem'
import ManageExtraPrice from './routes/MangeExtraPrice/ManageExtraPrice'
import AllMenuItems from './routes/allMenuItems/AllMenuItems'
import EditMenuItem from './components/EditMenuItem'
import Users from './components/Users'
import Menu from './routes/Menu/Menu'
import ViewProduct from './routes/ViewProduct/ViewProduct'
import AdminLogin from './routes/AdminLogin/AdminLogin'
import Cart from './routes/Cart/Cart'
import ContactUs from './routes/ContactUs/ContactUs'
import Checkout from './routes/Checkout/Checkout'
import AllOrders from './routes/orders/AllOrders'
import ProfilePage from './routes/Profile/ProfilePage'
import MyOrders from './routes/orders/MyOrders'

function App() {
	const [loading, setloading] = useState(false)

	return (
		<div className="App">
			<Routes>
				<Route path="/" element={<Layout loading={loading}
							setloading={setloading} element={<Home />} />} />
				<Route
					path="/Login"
					element={
						<Layout
							loading={loading}
							setloading={setloading}
							element={
								<Login
									loading={loading}
									setloading={setloading}
								/>
							}
						/>
					}
				/>
				<Route
					path="/AdminLogin"
					element={
						<Layout
							loading={loading}
							setloading={setloading}
							element={
								<AdminLogin
									loading={loading}
									setloading={setloading}
								/>
							}
						/>
					}
				/>
				<Route
					path="/SignUp"
					element={<Layout loading={loading}
					setloading={setloading}  element={<Register />} />}
				/>
				<Route
					path="/Cart"
					element={<Layout loading={loading}
					setloading={setloading} element={<Cart loading={loading}
					setloading={setloading} />} />}
				/>
				<Route
					path="/aboutUs"
					element={<Layout loading={loading}
					setloading={setloading} element={<AboutUs />} />}
				/>
				<Route
					path="/orders"
					element={<Layout loading={loading}
					setloading={setloading} element={<AllOrders />} />}
				/>
				<Route
					path="/Myorders"
					element={<Layout loading={loading}
					setloading={setloading} element={<MyOrders />} />}
				/>
				<Route
					path="/adminDashboard"
					element={<Layout loading={loading}
					setloading={setloading} element={<Dashboard />} />}
				/>
				<Route
					path="/profile"
					element={<Layout loading={loading}
					setloading={setloading} element={<ProfilePage />} />}
				/>
				<Route
					path="/manageUsers"
					element={<Layout loading={loading}
					setloading={setloading} element={<Users />} />}
				/>
				<Route
					path="/manageCategory"
					element={<Layout loading={loading}
					setloading={setloading} element={<ManageCategory />} />}
				/>
				<Route
					path="/Checkout"
					element={<Layout loading={loading}
					setloading={setloading} element={<Checkout loading={loading}
					setloading={setloading} />} />}
				/>
				<Route
					path="/menu"
					element={<Layout  loading={loading}
					setloading={setloading}  element={<Menu 	loading={loading}
					setloading={setloading}/>} />}
				/>
				<Route
					path="/createMenuitem"
					element={<Layout loading={loading}
					setloading={setloading} element={<CreateMenuItem />} />}
				/>
				<Route
					path="/editMenuitem/:id"
					element={<Layout loading={loading}
					setloading={setloading} element={<EditMenuItem />} />}
				/>
				<Route
					path="/viewitem/:id"
					element={<Layout loading={loading}
					setloading={setloading} element={<ViewProduct/>} />}
				/>
				<Route
					path="/contactUs"
					element={<Layout loading={loading}
					setloading={setloading} element={<ContactUs/>} />}
				/>
				<Route
					path="/manageMenuitem"
					element={<Layout loading={loading}
					setloading={setloading} element={<ManageMenuItem />} />}
				/>
				<Route
					path="/ManageExtraPrice"
					element={<Layout loading={loading}
					setloading={setloading} element={<ManageExtraPrice/> } />}
				/>
				<Route
					path="/AllMenuItems"
					element={<Layout loading={loading}
					setloading={setloading} element={<AllMenuItems/> } />}
				/>

				<Route
					path="*"
					element={<Layout loading={loading}
					setloading={setloading} element={<PageNotFound />} />}
				/>
			</Routes>
		</div>
	)
}

export default App
