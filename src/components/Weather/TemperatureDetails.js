import React from "react";
import {
  UilTemperature,
  UilTear,
  UilWind,
  UilSun,
  UilSunset,
  UilArrowUp,
  UilArrowDown,
} from "@iconscout/react-unicons";

import { formatToLocalTime, iconTourl } from "./WetherData";

const TemperatureDetails = (props) => {
  const {
    icon,
    details,
    temp,
    temp_max,
    temp_min,
    feels_like,
    speed,
    humidity,
    sunrise,
    sunset,
    timezone,
    units,
  } = props.weather;

  return (
    <div className="flex flex-col py-5">
      <div className="flex flex-row justify-center items-center mb-4">
        <p>{details}</p>
      </div>
      <div className="flex justify-center items-center">
        <img src={iconTourl(icon)} alt="im" />
        <p className="p-16 mx-5 rounded-2xl bg-teal-50/50 text-4xl">
          {temp.toFixed()} {units === "imperical" ? "°F" : "°C"}
        </p>
        <div className="flex flex-col space-y-2 mx-5">
          <div className="flex font-light text-sm items-center justify-center">
            <UilTemperature className="mr-2" />
            Feels like :{" "}
            <span className="font-medium ml-2">
              {feels_like.toFixed()} {units === "imperical" ? "°F" : "°C"}
            </span>
          </div>
          <div className="flex font-light text-sm items-center justify-center">
            <UilTear className="mr-2" />
            Humidity : <span className="font-medium ml-2">{humidity}%</span>
          </div>
          {/* <div className="flex font-light text-sm items-center justify-center">
            pressure : <span className="font-medium ml-2">38°C</span>
          </div> */}
          <div className="flex font-light text-sm items-center justify-center">
            <UilWind className="mr-2" />
            Wind : <span className="font-medium ml-2">{speed}km/h</span>
          </div>
        </div>
      </div>

      <div className="flex  flex-row mt-2 justify-center space-x-2 text-sm items-center">
        <UilSun />

        <p className="font-light">
          Rise:
          <span className="font-light ml-3">
            {formatToLocalTime(sunrise, timezone, "hh:mm a")}
          </span>
        </p>
        <p className="font-light">|</p>

        <UilSunset />
        <p className="font-light">
          set:
          <span className="font-light ml-3">
            {formatToLocalTime(sunset, timezone, "hh:mm a")}
          </span>
        </p>
        <p className="font-light">|</p>

        <UilSun size={18} />
        <UilArrowUp />
        <p className="font-light">
          High:
          <span className="font-light ml-3">
            {temp_max.toFixed()} {units === "imperical" ? "°F" : "°C"}
          </span>
        </p>
        <p className="font-light">|</p>

        <UilSun size={18} />
        <UilArrowDown />
        <p className="font-light">
          Low:
          <span className="font-light ml-3">
            {temp_min.toFixed()} {units === "imperical" ? "°F" : "°C"}
          </span>
        </p>
      </div>
    </div>
  );
};

export default TemperatureDetails;
