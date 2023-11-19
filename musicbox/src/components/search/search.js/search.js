import React, { useState, useEffect } from 'react';

const Search = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [searchResults, setSearchResults] = useState([]);
  const [data, setData] = useState([]); // Initially empty data

  useEffect(() => {
    // Simulated API call to fetch data (replace with actual API call)
    const fetchData = async () => {
      try {
        const response = await fetch('https://api.example.com/artists');
        if (response.ok) {
          const fetchedData = await response.json();
          setData(fetchedData); // Set the fetched data in state
        } else {
          throw new Error('Failed to fetch data');
        }
      } catch (error) {
        console.error(error);
      }
    };

    fetchData();
  }, []); // Run only on component mount

  const handleSearch = (e) => {
    const query = e.target.value;
    setSearchQuery(query);

    const filteredResults = data.filter((item) =>
      item.name.toLowerCase().includes(query.toLowerCase()) ||
      item.genre.toLowerCase().includes(query.toLowerCase())
    );
    setSearchResults(filteredResults);
  };

  return (
    <div className="search-container">
      <h2>Search Artists</h2>
      <input
        type="text"
        placeholder="Search by name or genre..."
        value={searchQuery}
        onChange={handleSearch}
      />
      <div className="search-results">
        {searchResults.length > 0 ? (
          <ul>
            {searchResults.map((result) => (
              <li key={result.id}>
                <p>Name: {result.name}</p>
                <p>Genre: {result.genre}</p>
              </li>
            ))}
          </ul>
        ) : (
          <p>No results found.</p>
        )}
      </div>
    </div>
  );
};

export default Search;
