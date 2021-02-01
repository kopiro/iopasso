const form_event = document.querySelector("#form_event");
//creare una fetch per richiamare i dati dell'utente in corso

// prendiamo il token identificativo per farci riconoscere dal server (il getItem vuole solo la chiave)
const current_token = localStorage.getItem("access_token");

async function getMe() {
  const me_response = await fetch("https://iopasso.kopiro.me/me", {
    method: "GET",
    headers: {
      authorization: "Bearer " + current_token,
    },
  });
  const me_json = await me_response.json();
  const user_online = me_json.name;
  console.log(user_online);
  return user_online;
}

getMe();

//creo asyc funnction per prendere con la fetch in get la lista di tutti gli utenti
async function listGuests() {
  const guests_response = await fetch("https://iopasso.kopiro.me/guests", {
    method: "GET",
    headers: {
      authorization: "Bearer " + current_token,
    },
  });
  // trasformiamo la lista in json
  const guest_json = await guests_response.json();

  //prendiamo l'elemento select dall´html
  const select = document.querySelector("#guest");
  //cicliamo la risposta della fetch in get per prenderci solo il nome dell'utente
  for (const i of guest_json) {
    //abbiamo creato l'elemento html option del tag select in javascript
    const options = document.createElement("option");
    options.text = i.name;
    //abbiamo aggiunto i nomi degli utenti come option del select
    select.options.add(options);
  }
}
//richiamiamo la funzione
listGuests();

form_event.addEventListener("submit", async (e) => {
  e.preventDefault();
  const formData = new FormData(form_event);

  const select = document.querySelector("#guest");

  const response = await fetch("https://iopasso.kopiro.me/form_event", {
    method: "POST",
    body: formData,
  });
});
