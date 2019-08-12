import React, { useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
//import InputLabel from "@material-ui/core/InputLabel";
import MenuItem from "@material-ui/core/MenuItem";
import FormControl from "@material-ui/core/FormControl";
import Select from "@material-ui/core/Select";

const useStyles = makeStyles(theme => ({
  root: {
    display: "flex",
    flexWrap: "wrap"
  },
  margin: {
    margin: theme.spacing(1),
    backgroundColor: "grey",
    minWidth: "200px",
    borderRadius: "5px",
    paddingRight: "5px",
    paddingLeft: "5px"
  },
  select: {
    color: "white",
    "& svg": {
      backgroundColor: "transparent",
      color: "white"
    },
    "& svg::after": {
      borderBottom: "1px solid transparent"
    }
  }
}));

/**
 * ProjectSelect Component provides a list of Projects
 */
const ProjectSelect = props => {
  const [project, setProject] = useState("");

  const classes = useStyles();

  const handleChange = event => {
    setProject(event.target.value);
  };

  const { projects, onProjectChange } = props;
  return (
    <form className={classes.root} autoComplete="off">
      <FormControl className={classes.margin}>
        <Select
          className={classes.select}
          value={project}
          onChange={event => {
            handleChange(event);
            onProjectChange(event);
          }}
          //input={<BootstrapInput name="age" id="age-customized-select" />}
        >
          <MenuItem value="">
            <em>None</em>
          </MenuItem>
          {projects.data.map(proj => {
            return (
              <MenuItem key={proj} value={proj}>
                {proj}
              </MenuItem>
            );
          })}
        </Select>
      </FormControl>
    </form>
  );
};

export default ProjectSelect;
