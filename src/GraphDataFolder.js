import React from "react";
import { ListGroup } from "react-bootstrap";

export class GraphDataFolder extends React.Component {
  constructor(props, context) {
    super(props, context);
    this.onFileClick = this.onFileClick.bind(this);
    this.state = { files: [] };
  }

  // when we switch to Next.js, we'll use `getInitialProps`` instead
  componentDidMount() {
    this.fetchFilenames();
  }

  fetchFilenames() {
    fetch("/api/graph/files", {
        method: "GET",
        headers: {
          "Content-Type": "application/json"
        }
      })
      .then(res => res.json())
      .then(results => this.setState({ files: results.files }));
  }

  fetchFileContent(filename) {
    fetch(`/api/graph/load?filename=${filename}`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json"
        }
      })
      .then(res => res.json())
      .then(results => this.props.loadGraphData(filename, results.graph));
  }

  onFileClick(e) {
    const filename = e.target.dataset.filename;
    this.fetchFileContent(filename);
    // TODO - first fetch
  }

  render() {
    return (
      <ListGroup>
        {this.state.files.map(filename => (
          <ListGroup.Item 
            onClick={this.onFileClick} 
            data-filename={filename}
            key={filename}
            action>
            {filename}
          </ListGroup.Item>
        ))}
      </ListGroup>
    );
  }
}
