import React, { useState, ChangeEvent, KeyboardEvent } from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import SearchBar from "../components/SearchBar";
import { Container, Section } from "../styles/Layout";
import { Button, Subpoint, Subtext, SubTitle, Title } from "../styles/Text";
import colours from "../styles/Colours";

const backgroundImage = require("../assets/background.jpg");
const backgroundImage1 = require("../assets/background1.jpg");
const backgroundImage2 = require("../assets/background2.jpg");
const backgroundImage3 = require("../assets/background3.jpg");
const backgroundImage4 = require("../assets/background4.jpg");

const MainSection = styled(Section)`
  background-image: url(${backgroundImage});
  background-size: cover;
  background-position: center;
  background-repeat: no-repeat;
`;

const AboutSection = styled(Section)`
  background-image: url(${backgroundImage1});
  background-size: cover;
  background-position: center;
  background-repeat: no-repeat;
`;

const FeaturesSection = styled(Section)`
  background-image: url(${backgroundImage2});
  background-size: cover;
  background-position: center;
  background-repeat: no-repeat;
`;

const ModelsSection = styled(Section)`
  background-image: url(${backgroundImage3});
  background-size: cover;
  background-position: center;
  background-repeat: no-repeat;
`;

const TeamSection = styled(Section)`
  background-image: url(${backgroundImage4});
  background-size: cover;
  background-position: center;
  background-repeat: no-repeat;
`;

const FooterSection = styled(Section)`
  height: 5vh;
  justify-content: flex-end;
`;

const SubtextMain = styled(Subtext)`
  margin-bottom: 80px;
  margin-top: 0px;
  max-width: 400px;
`;

const SubtextProblem = styled(Subtext)`
  font-style: italic;
  margin-bottom: 0;
`;

const SubtextAbout = styled(Subtext)`
  text-align: justify;
`;

const SubtextTeam = styled(Subtext)`
  text-align: justify;
`;

const TeamContainer = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-around;
  width: 600px;
`;

const SubtextFeatures = styled(Subtext)`
  text-align: left;
`;

const SubtextModel = styled(Subtext)`
  text-align: left;

  a {
    color: white;
  }

  a:hover {
    color: ${colours.hoverGreyLight}
  }
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
        <SubtextProblem>
          Problem Statement: Literature review is essential for research
          planning, but efficiently exploring complex chemical-disease
          relationships across vast scientific literature is challenging.
        </SubtextProblem>
        <SubtextAbout>
          ChemiMap is a team of data scientists dedicated to helping biomedical
          researchers by building a solution for intuitive search and
          exploration of chemicals, diseases and their relationships in
          literature. The team implemented Named Entity Recognition and Relation
          Extraction models to capture relations within complex articles,
          combining graphical and document-based databases for efficient access
          and visualization.
        </SubtextAbout>
      </AboutSection>

      <FeaturesSection id="features">
        <SubTitle>What We Offer</SubTitle>
        <SubtextFeatures>
          We offer an AI-powered solution to visualize and explore
          chemical-disease relations in biomedical literature, enabling faster,
          more informed research. Our core features are:
        </SubtextFeatures>
        <SubtextFeatures>
          <li>
            <strong>
              Interactive knowledge graph of chemical-disease relationships
            </strong>
            <br />
            <Subpoint>
              Visualize and explore chemical-disease relationships for an
              overview of key patterns in biomedical research.
            </Subpoint>
          </li>
          <li>
            <strong>Biomedical literature search</strong>
            <br />
            <Subpoint>
              Quickly locate literatures relevant to keywords and topic of
              interest.
            </Subpoint>
          </li>
          <li>
            <strong>
              Annotated biomedical abstract with highlighted entities and
              relationships
            </strong>
            <br />
            <Subpoint>
              Easily identify important sections within abstract, with chemicals
              and diseases clearly highlighted, streamlining the reading
              process.
            </Subpoint>
          </li>
        </SubtextFeatures>
      </FeaturesSection>

      <ModelsSection id="models">
        <SubTitle>Data & Models</SubTitle>
        <SubtextModel>
          ChemiMap currently contains a database compiled from 1650 PubMed
          articles, including the 1500 articles found in the{" "}
          <a href={`https://pmc.ncbi.nlm.nih.gov/articles/PMC4860626/`}>
            BioCreative V Chemical Disease Relation dataset
          </a>{" "}
          that were employed in the training of ChemiMap’s language models, as
          well as an additional 150 articles included in the{" "}
          <a href={"https://www.nature.com/articles/s41597-021-00875-1"}>
            NLM_Chem dataset
          </a>{" "}
          that was used to demonstrate the viability of the models outside of
          the original training data. As this is only an MVP showcase, only the
          title and abstract of each article was utilized.
          <br />
          <br />
          To compile the database, a pipeline was developed with three major
          components, namely (i) a transformer-based Named Entity Recognition
          (NER) model; (ii) a Coreference Resolution model that leverages on{" "}
          <a href={"https://www.ncbi.nlm.nih.gov/mesh"}>MeSH</a> identifiers as
          well as various custom-made rules; and (iii) a transformer-based
          Relationship Extraction (RE) model that processes the text and the
          outputs from models (i) and (ii) to determine if there is an implied
          interaction for each chemical-disease entity pair found in each of the
          PubMed articles.
        </SubtextModel>
      </ModelsSection>

      <TeamSection id="team">
        <SubTitle>The Team</SubTitle>
        <TeamContainer>
          <SubtextTeam>
            <strong>Project team:</strong>
            <br />
            Chloe Nguyen
            <br />
            Daniel Florencio
            <br />
            Justin To
            <br />
            Nomita Chandra
            <br />
            Woojae Chung
          </SubtextTeam>
          <SubtextTeam>
            <strong>Special thanks to:</strong>
            <br />
            Korin Reid
            <br />
            Puya Vahabi
            <br />
          </SubtextTeam>
          <SubtextTeam>
            Capstone Project, Fall 2024.
            <br />
            Master's in Data Science.
            <br />
            University of California, Berkeley.
          </SubtextTeam>
        </TeamContainer>
      </TeamSection>

      <FooterSection id="footer">
        <Subtext>© 2024 ChemiMap. All rights reserved.</Subtext>
      </FooterSection>
    </Container>
  );
};

export default Home;
