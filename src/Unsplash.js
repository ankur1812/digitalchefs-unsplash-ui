import React, { Component } from "react";
import './Unsplash.css';
import FullScreen from './FullScreen'

class Unsplash extends Component {

  constructor(props){
    super(props);
    this.client_id = '0d54d7bf8f81c9ee80a75d9e1263fbb6b8267fad9d908e597b9f7c4f6bcdee23';
    this.state = {items: [], inputValue: 'bikes'}
    
    const binded = ['openFullscreen', 'closeFullscreen'];
    binded.forEach( fn => {this[fn] = this[fn].bind(this); });
  }

  onInputChange (e) {
    this.setState({inputValue: e.target.value})
  }

  componentDidMount() {
    let initUrl = 'https://api.unsplash.com/photos/?client_id=' + this.client_id
    this.callUnsplashApi(initUrl)

  }


  callUnsplashApi(url, options = {}) {
    fetch(url, options)
    .then(res => res.json())
    .then(
      (result) => {
        // alert(JSON.stringify(result))
        this.setState({
          isLoaded: true,
          items: Array.isArray(result) ? result : [],
          fullscreenImg: false,
          error: ''
        });
      },
      (error) => {
        this.setState({
          isLoaded: true,
          items: [],
          error
        });
      }
    )
  }

  header(title = "Digital Chefs", imgUrl = 'https://digitalchefs.nl/img/DigitalChefsLogo@2x.png'){
    let words = title.split(' ')
    return(
    <div className="header">
      <img style={{float:"left"}} height="42" src={imgUrl}/>
      &nbsp;
      <span className="caps">{words[0][0]}</span>
      {words[0].substring(1)}
      <span className="caps">{words[1][0]}</span>
      {words[1].substring(1)}
    </div>)
  }

  closeFullscreen() {
    this.setState({fullscreenImg: false})
  }

  openFullscreen(e) {
    this.setState({fullscreenImg: e.urls.raw})
    return;

    // This code is smaller and works but UX is bad. <FullScreen> widget will be used which has better UX

    // let elem = e.target;
    // if (elem.requestFullscreen) {
    //   elem.requestFullscreen();
    // } else if (elem.webkitRequestFullscreen) { /* Safari */
    //   elem.webkitRequestFullscreen();
    // } else if (elem.msRequestFullscreen) { /* IE11 */
    //   elem.msRequestFullscreen();
    // }
  }
  

  render(){
    let items = this.state.items;
    let error = this.state.error;
    let fullscreenImg = this.state.fullscreenImg;
    return (
      <div>
        {fullscreenImg && <FullScreen imgUrl={fullscreenImg} exit={this.closeFullscreen}></FullScreen>}
        {this.header()}
        <div className="contents" id ="123">
          <div className="image-gallary">
            {items.map((item, i) => (
              <div key={'img-' + i}>
                {/* {JSON.stringify(item).substring(0, 50)} */}
                <img onClick={ () => {this.openFullscreen(item)}} className="images-small" src={item.urls.small_s3}></img>
              </div>
            ))}</div>

        </div>
      </div>
    );
  }
}

export default Unsplash;
