import { DateTime } from "luxon";
import tzlookup from "tz-lookup";

const API_KEY = "5a0992f191448047033897314fc83957";
const BASE_URL = "https://api.openweathermap.org/data/2.5";

const getWeatherData = (infoType, searchParams) => {
  const url = new URL(BASE_URL + "/" + infoType);
  url.search = new URLSearchParams({ ...searchParams, appid: API_KEY });

  return fetch(url).then((res) => res.json());
};

const getFormattedWeatherData = async (searchParams) => {
  const formattedCurrentWeather = await getWeatherData(
    "weather",
    searchParams
  ).then(formatCurrentWeather);

  return formattedCurrentWeather;
};


const formatCurrentWeather = async (data) => {
  let {
    coord: { lon, lat },
    main: { temp, feels_like, temp_min, temp_max, humidity },
    name, 
    dt,
    sys: { country, sunrise, sunset },
    weather,
    wind: { speed },
  } = data;

  const { main: details, icon } = weather[0];

  // Use tz-lookup to get the timezone identifier based on coordinates
  const timezoneIdentifier = tzlookup(lat, lon);

  // Convert UTC sunrise and sunset to local time
  const localSunrise = formatToLocalTime(sunrise, timezoneIdentifier, "hh:mm a");
  const localSunset = formatToLocalTime(sunset, timezoneIdentifier, "hh:mm a");

  return {
    lat,
    lon,
    temp,
    feels_like,
    temp_min,
    temp_max,
    humidity,
    name,
    country,
    dt,
    localSunrise,
    localSunset,
    details,
    icon,
    speed,
    timezoneIdentifier
  };
};


const formatToLocalTime = (
  secs,
  zone,
  format = "cccc,dd LLL yyyy' | Local time:'hh:mm a") => DateTime.fromSeconds(secs).setZone(zone).toFormat(format);

const iconUrlFromCode = (code) => `http://openweathermap.org/img/wn/${code}@2x.png`;

export default getFormattedWeatherData;
export {formatToLocalTime, iconUrlFromCode};