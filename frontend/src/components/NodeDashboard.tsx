import React from "react";
import { Node } from "./DataModels";
import { styled } from "styled-components";
import { Section } from "../styles/Layout";
import { Subtext, SubTitle } from "../styles/Text";
import { pageSize } from "../shared/ArticleUtils";

const InfoSection = styled(Section)`
  background-color: black;
`;

interface NodeDashboardProps {
  selectedNode: Node;
}

const NodeDashboard = (props: NodeDashboardProps) => {
  return (
    <InfoSection id="info">
      <Subtext>{props.selectedNode.group == 1 ? "Chemical" : "Disease"} / {props.selectedNode.id}</Subtext>
      <SubTitle>{props.selectedNode.label}</SubTitle>
      <Subtext>
        Relationship mentions (in top {pageSize} literature results): {props.selectedNode.weight}
      </Subtext>
    </InfoSection>
  );
};

export default NodeDashboard;
