'use strict';

import React  from 'react';
import * as Components from '../server_rendering/component_manifest.js';

class InitRendered {
  constructor(properties) {
    this.CLASS_NAME_ATTR = 'data-react-class';
    this.PROPS_ATTR = 'data-react-props';

    document.addEventListener('DOMContentLoaded', this.mountComponents.bind(this));
    window.addEventListener('unload', this.unmountComponents.bind(this));
  }


  findDOMNodes() {
    return document.querySelectorAll("[" + this.CLASS_NAME_ATTR + "]");
  }

  mountComponents() {
    let className, constructor, i, j, len, node, nodes, props, propsJson, results;

    nodes = this.findDOMNodes();
    results = [];

    for (i = j = 0, len = nodes.length; j < len; i = ++j) {
      node = nodes[i];
      className = node.getAttribute(this.CLASS_NAME_ATTR);
      constructor = Components[className];
      propsJson = node.getAttribute(this.PROPS_ATTR);
      props = propsJson && JSON.parse(propsJson);
      results.push(React.render(React.createElement(constructor, props), node));
    }
    return results;
  }

  unmountComponents() {
    let i, j, len, node, nodes, results;

    nodes = this.findDOMNodes();
    results = [];

    for (i = j = 0, len = nodes.length; j < len; i = ++j) {
      node = nodes[i];
      results.push(React.unmountComponentAtNode(node));
    }
    return results;
  }

}

export const instance = new InitRendered();
export default InitRendered;
