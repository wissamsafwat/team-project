document.addEventListener("DOMContentLoaded", function () {

    let user = {
        gamerTag: localStorage.getItem('gamerTag') || "Player123",
        email: localStorage.getItem('email') || "player@example.com",
        password: localStorage.getItem('pass') || "********"
    };

    const gamerTagEl = document.querySelector("#gamer-tag");
    const emailEl = document.querySelector("#email");
    const passwordEl = document.querySelector("#password");

    const changeEmailBtn = document.querySelector("#change-email");
    const changePasswordBtn = document.querySelector("#change-password");
    const logoutBtn = document.querySelector("#logout");

    function displayUser() {
        gamerTagEl.textContent = user.gamerTag;
        emailEl.textContent = user.email;
        passwordEl.textContent = user.password;
    }

    changeEmailBtn.addEventListener("click", () => {
        let newEmail = prompt("Enter new email:");
        if (newEmail && newEmail.trim() !== "") {
            user.email = newEmail;
            localStorage.setItem('email', newEmail);
            displayUser();
        }
    });

    changePasswordBtn.addEventListener("click", () => {
        let newPassword = prompt("Enter new password:");
        if (newPassword && newPassword.trim() !== "") {
            user.password = newPassword;
            localStorage.setItem('pass' , newPassword);
            displayUser();
        }
    });

    logoutBtn.addEventListener("click", () => {
        if(confirm("are you sure you want to logout?")){
            localStorage.removeItem('email');
            localStorage.removeItem('pass');
            alert("Logged out!");
            window.location.href = "index.html";
        }
        
    });

    displayUser();

});