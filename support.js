const form = document.getElementById("contactForm");
const inputs = form.querySelectorAll("input");

inputs.forEach(function(input) {
    input.required = true;
});