import React, { useState } from 'react';
import './App.css'; // Ensure this import is present

const App = () => {
  const [location, setLocation] = useState('');
  const [forecast, setForecast] = useState([]);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  const fetchWeatherData = async (loc) => {
    try {
      setLoading(true);
      setError(null);
      const response = await fetch(`https://api.openweathermap.org/data/2.5/forecast?q=${loc}&units=metric&appid=8f422e277e6a09fdcc35acec5f9cde13`);
      if (!response.ok) {
        throw new Error('Failed to fetch weather data');
      }
      const data = await response.json();
      console.log(data); // Log the API response to inspect its structure

      if (data.list) {
        const forecastData = data.list.slice(0, 5).map(item => ({
          date: item.dt_txt,
          temperature: item.main.temp,
          description: item.weather[0].description
        }));
        setForecast(forecastData);
      } else {
        console.error('Error: "list" property is undefined in the API response');
        setError('Weather data is unavailable');
      }
    } catch (error) {
      console.error('Error fetching weather data:', error.message);
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (location) {
      fetchWeatherData(location);
    }
  };

  return (
    <div className="container">
      <form onSubmit={handleSubmit}>
        <input 
          type="text"
          value={location}
          onChange={(e) => setLocation(e.target.value)}
          placeholder="Enter location"
        />
        <button type="submit">Get Forecast</button>
      </form>
      {loading && <p>Loading...</p>}
      {error && <p>Error: {error}</p>}
      {forecast.length > 0 && (
        <ul>
          {forecast.map((item, index) => (
            <li key={index}>
              <p>Date: {item.date}</p>
              <p>Temperature: {item.temperature}°C</p>
              <p>Description: {item.description}</p>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default App;