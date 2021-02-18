window.addEventListener('load', () => {
    let long;
    let lat;
    const temperatureDescription = document.querySelector('.temperature-description');
    const temperatureDegree = document.querySelector('.temperature-degree');
    const locationTimezone = document.querySelector('.location-timezone');

    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(position => {
            long = position.coords.longitude;
            lat =position.coords.latitude;
            const proxy = 'https://cors-anywhere.herokuapp.com/';
             fetch(`${proxy}https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${long}&appid=3e3da8c9d9415a2ef45d81c06a93a5f4`)
             .then(response => {
            return response.json();
        })  .then(data => {
            console.log(data)
            const {temp} = data.main;
            const {main} = data.weather[0];
            // Set DOM Element from the API

            temperatureDegree.textContent = temp;
            temperatureDescription.textContent = main;
            locationTimezone.textContent = data.name;
            
            const changeIcon = (iconImage, id, icon) => {
                iconImage = document.querySelector('.icon');
                icon = data.weather[0].icon;
                console.log(iconImage);
                console.log(icon);
            }
        })
        });
       
    }
});

// api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid={3e3da8c9d9415a2ef45d81c06a93a5f4}