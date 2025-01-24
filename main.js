const inputCity = document.querySelector('.input-city')
const btnSearch = document.querySelector('.btn-search')
const apiKey = 'd3708d0a4207761205d6c382f1bbce40'

const notFaundSection = document.querySelector('.not-found')
const searchCitySection = document.querySelector('.search-city')
const weatherInfoSection = document.querySelector('.wather-info')

const countryText = document.querySelector('.country')
const tempText = document.querySelector('.temp')
const conditionText = document.querySelector('.condition')
const humidityText = document.querySelector('.humidity-value')
const windText = document.querySelector('.wind-value')
const watherImg = document.querySelector('.weather-sumary-img')
const currentDateText = document.querySelector('.current-date')

function getNameInputCity(){
  if (inputCity.value.trim() !== "") {
    updateWeatherInfo(inputCity.value)
    inputCity.value = ""
    inputCity.blur()
  }
}

inputCity.addEventListener('keydown', e => {
  if (e.key === "Enter" && inputCity.value.trim() !== "") {
    updateWeatherInfo(inputCity.value)
    inputCity.value = ""
    inputCity.blur()
  }
})

async function getFetchData(city) {
  const apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&lang={pt_br}&units=metric`
  const response =  await fetch(apiUrl)
  return response.json()
}

function getWeatherIcon(id) {
  if (id <= 232) return 'thunderstorm.svg'
  if (id <= 321) return 'drizzle.svg'
  if (id <= 531) return 'rain.svg'
  if (id <= 622) return 'snow.svg'
  if (id <= 781) return 'atmosphere.svg'
  if (id <= 800) return 'clear.svg'
  else return 'clouds.svg'
}

function getCurrentDate() {
  const currentDate = new Date()
  const options = {
    weekday: 'short',
    day: '2-digit',
    month: 'short'
  }

  return currentDate.toLocaleDateString('pt-BR', options).replace('.', '')
}

async function updateWeatherInfo(city) {
  const weatherData = await getFetchData(city)
  if (weatherData.cod !== 200) {
    showDisplaySection(notFaundSection)
    return
  }

  const {
    name: country,
    main: {temp, humidity},
    weather: [{id, main }],
    wind: {speed}
  } = weatherData

  countryText.textContent = country
  tempText.textContent = Math.round(temp) + '° C'
  humidityText.textContent = humidity + ' %'
  windText.textContent = Math.round(speed) + 'M/s'
  conditionText.textContent = main
  watherImg.src = `assets/weather/${getWeatherIcon(id)}`
  currentDateText.textContent = getCurrentDate()
  showDisplaySection(weatherInfoSection)
}

function showDisplaySection(section) {
  [searchCitySection, weatherInfoSection, notFaundSection].forEach(section =>{
    section.style.display = 'none'
  })

  section.style.display = 'flex'
}

btnSearch.addEventListener('click', getNameInputCity) 