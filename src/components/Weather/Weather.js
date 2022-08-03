import React, { useEffect, useState } from "react";
import Forecast from "./Forecast";
import Inputs from "./Inputs";
import TemperatureDetails from "./TemperatureDetails";
import WeatherTandL from "./WeatherTandL";
import WeatherTop from "./WeatherTop";
import getWeatherDetails, { formatToLocalTime } from "./WetherData";

// const geoLoc = () => {
//   if (navigator.geolocation) {
//     navigator.geolocation.getCurrentPosition((position) => {
//       let lat = position.coords.latitude;
//       let lon = position.coords.longitude;
//       return { lat, lon };
//     });
//   }
// };

const Weather = () => {
  const [query, setQuery] = useState();
  const [units, setUnits] = useState("metric");
  const [weather, setWeather] = useState(null);
  const [error, setError] = useState(null);

  let bgClassName = "day";
  const bgClass = () => {
    const localTime = formatToLocalTime(
      weather.dt,
      weather.timezone,
      "hh:mm a"
    );
    const sunset = formatToLocalTime(
      weather.sunset,
      weather.timezone,
      "hh:mm a"
    );
    const sunrise = formatToLocalTime(
      weather.sunrise,
      weather.timezone,
      "hh:mm a"
    );

    const sunriseSplit = sunrise.split("");
    const sunsetSplit = sunset.split("");
    const realTimeSplit = localTime.split("");
    let formatedTime = {
      realTime: {
        hour: parseInt(realTimeSplit[0] + realTimeSplit[1]),
        minute: parseInt(realTimeSplit[3] + realTimeSplit[4]),
        phase: realTimeSplit[6] + realTimeSplit[7],
      },
      sunrise: {
        hour: parseInt(sunriseSplit[0] + sunriseSplit[1]),
        minute: parseInt(sunriseSplit[3] + sunriseSplit[4]),
        phase: sunriseSplit[6] + sunriseSplit[7],
      },
      sunset: {
        hour: parseInt(sunsetSplit[0] + sunsetSplit[1]),
        minute: parseInt(sunsetSplit[3] + sunsetSplit[4]),
        phase: sunsetSplit[6] + sunsetSplit[7],
      },
    };

    if (
      formatedTime.realTime.hour >= formatedTime.sunrise.hour &&
      formatedTime.realTime.hour <= formatedTime.sunrise.hour + 1
    ) {
      if (formatedTime.realTime.phase === formatedTime.sunrise.phase) {
        return (bgClassName = "sunrise");
      }
    }

    if (
      formatedTime.realTime.hour >= formatedTime.sunset.hour &&
      formatedTime.realTime.hour <= formatedTime.sunset.hour + 1
    ) {
      if (formatedTime.realTime.phase === formatedTime.sunset.phase) {
        return (bgClassName = "sunset");
      }
    }

    if (formatedTime.realTime.hour >= formatedTime.sunset.hour + 1) {
      if (formatedTime.realTime.phase === formatedTime.sunset.phase) {
        if (weather.details === "Rain") {
          return (bgClassName = "rainy");
        } else if (weather.details === "Thunderstorm") {
          return (bgClassName = "thunderstrom-night");
        } else if (weather.details === "Drizzle") {
          return (bgClassName = "drizzle");
        } else if (weather.details === "Mist") {
          return (bgClassName = "mist");
        }
        return (bgClassName = "night");
      } else if (
        formatedTime.realTime.phase === formatedTime.sunrise.phase &&
        formatedTime.realTime.hour < formatedTime.sunrise.hour
      ) {
        if (weather.details === "Rain") {
          return (bgClassName = "rainy");
        } else if (weather.details === "Thunderstorm") {
          return (bgClassName = "thunderstrom-night");
        } else if (weather.details === "Drizzle") {
          return (bgClassName = "drizzle");
        } else if (weather.details === "Mist") {
          return (bgClassName = "mist");
        }
        return (bgClassName = "night");
      }
    }

    if (weather.details === "Clouds") {
      return (bgClassName = "clouds");
    } else if (weather.details === "Rain") {
      return (bgClassName = "rainy");
    } else if (weather.details === "Thunderstorm") {
      return (bgClassName = "thunderstrom");
    } else if (weather.details === "Drizzle") {
      return (bgClassName = "drizzle");
    } else if (weather.details === "Mist") {
      return (bgClassName = "mist");
    }
  };

  if (weather) {
    bgClass();
  }

  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition((position) => {
        let lat = position.coords.latitude;
        let lon = position.coords.longitude;

        setQuery({
          lat,
          lon,
        });
      });
    }
  }, []);

  useEffect(() => {
    const fetchWeather = async () => {
      if (query) {
        await getWeatherDetails({ ...query, units }).then((data) => {
          if (data.cod === "404") {
            setError(data);
            return;
          }
          data.units = units;
          setWeather(data);
          setError(null);
        });
      }
    };
    fetchWeather();
  }, [query, units]);

  return (
    <React.Fragment>
      <div className={`bg-img ${bgClassName}`}>
        <main className="py-5">
          <WeatherTop setQuery={setQuery} />
          <Inputs setQuery={setQuery} units={units} setUnits={setUnits} />
          {weather && error === null && (
            <React.Fragment>
              <WeatherTandL weather={weather} />
              <TemperatureDetails weather={weather} />
              <Forecast
                title="hourly forecast"
                items={weather.hourly}
                units={weather.units}
              />
              <Forecast
                title="daily forecast"
                items={weather.daily}
                units={weather.units}
              />
            </React.Fragment>
          )}
          {error && (
            <p
              className="flex flex-row justify-center items-center text-4xl text-white
          font-medium capitalize pb-80"
            >
              {error.message}
            </p>
          )}
        </main>
      </div>
    </React.Fragment>
  );
};

export default Weather;
