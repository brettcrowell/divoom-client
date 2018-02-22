import React, {Component} from 'react';
import Swatch from './Swatch';
import {postToDivoom} from "./divoomAdapterHelper";
import './App.css';

class App extends Component {

  constructor(props) {
    super(props);
    this.state = {
      address: "http://192.168.128.52:1989",
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
    this.updateServerAddress = this.updateServerAddress.bind(this);
    this.updatePixelColor = this.updatePixelColor.bind(this);
    this.clearPixels = this.clearPixels.bind(this);
    this.showPixelData = this.showPixelData.bind(this);
    this.submitPixelArray = this.submitPixelArray.bind(this);
  }

  updateServerAddress({ target: { value }}) {
    this.setState({ address: value })
  }

  updatePixelColor(row, col, newColor) {
    const {pixelArray} = this.state;
    pixelArray[row][col] = newColor;
    this.setState({pixelArray});
  }
  
  clearPixels() {
    this.setState({
      pixelArray: [
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0]
      ]
    })
  }

  showPixelData() {
    const {pixelArray} = this.state;
    const stringPixelArray = pixelArray.reduce((prev, row) => (
      `${prev}\n${row.join("   ")}`
    ), "");
    alert(stringPixelArray);
  }

  submitPixelArray() {
    const { address, pixelArray } = this.state;

    // divoom server expects a flat array of divoomColors
    const flattenedPixelArray = pixelArray.reduce((prev, row) => ([
      ...prev,
      ...row
    ]), []);

    postToDivoom(address, "show_pixel_array", flattenedPixelArray);

  }

  render() {
    const {address, pixelArray} = this.state;
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
        <h3>Options</h3>
        <button onClick={this.clearPixels}>Clear Pixels</button>
        <button onClick={this.showPixelData}>View Data</button>
        <h3>Submit your creation!</h3>
        Server Address:
        <input type="text" value={address} onChange={this.updateServerAddress}/>
        <button onClick={this.submitPixelArray}>Submit!</button>
      </div>
    );
  }
}

export default App;
