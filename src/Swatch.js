import React, {Component} from 'react';
import {GithubPicker} from 'react-color';
import {divoomToHex, hexToDivoom} from "./constants";

class Swatch extends Component {

  constructor(props) {
    super(props);
  }

  render() {
    const {divoomColor, row, col} = this.props;
    return (
      <div>
        <div
          key={divoomColor}
          data-row={row}
          data-col={col}
          style={({
            backgroundColor: divoomToHex[divoomColor],
            width: 50,
            height: 50,
            marginBottom: 0
          })}
        />
      </div>

    )
  }
}

export default Swatch;