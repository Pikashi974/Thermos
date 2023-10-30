const options = {
  enableHighAccuracy: true,
  timeout: 10000,
  maximumAge: 0,
};

let crd;

async function init() {
  navigator.geolocation.getCurrentPosition(success, error, options);
  if (crd) {
    await getThermos(crd.latitude, crd.longitude);
  }
}

init();

async function getThermos(latitude, longitude) {
  var object = await fetch(
    "https://weather.contrateumdev.com.br/api/weather?lat=" +
      latitude +
      "&lon=" +
      longitude
  ).then((response) => {
    return response.json();
  });
  document.querySelector(".card-title").innerHTML = object.main.temp
    ? object.main.temp + "°C"
    : "Erreur, géolocalisation impossible";
  console.log(object);
}

function success(pos) {
  crd = pos.coords;
}

function error(err) {
  console.warn(`ERROR(${err.code}): ${err.message}`);
}
