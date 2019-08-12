import DagreD3 from "./DagreD3";
import React, { Component } from "react";
import AppContext from "./AppContext";
// eslint-disable-next-line import/no-unresolved
import { buildNodes, buildEdges } from "./ProcessTemplate";
import nodeStyle from "./NodeStyle";

class JspGraph extends Component {
  constructor(props) {
    super(props);
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.jspgraph !== this.props.jspgraph) {
      const { nodes, edges } = JspGraph.extractNodesEdgesFromGraph(
        nextProps.jspgraph
      );
      const { setNodes, setEdges } = this.context;
      setNodes(nodes);
      setEdges(edges);
    }
  }

  static extractNodesEdgesFromGraph = jsongraph => {
    let nodes = buildNodes(jsongraph.nodes);
    let edges = buildEdges(jsongraph.nodes, jsongraph.edges);
    let graph = { nodes: nodes, edges: edges };
    return graph;
  };

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
    return (
      <AppContext.Consumer>
        {context => (
          <DagreD3
            interactive={true}
            nodes={context.nodes}
            edges={context.edges}
            //width={w}
            //height={h}
            onNodeShiftClick={this.props.onModalSelect}
            onNodeClick={this.props.onNodeClick}
            nodeStyle={nodeStyle}
          />
        )}
      </AppContext.Consumer>
    );
  }
}
JspGraph.contextType = AppContext;
export default JspGraph;
