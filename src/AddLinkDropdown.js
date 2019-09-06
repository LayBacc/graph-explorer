// https://react-bootstrap.github.io/components/dropdowns/
import React from "react";
import Select from "react-select";
import "./css/DropdownForm.css";

// TODO - use this for autocomplete instead!
// https://github.com/JedWatson/react-select

export class AddLinkDropdown extends React.Component {
  constructor(props, context) {
    super(props, context);

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleFromNodeChange = this.handleFromNodeChange.bind(this);
    this.handleToNodeChange = this.handleToNodeChange.bind(this);

    this.state = { name: '', from: null, to: null };
  }

  handleChange(e) {
    this.setState({ [e.target.name]: e.target.value });
  }

  handleFromNodeChange(selectedNode) {
    this.setState({ from: selectedNode });
  }

  handleToNodeChange(selectedNode) {
    this.setState({ to: selectedNode });
  }

  handleSubmit(e) {
    e.preventDefault();

    if (!this.state.from || !this.state.to) {
      return;
    }

    const linkData = { 
      source: this.state.from.value,
      target: this.state.to.value
    };
    this.props.addLink(linkData);
  }

  nodeOptions() {
    return this.props.nodes.map(node => ({ label: node.name === undefined ? node.id : node.name, value: node.id }));
  }

  linkTypeOptions() {
    return [
      { value: 'logic', label: 'Logic' },
    ];
  }

  render() {
    const {
      children,
      style,
      className,
      title,
      nodes,
      'aria-labelledby': labeledBy,
    } = this.props;

    const { value } = this.state;

    let containerClassName = "dropdown-form " + className;

    return (
      <div style={style} className={containerClassName} aria-labelledby={labeledBy}>
        <h4>{ title }</h4>
        <form onSubmit={this.handleSubmit}>
          <label htmlFor="name">Link name</label>
          <input
             type="text"
             name="name"
             value={this.state.name}
             onChange={this.handleChange}
             placeholder="Link name"
             className="form-control"
             ref={(input) => this.input = input}
           />

          {/*<label htmlFor="linkType">Node type</label>
                    <Select
                      name="linkType"
                      value={this.state.from}
                      onChange={this.handleLinkTypeChange}
                      options={this.linkTypeOptions()}
                    />*/
          }

          <label htmlFor="from">From node</label>
          <Select
            name="from"
            value={this.state.from}
            onChange={this.handleFromNodeChange}
            options={this.nodeOptions()}
          />

          <label htmlFor="to">To node</label>
          <Select
            name="to"
            value={this.state.to}
            onChange={this.handleToNodeChange}
            options={this.nodeOptions()}
          />
          <input type="submit" value="Create Link" className="btn btn-primary form-control" />
        </form>
      </div>
    );
  }
}

