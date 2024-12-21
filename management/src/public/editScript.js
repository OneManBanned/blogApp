window.addEventListener("load", displayPosts);

async function displayPosts() {
    if (token) {
        const responseData = await fetchPosts(token, "http://localhost:3000/post/1");
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

