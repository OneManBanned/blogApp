const container = document.querySelector("#container");
window.addEventListener("load", displayPost);

async function displayPost() {
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
    const { id, title, content } = data;

    const h1 = document.createElement("h1");
    h1.innerHTML = title;

    const p = document.createElement("p");
    p.innerHTML = content;

    const comment = createCommentForm(id);

    document.querySelector("body").appendChild(h1);
    document.querySelector("body").appendChild(p);
    document.querySelector("body").appendChild(comment);
}

function createCommentForm(id) {
    const commentForm = document.createElement("form");
    commentForm.addEventListener("submit", handleFormSubmit);

    const textArea = document.createElement("textarea");
    textArea.name = "comment";
    commentForm.appendChild(textArea);

    const span = document.createElement("span")
    commentForm.appendChild(span)

    const commentButton = document.createElement("button");
    commentForm.action = `http://localhost:3000/post/${id}/comment`;
    commentButton.type = "submit";
    commentButton.innerHTML = "Comment";
    commentForm.appendChild(commentButton);
    return commentForm;
}

async function handleFormSubmit(event) {
    event.preventDefault();
    const inputs = document.querySelector("textarea")

    const form = event.currentTarget;
    const url = form.action;

    try {
        const formData = new FormData(form);
        const responseData = await sendFormDataAsJson({ url, formData });

        if (responseData.success) {
            location.href = "http://localhost:9999/";
        } else {
            displayServerErrors(responseData, [inputs]);
        }
    } catch (error) {
        console.error(error);
    }
}

function displayServerErrors(errors, inputs) {
    for (let i = 0; i < inputs.length; i++) {
        let input = inputs[i];
        let span = input.nextElementSibling;
        input.name in errors
            ? (span.innerHTML = errors[input.name])
            : (span.innerHTML = "");
    }
}

async function sendFormDataAsJson({ url, formData }) {
    const plainFormData = Object.fromEntries(formData.entries());
    const formDataJsonString = JSON.stringify(plainFormData);

    const fetchOptions = {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
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
