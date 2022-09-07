async function getWeather(location){
    try{
    const info = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${location}&APPID=HIDE_KEY_`);    
    console.log(info)
    }catch (error) {
        console.log("Whoops! made an error", error)
    }
}

getWeather("London")