const contactForm = document.querySelector("#contactForm");
const contactForm = document.querySelector("#contactEmail");
const contactForm = document.querySelector("#contactSubject");
const contactForm = document.querySelector("#contactMessage");
const contactResult = document.querySelector("#contactResult");

contactForm.addEventListener("submit", function (event) {
    event.preventDefault();

    const contactName = document.querySelector("#contactName").value;
    if (contactName.length < 2) {
        contactResult.textContent = "Please enter a valid name.";
        return;
    }

    contactResult.textContent = "Your message has been submitted successfully.";
    contactForm.requestFullscreen();
});

//Contact form validation
