import "./WeatherApp.css";

import React, { useState, useEffect } from 'react';

import WeatherDesc from "../Conditions/WeatherCon";



function WeatherApp() {
  const [cities, setCities] = useState([]);
  const [selectedCity, setSelectedCity] = useState('');
  const [weather, setWeather] = useState(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    fetchCities();
  }, []);

  const fetchCities = () => {
    fetch('http://localhost:8080/cities')
      .then(response => response.json())
      .then(data => setCities(data))
      .catch(error => console.error('Error fetching cities:', error));
  };

  const fetchWeather = (city) => {
    setLoading(true);
    fetch('http://localhost:8080/meteo', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded'
      },
      body: `city=${city}`
    })
      .then(response => response.json())
      .then(data => {
        setWeather(data);
        setLoading(false);
      })
      .catch(error => {
        console.error('Error fetching weather data:', error);
        setLoading(false);
      });
  };

  return (
    <div className="App">
      <h1>METEO APP</h1>

      <select onChange={e => setSelectedCity(e.target.value)} value={selectedCity}>
        <option value="">Select a city</option>
        {cities.map(city => (
          <option key={city} value={city}>{city}</option>
        ))}
      </select>
      <button onClick={() => fetchWeather(selectedCity)}>Get Weather</button>

      <div className="Weather-container">
        <div className="Content">
          <WeatherDesc weather={weather} loading={loading} />
        </div>
        <div className="MainContent">
          {weather && weather.current && weather.current.condition && (
            <div className="Box">
            <img
              src={weather.current.condition.icon}
              alt={weather.current.condition.text}
              style={{ height: 70, width: 70 }}
            />
            <div className="descTemp">
              <div className="city-country">
                <h3 className="cityName2">{weather.location.name}, {weather.location.country}</h3>,
                <h4 className="country1">.</h4>
              </div>
              <div className="tempdata">
                <h1 className="weatherTemp2">{weather.current.temp_c}</h1>
                <span className="unit">&deg;</span>
              </div>
            </div>
            <div className="variants">
              <div className="high-low">
                <div className="res">
                  <p className="tempmax">{weather.current.feelslike_c}</p>
                  <span>&deg;</span>
                </div>
              </div>
              <div className="desc-prop">
                <p className="property2">{weather.current.condition.text}</p>
              </div>
            </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default WeatherApp;
