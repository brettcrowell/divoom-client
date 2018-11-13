export const divoomToHex = {
  0: "#000",
  1: "#f00",
  2: "#0f0",
  3: "#ff0",
  4: "#00f",
  5: "#f39",
  6: "#0ff",
  7: "#fff"
};

export const hexToDivoom = {
  "#000000": 0,
  "#ff0000": 1,
  "#00ff00": 2,
  "#ffff00": 3,
  "#0000ff": 4,
  "#ff3399": 5,
  "#00ffff": 6,
  "#ffffff": 7
};

function extractComponentValues(string) {
  return string.replace(/[^0-9.,]/g, '').split(',').map(x => parseInt(x))
}
function componentToHex(c) {
  const hex = c.toString(16)
  return hex.length === 1 ? `0${hex}` : hex
}

export const rgbToHex = rgb => `#${extractComponentValues(rgb).map(c => componentToHex(c)).join('')}`