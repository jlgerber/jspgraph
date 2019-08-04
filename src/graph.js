import DagreD3 from "./DagreD3";
import React, { Component } from "react";
import graphs from "./graphs";

export default class MyGraph extends Component {
  constructor(props) {
    super(props);
    this.onNodeClick = this.onNodeClick.bind(this);
  }

  onNodeClick(id) {
    console.log(`${id} clicked`);
  }

  resize = () => this.forceUpdate();

  componentDidMount() {
    if (this.props.listenForResize)
      window.addEventListener("resize", this.resize);
  }

  componentWillUnmount() {
    if (this.props.listenForResize)
      window.removeEventListener("resize", this.resize);
  }

  render() {
    //let w = window.innerWidth;
    //let h = window.innerHeight;
    return (
      <DagreD3
        interactive={true}
        nodes={graphs.simple2.nodes}
        edges={graphs.simple2.edges}
        //width={w}
        //height={h}
        onNodeClick={this.onNodeClick}
        nodeBgColor="#fff"
        selectNodeBgColor="#fc3"
      />
    );
  }
}
