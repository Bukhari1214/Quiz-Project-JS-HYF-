popUpDisplay("Click Search Button Again To Perform Search.");

const navItemToSearch = document.getElementById("search");
navItemToSearch.addEventListener("click", function (e) {
  e.preventDefault();
  searchInQuestions();
});

function searchInQuestions() {
  try {
    if (!fetchedQuizData || fetchedQuizData.length === 0) {
      errorOrNormalMessageContainer("No data available to search.");
      return;
    }

    const searchContainerDisplay = document.querySelector(
      ".search-container-display"
    );
    searchContainerDisplay.innerHTML = "";

    const searchAreaMainDiv = document.createElement("div");
    searchAreaMainDiv.classList.add("searchContainerDiv");

    const searchAreaHeadingDiv = document.createElement("div");
    searchAreaHeadingDiv.classList.add("searchHeadingDiv");
    const searchAreaHeading = document.createElement("h2");
    searchAreaHeading.innerText = "You Can Search The Questions";
    searchAreaHeadingDiv.appendChild(searchAreaHeading);
    searchAreaMainDiv.appendChild(searchAreaHeadingDiv);
    searchContainerDisplay.appendChild(searchAreaMainDiv);

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

      const filteredQuestionsToDisplay = fetchedQuizData.filter((quizItem) => {
        return quizItem.question.toLowerCase().includes(searchInputFromUser);
      });

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
    errorOrNormalMessageContainer(`Error fetching data: ${error.message}`);
  }
}
