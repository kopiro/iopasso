//creare un input selezione tramire CreateElement("")collegandolo all'html
// al click-->(addEventListener())parte la fetch
//dove l'utente puo scegliere gli invitati, tramite fetch
//cioè tutti quelli che si sono iscritti all'app
const response = [
  { id: 1, name: "Ani" },
  { id: 2, name: "Eni" },
  { id: 3, name: "Fulvio" },
];

const select = document.querySelector("#guest");

for (const i of response) {
  const options = document.createElement("option");
  options.text = i.name;
  select.options.add(options);
}
//add eventListner
//fetch
//ciclare la response del server e prenderci solo i valori di name

//create a html option tag for chose the guests
