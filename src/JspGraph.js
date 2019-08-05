import DagreD3 from "./DagreD3";
import React, { Component } from "react";
import AppContext from "./AppContext";
// eslint-disable-next-line import/no-unresolved
import { buildNodes, buildEdges } from "./ProcessTemplate";

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
      // <div className="canvas-frame">
      //   <div
      //     style={{
      //       gridColumn: "1/2",
      //       backgroundColor: "lightgrey",
      //       width: "1400px",
      //       height: "800px",
      //       overflow: "hidden"
      //     }}
      //   >
      <AppContext.Consumer>
        {context => (
          <DagreD3
            interactive={true}
            nodes={context.nodes}
            edges={context.edges}
            //width={w}
            //height={h}
            onNodeClick={this.props.onSelect}
            nodeBgColor="#fff"
            selectNodeBgColor="#90fdf3" //"#fc3"
          />
        )}
      </AppContext.Consumer>
      //   </div>
      // </div>
    );
  }
}
JspGraph.contextType = AppContext;
export default JspGraph;
