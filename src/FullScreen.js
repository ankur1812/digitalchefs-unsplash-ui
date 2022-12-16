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
    let photo = this.props.photo;
    let userInfo = '';
    if(photo.user) userInfo += `Uploaded by: ${photo.user?.first_name || ''} ${photo.user?.last_name || ''}`;
    if(photo.created_at) userInfo += ` on ${new Date(photo.created_at).toDateString()}`;
    return (
      <div onClick={this.props.exit} className="fullscreen-overlay">
        <div className="fullscreen-backdrop"></div>
        <div className="fullscreen-img-container" textAlign="center">
          <div className="fullscreen-img-info">
            {photo.description || photo.alt_description}
          </div>
          <img id="fullscreen-image" className="fullscreen-img" src={photo.urls.raw}></img>
          <div className="fullscreen-img-info user-info">
            { userInfo}
          </div>

        </div>
      </div>
    );
  }
}

export default FullScreen;
