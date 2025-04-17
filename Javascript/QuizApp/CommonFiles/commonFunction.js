// I kept some variables here which i need on all pages
let quizQuestionArray = []; // This is the array where all the quiz questions will be stored for run time and can be seen in console.log

//Toggle button Feature
const themeToggleButton = document.getElementById("theme-toggle");
const body = document.body;

if (localStorage.getItem("theme") === "dark") {
  body.classList.add("dark-theme");
  themeToggleButton.textContent = "Switch to Light Theme";
}

themeToggleButton.addEventListener("click", () => {
  body.classList.toggle("dark-theme");

  if (body.classList.contains("dark-theme")) {
    themeToggleButton.textContent = "Switch to Light Theme";
    localStorage.setItem("theme", "dark");
  } else {
    themeToggleButton.textContent = "Switch to Dark Theme";
    localStorage.setItem("theme", "light");
  }
});

function errorOrNormalMessageContainer(message) {
  const messageContainer = document.querySelector(".message-container");

  messageContainer.classList.remove("error-message", "normal-message");

  if (message.trim().toLowerCase().includes("error")) {
    messageContainer.classList.add("error-message");
  } else {
    messageContainer.classList.add("normal-message");
  }

  messageContainer.textContent = message;
  messageContainer.style.display = "block";

  setTimeout(() => {
    messageContainer.style.display = "none";
  }, 3000);
}

function popUpDisplay(message) {
  const popupMessage = document.createElement("div");
  popupMessage.classList.add("popup-message");
  popupMessage.innerText = message;

  document.body.appendChild(popupMessage);

  setTimeout(function () {
    popupMessage.remove();
  }, 3000);
}
