import React from "react";
import { formatToLocalTime } from "../Services/weatherServices";

const TimeandLocation = ({weather: {dt, timezoneIdentifier, name, country}}) => {

  return (
    <div>
      <div className="flex items-center justify-center my-6">
        <p className="text-white text-xl font-extralight">
          {formatToLocalTime(dt, timezoneIdentifier)}
        </p>
      </div>
      <div className="flex items-center justify-center my-3">
        <p className="text-white text-3xl font-medium"> {`${name}, ${country}`} </p>
      </div>
    </div>
  );
};

export default TimeandLocation;
