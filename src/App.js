import React, { useState, Fragment } from "react";
import ReactDOM from "react-dom";

import { makeStyles } from "@material-ui/core/styles";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";

import AppContext from "./AppContext";
import DenseAppBar from "./AppBar";
import JspGraph from "./JspGraph";
import Modal from "./Modal";
// eslint-disable-next-line import/no-unresolved
import { getData, buildNodes, buildEdges } from "./ProcessTemplate";
import useFetch from "./UseFetch";
import Footer from "./Footer";

const useStyles = makeStyles(theme => ({
  container: {
    display: "flex",
    flexWrap: "wrap"
  },
  textField: {
    marginLeft: theme.spacing(1),
    marginRight: theme.spacing(1)
  },
  dense: {
    marginTop: theme.spacing(2)
  },
  menu: {
    width: 200
  },
  button: {
    margin: theme.spacing(1)
  },
  input: {
    display: "none"
  }
}));

const App = () => {
  // state
  const [jspFileContents, setJspFileContents] = useState(null);
  const [selected, setSelected] = useState("");
  // eslint-disable-next-line no-unused-vars
  const [jspfile, setJspfile] = useState("");
  const [showModal, setShowModal] = useState(false);
  const [nodes, setNodes] = useState({});
  const [edges, setEdges] = useState([]);

  //const projects = useFetch("0.0.0.0", "8000", "projects", { data: [] });
  // using dotenv & parcel
  /**
   * projects state updated by fetch call
   */
  const projects = useFetch(
    process.env.JSP_HOST,
    process.env.JSP_PORT,
    "projects",
    { data: [] }
  );

  /**
   * handles making request to load jspt file
   * @param {array obj} files
   */
  const handle = files => {
    const file = files[0];
    setJspfile(file.name);

    var reader = new FileReader();
    reader.onload = function() {
      var text = JSON.parse(reader.result);
      setJspFileContents(text);
    };
    reader.readAsText(file);
  };

  const setModalSelectedCb = selected => {
    setSelected(selected);
    toggleModal();
  };

  const onNodeClick = selected => {
    setSelected(selected);
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

  // eslint-disable-next-line no-unused-vars
  async function setProjectData(server, port, project) {
    setNodes({});
    setEdges([]);
    const response = await fetch(
      `http://${server}:${port}/projects/${project}`
    );
    if (response.status == 200) {
      let json = await response.json(); // (3)
      //console.log("loading project data", project);
      setNodes(buildNodes(json.data.nodes));
      setEdges(buildEdges(json.data.nodes, json.data.edges));
      return;
    }

    throw new Error(response.status);
  }

  const onProjectChange = event => {
    setProjectData(
      process.env.JSP_HOST,
      process.env.JSP_PORT,
      event.target.value
    );
  };
  const classes = useStyles();

  return (
    <div className="app-root">
      <AppContext.Provider value={{ nodes, edges, setEdges, setNodes }}>
        <DenseAppBar
          name={"JSP Explorer"}
          selected={getSelected()}
          handle={handle}
          projects={projects}
          onProjectChange={onProjectChange}
        />
        <JspGraph
          jspgraph={jspFileContents}
          onModalSelect={setModalSelectedCb}
          onNodeClick={onNodeClick}
          settings={{
            fit: true,
            height: 800,
            width: 1400,
            zoom: true
          }}
        />

        <Footer selected={selected} />

        {showModal ? (
          <Modal>
            {/* <div> */}
            <Fragment>
              {(() => {
                const data = getData(nodes[selected]);
                return (
                  <form
                    className={classes.container}
                    noValidate
                    autoComplete="off"
                  >
                    <TextField
                      id="outlined-read-only-input"
                      label="Name"
                      defaultValue={data.name}
                      className={classes.textField}
                      margin="normal"
                      fullWidth
                      InputProps={{
                        readOnly: true
                      }}
                      variant="outlined"
                    />
                    <TextField
                      id="outlined-read-only-input"
                      label="Type"
                      defaultValue={data.type}
                      className={classes.textField}
                      margin="normal"
                      fullWidth
                      InputProps={{
                        readOnly: true
                      }}
                      variant="outlined"
                    />
                    <TextField
                      id="outlined-read-only-input"
                      label="Entry Type"
                      defaultValue={data.entryType}
                      className={classes.textField}
                      margin="normal"
                      fullWidth
                      InputProps={{
                        readOnly: true
                      }}
                      variant="outlined"
                    />
                    {data.value === null ? null : (
                      <TextField
                        id="outlined-read-only-input"
                        label="Pattern"
                        defaultValue={data.value.pattern}
                        className={classes.textField}
                        margin="normal"
                        fullWidth
                        InputProps={{
                          readOnly: true
                        }}
                        variant="outlined"
                      />
                    )}
                    {data.value !== null && data.value.hasExclude ? (
                      <TextField
                        id="outlined-read-only-input"
                        label="Exclude"
                        defaultValue={data.value.exclude}
                        className={classes.textField}
                        margin="normal"
                        fullWidth
                        InputProps={{
                          readOnly: true
                        }}
                        variant="outlined"
                      />
                    ) : null}
                    <TextField
                      id="outlined-read-only-input"
                      label="Metadata"
                      defaultValue={data.metadata}
                      className={classes.textField}
                      margin="normal"
                      fullWidth
                      InputProps={{
                        readOnly: true
                      }}
                      variant="outlined"
                    />
                  </form>
                );
              })()}

              <Button
                onClick={toggleModal}
                variant="contained"
                color="primary"
                className={classes.button}
              >
                Done
              </Button>
            </Fragment>
            {/* </div> */}
          </Modal>
        ) : null}
      </AppContext.Provider>
    </div>
  );
};

ReactDOM.render(<App />, document.getElementById("root"));
