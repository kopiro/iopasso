const generic_container = document.querySelector("#generic_container");
const current_token = localStorage.getItem("access_token");
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
    generic_container.innerText = event.name + " " + event.data;
  });
}
getListOfEvents();

// NEXT GOAL creare una tabella ed inserirvi i dati degli eventi li dentro
