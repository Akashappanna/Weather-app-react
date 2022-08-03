import { DateTime } from "luxon";

const api = {
  key: process.env.REACT_APP_WEATHER_API,
  base: "https://api.openweathermap.org/data/2.5/",
};

//   https://api.openweathermap.org/data/2.5/onecall?lat={lat}&lon={lon}&exclude={part}&appid={API key}

const getWeatherData = (infoType, searchParams) => {
  const url = new URL(api.base + infoType);
  url.search = new URLSearchParams({ ...searchParams, appid: api.key });
  return fetch(url).then((res) => res.json());
};

const formatCurrentWeather = (data) => {
  const {
    coord: { lon, lat },
    main: { temp, feels_like, temp_min, temp_max, humidity },
    dt,
    name,
    weather,
    sys: { country, sunrise, sunset },
    wind: { speed },
  } = data;

  const { main: details, icon } = weather[0];

  return {
    lon,
    lat,
    temp,
    feels_like,
    temp_min,
    temp_max,
    humidity,
    dt,
    name,
    details,
    icon,
    country,
    sunrise,
    sunset,
    speed,
  };
};

const forecastWeather = (data) => {
  let { timezone, hourly, daily } = data;

  daily = daily.slice(1, 6).map((d) => {
    return {
      title: formatToLocalTime(d.dt, timezone, "cccc"),
      temp: d.temp.day,
      icon: d.weather[0].icon,
    };
  });

  hourly = hourly.slice(1, 6).map((d) => {
    return {
      title: formatToLocalTime(d.dt, timezone, "hh:mm a"),
      temp: d.temp,
      icon: d.weather[0].icon,
    };
  });

  return { timezone, daily, hourly };
};

const getWeatherDetails = async (searchParams) => {
  const fetchedData = await getWeatherData("weather", { ...searchParams }).then(
    (data) => {
      if (data.cod === "404") {
        return data;
      }
      return formatCurrentWeather(data);
    }
  );

  if (fetchedData.cod === "404") {
    return fetchedData;
  }

  const { lat, lon } = fetchedData;

  const fetchForecastData = await getWeatherData("onecall", {
    lat,
    lon,
    exclude: "current,minutely,alerts",
    units: searchParams.units,
  }).then((data) => forecastWeather(data));

  return { ...fetchedData, ...fetchForecastData };
};

const formatToLocalTime = (
  secs,
  zone,
  format = "cccc, dd LLL yyyy' | Local time : 'hh:mm a"
) => DateTime.fromSeconds(secs).setZone(zone).toFormat(format);

const iconTourl = (code) => ` http://openweathermap.org/img/wn/${code}@2x.png`;

export { formatToLocalTime, iconTourl };
export default getWeatherDetails;
