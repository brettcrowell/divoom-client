import React, {Component} from 'react';
import Swatch from './Swatch';
import {postToDivoom} from "./divoomAdapterHelper";
import './App.css';

class App extends Component {

  constructor(props) {
    super(props);
    this.state = {
      showData: false,
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
    this.updatePixelArray = this.updatePixelArray.bind(this);
    this.toggleData = this.toggleData.bind(this);
    this.clearPixels = this.clearPixels.bind(this);
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

  updatePixelArray({target: {value}}) {
    const parsedVals =
      value.replace(/ |\n/g, "")
        .padEnd(100, 0)
        .substring(0, 100)
        .split("")
        .map(num => parseInt(num, 10));

    const nextPixelArray = [];

    parsedVals.forEach((val, v) => {
      if(v % 10 === 0) {
        nextPixelArray.push([]);
      }
      nextPixelArray[nextPixelArray.length - 1].push(val);
    });

    this.setState({ pixelArray: nextPixelArray });

  }

  toggleData() {
    this.setState({ showData: !this.state.showData });
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

  getPixelArrayString(pixelArray) {
    const stringPixelArray = pixelArray.reduce((prev, row, r) => (
      `${prev}${r > 0 ? "\n" : ""}${row.join("  ")}`
    ), "");
    return stringPixelArray;
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
    const {showData, address, pixelArray} = this.state;
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
        <button onClick={this.toggleData}>{showData ? "Hide" : "Show"} Data</button>
        <br/>
        {showData && ([
          <br/>,
          <textarea
            style={({fontFamily: "Courier New"})}
            rows="10"
            cols="28"
            value={this.getPixelArrayString(pixelArray)}
            onChange={this.updatePixelArray}
          />
        ])
        }
        <h3>Submit your creation!</h3>
        Server Address:
        <input type="text" value={address} onChange={this.updateServerAddress}/>
        <button onClick={this.submitPixelArray}>Submit!</button>
      </div>
    );
  }
}

export default App;
