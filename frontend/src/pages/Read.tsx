import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import styled from "styled-components";
import { Article } from "../components/DataModels";
import { Container, Section } from "../styles/Layout";
import { Subtext, SubTitle } from "../styles/Text";
import colours from "../styles/Colours";

const renderList = (items?: string[]) => {
  if (items) {
    return items.map((item, index) => <span key={index}>{item}</span>);
  }
  return "None";
};

const ArticleContainer = styled.div`
  margin: 0 20px;
  min-height: 400px;
  max-height: 400px;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  gap: 20px;
`;

const KeyContainer = styled.div`
  overflow-y: auto;
  width: 200px;
  min-height: 400px;
  max-height: 100%;
  margin-top: 20px;
  padding: 20px;
  border-radius: 6px;
  outline: 2px solid ${colours.greyDark};
  text-align: left;
  display: flex;
  flex-direction: column;
`;

const TextContainer = styled.div`
  overflow-y: auto;
  width: 100%;
  min-height: 400px;
  margin-top: 20px;
  padding: 20px;
  border-radius: 6px;
  outline: 2px solid ${colours.greyDark};
  text-align: justify;
`;

const SubtextArticle = styled(Subtext)`
  max-width: 100%;
`;

const KeyTitle = styled(SubTitle)<{ marginTop?: string }>`
  font-size: 0.75rem;
  max-width: 100%;
  margin-bottom: 2px;
  text-align: center;
  margin-top: ${({ marginTop }) => marginTop ?? "0"};
`;

const Highlight = styled.span<{
  color: string;
  isKeyLabel?: boolean;
  highlighted?: boolean;
}>`
  font-size: 0.75rem;
  background-color: ${({ highlighted, color }) =>
    highlighted ? colours.greyDark : color};
  border-radius: ${({ isKeyLabel }) => (isKeyLabel ? "20px" : "5px")};
  padding: ${({ isKeyLabel }) => (isKeyLabel ? "2px 3px" : "0 3px")};
  margin-left: ${({ isKeyLabel }) => (isKeyLabel ? "2px" : "2px")};
  margin-right: ${({ isKeyLabel }) => (isKeyLabel ? "0" : "2px")};
  margin-bottom: ${({ isKeyLabel }) => (isKeyLabel ? "5px" : "0")};
  text-align: ${({ isKeyLabel }) => (isKeyLabel ? "center" : "justify")};
  cursor: pointer;
`;

const Read: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const [article, setArticle] = useState<Article | null>(null);
  const [hoveredTerm, setHoveredTerm] = useState<string | null>(null);

  useEffect(() => {
    // Mock article data
    const fetchArticle = async (articleId: string) => {
      try {
        const mockData: Article = {
          id: articleId,
          title: `Mock Article Title ${articleId}`,
          abstract: `This is the mock abstract for article ${articleId}. It contains some mock chemicals like Aspirin and some diseases like Cancer. Some more important diseases are: Diabetes, headaches, infections...`,
          chemicals: ["Aspirin"],
          diseases: ["Cancer", "Diabetes", "Headaches", "Infections"],
        };

        // Simulating a network delay with a Promise and setTimeout
        await new Promise<void>((resolve) => setTimeout(() => resolve(), 500)); // Simulate 500ms delay
        setArticle(mockData);
      } catch (error) {
        console.error("Error fetching article:", error);
        setArticle(null);
      }
    };

    if (id) {
      fetchArticle(id);
    }
  }, [id]);

  const highlightText = (
    text: string,
    chemicals: string[],
    diseases: string[]
  ) => {
    const terms = [...chemicals, ...diseases].join("|");
    const regex = new RegExp(`(${terms})`, "gi");

    const parts = text.split(regex);
    return parts.map((part, index) => {
      const lowerCasePart = part.toLowerCase();

      if (
        chemicals.some((chemical) => chemical.toLowerCase() === lowerCasePart)
      ) {
        const chemicalName = chemicals.find(
          (chemical) => chemical.toLowerCase() === lowerCasePart
        );
        return (
          <Highlight
            key={index}
            color={colours.chemicals}
            highlighted={
              hoveredTerm && hoveredTerm !== chemicalName ? true : false
            }
            onMouseEnter={() => setHoveredTerm(chemicalName || null)}
            onMouseLeave={() => setHoveredTerm(null)}
          >
            {part}
          </Highlight>
        );
      } else if (
        diseases.some((disease) => disease.toLowerCase() === lowerCasePart)
      ) {
        const diseaseName = diseases.find(
          (disease) => disease.toLowerCase() === lowerCasePart
        );
        return (
          <Highlight
            key={index}
            color={colours.diseases}
            highlighted={
              hoveredTerm && hoveredTerm !== diseaseName ? true : false
            }
            onMouseEnter={() => setHoveredTerm(diseaseName || null)}
            onMouseLeave={() => setHoveredTerm(null)}
          >
            {part}
          </Highlight>
        );
      }
      return part;
    });
  };

  return (
    <Container>
      <Section id="read">
        {!article ? (
          <SubTitle>Loading...</SubTitle>
        ) : (
          <>
            <Subtext>PMID: {article.id}</Subtext>
            <SubTitle>{article.title}</SubTitle>
            <ArticleContainer>
              <KeyContainer>
                <KeyTitle>Chemicals</KeyTitle>
                {article.chemicals
                  ? article.chemicals.map((chemical, index) => (
                      <Highlight
                        key={index}
                        color={colours.chemicals}
                        isKeyLabel={true}
                        highlighted={
                          hoveredTerm && hoveredTerm !== chemical ? true : false
                        }
                        onMouseEnter={() => setHoveredTerm(chemical)}
                        onMouseLeave={() => setHoveredTerm(null)}
                      >
                        {chemical}
                      </Highlight>
                    ))
                  : "None"}
                <KeyTitle marginTop={"20px"}>Diseases</KeyTitle>
                {article.diseases
                  ? article.diseases.map((disease, index) => (
                      <Highlight
                        key={index}
                        color={colours.diseases}
                        isKeyLabel={true}
                        highlighted={
                          hoveredTerm && hoveredTerm !== disease ? true : false
                        }
                        onMouseEnter={() => setHoveredTerm(disease)}
                        onMouseLeave={() => setHoveredTerm(null)}
                      >
                        {disease}
                      </Highlight>
                    ))
                  : "None"}
              </KeyContainer>

              <TextContainer>
                <SubtextArticle>
                  {highlightText(
                    article.abstract,
                    article.chemicals || [],
                    article.diseases || []
                  )}
                </SubtextArticle>
              </TextContainer>
            </ArticleContainer>
          </>
        )}
      </Section>
    </Container>
  );
};

export default Read;
