import './App.css';
import React, { Component } from 'react';
import Clarifai from 'clarifai';
import Navigation from './components/Navigation/Navigation';
import Logo from './components/Logo/Logo';
import ImageLinkForm from './components/ImageLinkForm/ImageLinkForm';
import Rank from './components/Rank/Rank';
import FaceRecognation from './components/FaceRecognation/FaceRecognation';
import SignIn from './components/SignIn/SignIn';
import Register from './components/Register/Register';
import Particles from 'react-particles-js';


const app = new Clarifai.App({
  apiKey: 'c9f7a09b371a4b52b7980905d777c44b'
})

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

class App extends Component {

  constructor() {
    super()
    this.state = {
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
    }
}


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
        bottomRow: height - (clarifiFace.bottom_row * width),
      })
    }
    return boxArray;  
  } // API가 보내준 결과에서 얼굴 위치를 뽑아내는 함수

  displayFacebox = (box) => {
    this.setState({box: box})
    console.log(this.state.box)
  } // 위 함수에서 내놓은 결과를 state 에 저장

  onInputChange = (event) => {
    this.setState({input: event.target.value})
  } // 얘는 검색창에 글자를 쓸때마다 input이라는 state를 업데이트

  clickDetect = () => {
    this.setState({url: this.state.input});
    app.models.predict(
      'd02b4508df58432fbb84e800597b8959',
      this.state.input)
    .then(response => this.displayFacebox(this.calculateFaceLocation(response))) // 커링 함수 !?
    .catch(err => console.log('error!', err))
  }

  onRouteChange = (route) => {
    if (route === 'signout') {
      this.setState({isSignedIn: false})
    } else if (route === 'home'){
      this.setState({isSignedIn: true})
    }
      this.setState({route: route});
  }

  render() {
    return(
      <div className='App'>
        <Navigation onRouteChange={this.onRouteChange} isSignedIn={this.state.isSignedIn}/>
        { this.state.route === 'home' 
        ? <div>
            <Logo /> 
            <Rank />
            <ImageLinkForm 
              onInputChange={this.onInputChange}
              clickDetect={this.clickDetect}/>
            <FaceRecognation box={this.state.box} url={this.state.url}/>
          </div>
        : (
          this.state.route === 'signin'
          ? <SignIn onRouteChange={this.onRouteChange}/> 
          : <Register onRouteChange={this.onRouteChange}/> 
        )
        }
        
        <Particles  className='particles' params={particleOptions}/>
      </div>
    )
  }
}

export default App;
