window.addEventListener('load', () => {
    let long;
    let lat;
    const temperatureDescription = document.querySelector('.temperature-description');
    const temperatureDegree = document.querySelector('.temperature-degree');
    const locationTimezone = document.querySelector('.location-timezone');
    const degreeSection = document.querySelector('.degree-section');
    const degreeSpan = document.querySelector('.degree-section span');

    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(position => {
            long = position.coords.longitude;
            lat =position.coords.latitude;
            const proxy = 'https://cors-anywhere.herokuapp.com/';
             fetch(`${proxy}https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${long}&units=imperial&appid=3e3da8c9d9415a2ef45d81c06a93a5f4`)
             .then(response => {
            return response.json();
        })  .then(data => {
            const {temp} = data.main;
            const {main} = data.weather[0];
            // Set DOM Element from the API

            temperatureDegree.textContent = temp;
            temperatureDescription.textContent = main;
            locationTimezone.textContent = data.name;
            // Change Icon

            iconImage = document.querySelector('.icon');
            const icon = data.weather[0].icon;
            iconImage.src = `http://openweathermap.org/img/wn/${icon}@2x.png`;
            // Change temperature to C/F
            let celsius = Math.floor((temp - 32) / 1.8);
            
            degreeSection.addEventListener('click', () => {
                if (degreeSpan.textContent === 'F') {
                    temperatureDegree.textContent = celsius;
                    degreeSpan.textContent = 'C';
                } else {
                    degreeSpan.textContent = 'F';
                    temperatureDegree.textContent = temp;
                }
            })

        })
        });
       
    }
});

