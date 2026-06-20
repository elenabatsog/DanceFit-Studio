const contactForm = document.querySelector("#contactForm");
const contactResult = document.querySelector("#contactResult");

//Contact form validation
contactForm.addEventListener("submit", function (event) {
    event.preventDefault();

    const name = document.querySelector("#contactName").value;
    const email = document.querySelector("#contactEmail").value;
    const subject = document.querySelector("#contactSubject").value;
    const message = document.querySelector("#contactMessage").value;

    if (name === "" || email === "" || subject === "" || message === "") {
        contactResult.textContent = "Please fill in all fields.";
        return;
    }

    if (!email.includes("@") || !email.includes(.)) {
        contactResult.textContent = "Please enter a valid email address.";
    }

    if (!isNaN(name)) {
        contactResult.textContent = "Name should not contain numbers.";
    }


    contactResult.textContent = "Your message has been submitted successfully.";
    contactForm.reset();
});
