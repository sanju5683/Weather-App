
// _________________function for weather icons_________________

function getWeatherIconNight(condition) {
  if (condition.toLowerCase().includes("clear")  ||condition.toLowerCase().includes("sunny")) {
    return "wi wi-night-clear"
  }
  else if (condition.toLowerCase().includes("mist") || condition.toLowerCase().includes("fog")){
    return "wi wi-night-fog"
  }
  else if (condition.toLowerCase().includes("thunder")) {
    return "wi wi-night-alt-thunderstorm"
  }
  else if  (condition.toLowerCase().includes("cloud")|| condition.toLowerCase().includes("overcast")) {
    return "wi wi-night-alt-cloudy"
  }
  else if (condition.toLowerCase().includes("rain")) {
    return "wi wi-night-alt-rain"
  }
  else if (condition.toLowerCase().includes("sleet")) {
    return "wi wi-night-alt-sleet"
  }
  else if (condition.toLowerCase().includes("snow")|| condition.toLowerCase().includes("ice")){
    return "wi wi-night-alt-snow"
  }
else if (condition.toLowerCase().includes("drizzle")) {
    return "wi wi-night-alt-sprinkle"
  }
else if (condition.toLowerCase().includes("blizzard")) {
    return "wi wi-night-alt-snow-thunderstorm"
  }
}
function getWeatherIconDay(condition) {

  if  (condition.toLowerCase().includes("sunny") || condition.toLowerCase().includes("clear")){
      return "wi wi-day-sunny"
    }
    else if (condition.toLowerCase().includes("snow") || condition.toLowerCase().includes("ice")) {
      return "wi wi-day-snow"
    }
    else if (condition.toLowerCase().includes("mist") || condition.toLowerCase().includes("fog")) {
      return "wi wi-day-fog"
    }
    else if (condition.toLowerCase().includes("thunder")) {
      return "wi wi-day-alt-thunderstorm"
    }
    else if (condition.toLowerCase().includes("cloud")|| condition.toLowerCase().includes("overcast")) {
      return "wi wi-day-cloudy"
    }
    else if (condition.toLowerCase().includes("rain")) {
      return "wi wi-day-rain"
    }
    else if (condition.toLowerCase().includes("sleet")) {
      return "wi wi-day-sleet"
    }
  else if (condition.toLowerCase().includes("drizzle")) {
      return "wi wi-day-sprinkle"
    }
  else if (condition.toLowerCase().includes("blizzard")) {
      return "wi wi-day-snow-thunderstorm"
    }
  
  
  }

  const renderData=(result) => {
  
  

    try {
      // _______________updating weather info_______________
  
      city_name.innerText = `${result.location.name}, ${result.location.region?result.location.region + ",":""}  ${result.location.country}`
      document.getElementById("temp").firstElementChild.innerText = result.current.temp_c;
      curr_condition.innerText = result.current.condition.text;
      feels.firstElementChild.innerText = result.current.feelslike_c;
      barometer.firstElementChild.innerText = result.current.pressure_mb;
      dew.firstElementChild.innerText = result.current.dewpoint_c;
      visible.firstElementChild.innerText = result.current.vis_km;
      cloud.firstElementChild.innerText = result.current.cloud +"%";
      update_time.firstElementChild.innerText = result.location.localtime.split(" ")[1];
  
  
  
      // _____________________Updating Weather Icon__________________________
  
      //night 
      if (result.current.is_day == 0) {
  
        document.querySelector(".temp-icon").firstElementChild.className = getWeatherIconNight(result.current.condition.text)
      }
  
      // day
      if (result.current.is_day == 1) {
        document.querySelector(".temp-icon").firstElementChild.className = getWeatherIconDay(result.current.condition.text)
      }
  
      // __________________________Hourly Updates________________________
  
      const today = result.forecast.forecastday[0]; // Today's data
      const tomorrow = result.forecast.forecastday[1]; // Next day's data (if exists)
  
      const hourlyToday = today.hour;
      const hourlyTomorrow = tomorrow ? tomorrow.hour : [];
  
  
      
      const currentHour =(result.location.localtime.split(" ")[1].split(":")[0])
  
  
  
      
      // Get future hours from today
      let futureTemps = hourlyToday.filter(entry =>
        new Date(entry.time).getHours() > currentHour
      );
  
  
  
      let currPrecipHour = hourlyToday.filter(entry =>
        new Date(entry.time).getHours() == currentHour
      );
  
  
  
      document.querySelector(".hourly-info").innerHTML = `<div class="card">
      <div>Now  </div>
      <div class="img">
        <i class="${(result.current.is_day == 0) ? getWeatherIconNight(result.current.condition.text) : getWeatherIconDay(result.current.condition.text)}"></i>
      </div>
      <div>
        <span class="max_temp">${result.current.temp_c + "&deg"} </span>
    
      </div>
      <div class="condition">${result.current.condition.text}</div>
      <div class="precipitation"><img  width="20px" src="./images/shower.png" alt=""><span>${currPrecipHour[0].chance_of_rain}%</span></div>
    </div>`
  
  
  
      // If less than 6 future hours remain, add from tomorrow
      if (futureTemps.length < 24 && hourlyTomorrow.length > 0) {
        const needed = 24 - futureTemps.length;
        // console.log(...hourlyTomorrow.slice(0, needed));
  
        futureTemps = [...futureTemps, ...hourlyTomorrow.slice(0, needed)];
      }
  
  // console.log(futureTemps);
  
      futureTemps.map((item) => {
   
  
        let time = item.time.split(" ")[1]
        // console.log(date)
  
  
        document.querySelector(".hourly-info").innerHTML = document.querySelector(".hourly-info").innerHTML +
          `<div class="card">
    <div> ${time}  </div>
    <div class="img">
      <i class="${(item.is_day === 0) ? getWeatherIconNight(item.condition.text) : getWeatherIconDay(item.condition.text)}"></i>
    </div>
    <div>
      <span class="max_temp">${item.temp_c + "&deg"}</span>
  
    </div>
    <div class="condition">${item.condition.text}</div>
    <div class="precipitation"><img  width="20px" src="./images/shower.png" alt=""><span>${item.chance_of_rain}%</span></div>
  </div>`
  
      })
  
  
      // _______________updating 3 days forecast_______________
  
      document.querySelector(".forecast").innerHTML = ""
      result.forecast.forecastday.map((item, index) => {
        let day;
        if (index == 0) day = "Today"
        else if (index == 1) day = "Tomorrow"
        else {
          day = new Date(item.date).toLocaleDateString("en-US", { weekday: "short" })
        }
  
  
        document.querySelector(".forecast").innerHTML = document.querySelector(".forecast").innerHTML +
          `
       <div class="day">
            <div>${day}</div>
            <div class="img">
              <i class="${getWeatherIconDay(item.day.condition.text)}"></i>
              <div >${item.day.condition.text}</div>
            </div>
            <div class="min_max">
              <span class="max_temp">${item.day.maxtemp_c}&deg</span>
  /
              <span class="min_temp">${item.day.mintemp_c}&deg</span>
            </div>
            <div class="rain">
              <img width="20px" src="./images/shower.png" alt=""> <span>${item.day.daily_chance_of_rain}%</span>
            </div>
          </div>
      
      `
  
      })
  
  
  
      //  ____________Updating day details____________
  
      document.querySelector(".sun_rise").lastElementChild.innerText = result.forecast.forecastday[0].astro.sunrise
      document.querySelector(".sun_set").lastElementChild.innerText = result.forecast.forecastday[0].astro.sunset
  
      document.querySelector(".moon_rise").lastElementChild.innerText = result.forecast.forecastday[0].astro.moonrise
      document.querySelector(".moon_set").lastElementChild.innerText = result.forecast.forecastday[0].astro.moonset
  
      function getMoonphaseImg(condition) {
  
  
        if (condition.includes("New Moon")) {
          return "wi wi-moon-new"
        }
        else if (condition.includes("Waxing Crescent")) {
          return "wi wi-moon-waxing-crescent-3"
        }
        else if (condition.includes("First Quarter")) {
          return "wi wi-moon-first-quarter"
        }
        else if (condition.includes("Waxing Gibbous")) {
          return "wi wi-moon-waxing-gibbous-3"
        }
        else if (condition.includes("Full Moon")) {
          return "wi wi-moon-full"
        }
        else if (condition.includes("Waning Gibbous")) {
          return "wi wi-moon-waning-gibbous-3"
        }
        else if (condition.includes("Last Quarter")) {
          return "wi wi-moon-third-quarter"
        }
        else if (condition.includes("Waning Crescent")) {
          return "wi wi-moon-waning-crescent-3"
        }
      }
  
      moon_phase_img.className = getMoonphaseImg(result.forecast.forecastday[0].astro.moon_phase)
      moon_phase.innerText = result.forecast.forecastday[0].astro.moon_phase
  
  
  
      // _____________________________other info_____________________________
  
  
      // _______updating uv index_______
  
      uv.firstElementChild.innerText = result.current.uv
      uv.style.setProperty("--value", result.current.uv / 15 * 100)
  
      let uvIndex = result.current.uv
  
      let riskLevel;
  
      if (uvIndex < 0) riskLevel = "Invalid UV Index";
      if (uvIndex >= 0 && uvIndex <= 2) riskLevel = "Low";
      if (uvIndex >= 3 && uvIndex <= 5) riskLevel = "Moderate";
      if (uvIndex >= 6 && uvIndex <= 7) riskLevel = "High";
      if (uvIndex >= 8 && uvIndex <= 10) riskLevel = "Very High";
      if (uvIndex > 10) riskLevel = "Extreme";
  
      uv.lastElementChild.innerText = riskLevel
  
      // _______updating humidity_______
  
      humidity.style.setProperty("--value", result.current.humidity)
      humidity.firstElementChild.innerText = result.current.humidity + "%"
  
  
      // _______updating precip _______
  
      precip.firstElementChild.innerText = result.forecast.forecastday[0].day.daily_chance_of_rain + "%"
      precip.style.setProperty("--value", result.forecast.forecastday[0].day.daily_chance_of_rain)
  
  
      // _______updating wind_______
  
      wind.firstElementChild.innerText = result.current.wind_dir
      wind.lastElementChild.innerText = result.current.wind_kph + " kph"
  
      document.querySelector(".arrow").className = "arrow " + result.current.wind_dir.toLowerCase()
  
    } catch (error) {
      console.error(error);
    }
  }


