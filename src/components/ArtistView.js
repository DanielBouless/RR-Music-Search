import { useState, useEffect } from 'react'
import { useParams, Link, useNavigate } from 'react-router-dom'


function ArtistView() {
    const navigate = useNavigate()
    const { id } = useParams()
    const [ artistData, setArtistData ] = useState([])
    const justAlbums = artistData.filter(entry => entry.collectionType === 'Album')

    

    useEffect(() => {
        const API_URL = `http://localhost:4000/album/${id}`
        const fetchData = async () => {
            const response = await fetch(API_URL)
            const resData = await response.json()
            setArtistData(resData.results)
            console.log(resData.results)
        }
        fetchData()
    },[id])

const renderAlbums = justAlbums.map((album, i)=>{
        return(
            <div key={i}>
                <Link to={`/album/${album.collectionId}`}>
                    <p>{album.collectionName}</p>
                </Link>
                
            </div>
        )
    })

    const navButtons = () =>{
        return(
            <div>
                <button onClick={(()=> navigate(-1))}>Back</button>
                <button onClick={(()=> navigate('/'))}>Home</button>
            </div>
        )
    }

    return (
        <div>
            {artistData.length > 0 ? artistData[0].artistName: <h2>Loadin...</h2>}
            {navButtons()}
            {renderAlbums}
        </div>
    )

}
export default ArtistView
