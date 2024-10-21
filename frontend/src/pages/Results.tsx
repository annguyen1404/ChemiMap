import React, { useState, ChangeEvent, KeyboardEvent, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { styled } from "styled-components";
import SearchBar from "../components/SearchBar";
import { Subtext, SubTitle as Subtitle } from "../styles/Text";
import Graph from "../components/Graph";
import { Article, Node } from "../components/DataModels";
import NodeDashboard from "../components/NodeDashboard";
import { Container, IconButton, Section } from "../styles/Layout";
import { FaArrowDown } from "react-icons/fa";
import colours from "../styles/Colours";
import List from "../components/List";

const mockAbstractText =
  "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.";

const SubtitleGraph = styled(Subtitle)`
  margin-top: 20px;
`;

const SubtextGraph = styled(Subtext)`
  margin-bottom: 0px;
`;

const SubtitleSmaller = styled(Subtitle)`
  font-size: 1.75rem;
`;

const ListContainer = styled.div`
  overflow-x: hidden;
  display: flex;
  justify-content: center;
  align-items: center; /* Center vertically */
  margin-top: 20px;
  padding: 20px;
  border-radius: 10px;
  background-color: black;
  outline: 1px solid ${colours.greyDark};
`;

const Results: React.FC = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const queryParams = new URLSearchParams(location.search);
  const initialQuery = queryParams.get("query") || "";
  const [query, setQuery] = useState<string>(initialQuery);
  const [searchBarValue, setSearchBarValue] = useState<string>(query);
  const [selectedNode, setSelectedNode] = useState<Node | null>(null);

  const handleNodeClick = (node: Node) => {
    setSelectedNode(node);
    // Use initial query
    navigate(`/results?query=${encodeURIComponent(query)}#info`);
    setTimeout(() => {
      const target = document.getElementById("info");
      if (target) {
        target.scrollIntoView({ behavior: "smooth" });
      }
    }, 100);
  };

  const handleScrollDown = (): void => {
    navigate(`/results?query=${encodeURIComponent(query)}#list`);
    setTimeout(() => {
      const target = document.getElementById("list");
      if (target) {
        target.scrollIntoView({ behavior: "smooth" });
      }
    }, 100);
  };

  const handleSearch = (): void => {
    // Update the URL with the new query and unselect nodes
    setSelectedNode(null);
    setQuery(searchBarValue);
    navigate(`/results?query=${encodeURIComponent(searchBarValue)}`);
  };

  const handleKeyDown = (e: KeyboardEvent<HTMLInputElement>): void => {
    if (e.key === "Enter") {
      handleSearch();
    }
  };

  const handleChange = (e: ChangeEvent<HTMLInputElement>): void => {
    setSearchBarValue(e.target.value);
  };

  // Effect to reset state when the query changes
  useEffect(() => {
    setSelectedNode(null);
    setSearchBarValue(query);
  }, [query]);

  // Mock graph data
  const mockNode1 = { id: "1", group: 1, label: `${query} 1` };
  const mockNode2 = { id: "2", group: 2, label: `${query} 2` };
  const mockNode3 = { id: "3", group: 1, label: `${query} 3` };
  const mockGraphData = {
    nodes: [mockNode1, mockNode2, mockNode3],
    links: [
      { source: mockNode1, target: mockNode2 },
      { source: mockNode2, target: mockNode3 },
    ],
  };

  // Mock fetch function to simulate API call
  const fetchPapers = async (page: number) => {
    console.log(`test - query: page: ${page}`);
    await new Promise((resolve) => setTimeout(resolve, 500)); // Simulate network delay

    if (page >= 4) {
      return [];
    }
    const start = (page - 1) * 10;
    const mockResults: Article[] = Array.from({ length: 10 }, (_, index) => ({
      id: `${start + index + 1}`,
      title: `Mock Paper Title ${start + index + 1} for ${query}`,
      abstract: mockAbstractText,
    }));

    return mockResults;
  };

  return (
    <Container>
      <Section id={"graph"}>
        <SubtitleGraph>Search results for: {query}</SubtitleGraph>
        <SearchBar
          query={searchBarValue}
          onChange={handleChange}
          onSearch={handleSearch}
          onKeyDown={handleKeyDown}
        />
        <SubtextGraph>
          DISCLAIMER: Full accuracy of graph is not guaranteed. Please use with
          caution.
        </SubtextGraph>
        <Graph data={mockGraphData} onNodeClick={handleNodeClick} />
        <SubtextGraph>
          This graph displays the relationship of chemicals/diseases in the top
          20 most relevant articles.
          <br></br>Select any entity to learn more or scroll down for the list
          of relevant articles.
        </SubtextGraph>
        <IconButton onClick={handleScrollDown}>
          <FaArrowDown />
        </IconButton>
      </Section>

      {selectedNode !== null && <NodeDashboard selectedNode={selectedNode} />}
      <Section id={"list"}>
        <SubtitleSmaller>Biomedical Mentions</SubtitleSmaller>
        <ListContainer>
          <List query={query} fetchFunction={fetchPapers}></List>
        </ListContainer>
      </Section>
    </Container>
  );
};

export default Results;
