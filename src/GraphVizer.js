import React, { Component } from "react";
import { Graphviz } from "graphviz-react";

//{ fit: true, height: 800, width: 1400, zoom: true }
// props
// dotgraph
export default class GraphVizer extends Component {
  constructor(props) {
    super(props);
  }

  render() {
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
          <Graphviz dot={this.props.dotgraph} options={this.props.settings} />
        </div>
      </div>
    );
  }
}
