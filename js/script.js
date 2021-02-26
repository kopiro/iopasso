const container = document.querySelector("#container");
const current_token = localStorage.getItem("access_token");
const user = document.querySelector("#user-online");
const profile_image = document.querySelector("#profile-image");

async function getMe() {
  const response = await fetch(`${window.API_URL}/users/me`, {
    method: "GET",
    headers: {
      authorization: "Bearer " + current_token,
    },
  });
  const me = await response.json();
  const user_online = me.name;
  user.innerText = user_online;
  profile_image.src = me.image;
}
getMe();

//ci prendiamo la lista degli eventi creati fin ora da tutti gli utenti
async function getListOfEvents() {
  const response = await fetch(`${window.API_URL}/events?limit=2&page=0`, {
    method: "GET",
    headers: {
      authorization: "Bearer " + current_token,
    },
  });
  //prendiamo solo il nome e l'indirizzo di ogni singolo evento creato fin ora
  const json = await response.json();
  json.data.forEach((event) => {
    container.innerText = event.name + " " + event.data;
  });
}
getListOfEvents();

// NEXT GOAL creare una tabella ed inserirvi i dati degli eventi li dentro
