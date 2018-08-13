// List to hold all of the cards

const cards = ['fa fa-apple', 'fa fa-apple',
'fa fa-anchor', 'fa fa-anchor',
'fa fa-bicycle', 'fa fa-bicycle',
'fa fa-bolt', 'fa fa-bolt',
'fa fa-bomb', 'fa fa-bomb',
'fa fa-diamond', 'fa fa-diamond',
'fa fa-leaf', 'fa fa-leaf',
'fa fa-paper-plane-o', 'fa fa-paper-plane-o',
];

const cardDeck = document.querySelector(".deck");

let openCards = [];
let matchedCards = [];

// Shuffle function from http://stackoverflow.com/a/2450976
function shuffle(array) {
    var currentIndex = array.length, temporaryValue, randomIndex;

    while (currentIndex !== 0) {
        randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex -= 1;
        temporaryValue = array[currentIndex];
        array[currentIndex] = array[randomIndex];
        array[randomIndex] = temporaryValue;
    }

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

    // Let's the cards wait 500 ms before doing this
    setTimeout(function() {
      currentCard.classList.remove("open", "show", "disable");
      previousCard.classList.remove("open", "show", "disable");
      openCards = [];
    }, 500);
  }

  //Adds a move
  addMoves();
}

//Checks if the game is over
function gameOver() {
  if(matchedCards.length === cards.length) {
    alert("Game Over!");
  }
}

//Add moves
const movesContainer = document.querySelector(".moves");
let moves = 0;
movesContainer.innerHTML = 0;
function addMoves() {
  moves++;
  movesContainer.innerHTML = moves;

  //Checks and sets the rating
  rating();
}

// Rating
const starsContainer = document.querySelector(".stars");

const star = `<li><i class="fa fa-star"></i></li>`;

starsContainer.innerHTML = star + star + star;

function rating () {
  switch(moves) {
    case 10:
      starsContainer.innerHTML = star + star + star;
    break;

    case 15:
      starsContainer.innerHTML = star + star;
    break;

    case 20:
      starsContainer.innerHTML = star;
    break;
  }

}

//Timer

let second = 0, minute = 0, hour = 0;
let timer = document.querySelector(".timer")

function startTimer(){
  interval = setInterval(function(){
    timer.innerHTML = minute + "Mins " + second + "Secs ";
    second++;
    if(second == 60) {
      minute++;
      second=0;
    }
    if(minute == 60) {
      hour++;
      minute = 0;
    }
  }, 1000);
}


// Reset button
const resetButton = document.querySelector(".restart");
resetButton.addEventListener("click", function() {
  // Deletes all cards
  cardDeck.innerHTML = "";

  // Calls startGame to make new cards
  startGame();

  // Resets any related variables
  matchedCards = [];
  moves = 0;
  movesContainer.innerHTML = moves;
  starsContainer.innerHTML = star + star + star;
});

//Starts the game the first time
startGame();
