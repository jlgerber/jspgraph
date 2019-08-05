import React, { Component } from "react";
import JspGraph from "./JspGraph";
//import { Hidden } from "@material-ui/core";

export default class GraphVizer extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    // eslint-disable-next-line no-console
    console.log("graph", this.props.dotgraph);
    return (
      <div className="canvas-frame">
        <div
          style={{
            gridColumn: "1/2",
            backgroundColor: "lightgrey",
            width: "1400px",
            height: "800px",
            overflow: "hidden"
          }}
        >
          <JspGraph graph={this.props.dotgraph} select={this.props.onSelect} />
        </div>
      </div>
    );
  }
}
