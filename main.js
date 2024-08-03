const api = "https://api.exchangerate-api.com/v4/latest/USD";

// Selecting different controls
const search = document.querySelector(".searchBox");
const convert = document.querySelector(".convert");
const fromCurrency = document.querySelector(".from");
const toCurrency = document.querySelector(".to");
const finalValue = document.querySelector(".finalValue");
const finalAmount = document.getElementById("finalAmount");

let resultFrom = "USD"; // Default value
let resultTo = "USD"; // Default value
let searchValue = 1; // Default value

// Event listeners for currency changes and input value updates
fromCurrency.addEventListener('change', (event) => {
    resultFrom = event.target.value;
});

toCurrency.addEventListener('change', (event) => {
    resultTo = event.target.value;
});

search.addEventListener('input', (event) => {
    searchValue = event.target.value;
});

// Fetch and display conversion results
convert.addEventListener("click", () => {
    fetch(api)
        .then(response => response.json())
        .then(currency => {
            displayResults(currency);
        })
        .catch(error => console.error('Error fetching exchange rates:', error));
});

// Display results after conversion
function displayResults(currency) {
    const fromRate = currency.rates[resultFrom];
    const toRate = currency.rates[resultTo];
    const convertedValue = ((toRate / fromRate) * searchValue).toFixed(2);
    finalValue.innerHTML = `${searchValue} ${resultFrom} = ${convertedValue} ${resultTo}`;
    finalAmount.style.display = "block";
}

// Clear values and reset the form
function clearVal() {
    window.location.reload();
    finalValue.innerHTML = "";
}
