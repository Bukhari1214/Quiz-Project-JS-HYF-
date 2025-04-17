fetchQuizData().then((fetchedQuizData) => {
  function quizListDisplay(sortOrder = "asc") {
    try {
      if (!fetchedQuizData || fetchedQuizData.length === 0) {
        errorOrNormalMessageContainer("ERROR: No quiz questions available.");
        return;
      }

      const quizQuestionListDisplay = document.querySelector(
        ".quizList-container-display"
      );
      quizQuestionListDisplay.innerHTML = "";

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

      quizQuestionListDisplay.appendChild(quizQuestionsListDiv);

      sortSelect.value = sortOrder;

      sortSelect.addEventListener("change", function () {
        const selectedSortOrder = sortSelect.value;
        quizListDisplay(selectedSortOrder);
      });

      if (sortOrder === "asc") {
        fetchedQuizData.sort((a, b) => a.question.localeCompare(b.question));
      } else if (sortOrder === "desc") {
        fetchedQuizData.sort((a, b) => b.question.localeCompare(a.question));
      }

      fetchedQuizData.forEach((quiz, index) => {
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

            setTimeout(() => {
              correctAnswerOfQuestion.remove();
            }, 3000);
          }
        });

        quizQuestionsListDiv.appendChild(questionDiv);
      });
    } catch (error) {
      errorOrNormalMessageContainer(`Error: ${error.message}`);
    }
  }
  quizListDisplay();
});
