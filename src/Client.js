import React, {Component} from 'react';
import Swatch from './Swatch';
import {GithubPicker} from 'react-color';
import {postToDivoom} from "./divoomAdapterHelper";
import {divoomToHex, hexToDivoom} from "./constants";
import './Client.css';

class Client extends Component {

  constructor(props) {
    super(props);
    this.state = {
      showData: false,
      address: "http://192.168.128.52:1989",
      currentColor: 6,
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
    this.onMouseDown = this.onMouseDown.bind(this);
    this.onMouseUp = this.onMouseUp.bind(this);
    this.onMouseMove = this.onMouseMove.bind(this);
    this.onColorPicked = this.onColorPicked.bind(this);

    this.isDragging = false;
  }

  updateServerAddress({ target: { value }}) {
    this.setState({ address: value })
  }

  onColorPicked({hex}) {
    const {row, col, onChange} = this.props;
    this.setState({'currentColor': hexToDivoom[hex]});
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

  onMouseDown(event) {
    this.isDragging = true;

    if (event.target && event.target.dataset.row) {
      const { row, col } = event.target.dataset;
      this.updatePixelColor(parseInt(row), parseInt(col), this.state.currentColor);
    }
  }

  onMouseMove(event) {
    if (this.isDragging) {
      if (event.target && event.target.dataset.row) {
        const { row, col } = event.target.dataset;
        this.updatePixelColor(parseInt(row), parseInt(col), this.state.currentColor);
      }
    }
  }

  onMouseUp(event) {
    this.isDragging = false;
  }

  render() {
    const {showData, address, pixelArray} = this.state;
    return (
      <div className="App" onMouseUp={this.onMouseUp}>
        <section>
          <h1>Divoom LED Speaker Client</h1>
          <table onMouseDown={this.onMouseDown} onMouseMove={this.onMouseMove}>
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
        </section>

        <section>
          <h3>Options</h3>
          <h5>Current Color:
            <Swatch
              row="0"
              col="0"
              divoomColor={this.state.currentColor}/>
          </h5>
          <GithubPicker
            colors={Object.values(divoomToHex)}
            onChange={this.onColorPicked}
            triangle="hide"
          />
          <hr/>
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
        </section>
      </div>
    );
  }
}

export default Client;
