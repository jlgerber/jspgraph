import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import {
  AppBar,
  IconButton,
  Toolbar,
  Typography,
  Button
} from "@material-ui/core";
import AddIcon from "@material-ui/icons/AddCircle";
import clsx from "clsx";
import ReactFileReader from "react-file-reader";
import Logo from "./Logo";
import "typeface-roboto";

const useStyles = makeStyles(theme => ({
  root: {
    flexGrow: 1
  },
  menuButton: {
    marginRight: theme.spacing(2)
  },
  title: {
    flexGrow: 1
  },
  main: {
    backgroundColor: "black"
  },
  logo: {
    fill: "white"
  },
  button: {
    margin: theme.spacing(1),
    marginRight: theme.spacing(1)
  },
  leftIcon: {
    marginRight: "5px"
  },
  rightIcon: {
    marginLeft: "10px"
  },
  iconSmall: {
    fontSize: 20
  },
  selected: {
    marginLeft: "60px"
  }
}));

export default function DenseAppBar(props) {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <AppBar position="static" className={classes.main}>
        <Toolbar variant="dense">
          <IconButton
            edge="start"
            className={classes.menuButton}
            color="inherit"
            aria-label="menu"
          >
            <Logo
              viewBox="0 0 300 300"
              height="20px"
              width="20px"
              color="inherit"
              className={classes.logo}
            />
          </IconButton>

          <Typography variant="h6" color="inherit" className={classes.title}>
            {/* Weird refresh bug if we do this...
            <span>{props.name}</span>
            <span className={classes.selected}>{props.selected}</span> */}
            <span>{props.name}</span>
            <span style={{ marginLeft: "20px" }}>{props.selected}</span>
          </Typography>
          <ReactFileReader handleFiles={props.handle} fileTypes=".dot">
            <Button color="inherit" className={classes.button}>
              <AddIcon
                className={clsx(classes.leftIcon, classes.iconSmall)}
              ></AddIcon>
              Load Dot
            </Button>
          </ReactFileReader>
        </Toolbar>
      </AppBar>
    </div>
  );
}
