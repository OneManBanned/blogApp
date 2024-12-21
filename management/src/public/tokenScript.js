header = document.querySelector("header");
token = localStorage.getItem("token");

function setHeader(token) {
    if (token) {
        const logout = document.createElement("button");
        logout.innerHTML = "Logout";
        logout.type = "button";
        logout.addEventListener("click", logoutUser);
        header.appendChild(logout);
    } 
}

function logoutUser() {
    localStorage.removeItem("token");
    location.href = "http://localhost:9999/login";
}

setHeader(token);
