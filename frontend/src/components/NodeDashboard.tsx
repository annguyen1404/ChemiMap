import React from "react";
import { Node } from "./DataModels";

interface NodeDashboardProps {
  selectedNode: Node | null
}

const NodeDashboard = (props: NodeDashboardProps) => {
    if (!props.selectedNode) {
      return <div>Select a node to see details</div>;
    }
  
    return (
      <div className="dashboard">
        <h3>Node Details</h3>
        <p>ID: {props.selectedNode.id}</p>
        <p>Group: {props.selectedNode.group}</p>
        {/* Add more fields as needed */}
      </div>
    );
  };
  
  export default NodeDashboard;
  