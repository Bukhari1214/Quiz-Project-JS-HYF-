const formInput = document.querySelector(".question-input-form");
const messageContainer = document.createElement("div");
messageContainer.setAttribute("class", "message-container");

const buttonDiv = document.querySelector(".btn-wrapper");
const answersContainer = document.querySelector(".answers-container");

let addMoreButtonCreated = false;
let createQuizButtonCreated = false;
let shuffleButtonCreated = false;

const questionInputCheck = document.getElementById("question");
const maxLengthOfInput = questionInputCheck.maxLength;
question.addEventListener("input", (event) => {
  const currentLength = event.target.value.length;

  if (currentLength >= maxLengthOfInput) {
    messageContainer.innerText =
      "ERROR: Question cannot be more than 140 characters!. Our app save only the  Questions consisting of 140 Character";
    document.body.appendChild(messageContainer);
  }
});
formInput.addEventListener("submit", (event) => {
  event.preventDefault();

  const questionInput = document.getElementById("question").value;
  const option1Input = document.getElementById("option1").value;
  const option2Input = document.getElementById("option2").value;
  const option3Input = document.getElementById("option3").value;
  const option4Input = document.getElementById("option4").value;
  const correctAnswerInput = document.querySelector(
    'input[name="correct-answer"]:checked'
  )?.value;

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
    messageContainer.innerText = "ERROR: Duplicate options found!";
    document.body.appendChild(messageContainer);
  } else {
    if (questionExists) {
      messageContainer.innerText = "Repetition ERROR: Question Already Exists";
      document.body.appendChild(messageContainer);
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

      messageContainer.innerText = `New question, possible options and correct option INSERTED with ID: ${
        quizQuestionArray[quizQuestionArray.length - 1].id
      }`;
      document.body.appendChild(messageContainer);
    }
  }

  console.log(quizQuestionArray);

  if (!addMoreButtonCreated) {
    const addMoreButton = document.createElement("button");
    addMoreButton.innerText = "Add More Questions";
    addMoreButton.classList.add("control-buttons");
    buttonDiv.appendChild(addMoreButton);
    addMoreButton.addEventListener("click", () => {
      formInput.reset();
      messageContainer.innerText = "";
    });

    addMoreButtonCreated = true;
  }

  if (quizQuestionArray.length > 20 && !createQuizButtonCreated) {
    //we can chnge this number after . . . i set it to lowest to see the flow
    const createQuizButton = document.createElement("button");
    createQuizButton.innerText = "Create a Quiz";
    createQuizButton.classList.add("control-buttons");
    buttonDiv.appendChild(createQuizButton);

    createQuizButton.addEventListener("click", () => {
      alert("Quiz Created!");
      messageContainer.innerText = "";
      // const newQuizMainDiv = document.createElement("div");
      // newQuizMainDiv.classList.add("questionContainer");
      // const newQuizHeadingDiv = document.createElement("div");
      // newQuizHeadingDiv.classList.add("introduction");
      // newQuizMainDiv.appendChild(newQuizHeadingDiv);
      // const newQuizHeading = document.createElement("h1");
      // newQuizHeading.innerText = "QUIZ";
      // newQuizHeadingDiv.appendChild(newQuizHeading);

      // const selectedQuestions = [];
      // while (selectedQuestions.length < 5) {
      //   const randomIndex = Math.floor(
      //     Math.random() * quizQuestionArray.length
      //   );
      //   const question = quizQuestionArray[randomIndex];
      //   if (!selectedQuestions.includes(question)) {
      //     selectedQuestions.push(question);
      //   }
      // }

      /*  Above code i will work in WEEK 2 to add following features
          1.  color the input for the "correct" answer option in green and the "wrong" ones in red. Make sure it's still readable.
          2.  show a list of all quiz questions added to the array below the form. It should show the questions, the 4 options but
              not which one is correct. Add a button with the functionality to reveal which is the correct answer for each question.
          3.  build a function to filter the questions by searching the content of the question.
      */
    });

    createQuizButtonCreated = true;
  }
});

function shuffleAnswers() {
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
    document.body.appendChild(messageContainer);
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

if (!shuffleButtonCreated) {
  const shuffleButton = document.createElement("button");
  shuffleButton.innerText = "Shuffle Answers";
  shuffleButton.classList.add("control-buttons");
  shuffleButton.type = "button";
  buttonDiv.appendChild(shuffleButton);
  shuffleButton.addEventListener("click", shuffleAnswers);

  shuffleButtonCreated = true;
}
