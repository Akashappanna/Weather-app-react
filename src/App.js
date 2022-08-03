import React, { useEffect, useState } from "react";
import Weather from "./components/Weather/Weather";
import "./App.css";
import UilReact from "@iconscout/react-unicons/icons/uil-react";

function App() {
  // const api = {
  //   key: "fbb3e1c5f055ed0fcc776e16bedb3d73",
  //   base: "https://api.openweathermap.org/data/2.5/",
  // };

  return (
    <React.Fragment>
      <Weather />
    </React.Fragment>
  );
}

export default App;
