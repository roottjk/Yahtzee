"use strict";

//Variables needed for counting rounds and throws
// There are 12 rounds. In each round you have 3 throws. After 12 rounds the games finishes
// Choose the place your store the result wisely so that after 12 rounds every possible storage place has a score
let counterRound, counterThrows;
counterThrows = 3;
counterRound = 1;

// variables needed for the gameplay
let score = 0;
let finRes = 0;
let twoes = false;
let threes = false;
let roundArrayFinal = [0, 0, 0, 0, 0];
// here are the thrown numbers checked on duplicates with the checkResultsOfRound(); function
let roundAnalyseArray = [0, 0, 0, 0, 0, 0];

//! Functions for Trowing the Dices
//Throw Dices but only the "not holded" dices
function throwDices() {
  for (let i = 1; i <= 5; i++) {
    if (dices[i - 1].statusHold === false) {
      dices[i - 1].currentRoll = randomNumber();
      dicingAnimation(i);
    }
    // show the rnadomly thrown dice for every dice
    document.querySelector(".dice-" + i).src =
      "/img/dice-" + dices[i - 1].currentRoll + ".png";
  }
}
// function for random number between 1 and 6
function randomNumber() {
  return Math.floor(Math.random() * 6) + 1;
}
// Function for the dicing animation
function dicingAnimation(diceNumber) {
  document.querySelector(".dice-" + diceNumber).classList.add("activeDice");
  document
    .querySelector(".dice-" + diceNumber)
    // wait for animation to end. then remove active class again. next function call animation can start again
    .addEventListener("animationend", function() {
      document
        .querySelector(".dice-" + diceNumber)
        .classList.remove("activeDice");
    });
}
function updateThrowCounter() {
  counterThrows--;
  document.querySelector(".throwsNumber").textContent = counterThrows;
}
//todo ladebalken funktioniert noch nicht!
function loadingBarActive() {
  document.querySelector(".loading").classList.add("activeThrow");
  document
    .querySelector(".loading")
    .addEventListener("animationend", function() {
      document.querySelector(".loading").classList.remove("activeThrow");
    });
}

//! Functions which takes care of the resultsof each round
// function checks how many ones, towes...where thrown and give back a result wich looks like
// [2, 0, 0, 1, 0, 2] this means: 2 ones, 0 twoes, 0 threes, 1 four, 0 five, 2 six
// the sum of these number has to be 5 of course because we throw 5 dices
function checkResultsOfRound(returnValue) {
  let diceResults = [1, 2, 3, 4, 5, 6];
  for (let compare = 1; compare <= diceResults.length; compare++) {
    for (let i = 0; i < 5; i++) {
      if (roundArrayFinal.indexOf(compare) !== -1) {
        roundArrayFinal.splice(roundArrayFinal.indexOf(compare), 1);
        returnValue[compare - 1]++;
      }
    }
  }
}

// Init Function
function init() {
  // set div windows to "not showing"

  document.querySelector(".resultArea").classList.remove("display");
  // reset dice images to standard
  for (let i = 1; i <= 5; i++) {
    document.querySelector(".dice-" + i).src = "/img/dice-" + i + ".png";
  }
  // reset counter variables
  counterRound = 1;
  document.querySelector(".roundNumber").textContent = counterRound;
  counterThrows = 3;
  document.querySelector(".throwsNumber").textContent = counterThrows;
  document.getElementById("score").textContent = "0";

  // reset hold buttons, lists, twoes threes, roundarrayfinal
  resetHoldButton();
  resetLists();
  resetTwoesThrees();
  resetRoundArrayFinal();
}

// Decide where you want to store the round result if there happens to be more than one possibility
// else store the result in the one possible field.
function saveClick(clickedId) {
  if (document.querySelector(`.offer${clickedId}`).textContent !== "0") {
    finRes = document.querySelector(`.offer${clickedId}`).textContent;
    document.querySelector(`.store${clickedId}`).textContent = finRes;
    document.querySelector(`.offer${clickedId}`).textContent = "0";
    score += parseInt(finRes);
    document.getElementById("score").textContent = score;
    resetHoldButton();
    resetTwoesThrees();
    resetOffers();
  } else {
    alert("Nothing to store!");
  }
}
//! RESET AND INIT Functions
// reset hold buttons
function resetHoldButton() {
  for (let i = 1; i <= 5; i++) {
    document.querySelector(".hold-" + i).classList.remove("active");
    dices[i - 1].statusHold === true
      ? (dices[i - 1].statusHold = false)
      : (dices[i - 1].statusHold = false);
  }
}

// RESET LISTS
function resetLists() {
  let sumList = document.querySelectorAll(".sum");
  for (let i = 0; i < sumList.length; i++) {
    sumList[i].textContent = "0";
  }

  let sumListRight = document.querySelectorAll(".sumRight");
  for (let i = 0; i < sumList.length; i++) {
    sumListRight[i].textContent = "0";
  }
  // reset Sums left and right
  let offerList = document.querySelectorAll(".offer");
  for (let i = 0; i < offerList.length; i++) {
    offerList[i].textContent = "0";
  }

  let offerListRight = document.querySelectorAll(".offerRight");
  for (let i = 0; i < offerListRight.length; i++) {
    offerListRight[i].textContent = "0";
  }
  // reset Sums left and right
  let sumListStore = document.querySelectorAll(".sumStore");
  for (let i = 0; i < sumListStore.length; i++) {
    sumListStore[i].textContent = "0";
  }

  let sumListRightStore = document.querySelectorAll(".sumRightStore");
  for (let i = 0; i < sumListRightStore.length; i++) {
    sumListRightStore[i].textContent = "0";
  }
  // reset Sums left and right
  let offerListStore = document.querySelectorAll(".offerStore");
  for (let i = 0; i < offerListStore.length; i++) {
    offerListStore[i].textContent = "0";
  }

  let offerListRightStore = document.querySelectorAll(".offerRightStore");
  for (let i = 0; i < offerListRightStore.length; i++) {
    offerListRightStore[i].textContent = "0";
  }
}

// function reset twoe and threes
// set twooes and threes of roundArray to false again
function resetTwoesThrees() {
  twoes = false;
  threes = false;
}
function resetRoundArrayFinal() {
  roundAnalyseArray = [0, 0, 0, 0, 0, 0];
}
function resetOffers() {
  // reset Offers
  let offerListStore = document.querySelectorAll(".offerStore");
  for (let i = 0; i < offerListStore.length; i++) {
    offerListStore[i].textContent = "0";
  }

  let offerListRightStore = document.querySelectorAll(".offerRightStore");
  for (let i = 0; i < offerListRightStore.length; i++) {
    offerListRightStore[i].textContent = "0";
  }

  let offerList = document.querySelectorAll(".offer");
  for (let i = 0; i < offerList.length; i++) {
    offerList[i].textContent = "0";
  }

  let offerListRight = document.querySelectorAll(".offerRight");
  for (let i = 0; i < offerListRight.length; i++) {
    offerListRight[i].textContent = "0";
  }
}
