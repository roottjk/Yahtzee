"use strict";

// Constructer Function for the dices Dices
// property number counts the number of the dice. We have 5 and each one has a unique number starting 1 to 5
// property statusHold is boolean and determines whether the hold button is active or not
const Dice = function(number, statusHold) {
  this.diceNumber = number;
  this.currentRoll = 0;
  this.statusHold = statusHold;
};
// Create Dice Objects 1 to 6
const dice1 = new Dice(1, false);
const dice2 = new Dice(2, false);
const dice3 = new Dice(3, false);
const dice4 = new Dice(4, false);
const dice5 = new Dice(5, false);

// Array of Dices to work with indexes
let dices = [dice1, dice2, dice3, dice4, dice5];

//Reset everything at start
init();

//! Toggle the different Windows // Toggle Result Window //todo remove this eventlistener when finished. only to can toggle of the store result of the round windows

document.querySelector(".btn-results").addEventListener("click", () => {
  document.querySelector(".resultArea").classList.toggle("display");
});
// New Game Functionality, Toggles Windows if game should really be reseted
document.querySelector(".btn-new").addEventListener("click", () => {
  document.querySelector(".holdArea").classList.remove("active");
  document.querySelector(".newGameArea").classList.toggle("display");
});
// if newGame confirmed with click, call init function and reset everything
document.querySelector(".resetButton").addEventListener("click", () => {
  init();
  document.querySelector(".newGameArea").classList.remove("display");
  document.querySelector(".resultArea").classList.remove("display");
});
document.querySelector(".cancelButton").addEventListener("click", () => {
  document.querySelector(".newGameArea").classList.remove("display");
});

//! Main Game Algorithm Starting with Roll Button
// Click Event Roll Button. Set random Numbers to the Dice Objects if roll button is clicked and hold button is not active.active
// if hold button ic clicked then no new random number will be stored in the dice object. it will instead stays of course the holded value.
// also runs dicing animation if hold button is not active
// also checks the results after each round and offers to store the possible scores. every figure isonly possible to score once!
document.querySelector(".btn-roll").addEventListener("click", () => {
  document.querySelector(".holdArea").classList.add("active");
  throwDices();
  updateThrowCounter();
  resetOffers();
  //todo loading bar animation not working so far
  loadingBarActive();
  document.querySelector(".resultArea").classList.remove("display");
  //if neues spiel...same as new game!
  if (counterThrows === 0 && counterRound === 12) {
    alert(
      `You finished the game with a total score of ${score}! Congratulations!`
    );
    init();
  } else if (counterThrows === 0) {
    // Update Throw Counter and Round Counter
    document.querySelector(".roundNumber").textContent = counterRound += 1;
    counterThrows = 3;
    document.querySelector(".throwsNumber").textContent = counterThrows;
    document.querySelector(".resultArea").classList.toggle("display");

    roundArrayFinal = [
      dice1.currentRoll,
      dice2.currentRoll,
      dice3.currentRoll,
      dice4.currentRoll,
      dice5.currentRoll
    ];
    // create an Array with the amount of thrown number like 2 ones and 3 fours thrown.
    //with this info its possible to check the possible cores in a loop
    checkResultsOfRound(roundAnalyseArray);

    //Loop to check the score of each possible number (1 to 6)
    for (let i = 1; i <= 6; i++) {
      let offerSelector = `.offer${i}`;
      if (
        roundAnalyseArray[i - 1] > 0 &&
        document.querySelector(`.store${i}`).textContent === "0"
      ) {
        document.querySelector(offerSelector).textContent =
          i * roundAnalyseArray[i - 1];
      }
    }
    // Offer the values for the special hands but only if there is not a value in the stored section for this special hand
    // thats because you can only store a special hand only one time per game. there is no way to count the points for 2 pokers in one game.
    // two of a kind, three of a kind, street, fullhouse, poker and yahtzee

    //check for dices wich are two or three times in the roundfinalarray. if happens to be true, set the variables to true.
    for (let number in roundAnalyseArray) {
      if (roundAnalyseArray[number] === 3) threes = true;
      if (roundAnalyseArray[number] === 2) twoes = true;

      //* Check Yahtzee
      if (
        roundAnalyseArray[number] === 5 &&
        document.querySelector(".store12").textContent === "0"
      ) {
        document.querySelector(".offer12").textContent = "50";
        alert("Yahtzee!!!");
      }

      //* Check Poker
      if (
        roundAnalyseArray[number] === 4 &&
        document.querySelector(".store11").textContent === "0"
      ) {
        document.querySelector(".offer11").textContent = "40";
        alert("POKER!!!");
      }

      //* Check Full House
      if (
        twoes &&
        threes &&
        document.querySelector(".store10").textContent === "0"
      ) {
        document.querySelector(".offer10").textContent = "35";
        alert("Full House");
      }

      //* Check 3 of a Kind
      if (
        (roundAnalyseArray[number] === 3 ||
          roundAnalyseArray[number] === 4 ||
          roundAnalyseArray[number] === 5) &&
        document.querySelector(".store7").textContent === "0"
      ) {
        document.querySelector(".offer7").textContent = "25";
        alert("Three of a Kind");
      }

      //* Check Streets
      let checkStreetString = roundAnalyseArray.join("");
      if (
        checkStreetString === "111110" &&
        document.querySelector(".store8").textContent === "0"
      ) {
        document.querySelector(".offer8").textContent = "20";
        alert("Small Street");
      } else if (
        checkStreetString === "011111" &&
        document.querySelector(".store9").textContent === "0"
      ) {
        document.querySelector(".offer9").textContent = "20";
        alert("Big Street");
      }
    }
    // Hide Hold Buttons in this Situation. Else the user could Hold buttons for the next round. But they have to
    // be completleyrandom again
    document.querySelector(".holdArea").classList.remove("active");
    resetHoldButton();
    resetRoundArrayFinal();
    resetTwoesThrees();
  }
});
// Hold Event Listener set Status of Hold to true if clicked. if declicked set the status to false. Easy right?
for (let i = 1; i <= 5; i++) {
  document.querySelector(".hold-" + i).addEventListener("click", function() {
    document.querySelector(".hold-" + i).classList.toggle("active");
    dices[i - 1].statusHold === false
      ? (dices[i - 1].statusHold = true)
      : (dices[i - 1].statusHold = false);
  });
}
