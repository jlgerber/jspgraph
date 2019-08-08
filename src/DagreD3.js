import React from "react";
import PropTypes from "prop-types";
import * as dagreD3 from "dagre-d3";
import * as d3 from "d3";
import isEqual from "react-fast-compare";

// eslint-disable-next-line no-unused-vars
const defaultOnNodeClick = id => {};
// eslint-disable-next-line no-unused-vars
const defaultOnMouseOver = id => {};
// eslint-disable-next-line no-unused-vars
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
    nodeStyle: PropTypes.object.isRequired
  };

  styleNode = (svg, node_id, fillColor, edgeColor, strokeWidth) => {
    const selNode = svg.selectAll(
      `.dagre-d3 .node-${node_id} > .label-container`
    );
    selNode
      .style("fill", fillColor)
      .style("stroke", edgeColor)
      .style("stroke-width", strokeWidth);
  };

  styleOutgoingEdges = (svg, node_id, color, strokeWidth) => {
    // the outgoing edge has an in-node-id class.
    svg
      .selectAll(`.dagre-d3 .in-node-${node_id} *`)
      .style("stroke", color)
      .style("stroke-width", strokeWidth);
    svg.selectAll(`.dagre-d3 .in-node-${node_id} defs`).style("fill", color);
  };

  styleIncommingEdges = (svg, node_id, color, strokeWidth) => {
    // the incomming edge has an in-node-id class.
    svg
      .selectAll(`.dagre-d3 .out-node-${node_id} *`)
      .style("stroke", color)
      .style("stroke-width", strokeWidth);
    svg.selectAll(`.dagre-d3 .out-node-${node_id} defs`).style("fill", color);
  };

  updateSelection = (g, id, svg, fn) => {
    const { nodeStyle } = this.props;
    this.setState({ priorSelection: this.state.selection, selection: id });
    fn(id);
    if (this.state.priorSelection !== null) {
      const last_id = this.state.priorSelection;

      this.styleNode(
        svg,
        last_id,
        nodeStyle.nodeBgColor,
        nodeStyle.nodeEdgeColor,
        "1px"
      );
      if (nodeStyle.selEdgeColor)
        this.styleOutgoingEdges(
          svg,
          last_id,
          nodeStyle.edgeColor,
          nodeStyle.strokeWidth
        );
      if (nodeStyle.selIncomingEdgeColor) {
        this.styleIncommingEdges(
          svg,
          last_id,
          nodeStyle.edgeColor,
          nodeStyle.strokeWidth
        );
      }
    }

    this.styleNode(
      svg,
      id,
      nodeStyle.selNodeBgColor,
      nodeStyle.selNodeEdgeColor,
      nodeStyle.selStrokeWidth
    );

    if (nodeStyle.selEdgeColor)
      this.styleOutgoingEdges(
        svg,
        id,
        nodeStyle.selEdgeColor,
        nodeStyle.selStrokeWidth
      );
    if (nodeStyle.selIncomingEdgeColor) {
      this.styleIncommingEdges(
        svg,
        id,
        nodeStyle.selIncomingEdgeColor,
        nodeStyle.selStrokeWidth
      );
    }
  };

  mouseIn = (id, fn) => {
    this.setState({ inNode: true });
    fn(id);
  };

  mouseOut = (id, fn) => {
    this.setState({ inNode: false });
    fn(id);
  };

  shouldComponentUpdate(nextProps) {
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

  renderDag() {
    let g = new dagreD3.graphlib.Graph().setGraph({});
    g.graph().nodeSep = 10;
    g.graph().rankSep = 60;
    // eslint-disable-next-line no-unused-vars
    for (let [id, _node] of Object.entries(this.props.nodes)) {
      g.setNode(id, { class: `node-${id}` });
    }

    for (let edge of this.props.edges)
      g.setEdge(edge[0], edge[1], {
        class: `in-node-${edge[0]} out-node-${edge[1]}`
      });

    // Set up an SVG group so that we can translate the final graph.
    let svg = d3.select(this.nodeTree);
    let inner = d3.select(this.nodeTreeGroup);

    // set up zoom support
    if (this.props.interactive) {
      let zoom = d3.zoom().on("zoom", () => {
        inner.attr("transform", d3.event.transform);
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

    g.edges().forEach(function(v) {
      let edge = g.edge(v);
      edge.curve = d3.curveBasis;
    });
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
      .on("click", id => {
        if (d3.event.shiftKey && this.props.onNodeClick) {
          this.updateSelection(g, id, svg, this.props.onNodeClick);
        }
        this.updateSelection(g, id, svg, defaultOnNodeClick);
      })
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
        if (this.state.selection !== null) {
          const { nodeStyle } = this.props;
          this.styleNode(
            svg,
            this.state.selection,
            nodeStyle.nodeBgColor,
            nodeStyle.nodeEdgeColor,
            nodeStyle.strokeWidth
          );
          if (nodeStyle.selEdgeColor)
            this.styleOutgoingEdges(
              svg,
              this.state.selection,
              nodeStyle.edgeColor,
              nodeStyle.strokeWidth
            );
          if (nodeStyle.selIncomingEdgeColor) {
            this.styleIncommingEdges(
              svg,
              this.state.selection,
              nodeStyle.edgeColor,
              nodeStyle.strokeWidth
            );
          }
        }
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
