import React, { useState, ChangeEvent, KeyboardEvent } from "react";
import { useNavigate } from "react-router-dom";

const Home: React.FC = () => {
  const [query, setQuery] = useState<string>("");
  const navigate = useNavigate();

  const handleSearch = (): void => {
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

  return (
    <div className="home">
      <h1>ChemiMap</h1>
      <input
        type="text"
        placeholder="Search biomedical research papers..."
        value={query}
        onChange={handleChange}
        onKeyDown={handleKeyDown}
      />
      <button onClick={handleSearch}>Search</button>
    </div>
  );
};

export default Home;
