import React, { useEffect, useRef } from "react";
import * as d3 from "d3";
import { GraphData, Node } from "./DataModels";

interface GraphProps {
  data: GraphData;
  onNodeClick: (node: Node) => void;
}

const Graph = (props: GraphProps) => {
  const svgRef = useRef<SVGSVGElement | null>(null);

  useEffect(() => {
    if (!props.data || !svgRef.current) return;

    const svg = d3.select(svgRef.current);
    const width = svgRef.current.clientWidth;
    const height = svgRef.current.clientHeight;

    svg.selectAll("*").remove(); // Clear previous renders

    // Create simulation
    const simulation = d3
      .forceSimulation<Node>(props.data.nodes)
      .force(
        "link",
        d3
          .forceLink()
          .id((d: any) => d.id)
          .links(props.data.links)
          .distance(100)
      )
      .force("charge", d3.forceManyBody().strength(-300))
      .force("center", d3.forceCenter(width / 2, height / 2));

    // Create links
    const link = svg
      .append("g")
      .attr("class", "links")
      .selectAll("line")
      .data(props.data.links)
      .enter()
      .append("line")
      .attr("stroke", "#aaa")
      .attr("stroke-width", 2);

    // Create nodes
    const node = svg
      .append("g")
      .attr("class", "nodes")
      .selectAll("circle")
      .data(props.data.nodes)
      .enter()
      .append("circle")
      .attr("r", 10)
      .attr("fill", (d) => (d.group === 1 ? "blue" : "green"))
      .call(
        d3
          .drag<SVGCircleElement, Node>()
          .on("start", dragStarted)
          .on("drag", dragged)
          .on("end", dragEnded)
      )
      .on("click", (event, d) => props.onNodeClick(d));

    // Create labels for each node
    const labels = svg
      .append("g")
      .attr("class", "labels")
      .selectAll("text")
      .data(props.data.nodes)
      .enter()
      .append("text")
      .attr("text-anchor", "middle")
      .attr("dy", -15) // Position the label above the node
      .attr("fill", "#fff")
      .style("font-size", "11px")
      .text((d) => d.label);

    simulation.on("tick", () => {
      link
        .attr("x1", (d) => (d.source as Node).x!)
        .attr("y1", (d) => (d.source as Node).y!)
        .attr("x2", (d) => (d.target as Node).x!)
        .attr("y2", (d) => (d.target as Node).y!);

      node.attr("cx", (d) => d.x!).attr("cy", (d) => d.y!);
      
      labels
        .attr("x", (d) => d.x!)
        .attr("y", (d) => d.y!);
    });

    function dragStarted(event: any, d: Node) {
      if (!event.active) simulation.alphaTarget(0.3).restart();
      d.fx = d.x;
      d.fy = d.y;
    }

    function dragged(event: any, d: Node) {
      d.fx = event.x;
      d.fy = event.y;
    }

    function dragEnded(event: any, d: Node) {
      if (!event.active) simulation.alphaTarget(0);
      d.fx = null;
      d.fy = null;
    }
  }, [props]);

  return <svg ref={svgRef} width="800" height="50%" />;
};

export default Graph;
