const board_el = document.querySelector("#board");
const cell_els = document.querySelectorAll("#board .cell");
const combinations = [
  [0, 1, 2],
  [3, 4, 5],
  [6, 7, 8],
  [0, 3, 6],
  [1, 4, 7],
  [2, 5, 8],
  [0, 4, 8],
  [2, 4, 6],
];
let currentTurn;

setup();

function setup() {
  board_el.classList.remove("turn-x", "turn-o");

  for (let cell of cell_els) {
    cell.classList.remove("x", "o");
    cell.addEventListener("click", fillCell, { once: true });
  }
  currentTurn = Math.round(Math.random(0, 1)) == 1 ? "x" : "o";
  board_el.classList.add("turn-" + currentTurn);
}

function fillCell() {
  this.classList.add(currentTurn);

  if (checkForWin()) {
    const restart = confirm(
      currentTurn.toUpperCase() + " is the winner! Restart?"
    );

    if (restart) setup();
  } else if (checkForDraw()) {
    const restart = confirm(" It's a draw! Restart?");

    if (restart) setup();
  } else {
    currentTurn = currentTurn == "x" ? "o" : "x";
    board_el.classList.remove("turn-o", "turn-x");
    board_el.classList.add("turn-" + currentTurn);
  }
}

function checkForWin() {
  return combinations.some((combination) => {
    return combination.every((c) => {
      if (cell_els[c].classList.contains(currentTurn)) {
        return true;
      }
      return false;
    });
  });
}
function checkForDraw() {
  return [...cell_els].every((c) => {
    if (c.classList.contains("x") || c.classList.contains("o")) {
      return true;
    }
    return false;
  });
}
