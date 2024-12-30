const form = document.querySelector("form");
window.addEventListener("load", displayComment);

form.addEventListener("submit", handleFormSubmit);

async function displayComment() {
    if (token) {
        const responseData = await fetchPosts(
            token,
            `http://localhost:3000/post${location.pathname}`,
        );
        display(responseData);
    } else {
        location.href = "http://localhost:5000/";
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

function display(data) {
    const textarea = document.querySelector("#comment");
    const { content } = data;

    textarea.innerHTML = content;
}
console.log(document.referrer)

async function handleFormSubmit(event) {
    event.preventDefault();

    const form = event.currentTarget;
    const url = form.action + location.pathname;

    try {
        const formData = new FormData(form);
        const responseData = await postFormDataAsJson({ url, formData, token });

        if (responseData.success) {
            location.href = document.referrer;
        } else {
            displayServerErrors(responseData, inputs);
        }
    } catch (error) {
        console.error(error);
    }
}

async function postFormDataAsJson({ url, formData, token }) {
    const plainFormData = Object.fromEntries(formData.entries());
    const formDataJsonString = JSON.stringify(plainFormData);

    const fetchOptions = {
        method: "PUT",
        headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
        },
        body: formDataJsonString,
    };

    const response = await fetch(url, fetchOptions);

    if (!response.ok) {
        const errorMessage = await response.text();
        throw new Error(errorMessage);
    }

    return response.json();
}
