function searchCity(city){
    fetch(`http://api.openweathermap.org/data/2.5/weather?q=${city},BR&units=metric&appid=7c8151e99b65fabc443bf6b96f023fae`)
        .then(response => response.json())
        .then(data => {
            document.getElementById('graus').innerHTML = parseInt(data.main.temp) +'°'
            document.getElementById('city').innerHTML = data.name
            document.getElementById('min').innerHTML = parseInt(data.main.temp_min - 2)
            document.getElementById('max').innerHTML = parseInt(data.main.temp_max + 3)
            const date = new Date()
            let hours = date.getHours()
            let minutes = date.getMinutes()
            if (minutes < 10) minutes = '0'+minutes
            document.getElementById('hours').innerHTML = hours+':'+minutes
            
            if (data.weather[0].description === 'clear sky'){
                document.getElementById('description').innerHTML = 'Céu limpo'
                document.getElementById('imgClima').src = '/img/sun.png'
            }else if (data.weather[0].description === 'few clouds'){
                document.getElementById('description').innerHTML = 'Algumas nuvens'
                document.getElementById('imgClima').src = '/img/sunandcloud.png'
            }else if (data.weather[0].description === 'scattered clouds'){
                document.getElementById('description').innerHTML = 'Céu nublado'
                document.getElementById('imgClima').src = '/img/clouds.png'
            }else if (data.weather[0].description === 'broken clouds'){
                document.getElementById('description').innerHTML = 'Nuvens carregadas'
                document.getElementById('imgClima').src = '/img/clouds.png'
            }else if (data.weather[0].description === 'shower rain'){
                document.getElementById('description').innerHTML = 'Chuva fraca'
                document.getElementById('imgClima').src = '/img/lightrain.png'
            }else if (data.weather[0].description === 'rain'){
                document.getElementById('description').innerHTML = 'Chuva forte'
                document.getElementById('imgClima').src = '/img/rain.png'
            }else if (data.weather[0].description === 'thunderstorm'){
                document.getElementById('description').innerHTML = 'Chuva com raios'
                document.getElementById('imgClima').src = '/img/rainandthunder.png'
            }else if (data.weather[0].description === 'mist'){
                document.getElementById('description').innerHTML = 'Névoa'
                document.getElementById('imgClima').src = '/img/wind.png'
            }

        }).catch(error => {
            alert('Desculpa, não foi possível realizar a busca.')
            document.getElementById('busca').value = '' 
            console.log(error);
        })
}


window.addEventListener('load', searchCity('Brasilia'))
    

window.addEventListener('keydown', event =>{
    if (event.keyCode === 13) {
        const nameCity = document.getElementById('busca').value
        searchCity(nameCity)
    }
})

document.querySelector('.md-24').addEventListener('click', () => {
    const nameCity = document.getElementById('busca').value
    searchCity(nameCity)
    document.getElementById('card-item').setAttribute('class', 'card-anima')
})