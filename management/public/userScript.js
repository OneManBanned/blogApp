const form = document.querySelector("form");
const inputs = document.querySelectorAll("input");

form.addEventListener("submit", handleFormSubmit);

async function handleFormSubmit(event) {
    event.preventDefault();

    const form = event.currentTarget;
    const url = form.action;

    try {
        const formData = new FormData(form);
        const responseData = await postFormDataAsJson({ url, formData });

        if (responseData.success) {
            if (responseData.token) {
                localStorage.setItem("token", responseData.token);
            }
            location.href = `http://localhost:9999${form.attributes[1].value}`;
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

    const fetchOptions = {
        method: "POST",
        headers: {
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

function displayServerErrors(errors, inputs) {
    for (let i = 0; i < inputs.length; i++) {
        let input = inputs[i];
        let span = input.nextElementSibling;
        input.name in errors
            ? (span.innerHTML = errors[input.name])
            : (span.innerHTML = "");
    }
}
