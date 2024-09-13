export { showNameDialog, player1Name };

let player1Name;

const showNameDialog = function displayDialogForFirstPlayerNameEntry() {
  const nameDialog = document.querySelector("dialog#player-name");
  enableNameButton();
  nameDialog.showModal();
};

const enableNameButton = function enableNameButtonToReturnPlayerName() {
  const button = document.querySelector("dialog#player-name button");
  const nameDialog = document.querySelector("dialog#player-name");
  button.addEventListener("click", () => {
    const val = document.querySelector("dialog#player-name input").value;
    nameDialog.close();
    player1Name = val;
    showRulesDialog();
  });
};

const showRulesDialog = function displayDialogDescribingGameRules() {
  const rulesDialog = document.querySelector("dialog#rules");
  rulesDialog.showModal();
  enableRulesButton();
};

const enableRulesButton =
  function addEventListenerToRulesDialogButtonToCloseDialog() {
    const rulesButton = document.querySelector("dialog#rules button");
    rulesButton.addEventListener("click", () => {
      document.querySelector("dialog#rules").close();
    });
  };
