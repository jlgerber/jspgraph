import DagreD3 from "./DagreD3";
import React, { Component } from "react";
//import { notStrictEqual } from "assert";
//import graphs from "./graphs";
import graphs from "./graphs";
// eslint-disable-next-line import/no-unresolved
import { buildNodes, buildEdges } from "./ProcessTemplate";

export default class MyGraph extends Component {
  constructor(props) {
    super(props);
    this.onNodeClick = this.onNodeClick.bind(this);
    const { nodes, edges } = this.props.graph
      ? MyGraph.extractNodesEdgesFromGraph(this.props.graph)
      : (function() {
          return { nodes: {}, edges: [] };
        })();
    this.state = {
      nodes: nodes,
      edges: edges
    };
  }
  componentWillReceiveProps(nextProps) {
    if (nextProps.graph !== this.props.graph) {
      const { nodes, edges } = MyGraph.extractNodesEdgesFromGraph(
        nextProps.graph
      );
      this.setState({ nodes, edges });
    }
  }
  static extractNodesEdgesFromGraph = jsongraph => {
    //let obj = { nodes: [], edges: [] };
    //console.log("jsongraph", jsongraph);
    let nodes = buildNodes(jsongraph.nodes);
    let edges = buildEdges(jsongraph.nodes, jsongraph.edges);
    let graph = { nodes: nodes, edges: edges };
    return graph;
  };

  onNodeClick(id) {
    console.log(`${id} clicked`);
  }

  resize = () => this.forceUpdate();

  componentDidMount() {
    if (this.props.listenForResize)
      window.addEventListener("resize", this.resize);
  }

  componentWillUnmount() {
    if (this.props.listenForResize)
      window.removeEventListener("resize", this.resize);
  }

  render() {
    const { nodes, edges } = this.state;
    return (
      <DagreD3
        interactive={true}
        nodes={nodes}
        edges={edges}
        //width={w}
        //height={h}
        onNodeClick={this.props.select}
        nodeBgColor="#fff"
        selectNodeBgColor="#fc3"
      />
    );
  }
}
