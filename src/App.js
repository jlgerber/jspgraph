import React, { useState, Fragment } from "react";
import ReactDOM from "react-dom";
import DenseAppBar from "./AppBar";
//import GraphVizer from "./GraphVizer";
import JspGraph from "./JspGraph";
import Modal from "./Modal";
import AppContext from "./AppContext";
// eslint-disable-next-line import/no-unresolved
import { getData } from "./ProcessTemplate";
import { makeStyles } from "@material-ui/core/styles";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";

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
  const [jspFileContents, setJspFileContents] = useState(null);
  const [selected, setSelected] = useState("");
  // eslint-disable-next-line no-unused-vars
  const [jspfile, setJspfile] = useState("");
  const [showModal, setShowModal] = useState(false);
  const [nodes, setNodes] = useState({});
  const [edges, setEdges] = useState([]);

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

  const classes = useStyles();

  return (
    <div className="app-root">
      <AppContext.Provider value={{ nodes, edges, setEdges, setNodes }}>
        <DenseAppBar
          name={"JSP Explorer"}
          selected={getSelected()}
          handle={handle}
        />
        <JspGraph
          jspgraph={jspFileContents}
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
