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

  render() {
    const {
      children,
      style,
      className,
      'aria-labelledby': labeledBy,
    } = this.props;

    let containerClassName = "dropdown-form " + className;

    console.log("CollapseNodeDropdown", this.props.selectedNodes);

    return (
      <div style={style} className={containerClassName} aria-labelledby={labeledBy}>
      	<p>Show or hide connections to/from the selected node(s)</p>
        
      </div>
    );
  }
}
