import React, { Component } from 'react';
import "./App.css";

//import "bootstrap/dist/css/bootstrap.css";
import "bootswatch/superhero/bootstrap.css";
import { Navbar, NavItem, Nav, Grid, Row, Col } from "react-bootstrap";

const PLACES = [
  {name: "Helsinki", id: "FI"},
  {name: "Turku", id: "FI"},
  {name: "Tampere", id: "FI"},
  {name: "Jyväskylä", id: "FI"},
  {name: "Oulu", id: "FI"},
  {name: "Stockholm", id: "SE"},
  {name: "London", id: "GB"},
  {name: "New York", id: "US"},
  {name: "Singapore", id: "SG"},
];

class WeatherDisplay extends Component {
  constructor() {
    super();
    this.state = {
      weatherData: null,
    };
  }
  componentDidMount() {
    const name = this.props.name;
    const id = this.props.id;
    const URL = "http://api.openweathermap.org/data/2.5/weather?q=" +
    name + "," + id +
    "&appid=b1b35bba8b434a28a0be2a3e1071ae5b&units=metric";
    fetch(URL).then(res => res.json()).then(json => {
      this.setState({ weatherData: json });
    });
  }
  render() {
    const weatherData = this.state.weatherData;
    if(!weatherData) return <div>Loading</div>;
    const weather = weatherData.weather[0];
    const iconUrl = "http://openweathermap.org/img/w/" + weather.icon + ".png";
    return (
      <div>
        <h1>
          {weather.main} in {weatherData.name}
          <img src={iconUrl} alt={weatherData.description} />
        </h1>
        <p>Current: {weatherData.main.temp}°C</p>
        <p>High: {weatherData.main.temp_max}°C</p>
        <p>Low: {weatherData.main.temp_min}°C</p>
        <p>Wind Speed: {weatherData.wind.speed} m/s</p>
      </div>
    );
  }
}

class App extends Component {
  constructor() {
    super();
    this.state = {
      activePlace: 0,
    };
  }
  render() {
    const activePlace = this.state.activePlace;
    return(
      <div>
        <Navbar>
          <Navbar.Header>
            <Navbar.Brand>
              Simple Weather App
            </Navbar.Brand>
          </Navbar.Header>
        </Navbar>
        <Grid>
          <Row>
            <Col md={4} sm={4}>
              <h3>Select a city</h3>
                <Nav
                  bsStyle="pills"
                  stacked
                  activeKey={activePlace}
                  onSelect={index => {
                    this.setState({ activePlace: index });
                  }}
                >
                {PLACES.map((place, index) => (
                  <NavItem key={index} eventKey={index}>{place.name}</NavItem>
                ))}
              </Nav>
            </Col>
            <Col md={8} sm={8}>
              <WeatherDisplay key={activePlace} name={PLACES[activePlace].name} id={PLACES[activePlace].id} />
            </Col>
          </Row>
        </Grid>
      </div>
    );
  }
}

export default App;
