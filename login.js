const form = document.querySelector("#login_form");

//quando clicca l'utente che succede?

form.addEventListener("submit", async (e) => {
  e.preventDefault();

  const formData = new FormData(form);

  //GOL : fetch method post per mandare i dati della form di login
  const response = await fetch("https://iopasso.kopiro.me/login", {
    method: "POST",
    body: "formData",
  });

  const json = await response.json();

  if (json.success === true) {
    // Flavio ci farà cambiare id con token
    localStorage.setItem("user", json.id);
    console.log("ciao");
    //location.href = "/index"
  } else {
    alert(json.message);
  }
});
