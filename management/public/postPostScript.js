const form = document.querySelector("form");
const inputs = document.querySelectorAll("input");

form.addEventListener("submit", handleFormSubmit);


async function handleFormSubmit(event) {
    event.preventDefault();
    console.log("SENDING")

    const form = event.currentTarget;
    const url = form.action;

    try {
        const formData = new FormData(form);
        const responseData = await postFormDataAsJson({ url, formData });

        console.log(responseData)
        if (responseData.success) {
            location.href = "http://localhost:9999/"
        } else {
            displayServerErrors(responseData, inputs);
        }
    } catch (error) {
        console.error(error);
    }
}

async function postFormDataAsJson({ url, formData }) {
    const plainFormData = Object.fromEntries(formData.entries());
    const formDataJsonString = JSON.stringify(plainFormData);
    const token = localStorage.getItem("token")

    console.log("Token: ", token)

    const fetchOptions = {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`
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

function displayServerErrors(errors, inputs) {
    for (let i = 0; i < inputs.length; i++) {
        let input = inputs[i];
        let span = input.nextElementSibling;
        input.name in errors
            ? (span.innerHTML = errors[input.name])
            : (span.innerHTML = "");
    }
}
