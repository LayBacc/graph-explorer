import React from "react";

export class NodeMenu extends React.Component {
  constructor(props, context) {
    super(props, context);

    this.handleChange = this.handleChange.bind(this);
    // this.state = { connectedTypesByNode: {} };
  }

  selectedNodeConnectedTypes() {
    const { 
      connectedTypesByNode, 
      selectedNode
    } = this.props;

    return connectedTypesByNode[selectedNode.id];
  }

  handleChange(e) {
    const direction = e.target.id.split(":")[0];
    const connectedTypeLabel = e.target.id.split(":")[1];
    const checked = e.target.checked;

    // console.log(direction, typeLabel, checked);
    const nodeLabel = connectedTypeLabel.split("-")[0];
    const linkLabel = connectedTypeLabel.split("-")[1];
    // const { linkLabel, nodeLabel } = this.props.connectedTypesByNode[this.props.selectedNode.id][direction][typeLabel];

    // console.log(this.selectedNodeConnectedTypes()[direction]);

    this.props.handleSelectedNodeTypeChange(this.props.selectedNode.id, direction, linkLabel, nodeLabel, checked);
  }

  buildConnectedType(direction, label, connectedTypeData) {
    const checkedState = connectedTypeData.selected;

    return(
      <div>
        <input 
          className="form-check-input" 
          type="checkbox"
          id={direction + ":" + label}
          onChange={this.handleChange}
          checked={checkedState} />
        <label className="form-check-label" htmlFor={label}>
          { label }
        </label>
      </div>
    );
  }

  buildConnectedNodeTypes(direction) {
    // console.log("in buildConnectedNodeTypes", );
    const { nodeLabels, linkLabels } = this.selectedNodeConnectedTypes()[direction];

    const nodeOptions = Object.keys(nodeLabels).map(nodeLabel => {
      const nodeTypeData = nodeLabels[nodeLabel];
      return this.buildConnectedType(direction, nodeLabel, nodeTypeData);
    });

    const linkOptions = Object.keys(linkLabels).map(linkLabel => {
      const linkTypeData = linkLabels[linkLabel];
      const label = `${linkTypeData.connectedNodeType}-${linkLabel}`

      return this.buildConnectedType(direction, label, linkTypeData);
    });


    //  return Object.keys(this.selectedNodeConnectedTypes()[direction]).map(label => {

    //   let checkedState = false;
    //   if (this.selectedNodeConnectedTypes() && this.selectedNodeConnectedTypes()[direction]) {

    //     const nodeLabels = this.selectedNodeConnectedTypes()[direction].nodeLabels; 
    //     const linkLabels = this.selectedNodeConnectedTypes()[direction].linkLabels;
    //   }
    return(
      <div>
        { nodeOptions }
        { linkOptions }
      </div> 
    )
    //   return(
    //     <div>
    //       <input 
    //         className="form-check-input" 
    //         type="checkbox"
    //         id={direction + ":" + label}
    //         onChange={this.handleChange}
    //         checked={checkedState} />
    //       <label className="form-check-label" htmlFor={label}>
    //         { label }
    //       </label>
    //     </div>
    //   );
    // });
  }

  render() {
    const {
      children,
      className,
      coords,
      connectedTypesByNode
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
        <div className="form-check">
          {incomingNodeComponents}
        </div>

        <strong><p>Outgoing Connections</p></strong>
        <div className="form-check">
          {outgoingNodeComponents}
        </div>
      </div>
    );
  }
}
