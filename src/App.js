import React, {Component} from 'react';
import {divoomToHex} from "./constants";
import Swatch from './Swatch';
import './App.css';

class App extends Component {

  constructor(props) {
    super(props);
    this.state = {
      pixelArray: [
        [0, 0, 0, 0, 0, 0, 0, 0, 6, 0],
        [0, 0, 0, 0, 0, 0, 0, 6, 6, 0],
        [0, 0, 0, 0, 0, 0, 0, 6, 6, 0],
        [0, 0, 0, 0, 0, 0, 6, 6, 6, 0],
        [0, 0, 0, 0, 0, 6, 6, 6, 6, 0],
        [0, 0, 0, 0, 6, 6, 6, 6, 6, 0],
        [0, 0, 0, 0, 0, 6, 6, 6, 6, 0],
        [0, 0, 0, 6, 0, 0, 6, 6, 6, 0],
        [0, 0, 6, 6, 0, 0, 6, 6, 6, 0],
        [0, 6, 6, 6, 0, 0, 0, 6, 6, 0]
      ]
    };
    this.updatePixelColor = this.updatePixelColor.bind(this);
  }

  updatePixelColor(row, col, newColor) {
    const {pixelArray} = this.state;
    pixelArray[row][col] = newColor;
    this.setState({pixelArray});
  }

  render() {
    const {pixelArray} = this.state;
    return (
      <div className="App">
        <h1>Divoom LED Speaker Client</h1>
        <table>
          <tbody>
          {pixelArray.map((pixels, row) => (
            <tr key={row}>
              {pixels.map((pixel, col) => (
                <td key={col}>
                  <Swatch
                    row={row}
                    col={col}
                    divoomColor={pixel}
                    onChange={this.updatePixelColor}
                  />
                </td>
              ))}
            </tr>
          ))}
          </tbody>
        </table>
      </div>
    );
  }
}

export default App;
