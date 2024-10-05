import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const Home = () => {
  const [query, setQuery] = useState("");
  const navigate = useNavigate();

  const handleSearch = () => {
    navigate(`/results?query=${encodeURIComponent(query)}`);
  };

  return (
    <div className="home">
      <h1>ChemiMap</h1>
      <input
        type="text"
        placeholder="Search biomedical research papers..."
        value={query}
        onChange={(e) => setQuery(e.target.value)}
      />
      <button onClick={handleSearch}>Search</button>
    </div>
  );
};

export default Home;
