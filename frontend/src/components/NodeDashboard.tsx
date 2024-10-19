import React from "react";
import { Node } from "./DataModels";
import { styled } from "styled-components";
import { Section } from "../styles/Layout";
import { Subtext, SubTitle } from "../styles/Text";

const InfoSection = styled(Section)`
  background-color: black;
`;

interface NodeDashboardProps {
  selectedNode: Node;
}

const NodeDashboard = (props: NodeDashboardProps) => {
  return (
    <InfoSection id="info">
      <SubTitle>Entity Name: {props.selectedNode.label}</SubTitle>
      <Subtext>
        ID: {props.selectedNode.id}. Group: {props.selectedNode.group}.
      </Subtext>
    </InfoSection>
  );
};

export default NodeDashboard;
