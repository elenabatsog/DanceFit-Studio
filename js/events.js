//the system checks if the javascript file is connected
console.log("events.js loaded");

//the system searches and selects registration buttons
const registerButtons = document.querySelectorAll(".register-btn");

//the system searches and selects all the events the user registered
const registeredCount = document.querySelector("#registeredCount");

//the system takes the successful message
const registrationMessage = document.querySelector("#registrationMessage");

//the system makes sure that the elements are selected
console.log(registerButtons);
console.log(registeredCount);

//A variable for all registrations (meaning sum or total)
let count = 0;

//For all registration buttons the system adds a click event
registerButtons.forEach(function (button) {
    
    //every time it increases by 1 and the count variable is updated
    button.addEventListener("click", function() {
        count++;
        registeredCount.textContent = count;

        //when the user clicks register, the button changes to 'Registered'
        button.textContent = "Registered";

        //In order to prevent extra registrations, the button is being disabled, so it stays as 'Registered"
        button.disabled = true;

        //when the user registers to an event, a message appears
        registrationMessage.innerHTML = `
        <div class="alert alert-success mt-3">
            Registration successful!
        </div>
        `;
    });
});