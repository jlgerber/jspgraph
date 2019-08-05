import React, { useState } from "react";
import ReactDOM from "react-dom";
//import { minimal } from "./exampleData";
import DenseAppBar from "./AppBar";
import GraphVizer from "./GraphVizer";
import Modal from "./Modal";
import AppContext from "./AppContext";
// eslint-disable-next-line import/no-unresolved
import { getData } from "./ProcessTemplate";

const App = () => {
  const [dotfileContents, setDotfileContents] = useState(null);
  const [selected, setSelected] = useState("");
  // eslint-disable-next-line no-unused-vars
  const [dotfile, setDotfile] = useState("");
  const [showModal, setShowModal] = useState(false);
  const [nodes, setNodes] = useState({});
  const [edges, setEdges] = useState([]);

  const handle = files => {
    const file = files[0];
    setDotfile(file.name);
    var reader = new FileReader();
    reader.onload = function() {
      var text = JSON.parse(reader.result);
      setDotfileContents(text);
    };
    reader.readAsText(file);
  };

  const setSelectedCb = selected => {
    setSelected(selected);
    toggleModal();
  };

  // eslint-disable-next-line no-unused-vars
  const toggleModal = () => {
    let overlay = document.querySelector("#modal-overlay");
    overlay.classList.toggle("closed");
    setShowModal(!showModal);
  };

  const getSelected = () => {
    if (selected === "") {
      return "";
    } else {
      return "selected:" + selected;
    }
  };

  return (
    <div className="app-root">
      <AppContext.Provider value={{ nodes, edges, setEdges, setNodes }}>
        <DenseAppBar
          name={"JSP Explorer"}
          selected={getSelected()}
          handle={handle}
        />
        <GraphVizer
          dotgraph={dotfileContents}
          onSelect={setSelectedCb}
          settings={{
            fit: true,
            height: 800,
            width: 1400,
            zoom: true
          }}
        />
        <div className="footer"></div>
        {showModal ? (
          <Modal>
            <div>
              {(() => {
                const data = getData(nodes[selected]);
                return (
                  <div>
                    <h2>NAME: {data.name}</h2>
                    <h2>TYPE: {data.type}</h2>
                    <h2>ENTRY TYPE: {data.entryType}</h2>
                    {data.value === null ? null : (
                      <h3>PATTERN: {data.value.pattern}</h3>
                    )}
                    {data.value !== null && data.value.hasExclude ? (
                      <h3>EXCLUDE: {data.value.exclude}</h3>
                    ) : null}
                    <h3>METADATA: {data.metadata}</h3>
                  </div>
                );
              })()}

              <button onClick={toggleModal}>Done</button>
            </div>
          </Modal>
        ) : null}
      </AppContext.Provider>
    </div>
  );
};

ReactDOM.render(<App />, document.getElementById("root"));
