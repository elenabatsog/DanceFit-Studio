//This is Javascript file for the homepage

console.log("DanceFit Studio loaded successfully!");

async function loadQuote() {
    try {
        const response = await fetch("https://api.quotable.io/random");

        const data = await response.json();
        const quoteText = document.querySelector("#quoteText");
        const quoteAuthor = document.querySelector("#quoteAuthor");

        quoteText.textContent = `"${data.content}"`;
        quoteAuthor.textContent = `- ${data.author}`;
    }

    catch (error) {

        const quoteText = document.querySelector("#quoteText");
        const quoteAuthor = document.querySelector("#quoteAuthor");

        quoteText.textContent = '"Great dancers are not great because of their technique, they are great because of their passion"';

        quoteAuthor.textContent = "- Martha Graham";
    }
}

//When the page loads, the function/quote will run
if (document.querySelector("#quoteText") && document.querySelector("#quoteAuthor")) {
    loadQuote();
}

//Dark Mode button functionality
const darkModeButton = document.querySelector("#darkModeBtn");
if (darkModeButton) {
    darkModeButton.addEventListener("click", function() {
        document.body.classList.toggle("dark-mode");
        if (document.body.classList.contains("dark-mode")) {
            darkModeButton.textContent = "Light Mode";

        } else {
            darkModeButton.textContent = "Dark Mode";
        }
    });
}

