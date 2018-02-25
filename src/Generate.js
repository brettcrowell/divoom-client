import React, {Component} from 'react';

class Generate extends Component {
  constructor(props) {
    super(props);
    this.state = {file: '', imagePreviewUrl: ''};
    this.handleImageChange = this.handleImageChange.bind(this)
  }

  handleImageChange(e) {

    e.preventDefault();

    let reader = new FileReader();
    let file = e.target.files[0];

    reader.onloadend = () => {
      this.setState({
        file: file,
        imagePreviewUrl: reader.result
      });
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
          {$imagePreview}
        </div>
      </div>
    )
  }
}

export default Generate;