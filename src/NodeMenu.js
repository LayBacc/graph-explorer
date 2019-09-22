import React from "react";

export class NodeMenu extends React.Component {
  constructor(props, context) {
    super(props, context);

    this.handleChange = this.handleChange.bind(this);
    this.state = { name: '', from: null, to: null };
  }

  handleChange(e) {
    this.setState({ [e.target.name]: e.target.value });
  }

  buildConnectedNodeTypes = (direction) => {
    return Object.keys(this.props.connectedTypes[direction]).map(label => {

      return(
        <div>
          { label }
          <br /><br />
        </div>
      );
    });
  };

  render() {
    const {
      children,
      className,
      coords,
      connectedTypes
    } = this.props;

    // const { value } = this.state;

    // let containerClassName = "dropdown-form " + className;
    const incomingNodeComponents = this.buildConnectedNodeTypes("incoming");
    const outgoingNodeComponents = this.buildConnectedNodeTypes("outgoing");

    return (
      <div style={{
        left: coords.x,
        top: coords.y,
        width: "300px", 
        border: "1px solid black", 
        position: "absolute",
        zIndex: 1,
        backgroundColor: "white",
        padding: "1em"
      }}>
        <strong><p>Incoming Connections</p></strong>
        {incomingNodeComponents}

        <strong><p>Outgoing Connections</p></strong>
        {outgoingNodeComponents}
      </div>
    );
  }
}
