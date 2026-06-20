//This is the main Javascript file for the entire website

//the system checks if the file is loaded
console.log("DanceFit Studio loaded successfully!");

//A function that loads a quote using API
async function loadQuote() {
    try {

        //the system requests data from API
        const response = await fetch("https://api.quotable.io/random");

        //it converts the response into json format
        const data = await response.json();
        const quoteText = document.querySelector("#quoteText");
        const quoteAuthor = document.querySelector("#quoteAuthor");

        //the quote and the author are visible in the website
        quoteText.textContent = `"${data.content}"`;
        quoteAuthor.textContent = `- ${data.author}`;
    }

    catch (error) {

        //the system finds and takes the elements
        const quoteText = document.querySelector("#quoteText");
        const quoteAuthor = document.querySelector("#quoteAuthor");

        //if the random quote is not loaded, then a backup quote will be displayed to users
        quoteText.textContent = '"Great dancers are not great because of their technique, they are great because of their passion"';

        quoteAuthor.textContent = "- Martha Graham";
    }
}

//When the page loads, the function/quote will run only at homepage
if (document.querySelector("#quoteText") && document.querySelector("#quoteAuthor")) {
    loadQuote();
}

//Dark Mode button functionality
const darkModeButton = document.querySelector("#darkModeBtn");
if (darkModeButton) {
    darkModeButton.addEventListener("click", function() {

        //the class for dark mode can be added or deleted
        document.body.classList.toggle("dark-mode");

        //the button is changed based on the theme the user selects
        if (document.body.classList.contains("dark-mode")) {
            darkModeButton.textContent = "Light Mode";

        } else {
            darkModeButton.textContent = "Dark Mode";
        }
    });
}

