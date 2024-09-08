import '../css/App.css';
import Search from '../componente/bara_de_search/bara_de_search';
import CurrentWeather from '../componente/vreme_curenta/vreme_curenta';
import Forecast from '../componente/procnoza/procnoza';
import {weather_api_url,weather_apy_key} from '../javascript/api';
import React, { useState } from 'react';
import ImageSearch from './schimba_backlground';
import Favourite from '../componente/buton_favorite/buton_favorite';

function App() {

  const[currentWeather,setCurrentWeather]=useState(null);
  const[forecast,setForecast]=useState(null);

  const OnSearchChangeVariable=(searchData)=>{

    const [lat,lon] =searchData.value.split(" ");

    const CurrentWeatherFetch=fetch(`${weather_api_url}/weather?lat=${lat}&lon=${lon}&appid=${weather_apy_key}&units=metric`);
   
    const FiveDaysForcastFetch=fetch(`${weather_api_url}/forecast?lat=${lat}&lon=${lon}&appid=${weather_apy_key}&units=metric`);
   

    Promise.all([CurrentWeatherFetch,FiveDaysForcastFetch])
    .then(async(response)=>{

     const weatherResponse = await response[0].json();
     const forecastResponse = await response[1].json();

     setCurrentWeather({city:searchData.label,...weatherResponse});
     setForecast({city:searchData.label,...forecastResponse});

    })

    .catch((err)=>console.log(err));
  }

    console.log(currentWeather);
    console.log(forecast);

  return (
    <>
    <div className="container_searchbar" id="root">
      <Search ChangeOnSearch={OnSearchChangeVariable} />
      <Favourite data={currentWeather}/>
      <ImageSearch data={currentWeather}/>
      {currentWeather && <CurrentWeather data={currentWeather}/>}
      {forecast && <Forecast data={forecast} />}
      
    </div>
    </>
  );
}

export default App;
