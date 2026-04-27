 document.addEventListener("DOMContentLoaded", function () {

    let user = {
        gamerTag: "Player123",
        email: "player@example.com",
        password: "********"
    };

    const gamerTagEl = document.querySelector(".gamer-tag");
    const emailEl = document.querySelector(".email");
    const passwordEl = document.querySelector(".password");

    const changeEmailBtn = document.querySelector(".change-email");
    const changePasswordBtn = document.querySelector(".change-password");
    const logoutBtn = document.querySelector(".logout");
    const addAccountBtn = document.querySelector(".add-account");

    function displayUser() {
        gamerTagEl.textContent = user.gamerTag;
        emailEl.textContent = user.email;
        passwordEl.textContent = user.password;
    }

    changeEmailBtn.addEventListener("click", () => {
        let newEmail = prompt("Enter new email:");
        if (newEmail) {
            user.email = newEmail;
            displayUser();
        }
    });

    changePasswordBtn.addEventListener("click", () => {
        let newPassword = prompt("Enter new password:");
        if (newPassword) {
            user.password = newPassword;
            displayUser();
        }
    });

    logoutBtn.addEventListener("click", () => {
        alert("Logged out!");
    });

    addAccountBtn.addEventListener("click", () => {
        alert("Add account feature coming soon!");
    });

    displayUser();

});