window.addEventListener('load', () => {
    let long;
    let lat;
    let temperatureDescription = document.querySelector('.temperature-description');
    let temperatureDegree = document.querySelector('.temperature-degree');
    let locationTimezone = document.querySelector('.location-timezone');

    // The JavaScript navigator object is used for browser detection. It can be used to get browser information such as appName, appCodeName, userAgent etc. The navigator object is the window property, so it can be accessed by: window.
    if(navigator.geolocation){
        navigator.geolocation.getCurrentPosition(position => {
            long = position.coords.longitude;
            lat = position.coords.latitude;

            const proxy = 'https://cors-anywhere.herokuapp.com/';

            const locationApi = `http://dataservice.accuweather.com/locations/v1/cities/geoposition/search?apikey=EdRKRYKOTrLoDG6f6vKVuxXYxo3Sf2Vi&q=${lat},${long}`;

            fetch(locationApi)
            .then(response => {
                return response.json();
            })
            .then(locationData => {
                // console.log(locationData);
                const weatherApi = `${proxy}http://dataservice.accuweather.com/currentconditions/v1/${locationData.Key}?apikey=EdRKRYKOTrLoDG6f6vKVuxXYxo3Sf2Vi`;

                fetch(weatherApi)
                .then(response => {
                    return response.json();
                })
                .then(data => {
                    // console.log(data);
                    // Set Dom Elements from the API
                    temperatureDegree.textContent = data[0].Temperature.Metric.Value;
                    temperatureDescription.textContent = data[0].WeatherText;
                    locationTimezone.textContent = locationData.TimeZone.Name;

                    // setIcons(data[0].WeatherIcon, document.querySelector('.icons'));

                    var img = document.createElement('img'); 
                    img.src = `icons/${data[0].WeatherIcon}.png`; 
                    img.style.width = "120px";
                    img.classList.add('image');
                    document.getElementById('icon').appendChild(img); 
                });
            });
        });
    }
});