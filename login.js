const form = document.querySelector("#login_form");

//quando clicca l'utente che succede?

form.addEventListener("submit", async (e) => {
  e.preventDefault();

  const formData = new FormData(form);

  //GOL : fetch method post per mandare i dati della form di login
  const response = await fetch("/login", {
    method: "POST",
    body: "formData",
  });

  const json = response.json();

  if (json.error === false) {
    location.href = "/index.html";
  }
});
