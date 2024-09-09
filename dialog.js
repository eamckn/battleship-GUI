export { showNameDialog, player1Name };

const body = document.querySelector("body");

let player1Name;

const showNameDialog = function displayDialogForFirstPlayerNameEntry() {
  const nameDialog = document.querySelector("dialog#player-name");
  enableNameButton();
  nameDialog.showModal();
};

// const buildNameDialog = function buildDialogForFirstPlayerNameEntry() {
//   const nameDialog = document.createElement("dialog");
//   nameDialog.setAttribute("id", "player-name");

//   const nameForm = document.createElement("form");
//   nameForm.setAttribute("method", "dialog");

//   const p = document.createElement("p");
//   p.innerHTML = "Welcome to";

//   const battleshipHeader = document.createElement("h1");
//   battleshipHeader.innerHTML = "BATTLESHIP";

//   const label = document.createElement("label");
//   label.setAttribute("for", "player-one-name");
//   label.innerHTML = "Please enter your name:";

//   const input = document.createElement("input");
//   input.setAttribute("type", "text");
//   input.setAttribute("name", "player-one-name");
//   input.setAttribute("id", "player-one-name");

//   const button = document.createElement("button");
//   button.innerHTML = "Submit";
//   button.addEventListener("click", () => {
//     const val = document.querySelector("dialog#player-name input").value;
//     console.log(val);
//     console.log(nameDialog);
//     nameDialog.close();
//   });

//   nameForm.appendChild(p);
//   nameForm.appendChild(battleshipHeader);
//   nameForm.appendChild(label);
//   nameForm.appendChild(input);

//   nameDialog.appendChild(nameForm);
//   nameDialog.appendChild(button);

//   body.appendChild(nameDialog);
// };

const enableNameButton = function enableNameButtonToReturnPlayerName() {
  const button = document.querySelector("dialog#player-name button");
  const nameDialog = document.querySelector("dialog#player-name");
  button.addEventListener("click", () => {
    const val = document.querySelector("dialog#player-name input").value;
    //console.log(val);
    nameDialog.close();
    player1Name = val;
    //console.log(player1Name);
  });
};
