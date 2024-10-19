import { SimulationNodeDatum } from "d3";

export interface Node extends SimulationNodeDatum {
  id: string;
  group: number;
  label: string;
  fx?: number | null; // Fixed position on the x-axis
  fy?: number | null; // Fixed position on the y-axis
}

export interface Link {
  source: Node;
  target: Node;
  weight?: number;
}

export interface GraphData {
  nodes: Node[];
  links: Link[];
}
