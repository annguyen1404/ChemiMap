import React, { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";

const Results = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const queryParams = new URLSearchParams(location.search);
  const initialQuery = queryParams.get("query") || "";
  
  const [query, setQuery] = useState(initialQuery);

  const handleSearch = () => {
    // Update the URL with the new query
    navigate(`/results?query=${encodeURIComponent(query)}`);
  };

  // Mock search results based on url query
  const mockResults = [
    `Mock values 1 for ${initialQuery}`,
    `Mock values 2 for ${initialQuery}`,
    `Mock values 3 for ${initialQuery}`,
  ];

  return (
    <div className="results">
      <h2>Search Results for: {initialQuery}</h2>
      
      {/* Search bar */}
      <input
        type="text"
        placeholder="Search..."
        value={query}
        onChange={(e) => setQuery(e.target.value)}
      />
      <button onClick={handleSearch}>Search</button>
      
      {/* Display mock search results */}
      <ul>
        {mockResults.map((result, index) => (
          <li key={index}>{result}</li>
        ))}
      </ul>
    </div>
  );
};

export default Results;
