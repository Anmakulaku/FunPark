//LOGOWANIE:

const loginButton = document.getElementById("btnLog");
const loginBox = document.querySelector(".login-box");
const closeButton = document.querySelector(".close");
const blurBackground = document.querySelector(".blur-background");


loginButton.addEventListener("click", () => {
    loginBox.style.display = "block";
    blurBackground.style.display = "block";
});

closeButton.addEventListener("click", () => {
    loginBox.style.display = "none";
    blurBackground.style.display = "none";
});

document.addEventListener("click", (event) => {
    if (!loginBox.contains(event.target) && event.target !== loginButton) {
        loginBox.style.display = "none";
        blurBackground.style.display = "none";
    }
});

function openImage() {
    window.open('src/assets/img/map-149152.png', '_blank');
}

const apiKey = '56b45d6534ae7c7f47da5b28a24be9ad';
const apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=Szczecin&appid=${apiKey}&units=metric&lang=pl`;

//Pobieranie danych pogodowych:
fetch(apiUrl)
    .then(response => response.json())
    .then(data => {
    const weatherDescription = data.weather[0].description;
    const temperature = data.main.temp;
    const  appTempValue = temperature.toFixed(0);
    

    // Aktualizacja elementów HTML z danymi pogodowymi:
    document.getElementById('weather-description').textContent = ` ${weatherDescription}`;
    document.getElementById('temperature').textContent = `${appTempValue} °C`;
    })
.catch(error => {
    console.log('Błąd pobierania danych pogodowych:', error);
});

//Bilety:
const ticketsElement = document.getElementById('tickets-path');

ticketsElement.addEventListener("click", () => {
    window.location.href = "tickets.html";
});

//Menu Toggle:

document.addEventListener('DOMContentLoaded', function() {
    const menuToggle = document.querySelector('.menu-toggle');
    const menu = document.querySelector('.menu');

    menuToggle.addEventListener('click', function() {
        menuToggle.classList.toggle('active');
    });
});


