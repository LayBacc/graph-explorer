// https://react-bootstrap.github.io/components/dropdowns/
import React from "react";
import Select from "react-select";
import "./css/DropdownForm.css";

export class AddNodeDropdown extends React.Component {
  constructor(props, context) {
    super(props, context);

    this.handleChange = this.handleChange.bind(this);
    this.handleNodeTypeChange = this.handleNodeTypeChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);

    this.state = { name: '', nodeType: null };
  }

  handleChange(e) {
    this.setState({ name: e.target.value.toLowerCase() });
  }

  handleNodeTypeChange(selectedType) {
    this.setState({ nodeType: selectedType.value });
  }

  handleSubmit(e) {
    e.preventDefault();

    this.props.addNode({ 
      name: this.state.name, 
      nodeType: this.state.nodeType,
      ...this.getSymbolType(this.state.nodeType)
      // symbolType: this.getSymbolType(this.state.nodeType)
    });
  }

  // TODO - adjust size as well
  getSymbolType(nodeType) {
    return {
      ingredient: { symbolType: "circle" },
      process: { symbolType: "square" }
    }[nodeType];
  }

  nodeTypeOptions() {
    return [
      { value: "ingredient", label: "Ingredient" },
      { value: "process", label: "Process" }
    ];
  }

  render() {
    const {
      children,
      style,
      className,
      title,
      'aria-labelledby': labeledBy,
    } = this.props;

    const { value } = this.state;

    let containerClassName = "dropdown-form " + className;

    return (
      <div style={style} className={containerClassName} aria-labelledby={labeledBy}>
      	<h4>{ title }</h4>
        <form onSubmit={this.handleSubmit}>
          <label htmlFor="name">Node name</label>
          <input
             type="text"
             name="name"
             value={this.state.name}
             onChange={this.handleChange}
             placeholder="Node name"
             className="form-control"
             ref={(input) => this.input = input}
           />

          <label htmlFor="builtInNodeType">Node type</label>
          <Select
            name="builtInNodeType"
            value={this.state.from}
            onChange={this.handleNodeTypeChange}
            options={this.nodeTypeOptions()}
          />
          <input type="submit" value="Create Node" className="btn btn-primary form-control" />
        </form>
      </div>
    );
  }
}
