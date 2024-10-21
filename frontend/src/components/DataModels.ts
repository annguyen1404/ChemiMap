import { SimulationLinkDatum, SimulationNodeDatum } from "d3";

export interface Node extends SimulationNodeDatum {
  id: string;
  group: number;
  label: string;
}

export interface Link extends SimulationLinkDatum<Node> {
  source: Node;
  target: Node;
  weight?: number;
}

export interface GraphData {
  nodes: Node[];
  links: Link[];
}

export interface Article {
  id: string;
  title: string;
  abstract: string;
  chemicals?: string[];
  diseases?: string[];
  chemical_ids?: string[];
  disease_ids?: string[];
}
