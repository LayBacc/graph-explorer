const express = require("express");
const pino = require("express-pino-logger")();
const fs = require("fs");

const app = express();
app.use(express.json());
app.use(pino);
// Set the common headers
app.use((req, res, next) => {
	res.header("Content-Type", "application/json");
	next();
});

const GRAPH_DATA_PATH = "server/tmp";

// Get all files in the tmp data directory
app.get("/api/graph/files", (req, res) => {
  // console.log(req.body);
  fs.readdir(GRAPH_DATA_PATH, (err, items) => {
  	console.log(items);
  	if (err) {
  		res.status(400);
  		res.send(JSON.stringify({ message: "error loading files" }));
  		return;
  	}

  	res.send(JSON.stringify({ files: items }));
  });
});

// Save the given graph
app.post("/api/graph/save", (req, res) => {
  console.log(req.body);

  let filename;
  if (req.body.title) {
  	filename = `${req.body.title}.json`;
  }
  else {
  	filename = "untitled.json";
  }

  fs.writeFile(`${GRAPH_DATA_PATH}/${filename}`, JSON.stringify(req.body.graph), (err) => {
  	if (err) {
  		console.log(err);
  		res.status(400);
  		res.send(JSON.stringify({ message: "error writing file" }));
  		return;
  	}

  	res.send(JSON.stringify({ message: "file written" }));
  });
});

// load the full content of a given data file
app.get("/api/graph/load", (req, res) => {
  fs.readFile(`${GRAPH_DATA_PATH}/${req.query.filename}`, "utf8", (err, data) => {

  	if (err) {
  		res.status(400);
  		res.send(JSON.stringify({ message: "error loading file" }));
  		return;
  	}

  	const graphData = JSON.parse(data);
  	res.send(JSON.stringify({ graph: graphData }));
  });
});

// Choose the port and start the server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () =>
  console.log("Express server is running on localhost:5000")
);
