import React, { useState } from "react";
import ReactDOM from "react-dom";
import { minimal } from "./exampleData";
import DenseAppBar from "./AppBar";
import GraphVizer from "./GraphVizer";

const App = () => {
  const [dotfileContents, setDotfileContents] = useState(minimal());
  // eslint-disable-next-line no-unused-vars
  const [dotfile, setDotfile] = useState("");
  const handle = files => {
    const file = files[0];
    setDotfile(file.name);
    var reader = new FileReader();
    reader.onload = function() {
      var text = reader.result;

      setDotfileContents(text);
    };
    reader.readAsText(file);
  };
  return (
    <div className="app-root">
      <DenseAppBar name="JSP Explorer" handle={handle} />
      <GraphVizer
        dotgraph={dotfileContents}
        settings={{ fit: true, height: 800, width: 1400, zoom: true }}
      />
      <div className="footer"></div>
    </div>
  );
};

ReactDOM.render(<App />, document.getElementById("root"));
