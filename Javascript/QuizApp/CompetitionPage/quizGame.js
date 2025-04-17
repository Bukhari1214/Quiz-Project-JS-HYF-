let gameStarted = false;

fetchQuizData().then((fetchedQuizData) => {
  if (!gameStarted) {
    competition();
    gameStarted = true;
  } else {
    errorOrNormalMessageContainer(
      "Game already in progress. Reload to restart."
    );
  }

  function getRandomQuestions() {
    const shuffled = [...fetchedQuizData].sort(() => Math.random() - 0.5);
    return shuffled.slice(0, 5);
  }

  function competition() {
    const quizGameDisplay = document.querySelector(".game-diaply-area");

    if (!quizGameDisplay) {
      errorOrNormalMessageContainer("ERROR: No Game Display Area Found!");
      return;
    }

    quizGameDisplay.innerHTML = "";

    const player1NameLabel = document.createElement("label");
    player1NameLabel.innerText = "Enter Player 1 Name";
    const playerName1 = document.createElement("input");

    const player2NameLabel = document.createElement("label");
    player2NameLabel.innerText = "Enter Player 2 Name";
    const playerName2 = document.createElement("input");

    [playerName1, playerName2].forEach((input, id) => {
      input.type = "text";
      input.placeholder = "Enter Player Name";
      input.required = true;
      input.id = `player${id + 1}Name`;
    });

    quizGameDisplay.append(
      player1NameLabel,
      playerName1,
      player2NameLabel,
      playerName2
    );

    const startButton = document.createElement("button");
    startButton.innerText = "Start Competition";
    startButton.classList.add("control-buttons");
    quizGameDisplay.appendChild(startButton);

    startButton.addEventListener("click", () => {
      const name1 = playerName1.value.trim();
      const name2 = playerName2.value.trim();

      if (!name1 || !name2) {
        errorOrNormalMessageContainer("ERROR: Enter Both Players' Names");
        return;
      }

      if (name1.toLowerCase() === name2.toLowerCase()) {
        errorOrNormalMessageContainer(
          "ERROR: Both Players Cannot Have Same Names"
        );
        return;
      }

      const player1Questions = getRandomQuestions();

      const player2Questions = getRandomQuestions();

      quizGameDisplay.innerHTML = "";

      errorOrNormalMessageContainer(`₊˚✧ ${name1}'s Turn ✧˚₊`);
      displayPlayerQuiz(name1, player1Questions, (score1) => {
        errorOrNormalMessageContainer(`₊˚✧ ${name2}'s Turn ✧˚₊`);
        console.log("player 1 score:", score1);
        displayPlayerQuiz(name2, player2Questions, (score2) => {
          console.log("player 2 score:", score2);
          showWinner(name1, score1, name2, score2);
        });
      });
    });

    function displayPlayerQuiz(playerName, questions, onComplete) {
      quizGameDisplay.innerHTML = "";

      const header = document.createElement("div");
      header.classList.add("quiz-header");
      const playerNameDisplay = document.createElement("h2");
      playerNameDisplay.classList.add("blinking-text");
      const scoreDisplay = document.createElement("h3");
      playerNameDisplay.innerText = `${playerName}'s Turn`;
      scoreDisplay.innerText = `Score: 0`;
      header.append(playerNameDisplay, scoreDisplay);

      quizGameDisplay.appendChild(header);

      const form = document.createElement("form");
      form.classList.add("quiz-form");

      let score = 0;

      questions.forEach((question, index) => {
        const questionBlock = document.createElement("div");
        questionBlock.classList.add("question-block");

        const questionText = document.createElement("p");
        questionText.innerText = `${index + 1}. ${question.question}`;
        questionBlock.appendChild(questionText);

        question.options.forEach((option) => {
          const label = document.createElement("label");
          label.style.display = "block";

          const radio = document.createElement("input");
          radio.type = "radio";
          radio.name = `question_${index}`;
          radio.value = option.text;

          label.appendChild(radio);
          label.append(` ${option.text}`);

          radio.addEventListener("change", () => {
            const radioButtons =
              questionBlock.querySelectorAll("input[type=radio]");
            radioButtons.forEach((button) => {
              button.disabled = true;
            });

            const labels = questionBlock.querySelectorAll("label");
            labels.forEach((label) => {
              label.style.color = "";
              label.style.border = "";
            });

            if (option.isCorrect) {
              score++;
              label.style.color = "green";
              label.style.border = "2px solid green";
              scoreDisplay.innerText = `Score: ${score}`;
            } else {
              label.style.color = "red";
              label.style.border = "2px solid red";
            }
          });

          questionBlock.appendChild(label);
        });

        form.appendChild(questionBlock);
      });

      const submitButton = document.createElement("button");
      submitButton.type = "button";
      submitButton.innerText = "Submit Quiz";
      submitButton.classList.add("control-buttons");

      submitButton.addEventListener("click", () => {
        let allAnswered = true;

        questions.forEach((question, index) => {
          const selected = form.querySelector(
            `input[name="question_${index}"]:checked`
          );
          if (!selected) {
            allAnswered = false;
          }
        });

        if (!allAnswered) {
          errorOrNormalMessageContainer(
            "ERROR: Please answer all questions before submitting."
          );
          return;
        }

        onComplete(score);
      });

      quizGameDisplay.appendChild(form);
      quizGameDisplay.appendChild(submitButton);
    }

    function showWinner(name1, score1, name2, score2) {
      quizGameDisplay.innerHTML = "";

      const resultDiv = document.createElement("div");
      resultDiv.classList.add("winner-message");

      if (score1 > score2) {
        resultDiv.innerText = `₊˚✧ ${name1} wins with ${score1} points ✧˚₊`;
      } else if (score2 > score1) {
        resultDiv.innerText = `₊˚✧ ${name2} wins with ${score2} points ✧˚₊`;
      } else {
        resultDiv.innerText = `It's a tie! Both scored ${score1}`;
      }

      quizGameDisplay.appendChild(resultDiv);
      const winnerSound = new Audio("/Sounds/winsound.wav");
      winnerSound.play();
      errorOrNormalMessageContainer("₊˚✧ GAME OVER ✧˚₊");
      gameStarted = false;
    }
  }
});
