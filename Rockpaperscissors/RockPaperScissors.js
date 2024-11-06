let score = JSON.parse(localStorage.getItem("score")) || {
  wins: 0,
  loses: 0,
  ties: 0,
};

updateScoreElement();
// if (!score) {
//   score = { wins: 0, loses: 0, ties: 0 };
// }

function pickComputerMove() {
  const randomNumber = Math.random();

  let computerMove = "";

  if (randomNumber >= 0 && randomNumber < 1 / 3) {
    computerMove = "Rock";
  } else if (randomNumber >= 1 / 3 && randomNumber < 2 / 3) {
    computerMove = "Paper";
  } else if (randomNumber >= 2 / 3 && randomNumber < 1) {
    computerMove = "Scissor";
  }

  return computerMove;
}

function updateScoreElement() {
  document.querySelector(
    ".js-score"
  ).innerHTML = ` Wins : ${score.wins}  Loses : ${score.loses} Ties : ${score.ties}`;
}

function playGame(playerMove) {
  const computerMove = pickComputerMove();

  let result = "";
  if (playerMove === "Scissor") {
    if (computerMove === "Rock") {
      result = "You Lose.";
    } else if (computerMove === "Paper") {
      result = "You Win.";
    } else if (computerMove === "Scissor") {
      result = "Tie.";
    }
  } else if (playerMove === "Paper") {
    if (computerMove === "Rock") {
      result = "You Lose.";
    } else if (computerMove === "Paper") {
      result = "Tie.";
    } else if (computerMove === "Scissor") {
      result = "You Win.";
    }
  } else if (playerMove === "Rock") {
    if (computerMove === "Rock") {
      result = "Tie";
    } else if (computerMove === "Paper") {
      result = "You Lose";
    } else if (computerMove === "Scissor") {
      result = "You Win.";
    }
  }

  if (result === "You Win.") {
    score.wins++;
  } else if (result === "You Lose.") {
    score.loses++;
  } else {
    score.ties++;
  }

  updateScoreElement();
  localStorage.setItem("score", JSON.stringify(score));

  document.querySelector(".js-result").innerHTML = `${result}.`;
  document.querySelector(
    ".js-moves-picked"
  ).innerHTML = ` You <img src="./images/${playerMove}-emoji.png" class="move-icon" />
<img src="./images/${computerMove}-emoji.png" class="move-icon" /> Computer`;
}

document.querySelector(".move-button-rock").addEventListener("click", () => {
  playGame("Rock");
});
document.querySelector(".move-button-paper").addEventListener("click", () => {
  playGame("Paper");
});
document.querySelector(".move-button-scissor").addEventListener("click", () => {
  playGame("Scissor");
});

document.body.addEventListener("keydown", (event) => {
  if (event.key === "r") {
    playGame("Rock");
  } else if (event.key === "p") {
    playGame("Paper");
  } else if (event.key === "s") {
    playGame("Scissor");
  }
});

let isAutoPlaying = false;
let intervalId;

function autoPlay() {
  const playStop = document.querySelector(".auto-play-button");
  if (!isAutoPlaying) {
    intervalId = setInterval(function () {
      const playerMove = pickComputerMove();
      playGame(playerMove);
    }, 1000);
    isAutoPlaying = true;
    playStop.innerHTML = "Stop";
  } else {
    clearInterval(intervalId);
    isAutoPlaying = false;
    playStop.innerHTML = "Auto Play";
  }
}
