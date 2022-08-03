import React from "react";

const WeatherTop = (props) => {
  const citys = [
    { id: "1", name: "Canada" },
    { id: "2", name: "new york" },
    { id: "3", name: "dubai" },
    { id: "4", name: "alaska" },
  ];

  const { setQuery } = props;
  const cityNameHandler = (data) => {
    setQuery({ q: data });
  };

  return (
    <div
      className="flex justify-around items-center m-6 p-5 border-white 
    border-2 shadow-lg rounded-3xl"
    >
      {citys.map((city, index) => (
        <React.Fragment key={city.id}>
          {index > 0 && <p>|</p>}
          <button
            type="button"
            className=" text-lg font-medium capitalize p-4
            border-2 shadow-lg hover:shadow-black  rounded-3xl"
            onClick={() => cityNameHandler(city.name)}
          >
            {city.name}
          </button>
        </React.Fragment>
      ))}
    </div>
  );
};

export default WeatherTop;
