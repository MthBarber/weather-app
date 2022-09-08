async function getWeather(location) {
    try {
        const info = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${location}&APPID=HIDE_KEY`, { mode: 'cors' })        
        let convertedInfo = await info.json()
        console.log(convertedInfo)
    } catch (error) {
        console.log("Whoops! made an error", error)
    }
}

getWeather("London")