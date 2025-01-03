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
    const container = document.querySelector("#post");

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
    commentForm.addEventListener("submit", (e) => handleFormSubmit(e, 'POST'));

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

async function handleFormSubmit(event, method) {
    event.preventDefault();
    const inputs = document.querySelector("textarea");

    const form = event.currentTarget;
    const url = form.action;

    try {
        const formData = new FormData(form);
        const responseData = await sendFormDataAsJson({ url, formData, method });

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

async function sendFormDataAsJson({ url, formData, method}) {
    const plainFormData = Object.fromEntries(formData.entries());
    const formDataJsonString = JSON.stringify(plainFormData);

    console.log(url)
    const fetchOptions = {
        method: method,
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
    const { comments, userId: id } = data;
    const container = document.querySelector("#comments");

    for (let i = 0; i < comments.length; i++) {
        const commentDiv = document.createElement("div");
        commentDiv.id = "commentDiv";
        const p = document.createElement("p");
        p.innerHTML = comments[i].content;
        commentDiv.appendChild(p);

        if (comments[i].authorId === id) {
            const delForm = document.createElement("form")
            const delButton = document.createElement("button");
            delForm.action = `http://localhost:3000/post/comment/${comments[i].id}`
            delForm.addEventListener("submit", (e) => handleFormSubmit(e, 'DELETE'))
            delForm.appendChild(delButton)
            delButton.innerHTML = "delete"

            const a = document.createElement("a");
            a.href = `http://localhost:5000/comment/${comments[i].id}`;
            a.innerHTML = "Edit";

            commentDiv.appendChild(a);
            commentDiv.appendChild(delForm);
        }

        container.appendChild(commentDiv);
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
