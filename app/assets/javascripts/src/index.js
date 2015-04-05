'use strict';

import React from 'react';

export default React.createClass({
  render() {
    return React.DOM.h1({}, this.props.name)
  }
});
