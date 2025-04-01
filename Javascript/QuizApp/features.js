let quizQuestionArray = [];
let fetchedData = [];

// In final submission of the project, the following code will be used with proper UI

// Asynchronous Function to fetch data from GitHub API
async function fetchQuizData() {
  let dataToBeFetched = null;

  return new Promise((resolve, reject) => {
    fetch(
      "https://raw.githubusercontent.com/Bukhari1214/bukhari1214.github.io/refs/heads/main/data.json"
    )
      .then((response) => {
        if (!response.ok) {
          reject("Fetching Failed!");
        } else {
          return response.json();
        }
      })
      .then((data) => resolve(data))
      .catch((error) => reject(`Error fetching data: ${error}`));
  })
    .then((data) => {
      dataToBeFetched = data;
      fetchedData = dataToBeFetched;
    })
    .catch((error) => {
      errorOrNormalMessageContainer(error);
    })
    .finally(() => {
      if (dataToBeFetched) {
        errorOrNormalMessageContainer("All Set: Data successfully loaded!");
      } else {
        errorOrNormalMessageContainer(
          "ERROR: Oops! Something went wrong while fetching the data."
        );
      }
    });
}

//Function to sumbit the form
function submitForm(event) {
  event.preventDefault();
  errorOrNormalMessageContainer("ERROR: Question and Options are required!");
  removeExistingContainers();
  removeHighLightners();

  const questionInput = document.getElementById("question").value;
  const option1Input = document.getElementById("option1").value;
  const option2Input = document.getElementById("option2").value;
  const option3Input = document.getElementById("option3").value;
  const option4Input = document.getElementById("option4").value;

  const questionExists = quizQuestionArray.some(
    (item) => item.question.toLowerCase() === questionInput.toLowerCase()
  );

  const optionsDuplicationCheck = [
    option1Input,
    option2Input,
    option3Input,
    option4Input,
  ];

  const duplicateOption =
    optionsDuplicationCheck.length !== new Set(optionsDuplicationCheck).size;

  if (duplicateOption) {
    errorOrNormalMessageContainer("ERROR: Duplicate Answers Found!");
  } else {
    if (questionExists) {
      errorOrNormalMessageContainer(
        "Repetition ERROR: Question Already Exists!"
      );
    } else {
      const options = [
        { text: option1Input, isCorrect: correctAnswerInput === "option1" },
        { text: option2Input, isCorrect: correctAnswerInput === "option2" },
        { text: option3Input, isCorrect: correctAnswerInput === "option3" },
        { text: option4Input, isCorrect: correctAnswerInput === "option4" },
      ];

      const correctAnswerText = options.find(
        (option) => option.isCorrect
      )?.text;

      const quizQuestion = {
        id: quizQuestionArray.length + 1,
        question: questionInput,
        options: options,
        explanation: `The correct answer is ${correctAnswerText}.`,
      };

      quizQuestionArray.push(quizQuestion);

      errorOrNormalMessageContainer(
        `New question with possible options and correct option INSERTED with ID: ${
          quizQuestionArray[quizQuestionArray.length - 1].id
        }`
      );
    }
  }
}

// Function to Add More Questions in Quiz Array
function addMoreQuestions() {
  removeExistingContainers();
  formInput.reset();
  removeHighLightners();
  errorOrNormalMessageContainer("");
  removeCompetitionContainer();
}

// Function To Shuffle Input Fields for Answers
function shuffleAnswers() {
  removeExistingContainers();
  removeCompetitionContainer();
  removeHighLightners();
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
    errorOrNormalMessageContainer(
      "ERROR: All options must be filled before shuffling!"
    );
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
  errorOrNormalMessageContainer("");
}

