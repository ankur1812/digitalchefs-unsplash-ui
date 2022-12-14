import React, { Component } from "react";
import './Unsplash.css';

class Unsplash extends Component {

  constructor(props){
    super(props);
    this.state = {items: [], inputValue: 'abc'}
    
    const binded = [];
    binded.forEach( fn => {this[fn] = this[fn].bind(this); });
  }

  onInputChange (e) {
    this.setState({inputValue: e.target.value})
  }

  componentDidMount() {
    let initUrl = 'https://api.unsplash.com/photos'
    this.callUnsplashApi(initUrl, 'init')

  }

  callUnsplashApi(url, type) {
    url += '/?client_id=0d54d7bf8f81c9ee80a75d9e1263fbb6b8267fad9d908e597b9f7c4f6bcdee23'
    fetch(url)
    .then(res => res.json())
    .then(
      (result) => {
        // alert(JSON.stringify(result))
        this.setState({
          isLoaded: true,
          items: result
        });
      },
      (error) => {
        this.setState({
          isLoaded: true,
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

  render(){
    let items = this.state.items;
    return (
      <div>
        {this.header()}
        <div className="contents" id ="123">
          <div className="image-gallary">
            {items.map((item, i) => (
              <div key={'img-' + i}>
                <img className="images-small" src={item.urls.small_s3}></img>
              </div>
            ))}</div>

        </div>
      </div>
    );
  }
}

export default Unsplash;
