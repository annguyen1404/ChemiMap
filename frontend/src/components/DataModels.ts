import { SimulationLinkDatum, SimulationNodeDatum } from "d3";

export interface Node extends SimulationNodeDatum {
  id: string;
  group: number;
  label: string;
}

export interface Link extends SimulationLinkDatum<Node>{
  source: Node;
  target: Node;
  weight?: number;
}

export interface GraphData {
  nodes: Node[];
  links: Link[];
}
