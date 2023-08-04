"use strict";

let currentNumber;

const numbersContainer = document.querySelector(".numbers-container");
const squaresContainer = document.querySelector(".squares-container");
document.querySelectorAll(".number").forEach(numberSetUp);
document.querySelectorAll(".square").forEach(squareSetUp);
const checkBtn = document.querySelector(".checkout-btn");
checkBtn.addEventListener("click", checkEndGame);

function checkEndGame(event) {
  // Check at all the numbers have been placed.
  const numbersPlaced = squaresContainer.querySelectorAll(".number");
  console.log(numbersPlaced);
  if (numbersPlaced.length < 5) {
    alert("Faltan números por asignar!");
    return;
  }

  // Check that all the numbers are placed in the correct place
  let correctNumber = 1;
  let winner = true;
  for (const numberPlaced of numbersPlaced) {
    console.log(numberPlaced.textContent);
    if (correctNumber != parseInt(numberPlaced.textContent)) {
      numberPlaced.classList.add("number-missplaced");
      winner = false;
    } else {
      numberPlaced.classList.add("number-placed");
    }
    correctNumber++;
  }

  if (winner) {
    setTimeout(() => {
      resetGame();
    }, 500);
  }
}

function resetGame() {
  alert("Ganaste!");
}

console.log(numbersContainer);

numbersContainer.addEventListener("dragover", (event) => {
  event.preventDefault();
});
numbersContainer.addEventListener("drop", (event) => {
  event.target.appendChild(currentNumber);
});

function numberSetUp(numberItem) {
  numberItem.addEventListener("dragstart", onDragStart);
}

function onDragStart(event) {
  currentNumber = event.target;
  currentNumber.classList.remove("number-missplaced");
  currentNumber.classList.remove("number-placed");
}

function squareSetUp(squareItem) {
  squareItem.addEventListener("dragover", onDragOver);
  squareItem.addEventListener("drop", onDropOver);
}

function onDragOver(event) {
  console.log("You are over me!");
  event.preventDefault();
}

function onDropOver() {
  const children = this.children;
  if (children.length !== 0) {
    const child = children[0];
    numbersContainer.appendChild(child);
  }
  this.appendChild(currentNumber);
}
