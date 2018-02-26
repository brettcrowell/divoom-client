import React, {Component} from 'react';
import {mapColorToPalette, rgbToHex} from "./util";
import {hexToDivoom} from "./constants";

class Generate extends Component {
  constructor(props) {
    super(props);
    this.state = {pixelArray: []};
    this.handleImageChange = this.handleImageChange.bind(this)
  }

  handleImageChange(e) {

    e.preventDefault();

    let reader = new FileReader();
    let file = e.target.files[0];

    reader.onloadend = () => {

      const canvas = document.createElement("canvas");
      const ctx = canvas.getContext("2d");
      const img = new Image();

      img.onload = function () {

        ctx.imageSmoothingQuality = "high";

        // set size proportional to image
        canvas.height = canvas.width = 10;

        if(img.width > img.height) {
          img.height = img.height * (10 / img.width);
          img.width = 10;
        } else {
          img.width = img.width * (10 / img.height);
          img.height = 10;
        }

        ctx.drawImage(img, 0, 0, img.width, img.height);

        const { data } = ctx.getImageData(0, 0, canvas.width, canvas.height);

        const pixelArray = [];

        for (var i = 0; i < data.length; i += 4) {
          const mappedColor = mapColorToPalette(data[i], data[i + 1], data[i + 2]);
          console.log(mappedColor);
          pixelArray.push(hexToDivoom[rgbToHex(mappedColor)] || 0);
        }

        this.setState({ pixelArray });

      };

      img.style.imageRendering = "pixelated";
      img.src = reader.result;

    };

    reader.readAsDataURL(file)

  }

  render() {
    let {imagePreviewUrl} = this.state;
    let $imagePreview = null;
    if (imagePreviewUrl) {
      $imagePreview = (<img src={imagePreviewUrl}/>);
    } else {
      $imagePreview = (
        <div className="previewText">Please select an Image for Preview</div>);
    }

    return (
      <div className="previewComponent">
        <input
          className="fileInput"
          type="file"
          onChange={this.handleImageChange}
        />
        <div className="imgPreview">
          /*{$imagePreview}*/
        </div>
      </div>
    )
  }
}

export default Generate;