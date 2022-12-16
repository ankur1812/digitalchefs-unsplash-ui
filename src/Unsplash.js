import React, { Component } from "react";
import './Unsplash.css';
import FullScreen from './FullScreen'

class Unsplash extends Component {

  constructor(props){
    super(props);
    this.client_id = '0d54d7bf8f81c9ee80a75d9e1263fbb6b8267fad9d908e597b9f7c4f6bcdee23';
    this.pageSize = 20;
    this.totalPages = 20;
    this.sortOrder = 'relevant'
    this.currentPage = 1;
    this.state = {items: [], inputValue: '', searchResults: [], totalCount: -1}
    
    const binded = ['callUnsplashApi', 'autocomplete', 'openFullscreen', 'closeFullscreen', 'searchImages', 'imageThumbnail', 'loadMoreOnScrollEnd', 'updateSort'];
    binded.forEach( fn => {this[fn] = this[fn].bind(this); });
  }

  onInputChange (e) {
    this.setState({inputValue: e.target.value})
  }

  componentDidMount() {
    let initUrl = `https://api.unsplash.com/photos/?per_page=${30}&client_id=${this.client_id}`
    document.addEventListener('scroll', this.loadMoreOnScrollEnd)
    this.callUnsplashApi(initUrl);
  }

  loadMoreOnScrollEnd(e){
    if ((window.innerHeight + window.scrollY + 50) >= document.body.offsetHeight && !this.pause) {
      // this.pause = true; setTimeout( ()=> {this.pause = false}, 1000)
      let loadMore = true;
      if (this.totalPages > this.currentPage) this.searchImages(null, loadMore)
    }
  }


