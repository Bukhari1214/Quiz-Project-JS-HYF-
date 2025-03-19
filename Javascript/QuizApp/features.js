const formInput = document.querySelector(".question-input-form");
const answersContainer = document.querySelector(".answers-container");
const buttonDiv = document.querySelector(".btn-wrapper");

function highligtAnswerInputs(userSelectedAnswer) {
  const option1Input = document.getElementById("option1");
  const option2Input = document.getElementById("option2");
  const option3Input = document.getElementById("option3");
  const option4Input = document.getElementById("option4");
  messageContainer.innerText = "";
  if (
    !option1Input.value ||
    !option2Input.value ||
    !option3Input.value ||
    !option4Input.value
  ) {
    messageContainer.innerText =
      "ERROR: All options must be filled before putting Highlighter!";
    return;
  } else {
    const allOptions = document.querySelectorAll('input[name="answer"]');
    allOptions.forEach((option) => {
      option.style.backgroundColor = "";
    });
    const correctOption = document.querySelector(`#${userSelectedAnswer}`);
    if (correctOption) {
      correctOption.style.backgroundColor = "green";
      correctOption.style.color = "white";
      correctOption.style.fontWeight = "bold";
      correctOption.style.textTransform = "uppercase";
    }
    allOptions.forEach((input) => {
      if (input !== correctOption) {
        input.style.backgroundColor = "red";
        input.style.color = "white";
        input.style.fontWeight = "bold";
        input.style.textTransform = "uppercase";
      }
    });
  }
}

function removeHighLightners() {
  const allOptions = document.querySelectorAll('input[name="answer"]');
  allOptions.forEach((input) => {
    input.style.backgroundColor = "";
    input.style.color = "";
    input.style.fontWeight = "";
    input.style.textTransform = "";
    input.style.border = "";
  });
}

function shuffleAnswers() {
  const existingQuizContainer = document.querySelector(".questionContainer");
  if (existingQuizContainer) {
    existingQuizContainer.remove();
  }

  const existingSearchContainer = document.querySelector(".searchContainerDiv");
  if (existingSearchContainer) {
    existingSearchContainer.remove();
  }

  const existingCompetitionContainer =
    document.querySelector(".competition-div");
  if (existingCompetitionContainer) {
    existingCompetitionContainer.remove();
  }

  const option1Input = document.getElementById("option1");
  const option2Input = document.getElementById("option2");
  const option3Input = document.getElementById("option3");
  const option4Input = document.getElementById("option4");

  const label1 = document.querySelector('label[for="option1"]');
  const label2 = document.querySelector('label[for="option2"]');
  const label3 = document.querySelector('label[for="option3"]');
  const label4 = document.querySelector('label[for="option4"]');

  if (
    !option1Input.value ||
    !option2Input.value ||
    !option3Input.value ||
    !option4Input.value
  ) {
    messageContainer.innerText =
      "ERROR: All options must be filled before shuffling!";
    return;
  }

  const optionsArray = [
    { label: label1, input: option1Input },
    { label: label2, input: option2Input },
    { label: label3, input: option3Input },
    { label: label4, input: option4Input },
  ];

  optionsArray.sort(() => Math.random() - 0.5);

  answersContainer.innerHTML = "";
  optionsArray.forEach((item) => {
    answersContainer.appendChild(item.label);
    answersContainer.appendChild(item.input);
  });
  messageContainer.innerHTML = "";
}

