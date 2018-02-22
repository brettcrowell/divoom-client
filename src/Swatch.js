import React from 'react';
import {divoomToHex} from "./constants";

export default ({row, col, divoomColor, onChange}) => {
  return (
    <div
      key={divoomColor}
      style={({
      backgroundColor: divoomToHex[divoomColor],
      width: 50,
      height: 50,
      marginBottom: 5
    })}
      onClick={() => onChange(row, col, divoomColor + 1)}
    />
  )
}