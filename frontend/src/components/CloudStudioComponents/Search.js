import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import { useAuth } from '../../context/AuthContext'; // Import your custom useAuth hook

const Search = () => {
  const { searchQuery } = useParams(); // Extract searchQuery from URL
  const [searchResults, setSearchResults] = useState({ tracks: [], albums: [], artists: [] });
  const [isLoading, setIsLoading] = useState(true);

  const { userEmail } = useAuth(); // Use the custom hook to get the user's email

  useEffect(() => {
    if (!searchQuery) return;

    const fetchSearchResults = async () => {
      setIsLoading(true);
      try {
        const response = await axios.get(`${process.env.REACT_APP_API_BASE_URL}/api/getSearchResult/${userEmail}/${searchQuery}`);
        setSearchResults(response.data);
      } catch (error) {
        console.error('Failed to fetch search results:', error);
        // Handle error as appropriate for your application
      } finally {
        setIsLoading(false);
      }
    };

    fetchSearchResults();
  }, [searchQuery, userEmail]);

  if (isLoading) return <div>Loading...</div>;

  return (
    <div>
      <h2>Search Results for "{searchQuery}"</h2>
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