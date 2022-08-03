import React, { useState } from "react";
import { RiSearch2Line } from "react-icons/ri";
import { TiLocation } from "react-icons/ti";

const Inputs = (props) => {
  const [city, setCity] = useState("");
  const { setQuery, setUnits, units } = props;

  const cityHandler = (e) => {
    setCity(e.target.value);
  };

  const search = (e) => {
    if (e.key === "Enter") {
      setQuery({ q: city });
      setCity("");
    }
  };

  const userLocationHandler = () => {
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
  };

  const unitsHandler = (e) => {
    const selectedUnits = e.target.name;
    if (selectedUnits !== units) {
      setUnits(selectedUnits);
    }
  };

  return (
    <div
      //   className="flex flex-row justify-around  items-center my-6 m-6 p-5 border-white
      // border-2 shadow-lg hover:shadow-cyan-700  rounded-3xl"

      className="flex flex-row justify-around  items-center my-6 m-6 p-5 rounded-3xl"
    >
      <div className="flex flex-row w-1/2 justify-center items-center">
        <div className="flex flex-row justify-around w-3/4 items-center">
          <RiSearch2Line className="w-1/5" />
          <input
            type="text"
            value={city}
            className="p-4 text-xl text-black font-light w-full
        shadow-xl focus:outline-none rounded-2xl first-letter:capitalize focus:shadow-stone-600"
            placeholder="Search for city..."
            onChange={cityHandler}
            onKeyPress={search}
          />
        </div>
        <TiLocation
          className="w-1/5 cursor-pointer transition ease-out
           hover:scale-150"
          onClick={userLocationHandler}
        />
      </div>

      <div className="flex flex-row justify-center space-x-2 text-sm items-center">
        <button
          type="button"
          name="metric"
          className="text-xl transition ease-out hover:scale-125"
          onClick={unitsHandler}
        >
          °C{" "}
        </button>
        <p className="w-4"> | </p>
        <button
          type="button"
          name="imperical"
          className="text-xl transition ease-out hover:scale-125"
          onClick={unitsHandler}
        >
          {" "}
          °F
        </button>
      </div>
    </div>
  );
};

export default Inputs;