function quizListDisplay() {
  messageContainer.innerText = "";
  formInput.reset();
  removeHighLightners();

  const existingQuizContainer = document.querySelector(".questionContainer");
  if (existingQuizContainer) {
    existingQuizContainer.remove();
  }

  const existingSearchContainer = document.querySelector(".searchContainerDiv");
  if (existingSearchContainer) {
    existingSearchContainer.remove();
  }

  const existingCompetitionContainer =
    document.querySelector(".competition-div");
  if (existingCompetitionContainer) {
    existingCompetitionContainer.remove();
  }

  const quizQuestionsListDiv = document.createElement("div");
  quizQuestionsListDiv.classList.add("questionContainer");
  const quizListHeadingDiv = document.createElement("div");
  quizListHeadingDiv.classList.add("quizListHeadingDiv");
  const quizListHeading = document.createElement("h1");
  quizListHeading.innerText = "All Possible QUIZ Questions";
  quizListHeadingDiv.appendChild(quizListHeading);
  quizQuestionsListDiv.appendChild(quizListHeadingDiv);
  document.body.appendChild(quizQuestionsListDiv);

  const shuffledQuestionArray = quizQuestionArray.sort(
    () => Math.random() - 0.5
  );
  const quizQuestionsToBeListed = shuffledQuestionArray.slice(0, 5);

  quizQuestionsToBeListed.forEach((quiz, index) => {
    const questionDiv = document.createElement("div");
    questionDiv.classList.add("list-quiz-question");
    questionDiv.innerHTML = `
        <strong>Question # ${index + 1}: </strong> <em>${quiz.question}</em>
      `;
    const ul = document.createElement("ul");
    ul.innerHTML = "<strong>Your Options Are:</strong>";

    quiz.options.forEach((option) => {
      const li = document.createElement("li");
      li.innerText = option.text;
      ul.appendChild(li);
    });

    questionDiv.appendChild(ul);

    const answerRevealButton = document.createElement("button");
    answerRevealButton.classList.add("list-button");
    answerRevealButton.innerText = "Click To See Correct Answer";
    questionDiv.appendChild(answerRevealButton);

    answerRevealButton.addEventListener("click", () => {
      const existingAnswer = questionDiv.querySelector(".correct-answer");
      if (!existingAnswer) {
        const correctAnswerOfQuestion = document.createElement("p");
        correctAnswerOfQuestion.classList.add("correct-answer");
        correctAnswerOfQuestion.innerText = `${quiz.explanation}`;
        questionDiv.appendChild(correctAnswerOfQuestion);
      }
    });

    quizQuestionsListDiv.appendChild(questionDiv);
  });
  removeHighLightners();
}

function addMoreQuestions() {
  const existingQuizContainer = document.querySelector(".questionContainer");
  if (existingQuizContainer) {
    existingQuizContainer.remove();
  }

  const existingSearchContainer = document.querySelector(".searchContainerDiv");
  if (existingSearchContainer) {
    existingSearchContainer.remove();
  }

  const existingCompetitionContainer =
    document.querySelector(".competition-div");
  if (existingCompetitionContainer) {
    existingCompetitionContainer.remove();
  }

  formInput.reset();
  removeHighLightners();
  messageContainer.innerText = "";
}

function searchInQuestions() {
  const existingQuizContainer = document.querySelector(".questionContainer");
  if (existingQuizContainer) {
    existingQuizContainer.remove();
  }

  const existingSearchContainer = document.querySelector(".searchContainerDiv");
  if (existingSearchContainer) {
    existingSearchContainer.remove();
  }

  const existingCompetitionContainer =
    document.querySelector(".competition-div");
  if (existingCompetitionContainer) {
    existingCompetitionContainer.remove();
  }

  messageContainer.innerText = "";
  removeHighLightners();
  formInput.reset();

  const searchAreaMainDiv = document.createElement("div");
  searchAreaMainDiv.classList.add("searchContainerDiv");

  const searchAreaHeadingDiv = document.createElement("div");
  searchAreaHeadingDiv.classList.add("searchHeadingDiv");
  const searchAreaHeading = document.createElement("h1");
  searchAreaHeading.innerText = "You Can Search The Questions";
  searchAreaHeadingDiv.appendChild(searchAreaHeading);
  searchAreaMainDiv.appendChild(searchAreaHeadingDiv);
  document.body.appendChild(searchAreaMainDiv);

  const searchAreaInputDiv = document.createElement("div");
  searchAreaInputDiv.classList.add("search-input");
  const searchLabel = document.createElement("label");
  searchLabel.innerText = "Enter Your Text Here";

  const searchInput = document.createElement("input");
  searchInput.setAttribute("id", "searchInput");
  searchInput.setAttribute("type", "text");
  searchInput.setAttribute("placeholder", "Search...");
  searchInput.setAttribute("required", "true");

  searchAreaInputDiv.appendChild(searchLabel);
  searchAreaInputDiv.appendChild(searchInput);
  searchAreaMainDiv.appendChild(searchAreaInputDiv);

  const searchResultsDiv = document.createElement("div");
  searchResultsDiv.classList.add("search-Results-Div");
  searchAreaMainDiv.appendChild(searchResultsDiv);

  searchInput.addEventListener("input", () => {
    const searchInputFromUser = searchInput.value.toLowerCase();
    searchResultsDiv.innerHTML = "";

    if (searchInputFromUser.trim() === "") {
      return;
    }

    const filteredQuestionsToDisplay = quizQuestionArray.filter(
      (quizQuestionArrayData) => {
        return quizQuestionArrayData.question
          .toLowerCase()
          .includes(searchInputFromUser);
      }
    );

    if (filteredQuestionsToDisplay.length === 0) {
      const noResultsMessage = document.createElement("p");
      noResultsMessage.innerText = "No questions match your search!";
      searchResultsDiv.appendChild(noResultsMessage);
    } else {
      filteredQuestionsToDisplay.forEach((question, index) => {
        const searchQuestionDiv = document.createElement("div");
        searchQuestionDiv.classList.add("searchedQuestion");
        searchQuestionDiv.innerHTML = `<strong>Question # ${
          index + 1
        }: </strong> <em>${question.question}</em>`;

        searchResultsDiv.appendChild(searchQuestionDiv);

        const ul = document.createElement("ul");
        question.options.forEach((option) => {
          const answerOption = document.createElement("li");
          answerOption.innerText = option.text;
          ul.appendChild(answerOption);
        });
        searchQuestionDiv.appendChild(ul);
        const horizontalLine = document.createElement("hr");
        searchQuestionDiv.appendChild(horizontalLine);
      });
    }
  });
}

