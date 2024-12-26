const container = document.querySelector("#container");
window.addEventListener("load", () => {
    displayPost(), displayComment();
});

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
    const container = document.querySelector("#post")

    const h1 = document.createElement("h1");
    h1.innerHTML = title;

    const p = document.createElement("p");
    p.innerHTML = content;

    const comment = createCommentForm(id);

    container.appendChild(h1);
    container.appendChild(p);
    container.appendChild(comment);
}

function createCommentForm(id) {
    const commentForm = document.createElement("form");
    commentForm.addEventListener("submit", handleFormSubmit);

    const textArea = document.createElement("textarea");
    textArea.name = "comment";
    commentForm.appendChild(textArea);

    const span = document.createElement("span");
    commentForm.appendChild(span);

    const commentButton = document.createElement("button");
    commentForm.action = `http://localhost:3000/post/${id}/comment`;
    commentButton.type = "submit";
    commentButton.innerHTML = "Comment";
    commentForm.appendChild(commentButton);
    return commentForm;
}

async function handleFormSubmit(event) {
    event.preventDefault();
    const inputs = document.querySelector("textarea");

    const form = event.currentTarget;
    const url = form.action;

    try {
        const formData = new FormData(form);
        const responseData = await sendFormDataAsJson({ url, formData });

        if (responseData.success) {
            location.href = `http://localhost:5000${location.pathname}`;
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

async function displayComment() {
    if (token) {
        const responseData = await fetchComment(
            token,
            `http://localhost:3000/post${location.pathname}/comments`,
        );
        displayComments(responseData);
    } else {
        location.href = `http://localhost:5000${location.pathname}`;
    }
}

function displayComments(data) {
    const { ...comments } = data
    const container = document.querySelector("#comments")

    for (let i in comments) {
        console.log(comments[i])
        const commentDiv = document.createElement("div")
        const p = document.createElement("p")
        p.innerHTML = comments[i].content
        commentDiv.appendChild(p)

        const a = document.createElement("a")
        a.href = `http://localhost:5000/comment/${comments[i].id}`
        a.innerHTML = "Edit"

        container.appendChild(commentDiv)
        container.appendChild(a) 
    }

}

async function fetchComment(token, url) {
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
