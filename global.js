document.addEventListener("DOMContentLoaded",function(){
    const btn=document.getElementById("theme-toggle");
    
    //saving function
    function setcookie(name , value){
        document.cookie = name + "=" + value + "; max-age=" + (60*60*24*30) + "; path=/";
    }

    // function to find the cookie
    function getcookie(name){
        let nameEQ = name + "=";
        let ca = document.cookie.split(';');
        for (let i = 0; i < ca.length; i++){
            let c = ca[i].trim();
            if (c.indexOf(nameEQ) == 0)
                return c.substring(nameEQ.length , c.length);
        }
        return null;
    }

    // if the theme cookie is not found , deufault dark
    const savedTheme = getcookie("theme") || "dark";
    document.body.classList.add(savedTheme);


    // the toggle 
    btn.addEventListener("click",function(){
        if(document.body.classList.contains("dark")){
            document.body.classList.replace("dark","light");
            setcookie("theme","light");
        }else{
            document.body.classList.replace("light","dark");
            setcookie("theme","dark");
        }
    });
});