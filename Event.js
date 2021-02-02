const form_event = document.querySelector("#form_event");
//Get identify token from localStorage to be authorized later from the server {attention!! GetItem() need only the key value!}
const current_token = localStorage.getItem("access_token");

//Make a fetch in get from file Me in the server to know all users' online data {es. name= Ani, id=2, email=ani@me.com etc...}
async function getMe() {
  const response = await fetch("https://iopasso.kopiro.me/me", {
    method: "GET",
    headers: {
      authorization: "Bearer " + current_token,
    },
  });
  const me = await response.json();
  const user_online = me.name;
  console.log(user_online);
  return user_online;
}
//Call ALWAYS the fuynction to be data usable!
getMe();
//Fetch in get to the server from Guests file to
//creo asyc funnction per prendere con la fetch in get la lista di tutti gli utenti
async function listGuests() {
  const response = await fetch("https://iopasso.kopiro.me/guests", {
    method: "GET",
    headers: {
      authorization: "Bearer " + current_token,
    },
  });
  // trasformiamo la lista in json
  const guests = await response.json();

  //prendiamo l'elemento select dall´html
  const select = document.querySelector("#guests");
  //cicliamo la risposta della fetch in get per prenderci solo il nome dell'utente
  for (const item of guests) {
    //abbiamo creato l'elemento html option del tag select in javascript
    const options = document.createElement("option");
    options.text = item.name;
    //abbiamo aggiunto i nomi degli utenti come option del select
    select.options.add(options);
  }
}
//richiamiamo la funzione
listGuests();
//al submit il form non deve inviare i dati dell'evento perchè vogliamo usare la fetch
form_event.addEventListener("submit", async (e) => {
  e.preventDefault();
  const formData = new FormData(form_event);

  const select = document.querySelector("#guests");

  const response = await fetch("https://iopasso.kopiro.me/form_event", {
    method: "POST",
    body: formData,
  });
});
