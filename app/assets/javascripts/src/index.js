'use strict';

import React from 'react';

//
// Class definition 
//

let Test = React.createClass({
  render() {
    return React.DOM.h1({}, this.props.name)
  }
});

//
// Static Properties
//

Test.displayName = "Test";

export default Test;