// Asynchronous Function to Search in All Existing Questions in the Run Time quizQuestionArray and fetched data from API
async function searchInQuestions() {
  try {
    removeExistingContainers();
    removeCompetitionContainer();
    errorOrNormalMessageContainer("");
    removeHighLightners();
    formInput.reset();
    await fetchQuizData();
    const mergedQuizData = quizQuestionArray.concat(fetchedData);

    const searchAreaMainDiv = document.createElement("div");
    searchAreaMainDiv.classList.add("searchContainerDiv");

    const searchAreaHeadingDiv = document.createElement("div");
    searchAreaHeadingDiv.classList.add("searchHeadingDiv");
    const searchAreaHeading = document.createElement("h2");
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

      const filteredQuestionsToDisplay = mergedQuizData.filter(
        (mergedQuizDataData) => {
          return mergedQuizDataData.question
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
  } catch (error) {
    errorOrNormalMessageContainer(`Error fetching data: ${error}`);
  }
}

// Asynchronous Function to Display All Existing Questions in run time quizzQuestionArray and fetched data from Quiz API
// Sorting (ascending/decending) also added in this function
async function quizListDisplay(sortOrder = "asc") {
  try {
    errorOrNormalMessageContainer("");
    formInput.reset();
    removeHighLightners();
    removeExistingContainers();
    removeCompetitionContainer();
    await fetchQuizData();
    const mergedQuizData = quizQuestionArray.concat(fetchedData);

    if (!mergedQuizData || mergedQuizData.length === 0) {
      errorOrNormalMessageContainer("ERROR: No quiz questions available.");
      return;
    }

    const quizQuestionsListDiv = document.createElement("div");
    quizQuestionsListDiv.classList.add("questionContainer");

    const quizListHeadingDiv = document.createElement("div");
    quizListHeadingDiv.classList.add("quizListHeadingDiv");
    const quizListHeading = document.createElement("h2");
    quizListHeading.innerText = "All Possible QUIZ Questions";
    quizListHeadingDiv.appendChild(quizListHeading);

    const selectOptionDiv = document.createElement("div");
    selectOptionDiv.classList.add("select-option-div");

    const selectOptionLabel = document.createElement("label");
    selectOptionLabel.innerText = "Select Sort Option:";
    selectOptionDiv.appendChild(selectOptionLabel);

    const sortSelect = document.createElement("select");
    sortSelect.classList.add("sort-buttons");

    const sortAscOption = document.createElement("option");
    sortAscOption.value = "asc";
    sortAscOption.innerText = "Ascending";

    const sortDescOption = document.createElement("option");
    sortDescOption.value = "desc";
    sortDescOption.innerText = "Descending";

    sortSelect.appendChild(sortAscOption);
    sortSelect.appendChild(sortDescOption);

    selectOptionDiv.appendChild(selectOptionLabel);
    selectOptionDiv.appendChild(sortSelect);
    quizListHeadingDiv.appendChild(selectOptionDiv);
    quizQuestionsListDiv.appendChild(quizListHeadingDiv);

    document.body.appendChild(quizQuestionsListDiv);

    sortSelect.value = sortOrder;

    sortSelect.addEventListener("change", function () {
      const selectedSortOrder = sortSelect.value;
      quizListDisplay(selectedSortOrder);
    });

    if (sortOrder === "asc") {
      mergedQuizData.sort((a, b) => a.question.localeCompare(b.question));
    } else if (sortOrder === "desc") {
      mergedQuizData.sort((a, b) => b.question.localeCompare(a.question));
    }

    mergedQuizData.forEach((quiz, index) => {
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
  } catch (error) {
    errorOrNormalMessageContainer(`Error: ${error.message}`);
  }
}

// Asynchronous Function to play a competition between two players
// Not Developed on the real quiz results base but just as a reqirement of the project as per asked
async function competition() {
  try {
    errorOrNormalMessageContainer("");
    formInput.reset();
    removeHighLightners();
    removeExistingContainers();
    const winnerSound = new Audio("sounds/winsound.wav");
    await fetchQuizData();
    const mergedQuizData = quizQuestionArray.concat(fetchedData);

    let competitionDiv = document.querySelector(".competition-div");
    if (competitionDiv) {
      competitionDiv.innerHTML = "";
    } else {
      competitionDiv = document.createElement("div");
      competitionDiv.classList.add("competition-div");
      document.body.appendChild(competitionDiv);
    }

    const player1NameLabel = document.createElement("label");
    player1NameLabel.innerText = "Enter Player 1 Name";
    const playerName1 = document.createElement("input");

    const player2NameLabel = document.createElement("label");
    player2NameLabel.innerText = "Enter Player 2 Name";
    const playerName2 = document.createElement("input");

    competitionDiv.appendChild(player1NameLabel);
    competitionDiv.appendChild(playerName1);
    competitionDiv.appendChild(player2NameLabel);
    competitionDiv.appendChild(playerName2);

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
    competitionDiv.appendChild(startButton);

    startButton.addEventListener(
      "click",
      () => {
        if (!playerName1.value || !playerName2.value) {
          competitionDiv.innerHTML = "";
          errorOrNormalMessageContainer("ERROR: Enter Both Players Names");
          return;
        } else if (
          playerName1.value.toLocaleLowerCase() ===
          playerName2.value.toLocaleLowerCase()
        ) {
          competitionDiv.innerHTML = "";
          errorOrNormalMessageContainer(
            "ERROR: Both Players Cannot Have Same Names"
          );
          return;
        }

        competitionDiv.innerHTML = "";
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
        competitionDiv.appendChild(competitionSubDiv);

        let player1Score = 0;
        let player2Score = 0;
        let player1Turn = true;
        let gameOver = false;

        function updateScoresAndSwitchTurn() {
          if (gameOver) {
            return;
          }
          player1ScoreDisplay.innerText = `Score IS: ${player1Score}`;
          player2ScoreDisplay.innerText = `Score IS: ${player2Score}`;

          checkWinner();

          if (!gameOver) {
            switchTurn();
          }
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

          activeButtons.forEach((button) =>
            button.classList.add("active-turn")
          );

          inactiveButtons.forEach((button) =>
            button.classList.add("inactive-turn")
          );

          activeButtons.forEach((button) =>
            button.classList.remove("inactive-turn")
          );

          inactiveButtons.forEach((button) =>
            button.classList.remove("active-turn")
          );
        }

        async function checkWinner() {
          const totalQuestions = mergedQuizData.length;
          const totalCorrectAnswersToBe = Math.floor(totalQuestions / 2);
          if (player1Score >= totalCorrectAnswersToBe && !gameOver) {
            gameOver = true;
            const winnerMessageDiv = document.createElement("div");
            winnerMessageDiv.classList.add("winner-message");
            winnerMessageDiv.innerText = `₊˚✧ ${playerName1.value} is the Winner ✧˚₊`;
            competitionDiv.appendChild(winnerMessageDiv);
            winnerSound.play();
            errorOrNormalMessageContainer("₊˚✧ GAME OVER ✧˚₊");
            disableAllButtons();
          }
          if (player2Score >= totalCorrectAnswersToBe && !gameOver) {
            gameOver = true;
            const winnerMessageDiv = document.createElement("div");
            winnerMessageDiv.classList.add("winner-message");
            winnerMessageDiv.innerText = `${playerName2.value} is the Winner`;
            competitionDiv.appendChild(winnerMessageDiv);
            winnerSound.play();
            disableAllButtons();
          }
        }

        function handleButtonClick(isCorrect, player) {
          if (gameOver) return;

          if (player === 1 && player1Turn) {
            if (isCorrect) player1Score++;
            else player2Score++;
          } else if (player === 2 && !player1Turn) {
            if (isCorrect) player2Score++;
            else player1Score++;
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
      },
      1000
    );
  } catch (error) {
    console.error("Error in competition function:", error);
    errorOrNormalMessageContainer("Error while starting the competition.");
  }
}

//Function to remove Existing Conatiners from DOM To Show New Results or Output on Same Place
function removeExistingContainers() {
  const existingQuizContainer = document.querySelector(".questionContainer");
  if (existingQuizContainer) {
    existingQuizContainer.remove();
  }

  const existingSearchContainer = document.querySelector(".searchContainerDiv");
  if (existingSearchContainer) {
    existingSearchContainer.remove();
  }

  const existingMessageContainer = document.querySelector(".message-container");
  if (existingMessageContainer) {
    existingMessageContainer.remove();
  }
}

//Function to remove Existing Game Competition Conatiner from DOM To Show New Results or Output on Same Place
function removeCompetitionContainer() {
  const existingCompetitionContainer =
    document.querySelector(".competition-div");
  if (existingCompetitionContainer) {
    existingCompetitionContainer.remove();
  }
}

// Function To Control Color of Messages Shown in Message Container Div
function errorOrNormalMessageContainer(text) {
  removeExistingContainers();
  const messageContainer = document.createElement("div");
  messageContainer.classList.add("message-container");
  const formDiv = document.querySelector(".question-input-form");
  formDiv.parentNode.insertBefore(messageContainer, formDiv.nextSibling);
  messageContainer.classList.remove("error-message", "normal-message");

  if (text.trim().toLowerCase().includes("error")) {
    messageContainer.classList.add("error-message");
  } else {
    messageContainer.classList.add("normal-message");
  }
  messageContainer.innerText = text;
}

// Function To Control Colors of Input Fields after selection of Correct Answer
function highligtAnswerInputs(userSelectedAnswer) {
  const option1Input = document.getElementById("option1");
  const option2Input = document.getElementById("option2");
  const option3Input = document.getElementById("option3");
  const option4Input = document.getElementById("option4");

  if (
    !option1Input.value ||
    !option2Input.value ||
    !option3Input.value ||
    !option4Input.value
  ) {
    errorOrNormalMessageContainer(
      "ERROR: All options must be filled before putting Highlighter!"
    );
    return;
  }

  const allOptions = document.querySelectorAll('input[name="answer"]');

  allOptions.forEach((option) => {
    option.classList.remove("correct-answer", "wrong-answer");
  });

  const correctOption = document.querySelector(`#${userSelectedAnswer}`);
  if (correctOption) {
    correctOption.classList.add("correct-answer");
  }

  allOptions.forEach((input) => {
    if (input !== correctOption) {
      input.classList.add("wrong-answer");
    }
  });
}

// Function To Remove Colors of Input Fields after selection of Correct Answer
function removeHighLightners() {
  const allOptions = document.querySelectorAll(
    'input[type="text"][name="answer"]'
  );
  allOptions.forEach((input) => {
    input.classList.remove("correct-answer", "wrong-answer");
  });
}
