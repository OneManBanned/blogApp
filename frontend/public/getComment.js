window.addEventListener("load", displayComment);

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

    textarea.innerHTML = content

}

