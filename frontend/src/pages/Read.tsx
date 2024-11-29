import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import styled from "styled-components";
import { Article, GraphData } from "../components/DataModels";
import { Container, Section } from "../styles/Layout";
import { Subtext, SubTitle, Highlight, Button } from "../styles/Text";
import colours from "../styles/Colours";
import Graph from "../components/Graph";
import {
  capitalize,
  cleanArticle,
  formatGraphData,
  getUniqueList,
} from "../shared/ArticleUtils";

const ArticleContainer = styled.div`
  margin: 0 20px;
  min-height: 350px;
  height: 350px;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  gap: 20px;
`;

const KeyContainer = styled.div`
  overflow-y: auto;
  width: 250px;
  min-height: 300px;
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
  min-height: 300px;
  margin-top: 20px;
  padding: 20px;
  border-radius: 6px;
  outline: 2px solid ${colours.greyDark};
  text-align: justify;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
`;

const SubtextArticle = styled(Subtext)`
  max-width: 100%;
  text-align: left-justified;
`;

const ArticleTitle = styled(SubTitle)`
  font-size: 1.5rem;
  padding: 0 40px;
`;

const KeyTitle = styled(SubTitle)<{ marginTop?: string }>`
  font-size: 0.75rem;
  max-width: 100%;
  margin-bottom: 2px;
  text-align: center;
  margin-top: ${({ marginTop }) => marginTop ?? "0"};
`;

const Read: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const [loading, setLoading] = useState<boolean>(true);
  const [article, setArticle] = useState<Article | null>(null);
  const [hoveredTerm, setHoveredTerm] = useState<string | null>(null);
  const [graphData, setGraphData] = useState<GraphData>({
    nodes: [],
    links: [],
  });

  useEffect(() => {
    const fetchArticle = async (articleId: string) => {
      try {
        const response = await fetch(`/api/papers/${articleId}`);
        if (!response.ok) {
          throw new Error("Failed to fetch article");
        }

        const data: Article = await response.json();
        const cleanedArticleList = cleanArticle([data], false, true);

        // Update graph needs all values
        const updatedGraphData = formatGraphData(cleanedArticleList);
        setGraphData(updatedGraphData);
        // Update article needs unique values
        const cleanedArticleUnique = {
          id: cleanedArticleList[0].id,
          title: cleanedArticleList[0].title,
          abstract: cleanedArticleList[0].abstract,
          chemicals: getUniqueList(cleanedArticleList[0].chemicals ?? []),
          diseases: getUniqueList(cleanedArticleList[0].diseases ?? []),
        };
        setArticle(cleanedArticleUnique);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching article:", error);
        setArticle(null);
        setLoading(false);
      }
    };

    // Mock article data
    // const fetchArticle = async (articleId: string) => {
    //   try {
    //     const mockData: Article = {
    //       id: articleId,
    //       title: `Mock Article Title ${articleId}`,
    //       abstract: `This is the mock abstract for article ${articleId}. It contains some mock chemicals like Aspirin and some diseases like Cancer. Some more important diseases are: Diabetes, headaches, infections...`,
    //       chemicals: ["Aspirin"],
    //       diseases: ["Cancer", "Diabetes", "Headaches", "Infections"],
    //     };

    //     // Simulating a network delay with a Promise and setTimeout
    //     await new Promise<void>((resolve) => setTimeout(() => resolve(), 500)); // Simulate 500ms delay
    //     setArticle(mockData);
    //   } catch (error) {
    //     console.error("Error fetching article:", error);
    //     setArticle(null);
    //   }
    // };

    if (id) {
      fetchArticle(id);
    }
  }, [id]);

  const highlightText = (
    text: string,
    chemicals: string[],
    diseases: string[]
  ) => {
    const terms = [...chemicals, ...diseases].sort(
      (a, b) => b.length - a.length
    );
    const regex = new RegExp(`(\\b${terms.join("\\b|\\b")}\\b)`, "gi");

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

      // Return the unmodified part if it does not match
      return part;
    });
  };

  return (
    <Container>
      <Section id="read">
        {loading ? (
          "Loading..."
        ) : article ? (
          <>
            <Subtext>PMID: {id}</Subtext>
            <ArticleTitle>{article.title}</ArticleTitle>
            <ArticleContainer>
              <KeyContainer>
                <KeyTitle>Chemicals</KeyTitle>
                {article.chemicals
                  ? article.chemicals.sort().map((chemical, index) => (
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
                        {capitalize(chemical)}
                      </Highlight>
                    ))
                  : "None"}
                <KeyTitle marginTop={"20px"}>Diseases</KeyTitle>
                {article.diseases
                  ? article.diseases.sort().map((disease, index) => (
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
                        {capitalize(disease)}
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
            <Button
              href={`https://pubmed.ncbi.nlm.nih.gov/${article.id}`}
              target="_blank"
              rel="noopener noreferrer"
            >
              Read Full Article
            </Button>
          </>
        ) : (
          `Retrieval failed: PMID ${id}.`
        )}
      </Section>
      <Section id={"graph"}>
        <Subtext>
          This graph displays the relationships of chemicals/diseases in this
          article.
          <br />
          DISCLAIMER: Full accuracy of graph is not guaranteed. Please use with
          caution.
        </Subtext>
        <Graph data={graphData} />
        <Subtext>
          Key /
          <Highlight color={colours.chemicals} isKeyLabel={true}>
            Chemical
          </Highlight>
          <Highlight color={colours.diseases} isKeyLabel={true}>
            Disease
          </Highlight>
        </Subtext>
      </Section>
    </Container>
  );
};

export default Read;
