import React, {Component} from 'react';
import {GithubPicker} from 'react-color';
import {divoomToHex, hexToDivoom} from "./constants";

class Swatch extends Component {

  constructor(props) {
    super(props);
    this.state = {showColorPicker: false};
    this.onColorPicked = this.onColorPicked.bind(this);
  }

  onColorPicked({hex}) {
    const {row, col, onChange} = this.props;
    onChange(row, col, hexToDivoom[hex]);
    this.setState({showColorPicker: false})
  }

  render() {
    const {divoomColor} = this.props;
    const {showColorPicker} = this.state;
    return (
      <div>
        <div
          key={divoomColor}
          style={({
            backgroundColor: divoomToHex[divoomColor],
            width: 50,
            height: 50,
            marginBottom: 5
          })}
          onClick={() => this.setState({showColorPicker: !showColorPicker})}
        />
        {showColorPicker && (
          <div style={({position: "absolute"})}>
            <GithubPicker
              colors={Object.values(divoomToHex)}
              onChange={this.onColorPicked}
            />
          </div>
        )}
      </div>

    )
  }
}

export default Swatch;