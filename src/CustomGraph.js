import React from "react";
import { Graph } from "react-d3-graph";

// there are several levels of definition: D3, Graph.jsx (react-d3-graph), CustomGraph, client
// we can eliminate the client side - there's no point exposing that to Sandbox
// BUT - if we need the state in the parent component, we should have the states there!
	// "lifting state up" - https://reactjs.org/docs/lifting-state-up.html 
	// CustomGraph to handle graph rendering logic, whereas Sandbox handles business/application logic 

export class CustomGraph extends React.Component {
  constructor(props, context) {
    super(props, context);
  }

  // this is a workaround to merge the state of CustomGraph with the parent Graph component
  // componentDidMount = () => {
  // 	super.componentDidMount();
  //   // this.setState({ selectedNodes: [] });	// TODO - lift state up
  // }

  isSelectedNode = id => {
  	return this.props.selectedNodes.includes(id);
  };

  onClickNode = id => {
  	// console.log(super._this, super.Graph, super.prop);

  	this.props.selectNode(id);

  	this.props.onClickNode && this.props.onClickNode(id);	// custom behavior
    this.state.config.nodeHighlightBehavior && this._setNodeHighlightedValue(id, true);
    setTimeout(() => { this.state.config.nodeHighlightBehavior && this._setNodeHighlightedValue(id, true) }, 100);
  };

  onClickLink = (source, target) => {
	  console.log("onClickLink in CustomGraph");

	  this.props.onClickLink && this.props.onClickLink(source, target);
	  this.state.setState({
	  	highlightedLink: {
		  	source: source,
		  	target: target
	  	}
	  })
  };

  // disable the clearing of highlight from react-d3-graph
  onMouseOutNode = id => {
    this.props.onMouseOutNode && this.props.onMouseOutNode(id);
    !this.isSelectedNode(id) && this._setNodeHighlightedValue(id, false);
  };

  render() {
  	return <Graph {...this.props} />
  }
}
