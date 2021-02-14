function searchCity(city){
    fetch(`http://api.openweathermap.org/data/2.5/weather?q=${city},BR&units=metric&appid=7c8151e99b65fabc443bf6b96f023fae`)
        .then(response => response.json())
        .then(data => setCardWeather(data))
        .catch(error => {
            alert('Desculpa, não foi possível realizar a busca.')
            console.log(error);
            searchCity('Recife')
        })
}

function setCardWeather(dataCity){
    const date = new Date()
    let hours = date.getHours()
    let minutes = date.getMinutes()
    if (minutes < 10) minutes = '0'+minutes

    console.log(dataCity);
    const nameCity = document.querySelector('#search').value

    document.querySelector('.card-weather').innerHTML = `
    <div class="card-anima">
        <h4>ClimaBrasil</h4>
        <div class="card-container">
            <div class="card-img">
                <img id="imgClima" src="">
            </div>
            <div class="card-graus">
                <h1 id="graus">${parseInt(dataCity.main.temp)}°</h1>
                <p id="description"></p>
                <h2 id="city">${dataCity.name}</h2>
                <h2 id="hours">${hours}:${minutes}</h2>
            </div>
        </div>
        <div class="card-max-min">
            <img src="/img/max.png" alt="">
            <span>Máxima:</span>
            <span id="max">${parseInt(dataCity.main.temp_max)}°</span>
            <img src="/img/min.png" alt="">
            <span>Minima:</span>
            <span id="min">${parseInt(dataCity.main.temp_min)}°</span>
        </div>
    </div>`
    
    const { weather: [{ description }] } = dataCity;
    if (description === 'clear sky'){
        document.getElementById('description').innerHTML = 'Céu limpo'
        document.getElementById('imgClima').src = '/img/sun.png'
    }else if (description === 'few clouds'){
        document.getElementById('description').innerHTML = 'Algumas nuvens'
        document.getElementById('imgClima').src = '/img/sunandcloud.png'
    }else if (description === 'scattered clouds'){
        document.getElementById('description').innerHTML = 'Céu nublado'
        document.getElementById('imgClima').src = '/img/clouds.png'
    }else if (description === 'broken clouds'){
        document.getElementById('description').innerHTML = 'Nuvens carregadas'
        document.getElementById('imgClima').src = '/img/clouds.png'
    }else if (description === 'shower rain'){
        document.getElementById('description').innerHTML = 'Chuva fraca'
        document.getElementById('imgClima').src = '/img/lightrain.png'
    }else if (description === 'rain'){
        document.getElementById('description').innerHTML = 'Chuva forte'
        document.getElementById('imgClima').src = '/img/rain.png'
    }else if (description === 'thunderstorm'){
        document.getElementById('description').innerHTML = 'Chuva com raios'
        document.getElementById('imgClima').src = '/img/rainandthunder.png'
    }else if (description === 'mist'){
        document.getElementById('description').innerHTML = 'Névoa'
        document.getElementById('imgClima').src = '/img/wind.png'
    }
}    
            
            
window.addEventListener('load', searchCity('Recife'))
    

window.addEventListener('keydown', event =>{
    if (event.keyCode === 13) {
        const nameCity = document.querySelector('#nameCity').value
        searchCity(nameCity)
        document.getElementById('nameCity').value = ''
        document.getElementById('nameCity').focus()
    }
})

document.querySelector('#search').addEventListener('click', () => {
    const nameCity = document.getElementById('nameCity').value
    document.querySelector('.card-weather').innerHTML = ''
    searchCity(nameCity)
    document.getElementById('nameCity').value = ''
    document.getElementById('nameCity').focus()
})