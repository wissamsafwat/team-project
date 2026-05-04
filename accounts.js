document.addEventListener("DOMContentLoaded", function(){
    const loginForm = document.getElementById("login_form");
    const signupForm = document.getElementById("signup_form");

    function showError(formElement, message) {
        let existingError = formElement.querySelector(".error-msg");
        if(existingError) existingError.remove();

        const errorEl = document.createElement("p");
        errorEl.className = "error-msg";
        errorEl.style.color = "tomato"; 
        errorEl.style.fontWeight = "bold";
        errorEl.style.marginTop = "10px";
        errorEl.textContent = message;
        
        formElement.insertBefore(errorEl, formElement.querySelector("button"));
    }

    /// signup logic
    if(signupForm){
        signupForm.addEventListener("submit", function(event){
            event.preventDefault();

            const user = document.getElementById("new_user").value.trim();
            const email = document.getElementById("new_email").value.trim();
            const password = document.getElementById("new_pass").value;
            const confirmPass = document.getElementById("con_pass").value;
            const birthDate = document.getElementById("dob").value;

            if (user === "" || email === "" || password === "" || confirmPass === "" || birthDate === ""){
                showError(signupForm, "Please fill out all fields to create an account.");
                return ;
            }

            if(password !== confirmPass){
                showError(signupForm, "The passwords do not match. Please try again.");
                return;
            }

            let usersDB = JSON.parse(localStorage.getItem("users")) || [];

            /// check if the gamer tag is available 
            const takenUser = usersDB.find(u => u.username.toLowerCase() === user.toLowerCase());
            if(takenUser){
                showError(signupForm, "This gamer tag is used, please choose another one.");
                return;
            }
            
            const newUser = {username: user , email: email , password: password , dob: birthDate};
            usersDB.push(newUser);
            localStorage.setItem("users", JSON.stringify(usersDB));
            
            localStorage.setItem("currentUser" ,user);
            window.location.href = "home.html";
        });
    }

    /// login logic
    if(loginForm){
        loginForm.addEventListener("submit", function(event){
            event.preventDefault();

            const user = document.getElementById("user").value.trim();
            const pass = document.getElementById("pass").value;
            
            if(user === "" || pass === ""){
                showError(loginForm, "Please enter your data to continue.");
                return;
            }
            
            let usersDB = JSON.parse(localStorage.getItem("users")) || [];

            const validUser = usersDB.find(u => u.username.toLowerCase() === user.toLowerCase() && u.password === pass);
            if(validUser){
                localStorage.setItem("currentUser", validUser.username);
                window.location.href = "home.html";
            }
            else{
                showError(loginForm, "Invalid gamertag or password, please try again.");
            }
        });
    }
});