function competition() {
  messageContainer.innerText = "";
  formInput.reset();
  removeHighLightners();
  const winnerSound = new Audio("sounds/winsound.wav");
  const existingCompetitionContainer =
    document.querySelector(".competition-div");
  if (existingCompetitionContainer) {
    existingCompetitionContainer.remove();
  }

  const existingQuizContainer = document.querySelector(".questionContainer");
  if (existingQuizContainer) {
    existingQuizContainer.remove();
  }

  const existingSearchContainer = document.querySelector(".searchContainerDiv");
  if (existingSearchContainer) {
    existingSearchContainer.remove();
  }

  const competitionDiv = document.createElement("div");
  competitionDiv.classList.add("competition-div");
  document.body.appendChild(competitionDiv);

  const playerName1 = document.createElement("input");
  playerName1.setAttribute("type", "text");
  playerName1.setAttribute("id", "player1Name");
  playerName1.setAttribute("placeholder", "Enter Player 1 Name");
  playerName1.setAttribute("required", "true");
  competitionDiv.appendChild(playerName1);

  const playerName2 = document.createElement("input");
  playerName2.setAttribute("type", "text");
  playerName2.setAttribute("id", "player2Name");
  playerName2.setAttribute("placeholder", "Enter Player 2 Name");
  playerName2.setAttribute("required", "true");
  competitionDiv.appendChild(playerName2);

  const startButton = document.createElement("button");
  startButton.innerText = "Start Competition";
  startButton.classList.add("control-buttons");
  competitionDiv.appendChild(startButton);

  startButton.addEventListener("click", () => {
    const player1Name = playerName1.value.trim();
    const player2Name = playerName2.value.trim();

    if (!player1Name || !player2Name) {
      messageContainer.innerText = "Enter Both Players Names";
      return;
    } else {
      messageContainer.innerText = "";
    }

    competitionDiv.innerHTML = "";

    const competitionSubDiv = document.createElement("div");
    competitionSubDiv.classList.add("competition-sub-div");

    const player1Div = document.createElement("div");
    player1Div.classList.add("player-1-div");
    const player1NameDisplay = document.createElement("h1");
    player1NameDisplay.innerText = player1Name;
    player1Div.appendChild(player1NameDisplay);

    const player1ScoreDisplay = document.createElement("h2");
    player1ScoreDisplay.innerText = "Score: 0";
    player1Div.appendChild(player1ScoreDisplay);

    const player1CorrectButton = document.createElement("button");
    player1CorrectButton.innerText = "Correct";
    player1CorrectButton.classList.add("control-buttons");
    const player1WrongButton = document.createElement("button");
    player1WrongButton.innerText = "Wrong";
    player1WrongButton.classList.add("control-buttons");

    player1Div.appendChild(player1CorrectButton);
    player1Div.appendChild(player1WrongButton);

    const player2Div = document.createElement("div");
    player2Div.classList.add("player-2-div");
    const player2NameDisplay = document.createElement("h1");
    player2NameDisplay.innerText = player2Name;
    player2Div.appendChild(player2NameDisplay);

    const player2ScoreDisplay = document.createElement("h2");
    player2ScoreDisplay.innerText = "Score: 0";
    player2Div.appendChild(player2ScoreDisplay);

    const player2CorrectButton = document.createElement("button");
    player2CorrectButton.innerText = "Correct";
    player2CorrectButton.classList.add("control-buttons");
    const player2WrongButton = document.createElement("button");
    player2WrongButton.innerText = "Wrong";
    player2WrongButton.classList.add("control-buttons");

    player2Div.appendChild(player2CorrectButton);
    player2Div.appendChild(player2WrongButton);

    competitionSubDiv.appendChild(player1Div);
    competitionSubDiv.appendChild(player2Div);
    competitionSubDiv.style.flexDirection = "row";
    competitionDiv.appendChild(competitionSubDiv);

    let player1Score = 0;
    let player2Score = 0;
    let player1Turn = true;
    let gameOver = false;

    function updateScoresAndSwitchTurn() {
      if (gameOver) return;

      player1ScoreDisplay.innerText = `Score: ${player1Score}`;
      player2ScoreDisplay.innerText = `Score: ${player2Score}`;
      checkWinner();
      if (!gameOver) {
        switchTurn();
      }
    }

    function switchTurn() {
      player1Turn = !player1Turn;
      player1CorrectButton.disabled = !player1Turn;
      player1WrongButton.disabled = !player1Turn;
      player2CorrectButton.disabled = player1Turn;
      player2WrongButton.disabled = player1Turn;

      player1Div.style.backgroundColor = player1Turn ? "green" : "";
      player2Div.style.backgroundColor = !player1Turn ? "green" : "";
    }

    function checkWinner() {
      if (player1Score === 10 && !gameOver) {
        gameOver = true;
        const winnerMessageDiv = document.createElement("div");
        winnerMessageDiv.classList.add("winner-message");
        winnerMessageDiv.innerText = `${player1Name} is the Winner`;
        competitionDiv.appendChild(winnerMessageDiv);
        player1Div.style.backgroundColor = "";
        player2Div.style.backgroundColor = "";
        winnerSound.play();
        disableAllButtons();
      }
      if (player2Score === 10 && !gameOver) {
        gameOver = true;
        const winnerMessageDiv = document.createElement("div");
        winnerMessageDiv.classList.add("winner-message");
        winnerMessageDiv.innerText = `${player2Name} is the Winner`;
        competitionDiv.appendChild(winnerMessageDiv);
        player1Div.style.backgroundColor = "";
        player2Div.style.backgroundColor = "";
        winnerSound.play();
        disableAllButtons();
      }
    }

    function disableAllButtons() {
      player1CorrectButton.disabled = true;
      player1WrongButton.disabled = true;
      player2CorrectButton.disabled = true;
      player2WrongButton.disabled = true;
    }

    player1CorrectButton.addEventListener("click", () => {
      if (gameOver) return;

      if (player1Turn) {
        player1Score++;
        updateScoresAndSwitchTurn();
      }
    });

    player1WrongButton.addEventListener("click", () => {
      if (gameOver) return;

      if (player1Turn) {
        player2Score++;
        updateScoresAndSwitchTurn();
      }
    });

    player2CorrectButton.addEventListener("click", () => {
      if (gameOver) return;

      if (!player1Turn) {
        player2Score++;
        updateScoresAndSwitchTurn();
      }
    });

    player2WrongButton.addEventListener("click", () => {
      if (gameOver) return;

      if (!player1Turn) {
        player1Score++;
        updateScoresAndSwitchTurn();
      }
    });
  });
}
