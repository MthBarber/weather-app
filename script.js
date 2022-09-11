// Function that directs uses the OpenWeatherMap API to get current weather
async function getWeather(location) {
    try {
        const info = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${location}&units=metric&APPID=fefaae1901088ebdb24add3e1679ecb0`, { mode: 'cors' })
        let convertedInfo = await info.json()        
        return convertedInfo
    } catch (error) {
        console.log("Whoops! made an error", error)
    }
}

//load info for London on page open
locationWeather("London")
getForecast("london")

//Function that calls getWeather and stores the result in an object to be converted onto the html page
async function locationWeather(location) {
    try {
        let locationName = await getWeather(location);
        let currentLocation = {
            humidity: locationName.main.humidity,
            name: locationName.name,
            temperature: locationName.main.temp,
            tempMax: locationName.main.temp_max,
            tempMin: locationName.main.temp_min,
            time: locationName.timezone,
            weatherDescription: locationName.weather[0].description,
            weatherIcon: locationName.weather[0].icon,
            weatherName: locationName.weather[0].main,
            wind: locationName.wind.speed,
        }
        //renders above object to corresponding HMTL fields
        document.getElementById('locationName').innerHTML = ` ${currentLocation.name}`
        document.getElementById('currentTemp').innerHTML = ` ${currentLocation.temperature}°C`        
        document.getElementById('weatherIcon').src = `http://openweathermap.org/img/wn/${currentLocation.weatherIcon}@2x.png`
        document.getElementById('weatherName').innerHTML = ` ${currentLocation.weatherName}`
        document.getElementById('humidity').innerHTML = ` ${currentLocation.humidity}%`
        document.getElementById('wind').innerHTML = ` ${(currentLocation.wind * 3.6).toFixed(2)} KM/H`
        document.getElementById('tempMax').innerHTML = ` ${currentLocation.tempMax}°C`
        document.getElementById('tempMin').innerHTML = ` ${currentLocation.tempMin}°C`

    } catch {
        console.log("Failed to make an object")
    }



}

//Add eventlistener to form for users to search for requested location's weather

let form = document.querySelector('form')

form.addEventListener("submit", (e) => {
    e.preventDefault();
    console.log(searchBar.value)
    locationWeather(searchBar.value);
    getForecast(searchBar.value);
})

document.getElementById('search-button').addEventListener("click", (e) => {
    e.preventDefault();
    console.log(searchBar.value)
    locationWeather(searchBar.value);
    getForecast(searchBar.value);
})

//Set the date
const date = new Date();
document.getElementById('date').innerHTML = date.toDateString()

async function getForecast(location) {
    try {
        const info = await fetch(`https://api.openweathermap.org/data/2.5/forecast?q=${location}&units=metric&APPID=fefaae1901088ebdb24add3e1679ecb0`, { mode: 'cors' })
        let convertedInfo = await info.json()
        
        //clear existing HTML elements before adding new
        let forecastDiv = document.getElementById('forecastDiv')
        while (forecastDiv.firstChild){            
            forecastDiv.removeChild(forecastDiv.firstChild)
        }
        for (let i = 0; i <= 40; i+=8){           
            
            const div = document.createElement('div');
            div.className = "forecast"            
            document.getElementById('forecastDiv').appendChild(div)
            const day = document.createElement('p');
            let date = new Date(convertedInfo.list[i].dt_txt)
            date = date.toDateString().slice(0,10)
            day.innerHTML = date
            day.id="date"
            div.appendChild(day)
            const tempHigh = document.createElement('p')
            tempHigh.innerHTML = `High: ${convertedInfo.list[i].main.temp_max}°C`
            tempHigh.id = "temp-high"
            div.appendChild(tempHigh)
            const tempLow = document.createElement('p')
            tempLow.innerHTML = `Low: ${convertedInfo.list[i].main.temp_min}°C`
            tempLow.id = "temp-low"
            div.appendChild(tempLow)
            const weatherIcon = document.createElement('img')
            weatherIcon.src = `http://openweathermap.org/img/wn/${convertedInfo.list[i].weather[0].icon}@2x.png`
            div.appendChild(weatherIcon)
        }
        return convertedInfo
    } catch (error) {
        console.log("Whoops! made an error", error)
    }
}



