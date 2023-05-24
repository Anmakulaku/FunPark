const regularPrice = 60; // Cena biletu od poniedziałku do piątku
const weekendPrice = 80; // Cena biletu w sobotę i niedzielę

// Kalendarz:
const datepicker = document.getElementById("ticket-datepicker");
const selectedDate = document.getElementById("selected-date");
selectedDate.textContent = "Wybierz datę z kalendarza powyżej";

datepicker.addEventListener("change", () => {
    const chosenDate = datepicker.value;
    if (chosenDate) {
        const formattedDate = formatDate(chosenDate);
        selectedDate.textContent = formattedDate;

        const dayOfWeek = new Date(chosenDate).getDay();
        let ticketPrice;

        if (dayOfWeek === 0 || dayOfWeek === 6) {
            ticketPrice = weekendPrice;
        } else {
            ticketPrice = regularPrice;
        }

        updateTicketPrices(ticketPrice);
        enableTicketButtons(); // Włącz przyciski do zmiany ilości biletów
    } else {
            selectedDate.textContent = "Wybierz datę z kalendarza powyżej";
            updateTicketPrices(regularPrice);
            disableTicketButtons(); // Wyłącz przyciski do zmiany ilości biletów
    }
});

function formatDate(date) {
    const [year, month, day] = date.split("-");

    return `${day}.${month}.${year}`;
}

function updateTicketPrices(price) {
    const ticketPrices = document.querySelectorAll(".ticket-price");
    ticketPrices.forEach((ticketPrice) => {
        const ticketType = ticketPrice.dataset.type;
        let priceMultiplier = 1;

        switch (ticketType) {
        case "adult":
            priceMultiplier = 1;
            break;
        case "child":
            priceMultiplier = 0.7; // Cena dla dzieci i seniorów (70% ceny)
            break;
        case "infants":
            priceMultiplier = 0; // Cena dla niemowląt (0% ceny)
            break;
        case "special":
            priceMultiplier = 0.4; // Cena specjalna (40% ceny)
            break;
        }

    const finalPrice = price * priceMultiplier;
    ticketPrice.textContent = `Cena: ${finalPrice} PLN`;
    });

}

// Licznik biletów:

const btnMinusList = document.querySelectorAll(".btn-minus");
const btnPlusList = document.querySelectorAll(".btn-plus");

function disableTicketButtons() {
    btnMinusList.forEach((btnMinus) => {
        btnMinus.disabled = true;
    });

    btnPlusList.forEach((btnPlus) => {
        btnPlus.disabled = true;
    });
}

function enableTicketButtons() {
    btnMinusList.forEach((btnMinus) => {
        btnMinus.disabled = false;
    });

    btnPlusList.forEach((btnPlus) => {
        btnPlus.disabled = false;
    });
}

btnMinusList.forEach((btnMinus) => {
    btnMinus.addEventListener("click", () => {
        const chosenDate = datepicker.value;
        if (!chosenDate) {
            alert("Wybierz datę z kalendarza powyżej!"); // Wyświetl powiadomienie
            return;
        }

        const ticketSelectBoxPrice = btnMinus.closest(".ticket-select-box-price");
        const counter = ticketSelectBoxPrice.querySelector("p[id^='counter-']");
        let count = parseInt(counter.textContent);

        if (count > 0) {
            count--;
            counter.textContent = count;
            updateTicketPrices(regularPrice, false);
        }
    });
});

btnPlusList.forEach((btnPlus) => {
    btnPlus.addEventListener("click", () => {
        const chosenDate = datepicker.value;
        if (!chosenDate) {
            alert("Wybierz datę z kalendarza powyżej!"); // Wyświetl powiadomienie
            return;
        }

        const ticketSelectBoxPrice = btnPlus.closest(".ticket-select-box-price");
        const counter = ticketSelectBoxPrice.querySelector("p[id^='counter-']");
        let count = parseInt(counter.textContent);

        count++;
        counter.textContent = count;
        updateTicketPrices(regularPrice, true);
    });
});
