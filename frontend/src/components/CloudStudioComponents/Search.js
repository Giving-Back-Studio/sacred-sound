import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import { useAuth0 } from '@auth0/auth0-react';

const Search = () => {
    const { searchQuery } = useParams(); // Extract searchQuery from URL
    const [searchResults, setSearchResults] = useState({ tracks: [], albums: [], artists: [] });
    const [isLoading, setIsLoading] = useState(true);

    const { user, isAuthenticated } = useAuth0();

    //debugging FE request
    useEffect(() => {
        console.log(searchResults);
    }, [searchResults]);

    useEffect(() => {
        if (!searchQuery) return;

        const fetchSearchResults = async () => {
            setIsLoading(true);
            try {
                const userId = isAuthenticated ? user.name : null; // Use an identifier like user.sub
                const response = await axios.get(`https://monkfish-app-nb3ck.ondigitalocean.app/api/getSearchResult/${userId}/${searchQuery}`);
                setSearchResults(response.data);
            } catch (error) {
                console.error('Failed to fetch search results:', error);
                // Handle error as appropriate for your application
            } finally {
                setIsLoading(false);
            }
        };

        fetchSearchResults();
    }, [searchQuery, user]);

    if (isLoading) return <div>Loading...</div>;

    return (
        <div>
            <h2>Search Results for "{searchQuery}"</h2>
            {/* Check if user is authenticated and then display a user property */}
            {isAuthenticated && <h2>User is: {user.name}</h2>}
            <div>
                <h3>Tracks</h3>
                <ul>
                    {searchResults.tracks.map((track, index) => (
                        <li key={index}>{track.itemName} - {track.score}</li>
                    ))}
                </ul>
            </div>
            <div>
                <h3>Albums</h3>
                <ul>
                    {searchResults.albums.map((album, index) => (
                        <li key={index}>{album.itemName} - {album.score}</li>
                    ))}
                </ul>
            </div>
            <div>
                <h3>Artists</h3>
                <ul>
                    {searchResults.artists.map((artist, index) => (
                        <li key={index}>{artist.itemName} - {artist.score}</li>
                    ))}
                </ul>
            </div>
        </div>
    );
};

export default Search;
