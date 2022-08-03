import React from "react";
import { iconTourl } from "./WetherData";

const Forecast = (props) => {
  const { title, items, units } = props;
  return (
    <div className="px-7">
      <div className="flex justify-start items-center mt-6">
        <p className="font-bold uppercase">{title}</p>
      </div>
      <hr className="my-2" style={{ borderColor: "inherit" }} />

      <div className="flex flex-row items-center justify-between">
        {items.map((item, index) => (
          <div
            className="flex flex-col items-center justify-center"
            key={index}
          >
            <p className="font-light text-sm">{item.title}</p>
            <img src={iconTourl(item.icon)} alt="weather" />
            <p className="font-medium">
              {item.temp.toFixed()} {units === "imperical" ? "°F" : "°C"}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Forecast;
