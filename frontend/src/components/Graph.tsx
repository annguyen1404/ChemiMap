import React, { useEffect, useRef } from "react";
import * as d3 from "d3";
import { GraphData, Node } from "./DataModels";
import colours from "../styles/Colours";

interface GraphProps {
  data: GraphData;
  onNodeClick?: (node: Node) => void;
}

const sizeFactor = 4;

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
          .distance(100) // Adjust link distance as needed
      )
      .force("charge", d3.forceManyBody().strength(-50 + sizeFactor*-5)) // Adjust repulsion strength
      .force("center", d3.forceCenter(width / 2, height / 2)) // Center nodes
      .force("collide", d3.forceCollide().radius(20).strength(1)); // Prevent overlap

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

    // Create weight labels for links
    const linkLabels = svg
      .append("g")
      .attr("class", "link-labels")
      .selectAll("text")
      .data(props.data.links)
      .enter()
      .append("text")
      .attr("text-anchor", "middle")
      .attr("fill", "#fff")
      .style("font-size", "10px")
      .text((d) => d.weight ?? "");

    // Create nodes
    const node = svg
      .append("g")
      .attr("class", "nodes")
      .selectAll("circle")
      .data(props.data.nodes)
      .enter()
      .append("circle")
      .attr("r", (d) => d.weight * sizeFactor)
      .attr("fill", (d) =>
        d.group === 1 ? colours.chemicals : colours.diseases
      )
      .call(
        d3
          .drag<SVGCircleElement, Node>()
          .on("start", dragStarted)
          .on("drag", dragged)
          .on("end", dragEnded)
      )
      .on("click", (event, d) => props.onNodeClick? props.onNodeClick(d):{})
      .on("mouseover", function () {
        d3.select(this)
          .transition()
          .duration(100)
          .attr("stroke", "white")
          .attr("stroke-width", 3);
      })
      .on("mouseout", function () {
        d3.select(this).transition().duration(100).attr("stroke", "none");
      });

    // Create labels for each node
    const labels = svg
      .append("g")
      .attr("class", "labels")
      .selectAll("text")
      .data(props.data.nodes)
      .enter()
      .append("text")
      .attr("text-anchor", "middle")
      .attr("dy", (d) => -5 - d.weight * sizeFactor) // Position the label above the node
      .attr("fill", "#fff")
      .style("font-size", "11px")
      .text((d) => d.label);

    simulation.on("tick", () => {
      const paddingTopBottom = 25;
      const paddingLeftRight = 50;
      const xMin = paddingLeftRight;
      const xMax = width - paddingLeftRight;
      const yMin = paddingTopBottom;
      const yMax = height - paddingTopBottom;

      link
        .attr("x1", (d) =>
          Math.max(xMin, Math.min(xMax, (d.source as Node).x!))
        )
        .attr("y1", (d) =>
          Math.max(yMin, Math.min(yMax, (d.source as Node).y!))
        )
        .attr("x2", (d) =>
          Math.max(xMin, Math.min(xMax, (d.target as Node).x!))
        )
        .attr("y2", (d) =>
          Math.max(yMin, Math.min(yMax, (d.target as Node).y!))
        );

      node
        .attr("cx", (d) => {
          d.x = Math.max(xMin, Math.min(xMax, d.x!)); // Clamp node's x position
          return d.x!;
        })
        .attr("cy", (d) => {
          d.y = Math.max(yMin, Math.min(yMax, d.y!)); // Clamp node's y position
          return d.y!;
        });

      linkLabels
        .attr("x", (d) => ((d.source as Node).x! + (d.target as Node).x!) / 2)
        .attr(
          "y",
          (d) => ((d.source as Node).y! + (d.target as Node).y!) / 2 + 20
        );

      labels.attr("x", (d) => d.x!).attr("y", (d) => d.y!);
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

  return <svg ref={svgRef} width="95%" height="70%" />;
};

export default Graph;
