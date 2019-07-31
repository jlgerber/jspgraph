import React from "react";
import ReactDOM from "react-dom";
import example from "./exampleData";
import DenseAppBar from "./AppBar";
import GraphVizer from "./GraphVizer";

const App = () => {
  return (
    <div className="app-root">
      <DenseAppBar>JSP Exploreer</DenseAppBar>
      <GraphVizer
        dotgraph={example()}
        settings={{ fit: true, height: 800, width: 1400, zoom: true }}
      />
      <div className="footer"></div>
    </div>
  );
};

ReactDOM.render(<App />, document.getElementById("root"));
