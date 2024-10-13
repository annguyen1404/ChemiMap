import React, { useState, ChangeEvent, KeyboardEvent } from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import SearchBar from "../components/SearchBar";
import colours from "../styles/Colours";

const backgroundImage = require("../assets/background.jpg");

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

const MainSection = styled(Section)`
  background-image: url(${backgroundImage});
  background-size: cover;
  background-position: center;
  background-repeat: no-repeat;
`;

const AboutSection = styled(Section)`
  background-color: black;
`;

const FooterSection = styled(Section)`
  height: 50vh;
  justify-content: flex-end;
`;

const Title = styled.h1`
  font-size: 6rem;
  font-weight: 500;
  margin: 0;
  text-shadow: 4px 4px 10px rgba(0, 0, 0, 0.25);
`;

const Subtext = styled.p`
  color: ${colours.grey};
  margin-bottom: 80px;
  font-size: 0.75rem;
  max-width: 400px;
`;

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
    <Container>
      <MainSection>
      <Subtext>
          Discover connections in biomedical literature through our dynamic
          knowledge graph of chemical and disease relationships.
        </Subtext>
      <Title>ChemiMap</Title>
        <SearchBar
          query={query}
          onChange={handleChange}
          onSearch={handleSearch}
          onKeyDown={handleKeyDown}
        />
      </MainSection>

      <AboutSection>
        <h2>About ChemiMap</h2>
        <p>ChemiMap is your resource for biomedical research papers.</p>
      </AboutSection>

      <FooterSection>
        <p>© 2024 ChemiMap. All rights reserved.</p>
      </FooterSection>
    </Container>
  );
};

export default Home;
