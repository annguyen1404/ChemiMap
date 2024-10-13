import React, { useState, ChangeEvent, KeyboardEvent } from "react";
import { useLocation, useNavigate } from "react-router-dom";

const Results: React.FC = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const queryParams = new URLSearchParams(location.search);
  const initialQuery = queryParams.get("query") || "";

  const [query, setQuery] = useState<string>(initialQuery);

  const handleSearch = (): void => {
    // Update the URL with the new query
    navigate(`/results?query=${encodeURIComponent(query)}`);
  };

  const handleKeyDown = (e: KeyboardEvent<HTMLInputElement>): void => {
    if (e.key === "Enter") {
      handleSearch();
    }
  };

  const handleChange = (e: ChangeEvent<HTMLInputElement>): void => {
    setQuery(e.target.value);
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
        onChange={handleChange}
        onKeyDown={handleKeyDown}
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
