// Input Form All Imputs Storing Function
function getAllElementsFromInputPage() {
  const questionInput = document.getElementById("question").value;
  const option1Input = document.getElementById("option1").value;
  const option2Input = document.getElementById("option2").value;
  const option3Input = document.getElementById("option3").value;
  const option4Input = document.getElementById("option4").value;
  const correctAnswerInput = document.querySelector(
    'input[name="correct-answer"]:checked'
  )?.value;

  return {
    questionInput,
    option1Input,
    option2Input,
    option3Input,
    option4Input,
    correctAnswerInput,
  };
}

// Submitt Button Eventlistner
const formInput = document.querySelector(".question-input-form");
formInput.addEventListener("submit", submitForm);

function submitForm(event) {
  event.preventDefault();

  const inputFormData = getAllElementsFromInputPage();
  const questionExists = quizQuestionArray.some(
    (item) =>
      item.question.toLowerCase() === inputFormData.questionInput.toLowerCase()
  );

  const optionsDuplicationCheck = [
    inputFormData.option1Input,
    inputFormData.option2Input,
    inputFormData.option3Input,
    inputFormData.option4Input,
  ];

  const duplicateOption =
    optionsDuplicationCheck.length !== new Set(optionsDuplicationCheck).size;

  if (duplicateOption) {
    errorOrNormalMessageContainer("ERROR: Duplicate Answers Found!");
  } else {
    if (questionExists) {
      errorOrNormalMessageContainer("ERROR: Question Already Exists!");
    } else {
      const options = [
        {
          text: inputFormData.option1Input,
          isCorrect: inputFormData.correctAnswerInput === "option1",
        },
        {
          text: inputFormData.option2Input,
          isCorrect: inputFormData.correctAnswerInput === "option2",
        },
        {
          text: inputFormData.option3Input,
          isCorrect: inputFormData.correctAnswerInput === "option3",
        },
        {
          text: inputFormData.option4Input,
          isCorrect: inputFormData.correctAnswerInput === "option4",
        },
      ];

      const correctAnswerText = options.find(
        (option) => option.isCorrect
      )?.text;

      const quizQuestion = {
        id: quizQuestionArray.length + 1,
        question: inputFormData.questionInput,
        options: options,
        explanation: `The correct answer is ${correctAnswerText}.`,
      };

      quizQuestionArray.push(quizQuestion);

      errorOrNormalMessageContainer(
        `New question with possible options and correct option INSERTED with ID: ${
          quizQuestionArray[quizQuestionArray.length - 1].id
        }`
      );
      removeHighLightners();
    }
  }
}

// Add More Buttion Evenlistner (Its type is reset but eventlistner added to call some other functions)
const resetButton = document.querySelector('button[type="reset"]');
resetButton.addEventListener("click", () => {
  removeHighLightners();
  resetAnswerInputOrder();
});

// Error or Normal Message Display Container

//Input Check Applied to check length of Question
const questionInputCheck = document.getElementById("question");
const maxLengthOfInput = questionInputCheck.maxLength;
question.addEventListener("input", (event) => {
  const currentLength = event.target.value.length;
  if (currentLength >= maxLengthOfInput) {
    errorOrNormalMessageContainer(
      `ERROR: Question cannot be more than ${maxLengthOfInput} characters!\nThis app saves only first ${maxLengthOfInput} characters of input question.`
    );
  }
});

//Colouring the Input Answers Green for Right and Red for Wrong
let correctAnswerInput;
const radioButtons = document.querySelectorAll('input[name="correct-answer"]');
radioButtons.forEach((radioButton) => {
  radioButton.addEventListener("change", () => {
    correctAnswerInput = document.querySelector(
      'input[name="correct-answer"]:checked'
    )?.value;

    highligtAnswerInputs(correctAnswerInput);
  });
});

// Highlighting the Correct and Wrong Answers
function highligtAnswerInputs(userSelectedAnswer) {
  const inputFormData = getAllElementsFromInputPage();

  if (
    !inputFormData.option1Input ||
    !inputFormData.option2Input ||
    !inputFormData.option3Input ||
    !inputFormData.option4Input
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

// Removing the Highlighting of the Answers
function removeHighLightners() {
  const allOptions = document.querySelectorAll(
    'input[type="text"][name="answer"]'
  );
  allOptions.forEach((input) => {
    input.classList.remove("correct-answer", "wrong-answer");
  });
}

// Shuffle Button Eventlistner
const shuffleButton = document.querySelector(".shuffle-button");
shuffleButton.addEventListener("click", shuffleAnswers);

// Shuffle the Answers
function shuffleAnswers() {
  const answersContainer = document.querySelector(".answers-container");

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
}

// Reset Shuffled Answers Inputs Fields to Normal
function resetAnswerInputOrder() {
  const answersContainer = document.querySelector(".answers-container");

  const option1Input = document.getElementById("option1");
  const option2Input = document.getElementById("option2");
  const option3Input = document.getElementById("option3");
  const option4Input = document.getElementById("option4");

  const label1 = document.querySelector('label[for="option1"]');
  const label2 = document.querySelector('label[for="option2"]');
  const label3 = document.querySelector('label[for="option3"]');
  const label4 = document.querySelector('label[for="option4"]');

  const optionsArray = [
    { label: label1, input: option1Input },
    { label: label2, input: option2Input },
    { label: label3, input: option3Input },
    { label: label4, input: option4Input },
  ];

  answersContainer.innerHTML = "";

  optionsArray.forEach((item) => {
    answersContainer.appendChild(item.label);
    answersContainer.appendChild(item.input);
  });
}
