"use strict";
const api = {
  key: "132309cbe1cf078fba6ed0a2fa7b39cc",
  baseUrl: "https://api.openweathermap.org/data/2.5/",
};
const searchBox = document.querySelector(".search-box");
searchBox.addEventListener("keypress", setQuery);
function setQuery(e) {
  if (e.keyCode == 13) {
    getResult(searchBox.value);
    console.log(searchBox.value);
  }
}
function getResult(query) {
  fetch(`${api.baseUrl}weather?q=${query}&units=metric&APPID=${api.key}`)
    .then((weather) => {
      return weather.json();
    })
    .then(displayResults);
}
function displayResults(weather) {
  console.log(weather);

  let city = document.querySelector(".city");
  city.innerHTML = `${weather.name},${weather.sys.country}`;

  let now = new Date();
  let date = document.querySelector(".date");
  date.innerHTML = dateBuilder(now);

  let temp = document.querySelector(".temp");
  temp.innerHTML = `${Math.round(weather.main.temp)}°C`;

  let weatherEl = document.querySelector(".weather");
  weatherEl.innerHTML = weather.weather[0].main;

  let hilow = document.querySelector(".hi-low");
  hilow.innerHTML = `
  ${Math.round(weather.main.temp_min)}°C / ${Math.round(
    weather.main.temp_max
  )}°C`;
}
function dateBuilder(current) {
  let months = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "Nowember",
    "December",
  ];
  let days = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];
  let day = days[current.getDay()];
  let date = current.getDate();
  let month = months[current.getMonth()];
  let year = current.getFullYear();
  return `${day} ${date} ${month} ${year}`;
}
