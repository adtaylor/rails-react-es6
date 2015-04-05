'use strict';

import * as components from './component_manifest.js';
import React from 'react';

let k, v;
window.React = React;

for (k in components) {
  v = components[k];
  window[k] = v;
}
