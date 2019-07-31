import React from "react";
import ReactDOM from "react-dom";
import { Graphviz } from "graphviz-react";
import example from "./exampleData";
import DenseAppBar from "./AppBar";

const App = () => {
  return (
    <div className="app-root">
      <DenseAppBar>JSP Exploreer</DenseAppBar>
      <div className="canvas-frame">
        <div
          style={{
            gridColumn: "1/2",
            backgroundColor: "lightgrey",
            width: "1400px",
            height: "800px"
          }}
        >
          <Graphviz
            onClick={event => {
              console.log(event.target.value);
            }}
            dot={example()}
            options={{ fit: true, height: 800, width: 1400, zoom: true }}
          />
        </div>
      </div>
      <div className="footer"></div>
    </div>
  );
};

ReactDOM.render(<App />, document.getElementById("root"));
