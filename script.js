// Function that directs uses the OpenWeatherMap API
async function getWeather(location) {
    try {
        const info = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${location}&units=metric&APPID=HIDE_KEY`, { mode: 'cors' })        
        let convertedInfo = await info.json()
        console.log(convertedInfo)
        return convertedInfo
    } catch (error) {
        console.log("Whoops! made an error", error)
    }
}

locationWeather("London")

//Function that calls getWeather and stores the result in an object to be converted onto the html page
async function locationWeather(location){
    let locationName = await getWeather(location);
    let currentLocation = {
        humidity : locationName.main.humidity,
        name : locationName.name,
        temperature : locationName.main.temp,
        tempMax : locationName.main.temp_max,
        tempMin : locationName.main.temp_min,
        time : locationName.timezone,
        weatherDescription: locationName.weather[0].description,
        weatherIcon : locationName.weather[0].icon,
        weatherName: locationName.weather[0].main,        
        wind: locationName.wind.speed,
    }
    console.log("Current temperature is", currentLocation.temperature)
    console.table(currentLocation)
}