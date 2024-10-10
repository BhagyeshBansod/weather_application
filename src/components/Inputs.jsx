import React, { useState } from "react";
import { UilSearch, UilLocationPoint } from "@iconscout/react-unicons";
import { toast } from "react-toastify";

const Inputs = ({ setQuery, units, setUnits }) => {
  const [city, setCity] = useState("");

  const handleSearchCity = () => {
    if (city !== "") setQuery({ q: city });
  };

  const handleLocation = () => {
    toast.info("Fetching users location");

    navigator.geolocation.getCurrentPosition((position) => {
      toast.success("Fetch successfully");
      let lat = position.coords.latitude;
      let lon = position.coords.longitude;

      setQuery({ lat, lon });
    });
  };

  const handleUnits = (e) => {
    const selectedUnit = e.currentTarget.name;
    if (units !== selectedUnit) setUnits(selectedUnit);
  };

  return (
    <div className="flex flex-row justify-center my-6">
      <div className="flex flex-row w-3/4 items-center justify-center space-x-4">
        <input
          value={city}
          type="text"
          className="text-xl font-light p-2 w-full shadow-xl focus:outline-none capitalize placeholder:lowercase"
          placeholder="search city"
          onChange={(e) => setCity(e.currentTarget.value)}
        />
        <UilSearch
          size={25}
          className="text-white cursor-pointer transition ease-out hover:scale-125"
          onClick={handleSearchCity}
        />
        <UilLocationPoint
          size={25}
          className="text-white cursor-pointer transition ease-out hover:scale-125"
          onClick={handleLocation}
        />
      </div>
      <div className="flex flex-row w-1/4 items-center justify-center">
        <button
          name="metric"
          className="text-white font-light transition ease-out hover:scale-125"
          onClick={handleUnits}
        >
          °C
        </button>
        <p className="text-xl text-white mx-2">|</p>
        <button
          name="imperial"
          className="text-white font-light transition ease-out hover:scale-125"
          onClick={handleUnits}
        >
          °F
        </button>
      </div>
    </div>
  );
};

export default Inputs;
