import {hexToDivoom} from "./constants";

export const calculateDistance = (rgb1, rgb2) => {

  let diffR = rgb1.r - rgb2.r;
  let diffG = rgb1.g - rgb2.g;
  let diffB = rgb1.b - rgb2.b;

  return Math.sqrt((diffR * diffR) + (diffG * diffG) + (diffB * diffB));

};

export const mapColorToPalette = (r, g, b) => {

  const color = { r, g, b };
  const palette = Object.keys(hexToDivoom).map(hexToRgb);

  const diffs = palette.map((rgb) => calculateDistance(color, rgb));

  debugger;

  return palette[diffs.indexOf(Math.min.apply(Math, diffs))];

};

export const hexToRgb = (hex) => {
  return {

    r: parseInt(hex.substr(1, 2), 16),
    g: parseInt(hex.substr(3, 2), 16),
    b: parseInt(hex.substr(5, 2), 16)

  };
};

// http://www.html5canvastutorials.com/advanced/html5-canvas-load-image-data-url/
// http://stackoverflow.com/questions/6735470/get-pixel-color-from-canvas-on-mouseover
export const rgbToHex = ({r,g,b}) => {

  if (r > 255 || g > 255 || b > 255) {
    throw "Invalid color component";
  }

  var hex = "000000" + ((r << 16) | (g << 8) | b).toString(16);

  return "#" + hex.substr(-6);

};