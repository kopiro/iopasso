docReady(() => {
  const container = document.querySelector("#container");
  const total_events = document.querySelector("#total_events");
  const next_event = document.querySelector("#next_event");
  const current_token = localStorage.getItem("access_token");

  getListOfEvents().then((json) =>
    json.data.forEach((event) => {
      // controllare quanti eventi sono in passato e quanti in presente (fare un if con la time-now)
      //sommare tutti gli eventi creati fin ora e mostrarli nella side_right

      const div = document.createElement("a");
      div.href = `/form_event.html?id=${event.id}`;
      div.innerText = event.name + " " + event.datetime + " ";
      next_event.append(div);
    })
  );

  readCollectionEvent().then((json) => {
    total_events.innerText = json.total;
  });

  // NEXT GOAL
  // mandare la mail di partecipazione all'evento
  //contare il punteggio di ogni user, quindi ogni singolo utente a quanti eventi
  // ha partecipato nella lista totale degli eventi ?
});
