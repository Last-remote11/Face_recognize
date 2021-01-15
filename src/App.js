import './App.css';
import React, { Component } from 'react';
import Clarifai from 'clarifai';
import Navigation from './components/Navigation/Navigation';
import Logo from './components/Logo/Logo';
import ImageLinkForm from './components/ImageLinkForm/ImageLinkForm';
import Rank from './components/Rank/Rank';
import FaceRecognation from './components/FaceRecognation/FaceRecognation';
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
      }],
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
  }

  displayFacebox = (box) => {
    this.setState({box: box})
    console.log(this.state.box)
  }

  onInputChange = (event) => {
    this.setState({input: event.target.value})
  }

  clickDetect = () => {
    this.setState({url: this.state.input});
    app.models.predict(
      'd02b4508df58432fbb84e800597b8959',
      this.state.input)
    .then(response => this.displayFacebox(this.calculateFaceLocation(response))) // 커링 함수 !?
    .catch(err => console.log('error!', err))
  }

  render() {
    return(
      <div className='App'>
        <Navigation />
        <Logo />
        <Rank />
        <ImageLinkForm 
          onInputChange={this.onInputChange}
          clickDetect={this.clickDetect}/>
        <FaceRecognation box={this.state.box} url={this.state.url}/>
        <p>{this.state.result}</p>
        <Particles  className='particles' params={particleOptions}/>
      </div>
    )
  }
}

export default App;
