let signup = document.querySelector(".signup");
let login = document.querySelector(".login");
let slider = document.querySelector(".slider");
let formSection = document.querySelector(".form-section");

let signupbutton = document.querySelector(".clkSignUpbtn");
let loginbutton = document.querySelector(".clkLoginbtn");


let eleInput=document.querySelectorAll('.inputele');



signup.addEventListener("click", () => {
    slider.classList.add("moveslider");
    formSection.classList.add("form-section-move");
});

login.addEventListener("click", () => {
    slider.classList.remove("moveslider");
    formSection.classList.remove("form-section-move");
});


signupbutton.addEventListener("click", () => {

          alert("Congratulations. You are successfully registered!!. Please login through login page");
    
});



loginbutton.addEventListener("click", () => {
 alert('Login successful. Redirecting for shopping...');
 // Simulate a mouse click:
window.location.href = "cart.html";


});