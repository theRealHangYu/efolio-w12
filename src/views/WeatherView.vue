<template>
  <div class="container">
    <div class="header">
      <h1>WEATHER APP</h1>
      <div class="search-bar">
        <input type="text" v-model="city" placeholder="Enter city name" class="search-input" />
        <input
          type="text"
          v-model="country"
          placeholder="Enter country code"
          class="search-input"
        />
        <button @click="searchByCity" class="search-button">Search</button>
      </div>
    </div>

    <main class="main">
      <!--If there are no data returned, then skip rendering the information-->
      <div v-if="weatherData">
        <h2>{{ weatherData.name }}, {{ weatherData.sys.country }}</h2>

        <div>
          <p>
            <img :src="iconUrl" alt="Weather Icon" />{{ weatherData.weather[0].description }}
            {{ temperature }} °C
          </p>
        </div>
      </div>
    </main>
  </div>
</template>

<script>
import axios from 'axios'

const apikey = 'e5da83bcd45a263a32deb0ab2d071888'

export default {
  name: 'App',
  data() {
    return {
      city: '',
      country: '',
      weatherData: null,
      hourlyForecast: [],
      dailyForecast: []
    }
  },
  //computed is a property that is used to define a property that
  //is dependent on other data properties.
  //If we using a more easy to understand words to understand the concept:
  //the derived value such as temperature automatically update when the relevant value change.
  computed: {
    //There are multiple way to obtain the data in Celsius format.
    //Calculation by yourself like below after data is retireved or via API parameters

    //Example of adding additional units requirement, if you choose this, remember to change section 3.1
    //https://api.openweathermap.org/data/2.5/weather?lat=XXX&lon=-XXX.15&appid={API key}&units=metric
    temperature() {
      return this.weatherData ? Math.floor(this.weatherData.main.temp - 273) : null
    },
    //Get the current weather icon using the API link
    iconUrl() {
      return this.weatherData
        ? `http://api.openweathermap.org/img/w/${this.weatherData.weather[0].icon}.png`
        : null
    }
  },
  //There are two steps involved in this,
  //step 1: identify current location
  //step 2: after identify, get the weather data straight based on the current location.
  mounted() {
    this.fetchCurrentLocationWeather()
  },
  methods: {
    //Async in a easy to understand way means the method will run in backend thread,
    //And it won't occupy the main thread, so the user experience is still smooth
    async fetchCurrentLocationWeather() {
      //The navigator.geolocation object is part of the Web API provided by modern web browsers
      //Please note this function is not belongs to Vue or openweather.
      if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(async (position) => {
          const { latitude, longitude } = position.coords
          //API link to obtain the current weather based on the current location browser identified
          const url = `http://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${apikey}`
          //await means wait for the fetchWeatherData method to complete before proceeding
          await this.fetchWeatherData(url)
        })
      }
    },
    async searchByCity() {
      if (this.city && this.country) {
        const url = `https://api.openweathermap.org/data/2.5/weather?q=${this.city},${this.country}&appid=${apikey}`
        await this.fetchWeatherData(url)
      } else {
        alert('Please enter both city and country.')
      }
    },
    async fetchWeatherData(url) {
      try {
        const response = await axios.get(url)
        this.weatherData = response.data
      } catch (error) {
        console.error('Error fetching weather data:', error)
      }
    }
  }
}
</script>

<style scoped>
.container {
  display: flex;
  flex-direction: column;
  align-items: center;
  height: 100vh;
}

.main {
  margin-top: 20px;
}
</style>
