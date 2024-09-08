import "../../css/vreme_curenta.css";
import React, { useState, useEffect } from "react";

const Loader = () => (
  <div className="loader-container">
    <div className="loader"></div>
  </div>
);

const CurrentWeather = ({ data, isLoading }) => {
  const [showLoader, setShowLoader] = useState(true);

  useEffect(() => {
    setShowLoader(true);

    const delayTimeout = setTimeout(() => {
      setShowLoader(false);
    }, 1000);

    return () => clearTimeout(delayTimeout);
  }, [data]); 

  return (
    <div className="container">
      {showLoader && <Loader />}

      {!showLoader && (
        <div className="grade">
          <div>
            <p className="temperatura">{Math.round(data.main.temp)}°C</p>
          </div>

          <img
            alt="weather"
            className="weather-icon"
            src={`assets/${data.weather[0].icon}.png`}
          ></img>

          <div>
            <p className="oras"> {data.city}</p>
            <p className="stare">{data.weather[0].description}</p>
          </div>
        </div>
      )}

      {!showLoader && (
        <div className="detalii1">
          <div>
            <p> Se resimt ca: {Math.round(data.main.feels_like)}°C</p>
          </div>

          <div>
            <p> Vant: {data.wind.speed}m/s</p>
          </div>
        </div>
      )}

      {!showLoader && (
        <div className="detalii2">
          <div>
            <p> Umiditate: {data.main.humidity}%</p>
          </div>

          <div>
            <p> Presiune: {data.main.pressure} hPa</p>
          </div>
        </div>
      )}
    </div>
  );
};

export default CurrentWeather;
