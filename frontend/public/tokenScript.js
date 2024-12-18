header = document.querySelector("header");
token = localStorage.getItem("token");

function setHeader(token) {
    if (token) {
        const logout = document.createElement("button");
        logout.innerHTML = "Logout";
        logout.type = "button";
        logout.addEventListener("click", logoutUser);
        header.appendChild(logout);
    } else {
        const link = document.createElement("a");

        if (window.location.pathname === "/login") {
            link.innerHTML = "register";
            link.href = "http://localhost:5000/register"
        } else {
            link.innerHTML = "login";
            link.href = "http://localhost:5000/login"
        }

        header.appendChild(link);
    }
}

function logoutUser() {
    localStorage.removeItem("token");
    location.href = "http://localhost:5000/login";
}

setHeader(token);
