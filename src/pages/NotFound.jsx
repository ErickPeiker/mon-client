import React, { Component } from 'react';

class NotFound extends Component {
  render() {
    return (
      <div>
        <h1>404</h1>
        <h3>
          No match for <code>{this.props.location.pathname}</code>
        </h3>
      </div>
    )
  }
}

export default NotFound;
