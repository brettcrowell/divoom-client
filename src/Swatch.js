import React from 'react';
import {divoomToHex} from "./constants";

export default ({divoomColor}) => {
  return (
    <div key={divoomColor} style={({
      backgroundColor: divoomToHex[divoomColor],
      width: 50,
      height: 50,
      marginBottom: 5
    })}/>
  )
}