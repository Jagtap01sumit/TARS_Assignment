import React, { useState } from 'react';
import axios from 'axios';

export default function SearchUnit() {
  const [query, setQuery] = useState('');
  const [results, setResults] = useState([]); 

  const apiKey = 'pWy9EcgK0erjCG64djnEpvlZrookYrc2cx4blLRQAyY';
  const handleSearch = async () => {
    try {
      const response = await axios.get(`https://api.unsplash.com/search/photos?query=${query}&client_id=${apiKey}`);
      setResults(response.data.results);
    } catch (error) {
      console.error('Error searching photos:', error);
    }
  };

  return (
    <div>
      <h1>Photo Search</h1>
      <input
        type="text"
        placeholder="Search for photos"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
      />
      <button onClick={handleSearch}>Search</button>

      <div className="results">
        {results.map((photo) => (
          <div key={photo.id}>
            <img src={photo.urls.regular} alt={photo.alt_description} />
            <p>{photo.description || 'No description available'}</p>
          </div>
        ))}
      </div>
    </div>
  );
}


