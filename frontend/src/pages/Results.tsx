import React, { useState, ChangeEvent, KeyboardEvent } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { styled } from "styled-components";
import SearchBar from "../components/SearchBar";
import { Subtext, SubTitle } from "../styles/Text";
import Graph from "../components/Graph";
import { Node } from "../components/DataModels";
import NodeDashboard from "../components/NodeDashboard";

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

const mockNode1 = { id: "1", group: 1, label: "Node 1" };
const mockNode2 = { id: "2", group: 2, label: "Node 2" };
const mockNode3 = { id: "3", group: 1, label: "Node 3" };
const mockGraphData = {
  nodes: [mockNode1, mockNode2, mockNode3],
  links: [
    { source: mockNode1, target: mockNode2 },
    { source: mockNode2, target: mockNode3 },
  ],
};

const Results: React.FC = () => {
  const [selectedNode, setSelectedNode] = useState<Node | null>(null);
  const handleNodeClick = (node: Node) => {
    console.log('testttt', node.id)
    setSelectedNode(node);
  };
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

        <Graph data={mockGraphData} onNodeClick={handleNodeClick} />
        <NodeDashboard selectedNode={selectedNode} />
      </ResultsSection>
    </Container>
  );
};

export default Results;
