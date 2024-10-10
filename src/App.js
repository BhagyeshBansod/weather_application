import { useEffect, useState } from "react";
import "./App.css";
import getFormattedWeatherData from "./Services/weatherServices";
// import Forecast from "./components/Forecast";
import Inputs from "./components/Inputs";
import TemperatureandDetail from "./components/TemperatureandDetail";
import TimeandLocation from "./components/TimeandLocation";
import TopButton from "./components/TopButton";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function App() {

  const currentPosition = async () => {
    toast.info("Fetching users location");

      navigator.geolocation.getCurrentPosition((position) => {
      toast.success("Fetch successfully");
      let lat = position.coords.latitude;
      let lon = position.coords.longitude;

      setQuery({ lat, lon });
    });
  };

  const [query, setQuery] = useState(currentPosition);
  const [units, setUnits] = useState("metric");
  const [weather, setWeather] = useState('');

  useEffect(() => {
    const fetchWeather = async () => {
      
      await getFormattedWeatherData({ ...query, units }).then((data) => {
        toast.info(`Fetching weather for ${data.name}, ${data.country} `);
        toast.success(
          `Successfully fetched weather for ${data.name}, ${data.country} `
        );
        setWeather(data);
      });
    };

    fetchWeather();
  }, [query, units]);

  const formatBackground = () => {
    let weatherCondition = weather.details;
    if(!weatherCondition) return "from-cyan-300 to-blue-300"
    return weatherCondition;
  };

  return (
    <div
      className={`mx-auto max-w-screen-md mt-4 py-5 px-32 bg-gradient-to-br h-fit shadow-xl shadow-gray-400 ${formatBackground()}`}
    >
      <TopButton setQuery={setQuery} />
      <Inputs setQuery={setQuery} units={units} setUnits={setUnits} />
      {weather && (
        <>
          <TimeandLocation weather={weather} />
          <TemperatureandDetail weather={weather} />
          {/* <Forecast title={"Hourly Forecast"} items ={weather.hourly} />
      <Forecast title={"Daily Forecast"} items={weather.daily}/> */}
        </>
      )}

      <ToastContainer autoClose={5000} theme="colored" newestOnTop={true} />
    </div>
  );
}

export default App;