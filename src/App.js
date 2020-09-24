import React from 'react';
import './App.css';
import Form from "./components/form.jsx";
import Weather from "./components/weather.jsx";
import "bootstrap/dist/css/bootstrap.min.css";
import "weather-icons/css/weather-icons.css";


class App extends React.Component {
  constructor() {
    super();
    this.state = {
      city: undefined,
      country: undefined,
      list: undefined,
      dayOne: {
        celcius: undefined, 
        temp_max: undefined, 
        temp_min: undefined, 
        description: undefined, 
        date: undefined, 
        icon: undefined},
      dayTwo:{ 
        temp_max: undefined, 
        temp_min: undefined, 
        description: undefined, 
        date: undefined, 
        icon: undefined},
      dayThree: { 
        temp_max: undefined, 
        temp_min: undefined, 
        description: undefined, 
        date: undefined, 
        icon: undefined},
      dayFour: {
        temp_max: undefined, 
        temp_min: undefined, 
        description: undefined, 
        date: undefined, 
        icon: undefined},
      dayFive: {
        temp_max: undefined, 
        temp_min: undefined, 
        description: undefined, 
        date: undefined, 
        icon: undefined},
        icon: [],
      error: false
    };

    this.weatherIcon = {
      Thunderstorm: "wi-thunderstorm",
      Drizzle: "wi-sleet",
      Rain: "wi-storm-showers",
      Snow: "wi-snow",
      Atmosphere: "wi-fog",
      Clear: "wi-day-sunny",
      Clouds: "wi-day-fog"
    };
  }

  get_WeatherIcon(icons, rangeId) {
    switch (true) {
      case rangeId >= 200 && rangeId < 232:
        this.setState({ icon : icons.Thunderstorm });
        break;
      case rangeId >= 300 && rangeId <= 321:
        this.setState({ icon : icons.Drizzle });
        break;
      case rangeId >= 500 && rangeId <= 521:
        this.setState({ icon : icons.Rain });
        break;
      case rangeId >= 600 && rangeId <= 622:
        this.setState({ icon : icons.Snow });
        break;
      case rangeId >= 701 && rangeId <= 781:
        this.setState({ icon : icons.Atmosphere });
        break;
      case rangeId === 800:
        this.setState({ icon : icons.Clear });
        break;
      case rangeId >= 801 && rangeId <= 804:
        this.setState({  icon : icons.Clouds });
        break;
      default:
        this.setState({ icon : icons.Clouds }     );
    }
  }

  calCelsius(temp) {
    let celcius = Math.floor(temp - 273.15);
    return celcius;
  }

  getWeather = async e =>{
    e.preventDefault();
    let country = e.target.elements.country.value;
    let city = e.target.elements.city.value;
    const API_KEY = '011f6eb7ebefd69ce4ffe00e63c79cc6'
    const URL = "http://api.openweathermap.org/data/2.5/forecast";
    const FULL_URL = `${URL}?q=${city},${country}&appid=${API_KEY}`;
    const weatherPromise  = await fetch(FULL_URL);
    const response = await weatherPromise.json();
    if (city && country && response) {
      this.setState({
        city: `${city}, ${country}`,
        country: response.country,
        list: response[4],
        dayOne: {
          celsius: this.calCelsius(response.list[0].main.temp),
          temp_max: this.calCelsius(response.list[0].main.temp_max),
          temp_min: this.calCelsius(response.list[0].main.temp_min),
          description: response.list[0].weather[0].description.charAt(0).toUpperCase()+ 
            response.list[0].weather[0].description.slice(1),
          date: response.list[0].dt_txt,
        },
        dayTwo: {
          temp_max: this.calCelsius(response.list[6].main.temp_max),
          temp_min: this.calCelsius(response.list[6].main.temp_min),
          description: response.list[6].weather[0].description.charAt(0).toUpperCase()+ 
            response.list[6].weather[0].description.slice(1),
          date: response.list[6].dt_txt,
        },
        dayThree:{
          temp_max: this.calCelsius(response.list[14].main.temp_max),
          temp_min: this.calCelsius(response.list[14].main.temp_min),
          description: response.list[14].weather[0].description.charAt(0).toUpperCase()+ 
            response.list[14].weather[0].description.slice(1),
          date: response.list[14].dt_txt,
        },
        dayFour: {
          temp_max: this.calCelsius(response.list[22].main.temp_max),
          temp_min: this.calCelsius(response.list[22].main.temp_min),
          description: response.list[22].weather[0].description.charAt(0).toUpperCase()+ 
            response.list[22].weather[0].description.slice(1),
          date: response.list[22].dt_txt,
        },
        dayFive:{
          temp_max: this.calCelsius(response.list[38].main.temp_max),
          temp_min: this.calCelsius(response.list[38].main.temp_min),
          description: response.list[38].weather[0].description.charAt(0).toUpperCase()+ 
            response.list[38].weather[0].description.slice(1),
          date: response.list[38].dt_txt,
        },
        error: false
      });

      this.get_WeatherIcon(this.weatherIcon, response.list[1].weather[0].id);
      //console.log(iconOne);
    }
    else {
      this.setState({
        error: true
      });
    }
}
  
 render(){
  return (
    <div className="App">
      <Form loadweather={this.getWeather} error={this.state.error}/>
        <Weather
          cityname={this.state.city}
          icon={this.state.icon}
          dayOne={this.state.dayOne}
          dayTwo={this.state.dayTwo}
          dayThree={this.state.dayThree}
          dayFour={this.state.dayFour}
          dayFive={this.state.dayFive}
        />
      
    </div>
  );
  }
}

export default App;
