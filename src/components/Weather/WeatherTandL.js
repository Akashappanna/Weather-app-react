import React from "react";
import { formatToLocalTime } from "./WetherData";

const WeatherTandL = (props) => {
  const { dt, timezone, name, country } = props.weather;
  return (
    <React.Fragment>
      <div className="flex justify-center items-center py-5 text-xl" style={{}}>
        <p>{formatToLocalTime(dt, timezone)}</p>
      </div>
      <div className="flex flex-row justify-center items-center">
        <h3 className="text-2xl my-2">{`${name}, ${country}`}</h3>
      </div>
    </React.Fragment>
  );
};

export default WeatherTandL;