if (localStorage.getItem("weather")) {
  let result = JSON.parse(localStorage.getItem("weather"))
  // console.log(result);
  // _______________updating weather info_______________

renderData(result)
}

const getWeather = async (city) => {

  let key = "d33f2dc5abfa461499025152250703"

  let url = `https://api.weatherapi.com/v1/forecast.json?key=${key}&q=${city}&days=3`
  const response = await fetch(url);
  const result = await response.json();

localStorage.setItem("weather", JSON.stringify(result))

  // console.log(result);



renderData(result)

}
if (navigator.geolocation) {
  window.navigator.geolocation.getCurrentPosition(success, error);
} else {
  alert("Geolocation is not supported by this browser.");
  // Use default city if geolocation is not available
  // let defaultCity = "New York"; // Set your default city here
  // getWeather(defaultCity);
}


function success(position) {


  let lat = position.coords.latitude;
  let lon = position.coords.longitude;


  // Fetch the weather using the user's location
  getWeather(`${lat}, ${lon}`);
  
}

function error() {
 alert("Location is denied");

  // Use a default city when location is denied
  let defaultCity = "New York"; // Set your default city here
  getWeather(defaultCity);
}

// Check if geolocation is available and request the user's location




document.getElementById("location").addEventListener("click",()=>{
  if (navigator.geolocation) {
    window.navigator.geolocation.getCurrentPosition(success, error);
  } else {
    alert("Geolocation is not supported by this browser.");
    // Use default city if geolocation is not available
    // let defaultCity = "New York"; // Set your default city here
    // getWeather(defaultCity);
  }
  
})


search.addEventListener("click", (e) => {
  let city = document.getElementById("city-input")
  e.preventDefault()
  // console.log(city.value)
  getWeather(city.value)
  city.value = ""
})



let input = document.getElementById("city-input")
input.addEventListener("keyup", (e) => {
  e.preventDefault()
  if (e.key === "Enter") {
    getWeather(input.value)
    input.value = ""
  }
}
)









