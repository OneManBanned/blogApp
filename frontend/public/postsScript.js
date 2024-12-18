window.addEventListener("load", displayPosts);

async function displayPosts() {
    if (token) {
        const responseData = await fetchPosts(token);
        //display data
    } else {
        location.href = "http://localhost:5000/register";
    }
}

async function fetchPosts(token) {
    const fetchOptions = {
        method: "GET",
        headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
        },
    };

    const response = await fetch("http://localhost:3000/post", fetchOptions);

    if (!response.ok) {
        const errorMessage = await response.text();
        throw new Error(errorMessage);
    }

    return response.json();
}
