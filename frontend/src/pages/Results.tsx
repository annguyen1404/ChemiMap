import React, { useState, ChangeEvent, KeyboardEvent } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { styled } from "styled-components";
import SearchBar from "../components/SearchBar";
import { Subtext, SubTitle } from "../styles/Text";

const Container = styled.div`
  height: 100vh;
  width: 100vw;
  overflow-y: auto;
  overflow-x: hidden;
  scroll-snap-type: y mandatory;
`;

const Section = styled.section`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  height: 100vh;
  width: 100vw;
  color: white;
  text-align: center;
  scroll-snap-align: start;
  background-color: black;
`;

const ResultsSection = styled(Section)`
  background-color: black;
`;

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
    <Container>
      <ResultsSection>
        <SubTitle>Search results for: {initialQuery}</SubTitle>

        <SearchBar 
          query={query} 
          onChange={handleChange} 
          onSearch={handleSearch} 
          onKeyDown={handleKeyDown} 
        />

        {/* Display mock search results */}
        <Subtext>
          {mockResults.map((result, index) => (
            <li key={index}>{result}</li>
          ))}
        </Subtext>
      </ResultsSection>
    </Container>
  );
};

export default Results;
