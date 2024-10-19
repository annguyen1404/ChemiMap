import React, { useState, ChangeEvent, KeyboardEvent } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { styled } from "styled-components";
import SearchBar from "../components/SearchBar";
import { Subtext, SubTitle as Subtitle } from "../styles/Text";
import Graph from "../components/Graph";
import { Node } from "../components/DataModels";
import NodeDashboard from "../components/NodeDashboard";
import { Container, IconButton, Section } from "../styles/Layout";
import { FaArrowDown } from "react-icons/fa";

const SubtitleGraph = styled(Subtitle)`
  margin-top: 20px;
`;

const SubtextGraph = styled(Subtext)`
  margin-bottom: 0px;
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
  const location = useLocation();
  const navigate = useNavigate();
  const queryParams = new URLSearchParams(location.search);
  const initialQuery = queryParams.get("query") || "";
  const [query, setQuery] = useState<string>(initialQuery);

  const [selectedNode, setSelectedNode] = useState<Node | null>(null);
  const handleNodeClick = (node: Node) => {
    setSelectedNode(node);
    // Use initial query
    navigate(`/results?query=${encodeURIComponent(initialQuery)}#info`);
    setTimeout(() => {
      const target = document.getElementById("info");
      if (target) {
        target.scrollIntoView({ behavior: "smooth" });
      }
    }, 100);
  };

  const handleScrollDown = (): void => {
    // Update the URL with the new query
    navigate(`/results?query=${encodeURIComponent(initialQuery)}#list`);
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
      <Section id={"graph"}>
        <SubtitleGraph>Search results for: {initialQuery}</SubtitleGraph>
        <SearchBar
          query={query}
          onChange={handleChange}
          onSearch={handleSearch}
          onKeyDown={handleKeyDown}
        />
        <Graph data={mockGraphData} onNodeClick={handleNodeClick} />
        <SubtextGraph>
          Select any entity to learn more or scroll down for list results.
        </SubtextGraph>
        <IconButton onClick={handleScrollDown}>
          <FaArrowDown />
        </IconButton>
      </Section>

      {selectedNode !== null && <NodeDashboard selectedNode={selectedNode} />}
      <Section id={"list"}>
        {/* Display mock search results */}
        <Subtext>
          {mockResults.map((result, index) => (
            <li key={index}>{result}</li>
          ))}
        </Subtext>
      </Section>
    </Container>
  );
};

export default Results;
