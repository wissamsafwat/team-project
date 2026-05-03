document.addEventListener("DOMContentLoaded", function () {

    // get the current user
    const currentUsername = localStorage.getItem("currentUser");

    // if no current user return to login / sign up page
    if (!currentUsername) {
        alert("please log in first to view your profile.");
        window.location.href = "index.html"; 
        return;
    }

    let usersDB = JSON.parse(localStorage.getItem("users")) || [];

    // get the active user data
    let activeUser = usersDB.find(u => u.username === currentUsername);


    const gamerTagEl = document.querySelector("#gamer-tag");
    const emailEl = document.querySelector("#email");
    const passwordEl = document.querySelector("#password");
    const dobEl = document.querySelector("#profile_dob");
    const changeEmailBtn = document.querySelector("#change-email");
    const changePasswordBtn = document.querySelector("#change-password");
    const logoutBtn = document.querySelector("#logout");
    const serverEL = document.querySelector("#current-server");

    // displaying the data
    function displayUser() {
        gamerTagEl.textContent = activeUser.username;
        emailEl.textContent = activeUser.email;
        passwordEl.textContent = activeUser.password;
        dobEl.textContent = activeUser.dob; 
        

        // loading the server
        if(serverEL){
            serverEL.textContent = activeUser.server || "not selected";
        }
    }

    // change email logic
    changeEmailBtn.addEventListener("click", () => {
        let newEmail = prompt("Enter your new email address:");
        if (newEmail && newEmail.trim() !== "") {
            activeUser.email = newEmail.trim();
            localStorage.setItem("users", JSON.stringify(usersDB));
            displayUser();
        }
    });

    // change password logic
    changePasswordBtn.addEventListener("click", () => {
        let newPassword = prompt("Enter your new password:");
        if (newPassword && newPassword.trim() !== "") {
            activeUser.password = newPassword.trim();
            localStorage.setItem("users", JSON.stringify(usersDB));
            displayUser();
        }
    });

    // logout logic
    if (logoutBtn) {
        logoutBtn.addEventListener("click", () => {
            if (confirm("Are you sure you want to log out?")) {
                localStorage.removeItem("currentUser"); 
                alert("Logged out");
                window.location.href = "index.html";
            }
        });
    }

    displayUser();
});
// saving the server selection
function saveServer(event ,regionName) {

    event.preventDefault(); 

    const currentUsername = localStorage.getItem("currentUser");
    let usersDB = JSON.parse(localStorage.getItem("users")) || [];
    let activeUserIndex = usersDB.findIndex(u => u.username === currentUsername);

    if (activeUserIndex !== -1) {
        // Update the file of the user in the database
        usersDB[activeUserIndex].server = regionName;
        localStorage.setItem("users", JSON.stringify(usersDB));
        
        document.getElementById("current-server").textContent = regionName;
        
        alert("Server successfully changed to: " + regionName);
    }
}