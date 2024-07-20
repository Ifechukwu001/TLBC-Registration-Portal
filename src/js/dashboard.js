const body = document.querySelector("body"),
      modeToggle = body.querySelector(".mode-toggle");
      sidebar = body.querySelector("nav");
      sidebarToggle = body.querySelector(".sidebar-toggle");

let getMode = localStorage.getItem("mode");
if(getMode && getMode ==="dark"){
    body.classList.toggle("dark");
}

let getStatus = localStorage.getItem("status");
if(getStatus && getStatus ==="close"){
    sidebar.classList.toggle("close");
}

modeToggle.addEventListener("click", () =>{
    body.classList.toggle("dark");
    if(body.classList.contains("dark")){
        localStorage.setItem("mode", "dark");
    }else{
        localStorage.setItem("mode", "light");
    }
});

sidebarToggle.addEventListener("click", () => {
    sidebar.classList.toggle("close");
    if(sidebar.classList.contains("close")){
        localStorage.setItem("status", "close");
    }else{
        localStorage.setItem("status", "open");
    }
})

document.addEventListener("DOMContentLoaded", () => {
    const section1 = document.getElementById("dash-content");
    const section2 = document.getElementById("status");
    const toggleButton = document.getElementById("status-button");
  
    toggleButton.addEventListener("click", () => {
      if (section1.classList.contains("status")) {
        section1.classList.remove("status");
        section2.classList.add("status");
      } else {
        section1.classList.add("status");
        section2.classList.remove("status");
      }
    });
});
  