const form = document.getElementById("contactForm");



form.addEventListener("submit", function(event) {
    event.preventDefault(); 
    
    const username = document.querySelector('input[name="username"]').value.trim();
    const email = document.querySelector('input[name="email"]').value.trim();
    const problem = document.querySelector('input[name="problem"]').value.trim();
    
    let existingError = document.getElementById("error-msg");
    if(existingError) existingError.remove();

    let errorMessage = "";
    
    if (username === "") {
        errorMessage = "Please enter your username.";
    } else if (email === "") {
        errorMessage = "Please enter your email.";
    } else if (problem === "") {
        errorMessage = "Please write your problem.";
    }

    if (errorMessage !== "") {
        const errorElement = document.createElement("p");
        errorElement.id = "error-msg";
        errorElement.style.color = "tomato"; 
        errorElement.style.fontWeight = "bold";
        errorElement.textContent = errorMessage;
        
        // Put it above the submit button
        form.insertBefore(errorElement, form.lastElementChild);
    } else {
        form.submit(); 
    }
});