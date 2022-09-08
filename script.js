// Function that directs uses the OpenWeatherMap API
async function getWeather(location) {
    try {
        const info = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${location}&units=metric&APPID=fefaae1901088ebdb24add3e1679ecb0`, { mode: 'cors' })
        let convertedInfo = await info.json()
        console.log(convertedInfo)
        return convertedInfo
    } catch (error) {
        console.log("Whoops! made an error", error)
    }
}

locationWeather("London")

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
        document.getElementById('locationName').innerHTML = `${currentLocation.name}`
        document.getElementById('currentTemp').innerHTML = `${currentLocation.temperature}°C`        
        document.getElementById('weatherIcon').innerHTML = `Symbol here ${currentLocation.weatherIcon}`
        document.getElementById('weatherName').innerHTML = `${currentLocation.weatherName}`
        document.getElementById('humidity').innerHTML = `${currentLocation.humidity}%`
        document.getElementById('wind').innerHTML = `${currentLocation.wind * 3.6} KM/H`
        document.getElementById('tempMax').innerHTML = `${currentLocation.tempMax}°C`
        document.getElementById('tempMin').innerHTML = `${currentLocation.tempMin}°C`

    } catch {
        console.log("Failed to make an object")
    }



}

//Create function for users to search for requested location's weather

let form = document.querySelector('form')

form.addEventListener("submit", (e) => {
    e.preventDefault();
    console.log(searchBar.value)
    locationWeather(searchBar.value);
})

//Set the date
const date = new Date();
document.getElementById('date').innerHTML = date.toDateString()