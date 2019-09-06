/*eslint require-jsdoc: 0, valid-jsdoc: 0, no-undef: 0, no-empty: 0, no-console: 0*/
import queryString from "query-string";
import { LINE_TYPES } from "react-d3-graph/src/components/link/link.const";
import DEFAULT_CONFIG from "./sandbox_data/graph.config";
import utils from "react-d3-graph/src/utils";
// import isEmpty from "lodash/isEmpty";

/**
 * This two functions generate the react-jsonschema-form
 * schema from some passed graph configuration.
 */
function formMap(k, v) {
  // customized props
  switch (k) {
    case "link.type": {
      return {
        type: "array",
        title: "link.type",
        items: {
          enum: Object.keys(LINE_TYPES),
        },
        uniqueItems: true,
      };
    }
  }

  return {
    title: k,
    type: typeof v,
    default: v,
  };
}

function generateFormSchema(o, rootSpreadProp, accum = {}) {
  for (let k of Object.keys(o)) {
    const kk = rootSpreadProp ? `${rootSpreadProp}.${k}` : k;

    if (o[k] !== undefined && o[k] !== null && typeof o[k] !== "function") {
      typeof o[k] === "object" ? generateFormSchema(o[kk], kk, accum) : (accum[kk] = formMap(kk, o[k]));
    }
  }

  return accum;
}

function loadDataset() {
  const queryParams = queryString.parse(window.location.search);
  let fullscreen = false;

  if (queryParams && queryParams.fullscreen) {
    fullscreen = new Boolean(queryParams.fullscreen);
  }

  if (queryParams && queryParams.data) {
    const dataset = queryParams.data.toLowerCase();

    try {
      const data = require(`./data/${dataset}/${dataset}.data`);
      const datasetConfig = require(`./data/${dataset}/${dataset}.config`);
      const config = utils.merge(DEFAULT_CONFIG, datasetConfig);

      return { data, config, fullscreen };
    } catch (error) {
      console.warn(
        `dataset with name ${dataset} not found, falling back to default, make sure it is a valid dataset`
      );
    }
  }

  const config = {};
  // change this for other data sets
  const data = require("./sandbox_data/default");

  return {
    config,
    data,
    fullscreen,
  };
}

function setValue(obj, access, value) {
  if (typeof access == "string") {
    access = access.split(".");
  }

  // check for non existence of root property before advancing
  if (!obj[access[0]]) {
    obj[access[0]] = {};
  }

  access.length > 1 ? setValue(obj[access.shift()], access, value) : (obj[access[0]] = value);
}

function getNodeData(nodeId, nodes) {
  for (let i = 0; i < nodes.length; i++) {
    let node = nodes[i];
    
    if (node.id == nodeId) {
      return node;
    }
  }
  return null;
}

function getLinkData(sourceId, targetId, links) {
  for (let i = 0; i < links.length; i++) {
    let link = links[i];
    
    if (link.source == sourceId && link.target == targetId) {
      return link;
    }
  }
  return null;
}

// return a new array, with the node filtered out
function removeNode(nodes, del) {
  return nodes.filter((node) => {
    return node.id !== del.id;
  });
}

// return a new array, with the link filtered out
function removeLink() {

}


export default {
  generateFormSchema,
  loadDataset,
  setValue,
  getNodeData,
  getLinkData,
  removeNode
};
