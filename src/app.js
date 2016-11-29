import React, { Component } from 'react'
import ReactDOM from 'react-dom'
import Map from './components/Map'
import Places from './components/Places'
import superagent from 'superagent'

class App extends Component {
  state = {
    location: {
      lat: 40.75,
      lng: -73.98
    },
    venues: []
  }

  updateVenuesLocation = (location) => {
    console.log('!!!!!!!!!!');

    const url = `https://api.foursquare.com/v2/venues/search?v=20140806&ll=${location.lat},${location.lng}&client_id=CBROHXBO3ZY5CU4LY1VQZN3YIIEKY4QFPIUJINCWFG5NZ2ZV&client_secret=NX5CFQKTGVPGLJPDUU2IOSHVFB5NGRHXCRKJDLX2MJOBV3V5`

      superagent
      .get(url)
      .query(null)
      .set('Accept', 'text/json')
      .end((error, response) => {

        let venues = response.body.response.venues
        console.log('*********')
        this.setState({
          location: {
            lat: location.lat,
            lng: location.lng
          },
          venues: venues
        })

  })
}

  componentDidMount() {

    window.navigator.geolocation.getCurrentPosition((position) => {
      
      this.setState({ location: {
          lat: position.coords.latitude,
          lng: position.coords.longitude
        }
      })
    });

  let url = `https://api.foursquare.com/v2/venues/search?v=20140806&ll=${this.state.location.lat},${this.state.location.lng}&client_id=CBROHXBO3ZY5CU4LY1VQZN3YIIEKY4QFPIUJINCWFG5NZ2ZV&client_secret=NX5CFQKTGVPGLJPDUU2IOSHVFB5NGRHXCRKJDLX2MJOBV3V5`

    superagent
    .get(url)
    .query(null)
    .set('Accept', 'text/json')
    .end((error, response) => {

      let venues = response.body.response.venues
      this.setState({
        venues: venues
      })

    })
  }


  render() {

    console.log(this.state)
    return (
      <div>
        Meetup Tonight
        <div style={{width:300, height:600, background:'red'}}>
          <Map
            center={this.state.location}
            markers={this.state.venues}
            on_Center_Changed={this.updateVenuesLocation}
          />
        </div>

        <Places venues={this.state.venues}/>
      </div>
    )
  }
}

ReactDOM.render(<App />, document.getElementById('app'))
