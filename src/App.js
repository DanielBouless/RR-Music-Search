import { useState, useRef, Fragment, Suspense, useEffect } from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Gallery from './components/Gallery'
import Searchbar from './components/SearchBar'
import { DataContext } from './context/DataContext'
import { SearchContext } from './context/SearchContext'
import AlbumView from './components/AlbumView'
import ArtistView from './components/ArtistView'
import { createResource as fetchData } from './helper'


function App() {
	let [message, setMessage] = useState('Search for Music!')
	let [data, setData] = useState(null)
	let searchInput = useRef('')

	const API_URL = 'https://itunes.apple.com/search?term='

	
	
	const handleSearch = (e, term) => {
		e.preventDefault()
		const fetchData = async () => {
				document.title = `${term} Music`
				const response = await fetch(API_URL + term)
				const resData = await response.json()
				if (resData.results.length > 0) {
					setData(resData.results)
				} else {
					setMessage('Not Found')
				}
			}
		fetchData()
	}
	useEffect(() => {
    if (searchInput) {
        setData(fetchData(searchInput))
    }
}, [searchInput])

const renderGallery = ()=>{
	if(data){
		return (
			<Suspense fallback={<h1>Loading...</h1>}>
								<Gallery />
								</Suspense>
		)
	}
}
	return (
		<div>
			
			
			{message}
			<Router>
				<Routes>
					<Route path='/' element={
						<Fragment>
							<SearchContext.Provider value={{term: searchInput, handleSearch: handleSearch}}>
								<Searchbar handleSearch = {handleSearch}/>
							</SearchContext.Provider>
							<DataContext.Provider value={data}>
								{renderGallery()}
							</DataContext.Provider>
						</Fragment>
					}/>
					<Route path="/album/:id" element={<AlbumView/>} />
					<Route path='artist/:id' element={<ArtistView/>} />
				</Routes>
			</Router>

		</div>
  	);
}

export default App;
