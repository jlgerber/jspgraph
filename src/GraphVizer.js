import React, { Component } from "react";
import MyGraph from "./graph";

export default class GraphVizer extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    console.log("graph", this.props.dotgraph);
    return (
      <div className="canvas-frame">
        <div
          style={{
            gridColumn: "1/2",
            backgroundColor: "lightgrey",
            width: "1400px",
            height: "800px"
          }}
        >
          <MyGraph graph={this.props.dotgraph} select={this.props.onSelect} />
        </div>
      </div>
    );
  }
}
