import React, { useState, ChangeEvent, KeyboardEvent } from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import SearchBar from "../components/SearchBar";
import { Container, Section } from "../styles/Layout";
import { Subtext, SubTitle, Title } from "../styles/Text";

const backgroundImage = require("../assets/background.jpg");

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

const SubtextMain = styled(Subtext)`
  margin-bottom: 80px;
  margin-top: 0px;
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
      <MainSection id="main">
        <SubtextMain>
          Discover connections in biomedical literature through our dynamic
          knowledge graph of chemical and disease relationships.
        </SubtextMain>
        <Title>ChemiMap</Title>
        <SearchBar
          query={query}
          onChange={handleChange}
          onSearch={handleSearch}
          onKeyDown={handleKeyDown}
        />
      </MainSection>

      <AboutSection id="about">
        <SubTitle>About ChemiMap</SubTitle>
        <Subtext>
        Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.
        </Subtext>
      </AboutSection>

      <FooterSection id="footer">
        <Subtext>© 2024 ChemiMap. All rights reserved.</Subtext>
      </FooterSection>
    </Container>
  );
};

export default Home;
