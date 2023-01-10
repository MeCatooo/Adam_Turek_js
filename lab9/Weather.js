
export class Weather {
    constructor(city, weatherData = undefined) {
        this.city = city;
        this.weatherData = weatherData;
        this.Weather = document.createElement("div");
        this.Weather.classList.add("Note");
        this.createDisplay();
        if (!this.weatherData || !this.hourlyData){
            this.fetchWeather();
            this.fetchWeatherHourly();
        }

        else{
            this.updateWeather();
            this.createHourlyDisplay();
        }
        this.updater();
    }

    fetchWeather() {
        const apiKey = "7b19818bf7f7fe6ea4116702e233011f";
        const metric = "metric";
        const url = `https://api.openweathermap.org/data/2.5/weather?q=${this.city},pl&appid=${apiKey}&units=${metric}`;
        fetch(url)
            .then(response => response.json())
            .then(data => {
                this.weatherData = data;
                console.log("Fetched weather data")
                this.updateWeather();
            });
    }

    fetchWeatherHourly() {
        const apiKey = "7b19818bf7f7fe6ea4116702e233011f";
        const metric = "metric";
        const url = `https://api.openweathermap.org/data/2.5/forecast?q=${this.city},pl&appid=${apiKey}&units=${metric}`;
        fetch(url)
            .then(response => response.json())
            .then(data => {
                this.hourlyData = data;
                console.log("Fetched hourly weather data")
                if(this.hourly)
                    this.hourly.remove();
                this.createHourlyDisplay();
            });
    }

    updateWeather() {
        this.cityName.textContent = this.city;
        this.temp.textContent = this.weatherData.main.temp + " °C";
        this.description.textContent = this.weatherData.weather[0].description;
        this.wind.textContent = this.weatherData.wind.speed + " m/s";
        this.icon.src = `http://openweathermap.org/img/w/${this.weatherData.weather[0].icon}.png`;
    }

    updater() {
        setInterval(() => {
            this.fetchWeather();
            this.fetchWeatherHourly();
            this.updateWeather();
        }, 1000 * 60 * 5);
    }

    createDisplay() {

        this.cityName = document.createElement("span");
        this.cityName.textContent = this.cityName;
        this.Weather.appendChild(this.cityName);

        this.temp = document.createElement("span");
        this.temp.textContent = "temp";
        this.Weather.appendChild(this.temp);

        this.description = document.createElement("span");
        this.description.textContent = "description";
        this.Weather.appendChild(this.description);

        this.wind = document.createElement("span");
        this.wind.textContent = "wind";
        this.Weather.appendChild(this.wind);

        this.icon = document.createElement("img");
        this.icon.src = "icon";
        this.icon.style.width = "50px";
        this.Weather.appendChild(this.icon);
    }

    createHourlyDisplay() {
        this.hourly = document.createElement("div");
        this.hourly.classList.add("hourly");
        this.Weather.appendChild(this.hourly);

        for (let i = 0; i < 4; i++) {
            const hour = document.createElement("div");
            hour.classList.add("hour");

            const hourTime = document.createElement("span");
            hourTime.textContent = new Date(this.hourlyData.list[i].dt * 1000).getHours() + ":00";
            hour.appendChild(hourTime);

            const hourTemp = document.createElement("span");
            hourTemp.textContent = this.hourlyData.list[i].main.temp + " °C";
            hour.appendChild(hourTemp);

            const hourIcon = document.createElement("img");
            hourIcon.src = `http://openweathermap.org/img/w/${this.hourlyData.list[i].weather[0].icon}.png`;
            hourIcon.style.width = "50px";
            hour.appendChild(hourIcon);

            this.hourly.appendChild(hour);
        }
    }

    jSON() {
        return {
            city: this.city,
            weatherData: this.weatherData
        };
    }

}
