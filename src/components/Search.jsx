import React, { useState, useEffect } from 'react'
import Form from 'react-bootstrap/Form'
import '../css/Search.css'
import { Link } from 'react-router-dom'
function Search() {
	const [searchQuery, setSearchQuery] = useState('')
	const [searchResults, setSearchResults] = useState([])

	const handleSearchInputChange = (event) => {
		setSearchQuery(event.target.value)
	}

	useEffect(() => {
		const fetchSearchResults = async () => {
			try {
				const response = await fetch(
					`/api/menuItem/search?name=${searchQuery}`
				)
				if (!response.ok) {
					throw new Error('Failed to fetch search results')
				}
				const data = await response.json()
				setSearchResults(data)
			} catch (error) {
				console.error('Error fetching search results:', error)
				setSearchResults([])
			}
		}

		// Trigger the API call only if searchQuery is not empty
		if (searchQuery.trim() !== '') {
			fetchSearchResults()
		} else {
			setSearchResults([])
		}
	}, [searchQuery])

	return (
		<Form className="d-flex mf position-relative">
			<Form.Control
				type="search"
				placeholder="Search by name"
				className="me-2"
				aria-label="Search"
				value={searchQuery}
				onChange={handleSearchInputChange}
			/>

			<div className="search-results-container">
				<div className="search-results-dropdown">
					{searchResults.map((item) => (
						
							<Link to={`/viewitem/${item._id}`} 	className="search-result-item d-flex"
							key={item._id} >
							<img
								src={item.image}
								alt={item.name}
								width={50}
								height={50}
								/>
							<div  className='text'>
								<p>{item.name}</p>
								<p>Price: {item.basePrice}</p>
								
							</div>
								</Link>
						
					))}
				</div>
			</div>
		</Form>
	)
}

export default Search
