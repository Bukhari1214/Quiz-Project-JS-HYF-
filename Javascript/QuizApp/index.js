function highligtAnswerInputs(userSelectedAnswer) {
  console.log(userSelectedAnswer);
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

function removeHighLightners() {
  const allOptions = document.querySelectorAll('input[name="answer"]');
  allOptions.forEach((input) => {
    input.style.backgroundColor = "";
    input.style.color = ""; // Reset text color
    input.style.fontWeight = "";
    input.style.textTransform = "";
    input.style.border = "";
  });
}

function shuffleAnswers() {
  const option1Input = document.getElementById("option1");
  const option2Input = document.getElementById("option2");
  const option3Input = document.getElementById("option3");
  const option4Input = document.getElementById("option4");

  const label1 = document.querySelector('label[for="option1"]');
  const label2 = document.querySelector('label[for="option2"]');
  const label3 = document.querySelector('label[for="option3"]');
  const label4 = document.querySelector('label[for="option4"]');

  console.log(option1Input);

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

  answersContainer.innerHTML = ""; // Clear existing options
  optionsArray.forEach((item) => {
    answersContainer.appendChild(item.label); // Append the label
    answersContainer.appendChild(item.input); // Append the input element itself
  });

  messageContainer.innerHTML = ""; // Clear error message
}

function quizListDisplay() {
  messageContainer.innerText = "";

  const existingQuizContainer = document.querySelector(".questionContainer");
  if (existingQuizContainer) {
    existingQuizContainer.remove();
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
        correctAnswerOfQuestion.innerText = `The Correct Answer Is: ${quiz.explanation}`;
        questionDiv.appendChild(correctAnswerOfQuestion);
      }
    });

    quizQuestionsListDiv.appendChild(questionDiv);
  });
  removeHighLightners();
}

function searchInQuestions() {}

let shuffleButtonCreated = false;
let createQuizButtonCreated = false;

const formInput = document.querySelector(".question-input-form");
const messageContainer = document.createElement("div");
messageContainer.setAttribute("class", "message-container");
document.body.appendChild(messageContainer);
const answersContainer = document.querySelector(".answers-container");
const buttonDiv = document.querySelector(".btn-wrapper");

//Add More Button Created
const addMoreButton = document.createElement("button");
addMoreButton.innerText = "Add More Questions";
addMoreButton.classList.add("control-buttons");
buttonDiv.appendChild(addMoreButton);
addMoreButton.addEventListener("click", () => {
  formInput.reset();
  messageContainer.innerText = "";
});

//Shuffle Answers Button Created
const shuffleButton = document.createElement("button");
shuffleButton.innerText = "Shuffle Answers";
shuffleButton.classList.add("control-buttons");
shuffleButton.type = "button";
buttonDiv.appendChild(shuffleButton);
shuffleButton.addEventListener("click", shuffleAnswers);
shuffleButtonCreated = true;

//Input Check Applied to check its length
const questionInputCheck = document.getElementById("question");
const maxLengthOfInput = questionInputCheck.maxLength;
question.addEventListener("input", (event) => {
  const currentLength = event.target.value.length;

  if (currentLength >= maxLengthOfInput) {
    messageContainer.innerText =
      "ERROR: Question cannot be more than 140 characters!\nThis app saves only first 140 characters of input question.";
  }
});

//Colouring the Input Answers Green for Right and Red for Wrong
const radioButtons = document.querySelectorAll(
  'input[type="radio"][name="correct-answer"]'
);
let correctAnswerInput;
radioButtons.forEach((radioButton) => {
  radioButton.addEventListener("change", () => {
    correctAnswerInput = document.querySelector(
      'input[name="correct-answer"]:checked'
    )?.value;
    highligtAnswerInputs(correctAnswerInput);
  });
});

formInput.addEventListener("submit", (event) => {
  event.preventDefault();

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
    messageContainer.innerText = "ERROR: Duplicate Answers Found!";
  } else {
    if (questionExists) {
      messageContainer.innerText = "Repetition ERROR: Question Already Exists";
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

      messageContainer.innerText = `New question with possible options and correct option INSERTED with ID: ${
        quizQuestionArray[quizQuestionArray.length - 1].id
      }`;
    }
  }

  if (quizQuestionArray.length > 15 && !createQuizButtonCreated) {
    const createQuizButton = document.createElement("button");
    createQuizButton.innerText = "Create a Quiz";
    createQuizButton.classList.add("control-buttons");
    createQuizButton.type = "button";
    buttonDiv.appendChild(createQuizButton);

    createQuizButton.addEventListener("click", quizListDisplay);
    createQuizButtonCreated = true;
  }
  removeHighLightners();
});
