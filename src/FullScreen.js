import React, { Component } from "react";
import './FullScreen.css';

class FullScreen extends Component {

  constructor(props){
    super(props);
    // const binded = ['exit'];
    // binded.forEach( fn => {this[fn] = this[fn].bind(this); });
  }

  componentDidMount() {
    document.body.style.overflow = 'hidden'
    // setTimeout(()=> {
    //   // document.body.addEventListener('click', this.exit)
    // }, 100)
  }

  componentWillUnmount() {
    document.body.style.overflow = 'auto'
  }

  render(){
    return (
      <div onClick={this.props.exit} className="fullscreen-overlay">
        <div className="fullscreen-backdrop"></div>
        <div className="fullscreen-img-container" textAlign="center">
          <img id="fullscreen-image" className="fullscreen-img" src={this.props.imgUrl}></img>
        </div>
      </div>
    );
  }
}

export default FullScreen;
