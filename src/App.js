import './App.css';
import React, { Component } from 'react';
import {Helmet} from "react-helmet";
import Navigation from './components/Navigation/Navigation';
import Logo from './components/Logo/Logo';
import ImageLinkForm from './components/ImageLinkForm/ImageLinkForm';
import Rank from './components/Rank/Rank';
import FaceRecognation from './components/FaceRecognation/FaceRecognation';
import SignIn from './components/SignIn/SignIn';
import Register from './components/Register/Register';
import Particles from 'react-particles-js';


const particleOptions = {
    particles: {
      number: {
        value: 50,
        density: {
          enable: true,
          value_area: 800
        }
      },
      interactivity: {
        detect_on: "canvas",
        events:{
          onhover: {
            enable: true,
            mode: 'repulse'
          }
        }
      }
    }
  }

const initialState = {
  input: '',
  url: '',
  box: [{
    leftCol: 0,
    topRow: 0,
    rightCol: 0,
    bottomRow: 0,
  }], // 초기값을 빈 배열로 하면 오류가 나길래..
  route: 'signin',
  isSignedIn: false,
  user: {
      id: '',
      name: '',
      email: '',
      entries: 0,
      joined: ''
  }
}



class App extends Component {


  constructor() {
    super()
    this.state = initialState
  }



  loadUser = (data) => {
    this.setState({user: {
      id: data.id,
      name: data.name,
      email: data.email,
      entries: data.entries,
      joined: data.joined
    }})
  } // 로그인이 성공하면 db에 있는 정보대로 state를 맞춰줌
  

  calculateFaceLocation = (data) => {
    let boxArray = []
    const image = document.getElementById('inputImage');
    const width = Number(image.width);
    const height = Number(image.height);

    for (var i = 0; i < data.outputs[0].data.regions.length; i++) {
      const clarifiFace = data.outputs[0].data.regions[i].region_info.bounding_box;
      boxArray.push({
        leftCol: clarifiFace.left_col * width,
        topRow: clarifiFace.top_row * height,
        rightCol: width - (clarifiFace.right_col * width),
        bottomRow: height - (clarifiFace.bottom_row * height),
      })
    }
    return boxArray;  
  } // API가 보내준 결과에서 얼굴 위치를 뽑아내는 함수


  displayFacebox = (box) => {
    this.setState({box: box})
  } // 위 함수에서 내놓은 결과를 state 에 저장


  onInputChange = (event) => {
    this.setState({input: event.target.value});
    console.log('검색창', this.state.input)
  } // 검색창에 글자를 쓸때마다 input이라는 state를 업데이트


  onPictureSubmit = () => {

    this.setState({url: this.state.input}, () => {
      fetch('https://stark-ridge-55839.herokuapp.com/submit', {
        method: 'post',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify({
        imgUrl: this.state.url
      })
    })
  .then(response => response.json())
  .then(response => { 
    if (response) {
      fetch('https://stark-ridge-55839.herokuapp.com/image', {
        method: 'put',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify({
        id: this.state.user.id
      })
    })
    .then(response => response.json())
    .then(count => {
      this.setState(Object.assign(this.state.user, {entries: count}))
      })
    }
    this.displayFacebox(this.calculateFaceLocation(response))  // 커링 함수 !?
  })
    .catch(err => console.log('error!', err))
    });



}
  


  onRouteChange = (route) => {
    if (route === 'signout') {
      this.setState(initialState)
    } else if (route === 'home'){
      this.setState({isSignedIn: true})
    }
      this.setState({route: route});
  }


  render() {
    const { isSignedIn, box, url, route, user} = this.state;
    return(
      <div className='App'>
        <Helmet>
        </Helmet>
        <Navigation onRouteChange={this.onRouteChange} isSignedIn={isSignedIn}/>
        { route === 'home' 
        ? <div>
            <Logo /> 
            <Rank name={user.name} entries={user.entries} />
            <ImageLinkForm 
              onInputChange={this.onInputChange}
              onPictureSubmit={this.onPictureSubmit}/>
            <FaceRecognation box={box} url={url}/>
          </div>
        : (
          route === 'signin' || route === 'signout'
          ? <SignIn loadUser={this.loadUser} onRouteChange={this.onRouteChange}/> 
          : <Register loadUser={this.loadUser} onRouteChange={this.onRouteChange}/> 
        )
        }
        
        <Particles  className='particles' params={particleOptions}/>
      </div>
    )
  }
}

export default App;
