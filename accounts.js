document.addEventListener("DOMContentLoaded", function(){
    const loginForm = document.getElementById("login_form");
    const signupForm = document.getElementById("signup_form");


    /// signup logic
    if(signupForm){
        signupForm.addEventListener("submit", function(event){
            event.preventDefault();

            const user = document.getElementById("new_user").value.trim();
            const email = document.getElementById("new_email").value.trim();
            const password = document.getElementById("new_pass").value;
            const confirmPass = document.getElementById("con_pass").value;
            const birthDate = document.getElementById("dob").value;

            if (user == "" || email == "" || password == "" || confirmPass == "" || birthDate == ""){
                alert("please fill out all feilds to create an account");
                return ;
            }

            if(password != confirmPass){
                alert("the passwords dont match please try agian");
                return;
            }

            let usersDB = JSON.parse(localStorage.getItem("users")) || [];

            /// check if the gamer tag is available 
            const takenUser = usersDB.find(u => u.username.toLowerCase() === user.toLowerCase());
            if(takenUser){
                alert("the gamer tag is used , please choose another one");
                return;
            }
            const newUser = {username: user , email: email , password: password , dob: birthDate};
            usersDB.push(newUser);
            localStorage.setItem("users", JSON.stringify(usersDB));
            
            localStorage.setItem("currentUser" ,user);
            alert("account created , welcome to gamehub!");
            window.location.href = "home.html";
        });
    }


    /// login logic
    if(loginForm){
        loginForm.addEventListener("submit", function(event){
            event.preventDefault();

            const user = document.getElementById("user").value.trim();
            const pass = document.getElementById("pass").value;
            if(user == "" || pass == ""){
                alert("please enter your data to continue");
                return;
            }
            let usersDB = JSON.parse(localStorage.getItem("users")) || [];

            const validUser = usersDB.find(u => u.username.toLowerCase() === user.toLowerCase() && u.password === pass);
            if(validUser){
                localStorage.setItem("currentUser", validUser.username);
                window.location.href = "home.html";
            }
            else{
                alert("invalid gamertag or password , please try agian");
            }
        });
    }
});