window.addEventListener("load", displayPosts);

async function displayPosts() {
    if (token) {
        const responseData = await fetchPosts(token, `http://localhost:3000${location.pathname}`);
        displayResponse(responseData)
    } else {
        location.href = "http://localhost:9999/login";
    }
}

async function fetchPosts(token, url) {
    const fetchOptions = {
        method: "GET",
        headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
        },
    };

    const response = await fetch(url, fetchOptions);

    if (!response.ok) {
        const errorMessage = await response.text();
        throw new Error(errorMessage);
    }

    return response.json();
}

function displayResponse(data) {
    const { title, content, published } = data; 

    document.querySelector("form").action =  `http://localhost:3000${location.pathname}`
    document.querySelector("#title").value = title;
    document.querySelector("#content").value = content;
    document.querySelector("#publish").checked = published;
}
