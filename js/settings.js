docReady(() => {
  const name = document.querySelector("#name");
  const email = document.querySelector("#email");

  getMe().then((me) => {
    name.value = me.name;
    email.value = me.email;
  });
});

//fare un addEventListner al modify button e una fetch con event.preventDefault  che invii i dati modificati al server

//aggiungere la possibilta' di cambiare immagine del profilo
