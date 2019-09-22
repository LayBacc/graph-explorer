// https://react-bootstrap.github.io/components/dropdowns/
import React from "react";
import Select from "react-select";
import "./css/DropdownForm.css";

export class CollapseNodeDropdown extends React.Component {
  constructor(props, context) {
    super(props, context);

    // this.handleChange = this.handleChange.bind(this);
    // this.state = { name: '', nodeType: null };
  }

  handleChange(e) {
    this.setState({ name: e.target.value.toLowerCase() });
  }

  handleSubmit(e) {
    e.preventDefault();
  }

  isSelectionValid() {
    return this.props.selectedNodes && this.props.selectedNodes.length > 0;
  }

  incomingLinks(nodeId) {
    return this.props.graphData.links.filter(link => {
      return link.target == nodeId;
    });
  }

  getAllLinks(nodeId) {
    const links = this.incomingLinks(nodeId);

    // TODO - react components
    return links.map(link => (
      <li>source: {link.source}, label: {link.label}</li>
    ));
  }

  render() {
    const {
      children,
      style,
      className,
      'aria-labelledby': labeledBy,
    } = this.props;

    let containerClassName = "dropdown-form " + className;
    const allLinks = this.isSelectionValid() ? this.getAllLinks(this.props.selectedNodes[0].id) : "";

    return (
      <div style={style} className={containerClassName} aria-labelledby={labeledBy}>
      	<p>Show or hide connections to/from the selected node(s)</p>
        { allLinks }
      </div>
    );
  }
}
