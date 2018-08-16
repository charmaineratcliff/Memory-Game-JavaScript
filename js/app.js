// List to hold all of the cards

const cards = ['fa fa-apple', 'fa fa-apple',
'fa fa-bluetooth-b', 'fa fa-bluetooth-b',
'fa fa-copy', 'fa fa-copy',
'fa fa-wifi', 'fa fa-wifi',
'fa fa-save', 'fa fa-save',
'fa fa-android', 'fa fa-android',
'fa fa-gamepad', 'fa fa-gamepad',
'fa fa-power-off', 'fa fa-power-off',
];

const cardDeck = document.querySelector(".deck");

let openCards = [];
let matchedCards = [];

//Timer variables

let second = 0, minute = 0;
let timer = document.querySelector(".timer");

//Modal variables
let modal = document.getElementById("modal");

// Shuffle function from http://stackoverflow.com/a/2450976
function shuffle(array) {
    var currentIndex = array.length, temporaryValue, randomIndex;

    while (currentIndex !== 0) {
        randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex -= 1;
        temporaryValue = array[currentIndex];
        array[currentIndex] = array[randomIndex];
        array[randomIndex] = temporaryValue;
    };
    return array;
}

// Starts the game and builds the cards into the game

function startGame(){
  // Shuffle cards
  const shuffledCards = shuffle(cards);

  for (let i = 0; i < cards.length; i++) {
    const card = document.createElement("li");
    card.classList.add("card");
    card.innerHTML = `<i class="${cards[i]}"></i>`;
    cardDeck.appendChild(card);

    // Adds a click event to each card
    click(card);
  }

  // Reset Timer
  second = 0;
  minute = 0;
  timer.innerHTML = "00:00";
}

// Card being clicked event
function click(card) {

  card.addEventListener("click", function() {

    const currentCard = this;
    const previousCard = openCards[0];

    if(openCards.length === 1) {

      card.classList.add("open", "show", "disable");
      openCards.push(this);

      compare(currentCard, previousCard);


    } else {
      // When you do not have any opened cards
      currentCard.classList.add("open", "show", "disable");
      openCards.push(this);
    }

  });
}

//Compares the 2 opened cards
function compare(currentCard, previousCard) {

  //Pointer event to stop overclicking issue
  cardDeck.style.pointerEvents = "none";

  //Matches
  if(currentCard.innerHTML === previousCard.innerHTML) {
    //Match
    currentCard.classList.add("match");
    previousCard.classList.add("match");

    matchedCards.push(currentCard, previousCard);

    openCards = [];

    //See if the game is over
    gameOver();

  } else {
    //Not a match
    currentCard.classList.add("notmatch");
    previousCard.classList.add("notmatch");

    //Wait 500ms before removing the classes.
    setTimeout(function() {
      currentCard.classList.remove("open", "show", "disable", "notmatch");
      previousCard.classList.remove("open", "show", "disable", "notmatch");
      openCards = [];

      //Pointer event to stop overclicking issue
      //cardDeck.style.pointerEvents = "auto";
    }, 500);
  }
  //Adds a move
  addMoves();

  setTimeout(function() {
    //Pointer event to stop overclicking issue
    cardDeck.style.pointerEvents = "auto";
  }, 500);
}

//Checks if the game is over
function gameOver() {
  if(matchedCards.length === cards.length) {
    youWon();
  }
}

//Add moves
const movesContainer = document.querySelector(".moves");
let moves = 0;
movesContainer.innerHTML = 0;
function addMoves() {
  moves++;
  movesContainer.innerHTML = moves;

  //Starts timer on the first moves
  if (moves === 1) {
    second = 0;
    minute = 0;
    startTimer();
  }
  //Checks and sets the rating
  rating();
}

// Rating
const starsContainer = document.querySelector(".stars");

const star = `<i class="fa fa-star"></i>`;

starsContainer.innerHTML = star + star + star;

function rating () {
  switch(moves) {
    case 15:
      starsContainer.innerHTML = star + star + star;
    break;

    case 20:
      starsContainer.innerHTML = star + star;
    break;

    case 25:
      starsContainer.innerHTML = star;
    break;
  }

}

//Timer

function startTimer(){
  ticker = setInterval(function(){
    timer.innerHTML = minute + ":" + second;
    second++;
    if(second == 60) {
      minute++;
      second=0;
    }
  }, 1000);
};

function stopTimer(){
  clearInterval(ticker);
};

// Reset button
const resetButton = document.querySelector(".restart");
resetButton.addEventListener("click", function() {
  // Clears the openCards array
  openCards = [];

  // Deletes all cards
  cardDeck.innerHTML = "";

  // Calls startGame to make new cards
  startGame();

  // Resets any related variables
  matchedCards = [];
  moves = 0;
  movesContainer.innerHTML = moves;
  starsContainer.innerHTML = star + star + star;



  //Reset timer
  timer.innerHTML = "00:00";
  stopTimer();

});

//Modal function
function youWon() {
  clearInterval(ticker);
  totalTime = timer.innerHTML;

  //Show modal
  modal.classList.add("show");

  let starRating = document.querySelector(".stars").innerHTML;

  //Show move, rating, time
  document.getElementById("totalMoves").innerHTML = moves+1; //Have to add one as moves returns moves minus one.
  document.getElementById("starRating").innerHTML = starRating;
  document.getElementById("totalTime").innerHTML = totalTime;

  stopTimer();
};


//Play again function for the modal
function playAgain(){
  modal.classList.remove("show");
  cardDeck.innerHTML = "";

  // Calls startGame to make new cards
  startGame();

  // Resets any related variables
  matchedCards = [];
  moves = 0;
  movesContainer.innerHTML = moves;
  starsContainer.innerHTML = star + star + star;

  //Reset timer
  timer.innerHTML = "00:00";
  stopTimer();
};


//Starts the game the first time
startGame();
