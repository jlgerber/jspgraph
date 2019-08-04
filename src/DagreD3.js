import React from "react";
import PropTypes from "prop-types";
import * as dagreD3 from "dagre-d3";
import * as d3 from "d3";

import isEqual from "react-fast-compare";

const defaultOnNodeClick = id => {};
const defaultOnMouseOver = id => {};
const defaultOnMouseOut = id => {};

class DagreD3 extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      priorSelection: null,
      selection: null,
      inNode: false,
      transformed: false
    };
  }

  static propTypes = {
    nodes: PropTypes.object.isRequired,
    edges: PropTypes.array.isRequired,
    interactive: PropTypes.bool,
    fit: PropTypes.bool,
    height: PropTypes.number,
    width: PropTypes.number,
    shapeRenderers: PropTypes.objectOf(PropTypes.func),
    onNodeClick: PropTypes.func,
    onMouseOver: PropTypes.func,
    onMouseOut: PropTypes.func,
    selectNodeBgColor: PropTypes.string.isRequired,
    nodeBgColor: PropTypes.string.isRequired
  };

  updateSelection = (g, id, fn) => {
    this.setState({ priorSelection: this.state.selection, selection: id });
    fn(id);
    if (this.state.priorSelection !== null)
      g.node(
        this.state.priorSelection
      ).elem.childNodes[0].style = `fill: ${this.props.nodeBgColor}`;
    g.node(
      id
    ).elem.childNodes[0].style = `fill: ${this.props.selectNodeBgColor};`;
  };

  mouseIn = (id, fn) => {
    this.setState({ inNode: true });
    fn(id);
  };

  mouseOut = (id, fn) => {
    this.setState({ inNode: false });
    fn(id);
  };

  shouldComponentUpdate(nextProps, nextState) {
    return (
      !isEqual(this.props.nodes, nextProps.nodes) ||
      !isEqual(this.props.edges, nextProps.edges) ||
      !isEqual(this.props.zoom, nextProps.zoom)
    );
  }

  // have to add this to get the canvas to resize
  componentDidMount() {
    window.addEventListener("resize", this.resize);
    this.renderDag(true);
  }

  componentDidUpdate() {
    this.renderDag(false);
  }

  resize = () => this.forceUpdate();

  componentWillUnmount() {
    window.removeEventListener("resize", this.resize);
  }

  renderDag(initial) {
    let g = new dagreD3.graphlib.Graph().setGraph({});

    for (let [id, node] of Object.entries(this.props.nodes))
      g.setNode(id, node);

    for (let edge of this.props.edges) g.setEdge(edge[0], edge[1], edge[2]); // from, to, props

    // Set up an SVG group so that we can translate the final graph.
    let svg = d3.select(this.nodeTree);
    let inner = d3.select(this.nodeTreeGroup);

    // set up zoom support
    if (this.props.interactive) {
      let zoom = d3.zoom().on("zoom", () => {
        inner.attr("transform", d3.event.transform);
        //} else {
        // let { height: gHeight, width: gWidth } = g.graph();
        // let transX = this.props.width / 2.0 - gWidth + d3.event.transform.x;
        // let transY = this.props.height / 2.0 - gHeight + d3.event.transform.y;
        // let trans = d3.event.transform;
        // trans.x = transX;
        // trans.y = transY;
        // //inner.attr("transform", d3.zoomIdentity.translate(transX, transY));
        // inner.attr("transform", trans);
        //}
      });

      svg.call(zoom);
    }

    // Create the renderer
    let render = new dagreD3.render();

    // set up custom shape renderers
    if (this.props.shapeRenderers) {
      for (let [shape, renderer] of Object.entries(this.props.shapeRenderers))
        render.shapes()[shape] = renderer;
    } else {
      g.nodes().forEach(function(v) {
        let node = g.node(v);
        // Round the corners of the nodes
        node.rx = node.ry = 5;
      });
    }
    // Run the renderer. This is what draws the final graph.
    render(inner, g);
    // TODO add padding?
    if (this.props.fit) {
      let { height: gHeight, width: gWidth } = g.graph();
      let { height, width } = this.nodeTree.getBBox();
      let transX = width - gWidth;
      let transY = height - gHeight;
      svg.attr("height", height);
      svg.attr("width", width);
      inner.attr("transform", d3.zoomIdentity.translate(transX, transY));
    }

    // cannot figure this out
    // let { height: gHeight, width: gWidth } = g.graph();
    // let transX = this.props.width / 2.0 - gWidth;
    // let transY = this.props.height / 2.0 - gHeight;
    // inner.attr("transform", d3.zoomIdentity.translate(transX, transY));

    svg
      .selectAll(".dagre-d3 .node")
      .on("click", id =>
        this.props.onNodeClick
          ? this.updateSelection(g, id, this.props.onNodeClick)
          : this.updateSelection(g, id, defaultOnNodeClick)
      )
      .on("mouseover", id =>
        this.props.onMouseOver
          ? this.mouseIn(id, this.props.onMouseOver)
          : this.mouseIn(id, defaultOnMouseOver)
      )
      .on("mouseout", id =>
        this.props.onMouseOut
          ? this.mouseOut(id, this.props.onMouseOut)
          : this.mouseOut(id, defaultOnMouseOut)
      );
    // register a handler to take care of clicking on the canvas, outside
    // of the node. We use this to deregister the node
    svg.on("click", () => {
      if (!this.state.inNode) {
        if (this.state.selection !== null)
          g.node(
            this.state.selection
          ).elem.childNodes[0].style = `fill: ${this.props.nodeBgColor}`;
      }
    });
  }

  render() {
    return (
      <svg
        className="dagre-d3"
        ref={r => {
          this.nodeTree = r;
        }}
        height={`${this.props.height || window.innerHeight}px`}
        width={`${this.props.width || window.innerWidth}px`}
      >
        <g
          ref={r => {
            this.nodeTreeGroup = r;
          }}
        />
      </svg>
    );
  }
}

// default props seem to interfere with rendering...
// DagreD3.defaultProps = {
//   //height: "1000px",
//   //width: "1",
//   // width and height are defaulted to 1 due to a FireFox bug(?) If set to 0, it complains.
//   fit: true,
//   interactive: false,
//   selectNodeBgColor: "#f33"
//   //nodeBgColor: "#fff"
// };
export default DagreD3;