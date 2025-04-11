const navItemToStartGame = document.getElementById("game");
navItemToStartGame.addEventListener("click", competition);

function competition() {
  const winnerSound = new Audio("sounds/winsound.wav");

  let quizGameDisplay = document.querySelector(".game-diaply-area");
  console.log(quizGameDisplay);
  if (quizGameDisplay) {
    quizGameDisplay.innerHTML = "";
  } else {
    errorOrNormalMessageContainer("ERROR: No Game Display Area Found!");
  }

  const player1NameLabel = document.createElement("label");
  player1NameLabel.innerText = "Enter Player 1 Name";
  const playerName1 = document.createElement("input");

  const player2NameLabel = document.createElement("label");
  player2NameLabel.innerText = "Enter Player 2 Name";
  const playerName2 = document.createElement("input");

  quizGameDisplay.appendChild(player1NameLabel);
  quizGameDisplay.appendChild(playerName1);
  quizGameDisplay.appendChild(player2NameLabel);
  quizGameDisplay.appendChild(playerName2);

  const players = [playerName1, playerName2];
  const attributes = {
    type: "text",
    placeholder: "Enter Player Name",
    required: "true",
  };

  players.forEach((player, index) => {
    player.setAttribute("id", `player${index + 1}Name`);
    for (let key in attributes) {
      player.setAttribute(key, attributes[key]);
    }
  });

  const startButton = document.createElement("button");
  startButton.innerText = "Start Competition";
  startButton.classList.add("control-buttons");
  quizGameDisplay.appendChild(startButton);

  startButton.addEventListener("click", () => {
    if (!playerName1.value || !playerName2.value) {
      quizGameDisplay.innerHTML = "";
      errorOrNormalMessageContainer("ERROR: Enter Both Players Names");
      return;
    }

    if (playerName1.value.toLowerCase() === playerName2.value.toLowerCase()) {
      quizGameDisplay.innerHTML = "";
      errorOrNormalMessageContainer(
        "ERROR: Both Players Cannot Have Same Names"
      );
      return;
    }

    quizGameDisplay.innerHTML = "";
    errorOrNormalMessageContainer("");

    const competitionSubDiv = document.createElement("div");
    competitionSubDiv.classList.add("competition-sub-div");

    const player1Div = document.createElement("div");
    player1Div.classList.add("player-1-div");

    const player1NameDisplay = document.createElement("h2");
    player1NameDisplay.innerText = playerName1.value;

    const player1ScoreDisplay = document.createElement("h3");
    player1ScoreDisplay.innerText = "Score: 0";

    const player1CorrectButton = document.createElement("button");
    player1CorrectButton.innerText = "Correct";
    player1CorrectButton.classList.add("control-buttons");

    const player1WrongButton = document.createElement("button");
    player1WrongButton.innerText = "Wrong";
    player1WrongButton.classList.add("control-buttons");

    player1Div.appendChild(player1NameDisplay);
    player1Div.appendChild(player1ScoreDisplay);
    player1Div.appendChild(player1CorrectButton);
    player1Div.appendChild(player1WrongButton);

    const player2Div = document.createElement("div");
    player2Div.classList.add("player-2-div");

    const player2NameDisplay = document.createElement("h2");
    player2NameDisplay.innerText = playerName2.value;

    const player2ScoreDisplay = document.createElement("h3");
    player2ScoreDisplay.innerText = "Score: 0";

    const player2CorrectButton = document.createElement("button");
    player2CorrectButton.innerText = "Correct";
    player2CorrectButton.classList.add("control-buttons");

    const player2WrongButton = document.createElement("button");
    player2WrongButton.innerText = "Wrong";
    player2WrongButton.classList.add("control-buttons");

    player2Div.appendChild(player2NameDisplay);
    player2Div.appendChild(player2ScoreDisplay);
    player2Div.appendChild(player2CorrectButton);
    player2Div.appendChild(player2WrongButton);

    competitionSubDiv.appendChild(player1Div);
    competitionSubDiv.appendChild(player2Div);
    quizGameDisplay.appendChild(competitionSubDiv);

    let player1Score = 0;
    let player2Score = 0;
    let player1Turn = true;
    let gameOver = false;

    function updateScoresAndSwitchTurn() {
      if (gameOver) return;

      player1ScoreDisplay.innerText = `Score IS: ${player1Score}`;
      player2ScoreDisplay.innerText = `Score IS: ${player2Score}`;
      checkWinner();
      if (!gameOver) switchTurn();
    }

    function disableAllButtons() {
      player1CorrectButton.classList.add("inactive-turn");
      player1WrongButton.classList.add("inactive-turn");
      player2CorrectButton.classList.add("inactive-turn");
      player2WrongButton.classList.add("inactive-turn");
    }

    function switchTurn() {
      player1Turn = !player1Turn;

      const activeButtons = player1Turn
        ? [player1CorrectButton, player1WrongButton]
        : [player2CorrectButton, player2WrongButton];
      const inactiveButtons = player1Turn
        ? [player2CorrectButton, player2WrongButton]
        : [player1CorrectButton, player1WrongButton];

      activeButtons.forEach((btn) => btn.classList.add("active-turn"));
      inactiveButtons.forEach((btn) => btn.classList.add("inactive-turn"));
      activeButtons.forEach((btn) => btn.classList.remove("inactive-turn"));
      inactiveButtons.forEach((btn) => btn.classList.remove("active-turn"));
    }

    function checkWinner() {
      const totalQuestions = fetchedQuizData.length;
      const totalCorrectAnswersToBe = Math.floor(totalQuestions / 2);

      if (player1Score >= totalCorrectAnswersToBe && !gameOver) {
        gameOver = true;
        const winnerMessageDiv = document.createElement("div");
        winnerMessageDiv.classList.add("winner-message");
        winnerMessageDiv.innerText = `₊˚✧ ${playerName1.value} is the Winner ✧˚₊`;
        quizGameDisplay.appendChild(winnerMessageDiv);
        winnerSound.play();
        errorOrNormalMessageContainer("₊˚✧ GAME OVER ✧˚₊");
        disableAllButtons();
      }

      if (player2Score >= totalCorrectAnswersToBe && !gameOver) {
        gameOver = true;
        const winnerMessageDiv = document.createElement("div");
        winnerMessageDiv.classList.add("winner-message");
        winnerMessageDiv.innerText = `${playerName2.value} is the Winner`;
        quizGameDisplay.appendChild(winnerMessageDiv);
        winnerSound.play();
        disableAllButtons();
      }
    }

    function handleButtonClick(isCorrect, player) {
      if (gameOver) return;

      if (player === 1 && player1Turn) {
        const navItemToStartGame = document.getElementById("game");
        navItemToStartGame.addEventListener("click", competition);

        function competition() {
          const winnerSound = new Audio("sounds/winsound.wav");

          let quizGameDisplay = document.querySelector(".quiz-game-display");
          if (quizGameDisplay) {
            quizGameDisplay.innerHTML = "";
          }

          const player1NameLabel = document.createElement("label");
          player1NameLabel.innerText = "Enter Player 1 Name";
          const playerName1 = document.createElement("input");

          const player2NameLabel = document.createElement("label");
          player2NameLabel.innerText = "Enter Player 2 Name";
          const playerName2 = document.createElement("input");

          quizGameDisplay.appendChild(player1NameLabel);
          quizGameDisplay.appendChild(playerName1);
          quizGameDisplay.appendChild(player2NameLabel);
          quizGameDisplay.appendChild(playerName2);

          const players = [playerName1, playerName2];
          const attributes = {
            type: "text",
            placeholder: "Enter Player Name",
            required: "true",
          };

          players.forEach((player, index) => {
            player.setAttribute("id", `player${index + 1}Name`);
            for (let key in attributes) {
              player.setAttribute(key, attributes[key]);
            }
          });

          const startButton = document.createElement("button");
          startButton.innerText = "Start Competition";
          startButton.classList.add("control-buttons");
          quizGameDisplay.appendChild(startButton);

          startButton.addEventListener("click", () => {
            if (!playerName1.value || !playerName2.value) {
              quizGameDisplay.innerHTML = "";
              errorOrNormalMessageContainer("ERROR: Enter Both Players Names");
              return;
            }

            if (
              playerName1.value.toLowerCase() ===
              playerName2.value.toLowerCase()
            ) {
              quizGameDisplay.innerHTML = "";
              errorOrNormalMessageContainer(
                "ERROR: Both Players Cannot Have Same Names"
              );
              return;
            }

            quizGameDisplay.innerHTML = "";
            errorOrNormalMessageContainer("");

            const competitionSubDiv = document.createElement("div");
            competitionSubDiv.classList.add("competition-sub-div");

            const player1Div = document.createElement("div");
            player1Div.classList.add("player-1-div");

            const player1NameDisplay = document.createElement("h2");
            player1NameDisplay.innerText = playerName1.value;

            const player1ScoreDisplay = document.createElement("h3");
            player1ScoreDisplay.innerText = "Score: 0";

            const player1CorrectButton = document.createElement("button");
            player1CorrectButton.innerText = "Correct";
            player1CorrectButton.classList.add("control-buttons");

            const player1WrongButton = document.createElement("button");
            player1WrongButton.innerText = "Wrong";
            player1WrongButton.classList.add("control-buttons");

            player1Div.appendChild(player1NameDisplay);
            player1Div.appendChild(player1ScoreDisplay);
            player1Div.appendChild(player1CorrectButton);
            player1Div.appendChild(player1WrongButton);

            const player2Div = document.createElement("div");
            player2Div.classList.add("player-2-div");

            const player2NameDisplay = document.createElement("h2");
            player2NameDisplay.innerText = playerName2.value;

            const player2ScoreDisplay = document.createElement("h3");
            player2ScoreDisplay.innerText = "Score: 0";

            const player2CorrectButton = document.createElement("button");
            player2CorrectButton.innerText = "Correct";
            player2CorrectButton.classList.add("control-buttons");

            const player2WrongButton = document.createElement("button");
            player2WrongButton.innerText = "Wrong";
            player2WrongButton.classList.add("control-buttons");

            player2Div.appendChild(player2NameDisplay);
            player2Div.appendChild(player2ScoreDisplay);
            player2Div.appendChild(player2CorrectButton);
            player2Div.appendChild(player2WrongButton);

            competitionSubDiv.appendChild(player1Div);
            competitionSubDiv.appendChild(player2Div);
            quizGameDisplay.appendChild(competitionSubDiv);

            let player1Score = 0;
            let player2Score = 0;
            let player1Turn = true;
            let gameOver = false;

            function updateScoresAndSwitchTurn() {
              if (gameOver) return;

              player1ScoreDisplay.innerText = `Score IS: ${player1Score}`;
              player2ScoreDisplay.innerText = `Score IS: ${player2Score}`;
              checkWinner();
              if (!gameOver) switchTurn();
            }

            function disableAllButtons() {
              player1CorrectButton.classList.add("inactive-turn");
              player1WrongButton.classList.add("inactive-turn");
              player2CorrectButton.classList.add("inactive-turn");
              player2WrongButton.classList.add("inactive-turn");
            }

            function switchTurn() {
              player1Turn = !player1Turn;

              const activeButtons = player1Turn
                ? [player1CorrectButton, player1WrongButton]
                : [player2CorrectButton, player2WrongButton];
              const inactiveButtons = player1Turn
                ? [player2CorrectButton, player2WrongButton]
                : [player1CorrectButton, player1WrongButton];

              activeButtons.forEach((btn) => btn.classList.add("active-turn"));
              inactiveButtons.forEach((btn) =>
                btn.classList.add("inactive-turn")
              );
              activeButtons.forEach((btn) =>
                btn.classList.remove("inactive-turn")
              );
              inactiveButtons.forEach((btn) =>
                btn.classList.remove("active-turn")
              );
            }

            function checkWinner() {
              const totalQuestions = fetchedQuizData.length;
              const totalCorrectAnswersToBe = Math.floor(totalQuestions / 2);

              if (player1Score >= totalCorrectAnswersToBe && !gameOver) {
                gameOver = true;
                const winnerMessageDiv = document.createElement("div");
                winnerMessageDiv.classList.add("winner-message");
                winnerMessageDiv.innerText = `₊˚✧ ${playerName1.value} is the Winner ✧˚₊`;
                quizGameDisplay.appendChild(winnerMessageDiv);
                winnerSound.play();
                errorOrNormalMessageContainer("₊˚✧ GAME OVER ✧˚₊");
                disableAllButtons();
              }

              if (player2Score >= totalCorrectAnswersToBe && !gameOver) {
                gameOver = true;
                const winnerMessageDiv = document.createElement("div");
                winnerMessageDiv.classList.add("winner-message");
                winnerMessageDiv.innerText = `${playerName2.value} is the Winner`;
                quizGameDisplay.appendChild(winnerMessageDiv);
                winnerSound.play();
                disableAllButtons();
              }
            }

            function handleButtonClick(isCorrect, player) {
              if (gameOver) return;

              if (player === 1 && player1Turn) {
                isCorrect ? player1Score++ : player2Score++;
              } else if (player === 2 && !player1Turn) {
                isCorrect ? player2Score++ : player1Score++;
              }
              updateScoresAndSwitchTurn();
            }

            player1CorrectButton.addEventListener("click", () =>
              handleButtonClick(true, 1)
            );
            player1WrongButton.addEventListener("click", () =>
              handleButtonClick(false, 1)
            );
            player2CorrectButton.addEventListener("click", () =>
              handleButtonClick(true, 2)
            );
            player2WrongButton.addEventListener("click", () =>
              handleButtonClick(false, 2)
            );
          });
        }

        isCorrect ? player1Score++ : player2Score++;
      } else if (player === 2 && !player1Turn) {
        isCorrect ? player2Score++ : player1Score++;
      }
      updateScoresAndSwitchTurn();
    }

    player1CorrectButton.addEventListener("click", () =>
      handleButtonClick(true, 1)
    );
    player1WrongButton.addEventListener("click", () =>
      handleButtonClick(false, 1)
    );
    player2CorrectButton.addEventListener("click", () =>
      handleButtonClick(true, 2)
    );
    player2WrongButton.addEventListener("click", () =>
      handleButtonClick(false, 2)
    );
  });
}
