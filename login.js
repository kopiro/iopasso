const form = document.querySelector("#login_form");

//quando clicca l'utente che succede?

form.addEventListener("submit", async (e) => {
  e.preventDefault();

  const formData = new FormData(form);

  //GOL : fetch method post per mandare i dati della form di login
  const response = await fetch("https://iopasso.kopiro.me/login", {
    method: "POST",
    body: formData,
  });

  const json = await response.json();

  if (json.access_token) {
    // Flavio ci farà cambiare id con token
    localStorage.setItem("access_token", json.access_token);
    location.href = "/index.html";
  } else {
    const box_error = document.querySelector("#box_error");
    box_error.classList.remove("box_error");
    const genericMessage = json.message;
    box_error.innerText = "* " + genericMessage + "!";
  }
});
