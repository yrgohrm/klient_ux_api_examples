// NB! This code is not very good by design
// it should not be too copy-paste friendly =)

const BASE_URL = "https://opendata-download-metfcst.smhi.se/api";

const cities = [
  { name: "Göteborg", lng: 16.158, lat: 58.5812 },
  { name: "Helsingborg", lng: 12.68, lat: 56.04 },
  { name: "Jönköping", lng: 14.17, lat: 57.78 },
  { name: "Linköping", lng: 15.67, lat: 58.38 },
  { name: "Malmö", lng: 13.00073, lat: 55.60587 },
  { name: "Stockholm", lng: 18.0649, lat: 59.33258 },
  { name: "Uppsala", lng: 17.7, lat: 59.87 },
  { name: "Västerås", lng: 16.55, lat: 59.6 },
  { name: "Örebro", lng: 15.18, lat: 59.28 },
];

/*
Using information from the documentation at:
https://opendata.smhi.se/apidocs/metfcst/get-forecast.html
https://opendata.smhi.se/apidocs/metfcst/parameters.html
*/
async function updateWeatherData() {
  for (const { name, lng, lat } of cities) {
    const url = `${BASE_URL}/category/pmp3g/version/2/geotype/point/lon/${lng}/lat/${lat}/data.json`;
    const response = await fetch(url);
    const forecast = await response.json();
    const { lowest, highest } = findHighAndLowTemp(forecast);
    addForecast(name, lowest, highest);
  }
}

function addForecast(name, lowest, highest) {
  const nameDiv = document.createElement("div");
  const lowDiv = document.createElement("div");
  const highDiv = document.createElement("div");
  nameDiv.innerText = name;
  lowDiv.innerText = lowest;
  highDiv.innerText = highest;

  const forecast = document.getElementById("forecast");
  forecast.append(nameDiv);
  forecast.append(lowDiv);
  forecast.append(highDiv);
}

function findHighAndLowTemp(forecast) {
  let highest = -1000;
  let lowest = 1000;
  for (const hourlyData of forecast.timeSeries) {
    const temp = findTemperature(hourlyData.parameters);
    if (temp > highest) {
      highest = temp;
    }
    if (temp < lowest) {
      lowest = temp;
    }
  }
  return { lowest, highest };
}

function findTemperature(parameters) {
  for (const param of parameters) {
    if (param.name === "t") {
      return param.values[0];
    }
  }

  throw new Error("unable to find parameter for temperature");
}

updateWeatherData();
