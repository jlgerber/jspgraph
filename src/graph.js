import DagreD3 from "./DagreD3";
import React, { Component } from "react";
//import { notStrictEqual } from "assert";
//import graphs from "./graphs";
import graphs from "./graphs";

export default class MyGraph extends Component {
  constructor(props) {
    super(props);
    this.onNodeClick = this.onNodeClick.bind(this);
    const { nodes, edges } = MyGraph.extractNodesEdgesFromGraph(
      this.props.graph
    );
    this.state = {
      nodes: nodes,
      edges: edges
    };
  }

  static extractNodesEdgesFromGraph = graph => {
    //let obj = { nodes: [], edges: [] };

    return graphs.large;
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
