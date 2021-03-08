const current_token = localStorage.getItem("access_token");

docReady(() => {
  const container = document.querySelector("#container");
  const total_events = document.querySelector("#total_events");
  const next_event = document.querySelector("#next_event");

  getListOfEvents().then((json) => {
    json.data.forEach((event) => {
      // controllare quanti eventi sono in passato e quanti in presente (fare un if con la time-now)
      //sommare tutti gli eventi creati fin ora e mostrarli nella side_right

      const anchor = document.createElement("a");
      anchor.href = `/form_event.html?id=${event.id}`;
      anchor.innerText = event.name + " " + event.datetime + " ";
      next_event.append(anchor);
    });

    total_events.innerText = json.total;
  });

  // NEXT GOAL
  // mandare la mail di partecipazione all'evento
  //contare il punteggio di ogni user, quindi ogni singolo utente a quanti eventi
  // ha partecipato nella lista totale degli eventi ?
});
