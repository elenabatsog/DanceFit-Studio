const contactForm = document.querySelector("#contactForm");
const contactResult = document.querySelector("#contactResult");

//Contact form validation
contactForm.addEventListener("submit", function (event) {
    //after submission, the page does not refresh, so data are not lost
    event.preventDefault();

    //the system takes data/values from the completed fields
    const name = document.querySelector("#contactName").value;
    const email = document.querySelector("#contactEmail").value;
    const subject = document.querySelector("#contactSubject").value;
    const message = document.querySelector("#contactMessage").value;

    //the system checks if the fields are not completed
    if (name === "" || email === "" || subject === "" || message === "") {
        contactResult.textContent = "Please fill in all fields.";
        return;
    }

    //the system checks if the email has the correct format
    if (!email.includes("@") || !email.includes(".")) {
        contactResult.textContent = "Please enter a valid email address.";
        return;
    }

    //the system checks if the name contains numbers
    if (!isNaN(name)) {
        contactResult.textContent = "Name should not contain numbers.";
        return;
    }

    //A message appears when the submission is successful
    contactResult.textContent = "Your message has been submitted successfully.";
    
    //After the submission is completed, the form becomes clear
    contactForm.reset();
});
