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
  }

  render() {
    const {pixelArray} = this.state;
    return (
      <div className="App">
        <h1>Divoom LED Speaker Client</h1>
        <table>
          {pixelArray.map((pixels, row) => (
            <tr key={row}>
              {pixels.map((pixel, column) => (
                <td key={column}>
                  <Swatch divoomColor={pixel}/>
                </td>
              ))}
            </tr>
          ))}
        </table>
      </div>
    );
  }
}

export default App;