  callUnsplashApi(url, cb=null, options = {}) {
    // url += `/?client_id=${this.client_id}`
    // fetch(url, { mode: 'no-cors'})
    fetch(url, options)
    .then(res => res.json())
    .then(
      (result) => {
        if (cb) {
          cb(result)
          return;
        }
        // alert(JSON.stringify(result))
        this.setState({
          isLoaded: true,
          // items: Array.isArray(result) ? result : [],
          items: result,
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

  header(title = "Unsplash UI", imgUrl = 'https://digitalchefs.nl/img/DigitalChefsLogo@2x.png'){
    let words = title.split(' ')
    return(
    <div className="header">
      <img style={{float:"left", marginTop:'4px', height: '28px'}} height="28" src={imgUrl}/>
      &nbsp;
      <span>{title}</span>
    </div>)
  }

  autocomplete(e) {
    this.setState({inputValue: e.target.value})
    this.showSearchResults = true;
    let searchString = e ? e.target.value : this.state.inputValue ;
    let searchUrl = 'https://unsplash.com/nautocomplete/' + searchString
    // searchUrl = 'http://localhost:3000/api/photos/?client_id=' + this.client_id
    // searchUrl = '/unsplash/nautocomplete/' + searchString
    // let options = { headers: {Authorization: 'client_id=0d54d7bf8f81c9ee80a75d9e1263fbb6b8267fad9d908e597b9f7c4f6bcdee23'}}
    // options = { mode: 'no-cors'}
    // options = {
    //   // mode: 'no-cors',
    //   headers: {
    //     // cookie: 'ugid=8255aa911628c6d94a5f9f8d0ddbc3365559872; xp-disable-affiliates=control; _ga=GA1.2.514980779.1670954969; _gid=GA1.2.467328876.1670954969; uuid=499140f0-7b11-11ed-8cd8-37742becddd5; xpos=%7B%7D; azk=499140f0-7b11-11ed-8cd8-37742becddd5; azk-ss=true; _sp_ses.0295=*; _gat=1; auth_user_id=11458096; un_sesh=NmwzdGdqbnBFbkg1WGNjMkt3djVlK1ZGN0w3dTZCd2RzQWdyR2tlQnN0N1V1SnRpQ2Vlc0x6b1dsampIMHNvRDhjN0NNM09keUNjbmRyZkhMbWdLS1VuVDA1N29MWGhzV0VKTlU3ZFdyVVlVdFdNeHhIS2FMeW5OZW9VNGhHNTRVNzNsd2tSdVUweURVQTE5N0hzaVZRR1dtaWtFOE13bWV4N09NOGZWRmNVRmV0ZjJ0Qzk0YnlCRmlXYkNRdGZjUU5uN0NhU3hFektMUjNNbTQ5dWRQZFIrZjVsYXRHM1hwUzlUek8xZnJZQ3FoRFhkWmhHTURYcWRtZlUvemRuTi95VVVyRDNjZllJcjJwVUdSYU1QcDNMMEpWYzFZekZKWU9vL096US91Mzg4cnhCWTM1ZC8veGQ4aFZmUkNxTUlDaHJIME12RkdlMjYzT2tJTlhUQk1qbjB3Yy9pM1JDR2lhSGE2QVFUSEZSTFBzNGpOblViOVRsMzVpR1ZJWFFoTkpURmNjblc3Wm1DbUh5di81OER0cUErTGZxYm5sU2VseG82WldxZkRTLzVDS2VmUXhvdFlLQThraWFKbXRQSDdFOXljZWVxTkJLbC8vS2hPTWI0M291OXhGRG8wOHc1UURvbDcrZDIvZEx5UlFrVkZQR1VBWGJ5RHR4OU9NUnUrOERxT3oyZDNTeHhpY3pWcmpuMjlLWFZxcmtRMTRvRFdsK3k1YnF2OXVqeEhYUXg5UERSTmt0QnUwcVFVY05tRHByZUVSOTByNXdIKzhZeVQ4ZWZJQT09LS1XTm95Wk8rYWYzOGRyY0g3YXdjVWFBPT0%3D--df24701e72a796eebd4b1e3bc53ed6313375c047; lux_uid=167106993940559902; _sp_id.0295=98e09a33-ca56-44bb-b0bc-309f4af39abd.1670954969.11.1671069950.1671060907.18efad39-c579-4c24-8132-4fb1811aea33'
    //     'Access-Control-Allow-Origin': '*',
    //   }
    // }
    let cb = (results => {
      let suggestions = [];
      // Merge the autocomplete, did_you_mean and fuzzy suggestions
      let mergedResults = [...results.autocomplete, ...results.did_you_mean, ...results.fuzzy];
      // Dont' add duplicate suggestions
      mergedResults.forEach(a => {if (suggestions.indexOf(a) == -1) suggestions.push(a)})
      this.setState({searchResults: results})
    })
    searchString && this.callUnsplashApi(searchUrl, cb)
  }

  searchImages(e, loadMore) {
    let searchString = this.state.inputValue;
    if (e?.target?.tagName == 'DIV')  searchString = e?.target?.innerText;
    if (loadMore) {
      this.currentPage++
    }
    else {
      this.currentPage = 1
    }
    e?.preventDefault();
    e?.stopPropagation();

    this.showSearchResults = false;
    let url = `https://unsplash.com/napi/search?query=${searchString}&per_page=${this.pageSize}&page=${this.currentPage}&order_by=${this.sortOrder}`
    if(this.colorPreference && this.colorPreference!='All') url += `&color=${this.colorPreference}`
    let cb = (res) => {
      let photos = (loadMore) ? [...this.state.items, ...res.photos.results] : res.photos.results
      this.setState( {
        // items: res.collections.results
        // items: res.photos.results,
        items: photos,
        totalCount: res.photos.total,
        totalPages: res.photos.total_pages,
        inputValue: searchString
      })
    };
    searchString && this.callUnsplashApi(url, cb)
  }

  updateSort(e) {
    if(e.target.id == 'sort-order')
      this.sortOrder = e.target.value;
    if(e.target.id == 'color-pref')
      this.colorPreference = e.target.value;
    this.searchImages(null, false);
  }

  SearchBar() {
    return (
      <div className="search-container">
      <form id="search-bar" className="search-bar" onSubmit={this.searchImages}>
        <input
          id="search-input"
          list="imgsearch"
          onBlur={()=>{this.setState({showSearchResults: false})}}
          value={this.state.inputValue} 
          type="text"
          placeholder="Search images here!"
          onChange={this.autocomplete}
          >
        </input>{this.showSearchResults && (
        <div className="search-results">
          <div id="results-list" onClick={this.searchImages}>
            {this.state.searchResults?.autocomplete?.map( (a,i) => <div key={'autocomplete-'+i}>{a.query}</div>)}
            {this.state.searchResults?.did_you_mean?.map( (a,i) => <div key={'did-you-mean-'+i}>{a.query}</div>)}
            {this.state.searchResults?.fuzzy?.map( (a,i) => <div key={'fuzzy-'+i}>{a.query}</div>)}
          </div>
        </div>
        )}
      </form>
      <div className="filters">
        <div id="sort-filter">
          <label> Sort by</label>
          <select id="sort-order" onChange={this.updateSort}>
            <option value="relevant"> Relevance</option>
            <option value="latest"> Latest</option>
          </select>
        </div>
        <div id="color-filter">
          <label> Color Preference</label>
          <select id="color-pref" onChange={this.updateSort}>
            <option value="All"> All</option>
            <option value="black_and_white"> Black n' White</option>
            <option value="black"> Black</option>
            <option value="white"> White</option>
            <option value="yellow"> Yellow</option>
            <option value="orange"> Orange</option>
            <option value="red"> Red</option>
            <option value="purple"> Black</option>
            <option value="magenta"> Magenta</option>
            <option value="green"> Green</option>
            <option value="teal"> Teal</option>
            <option value="blue"> Blue</option>
          </select>
        </div>
      </div>
      </div>
    )
  }

  closeFullscreen() {
    this.setState({fullscreenImg: false})
  }

  openFullscreen(e) {
    this.setState({fullscreenImg: e})
    return;
    // This code is smaller and works but UX is bad. <FullScreen> widget will be used which has better UX
    let elem = e.target;
    if (elem.requestFullscreen) {
      elem.requestFullscreen();
    } else if (elem.webkitRequestFullscreen) { /* Safari */
      elem.webkitRequestFullscreen();
    } else if (elem.msRequestFullscreen) { /* IE11 */
      elem.msRequestFullscreen();
    }
  }

  imageThumbnail(item, i) {
    return (
      <div onClick={ () => {this.openFullscreen(item)}} className="img-thumbnail" key={'img-' + i}>
        <img className="images-small" src={item.urls.small_s3}></img>
        <div className="img-info">
          {item.description || item.alt_description}
          {/* {item.user?.first_name} {item.user?.last_name} */}
          {/* {JSON.stringify(item.user)} */}
        </div>
      </div>
    );
  }

  render(){
    let items = this.state.items;
    let error = this.state.error;
    let fullscreenImg = this.state.fullscreenImg;
    return (
      <div>
        {fullscreenImg && <FullScreen photo={fullscreenImg} exit={this.closeFullscreen}></FullScreen>}
        <div className="contents" id ="123">
          {this.header()}
          <div>Use below search bar to search your favorite Unsplash images</div>
          {this.SearchBar()}
          {error && <div className="error-message">{error.message || JSON.stringify(error)}</div>}
          {this.state.totalCount > -1 && <div id="img-count"> {this.state.totalCount || 'No'} photos found online for "{this.state.inputValue}"!</div>}
          <div className="image-gallary">
            {
              items.map(this.imageThumbnail)
            }
          </div>
          {this.state.totalCount == -1 && (
            <div id="footer-msg"> 
              These are some photos which were fetched randomly through API. Use the search-box to explore more!
            </div>
          )}

        </div>
      </div>
    );
  }
}

export default Unsplash;
