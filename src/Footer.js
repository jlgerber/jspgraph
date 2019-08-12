import React, { useContext } from "react";
import AppContext from "./AppContext";
// eslint-disable-next-line import/no-unresolved
import { getData } from "./ProcessTemplate";

const Footer = props => {
  const context = useContext(AppContext);

  const get_value = value => {
    if (value === null) {
      return "";
    } else if (value.hasExclude) {
      return (
        <>
          <span className="label">Pattern:</span>{" "}
          <span className="value">{value.pattern}</span>
          <span className="label">Exclude:</span>
          <span className="value">{value.exclude}</span>
        </>
      );
    } else {
      return (
        <>
          <span className="label">Pattern:</span>{" "}
          <span className="value">{value.pattern}</span>
        </>
      );
    }
  };

  const render_node = selected_node => {
    const { nodes } = context;

    if (selected_node === "") {
      return <span className="label"></span>;
    } else {
      const node = getData(nodes[selected_node]);
      return (
        <>
          <span className="label">Name:</span>{" "}
          <span className="value">{node.name}</span>
          <span className="label">Type:</span>{" "}
          <span className="value">{node.type}</span>
          <span className="label">EntryType:</span>{" "}
          <span className="value">{node.entryType}</span>
          {get_value(node.value)}
        </>
      );
    }
  };
  return <div className="footer">{render_node(props.selected)}</div>;
};

export default Footer;
