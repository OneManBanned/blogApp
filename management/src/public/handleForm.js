const form = document.querySelector("form");
const inputs = document.querySelectorAll("input");

form.addEventListener("submit", handleFormSubmit)

async function handleFormSubmit(event) {
    event.preventDefault();

    const form = event.currentTarget;
    const url = form.action;

    try {
        console.log("Hello", url)
        const formData = new FormData(form);
        const responseData = await sendFormDataAsJson({ url, formData });

        if (responseData.success) {
            location.href = "http://localhost:9999/";
        } else {
            displayServerErrors(responseData, inputs);
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
