document.addEventListener("DOMContentLoaded",function(){
    const btn=document.getElementById("theme-toggle");
    const savedTheme=localStorage.getItem("theme");
    if(savedTheme){
        document.body.classList.add(savedTheme);
    }else{
        document.body.classList.add("light");
    }
    btn.addEventListener("click",function(){
        if(document.body.classList.contains("dark")){
            document.body.classList.replace("dark","light");
            localStorage.setItem("theme","light");
        }else{
            document.body.classList.replace("light","dark");
            localStorage.setItem("theme","dark");
        }
    });
});