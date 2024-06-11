import React from 'react';

const WeatherForecast = ({ forecast }) => {
  return (
    <div>
      {forecast.map((day, index) => (
        <div key={index}>
          <h3>{day.date}</h3>
          <p>{day.temperature}°C</p>
          <p>{day.description}</p>
        </div>
      ))}
    </div>
  );
};

export default WeatherForecast;