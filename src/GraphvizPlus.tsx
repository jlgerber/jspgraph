import { graphviz, GraphvizOptions } from "d3-graphviz";
import * as React from "react";
import * as d3 from "d3-selection";

export class Graphviz extends React.Component<IGraphvizProps, any> {
  private static count = 0;
  private static defaultOptions: GraphvizOptions = {
    fit: true,
    height: 500,
    width: 500,
    zoom: false
  };

  private id: string;

  constructor(props: IGraphvizProps) {
    super(props);
    this.id = "graphviz" + Graphviz.count;
    Graphviz.count++;
  }

  public render(): JSX.Element {
    return <div id={this.id} />;
  }

  public componentDidMount() {
    this.renderGraph();
  }

  public componentDidUpdate() {
    this.renderGraph();
  }

  private renderGraph() {
    graphviz("#" + this.id)
      .options(this.options())
      .renderDot(this.props.dot, this.startApp);
  }

  startApp = () => {
    var nodes = d3.selectAll(".node");
    var edges = d3.selectAll(".edge");

    // click and mousedown on nodes
    nodes.on("click", () => {
      var event = d3.event;
      const elem = event.target.parentElement;
      console.log("EVENT CHILD", elem);
      console.log("THIs", this);
      event.preventDefault();
      d3.select(elem).classed("selected", true);

      var title = d3
        .select(elem)
        .selectAll("title")
        .text()
        .trim();
      var text = d3
        .select(elem)
        .selectAll("text")
        .text();

      this.props.select(text);

      // // click outside of nodes
      // d3.select(document).on("click", function() {
      //   var event = d3.event;
      //   event.preventDefault();
      //   event.stopPropagation();
      //   console.log("document click");
      // });

      // // keyup outside of nodes
      // d3.select(document).on("keyup", function() {
      //   var event = d3.event;
      //   event.preventDefault();
      //   console.log("document keyup", event);

      //   if (event.keyCode == 46) {
      //     graphviz.renderDot(dotSrc, startApp);
      //   }
      //   isDrawing = false;
      // });

      // var id = d3.select(elem).attr("id");
      // var class1 = d3.select(elem).attr("class");
      // var dotElement = title.replace("->", " -> ");
      // console.log(
      //   'Element id="%s" class="%s" title="%s" text="%s" dotElement="%s"',
      //   id,
      //   class1,
      //   title,
      //   text,
      //   dotElement
      // );
      // console.log(
      //   'Finding and deleting references to %s "%s" from the DOT source',
      //   text,
      //   dotElement
      // );
    });
  };

  private options(): GraphvizOptions {
    if (!this.props.options) {
      return Graphviz.defaultOptions;
    }

    const options: GraphvizOptions = Graphviz.defaultOptions;
    for (const option of Object.keys(this.props.options)) {
      options[option] = this.props.options[option];
    }
    return options;
  }
}

export interface IGraphvizProps extends React.ClassAttributes<Graphviz> {
  dot: string;
  options?: GraphvizOptions;
  select(selected: string);
}
