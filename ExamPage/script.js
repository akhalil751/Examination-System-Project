//GLOBAL STATE
const appState = {
  currentQuestionIndex: 0,
  markedQuestions: new Set(),
  answers: {},
  questions: []
};

//DOM references
const markButton = document.querySelector('.mark-question');
const flagIcon = markButton.querySelector('img');
const sidebar = document.querySelector('.marked-questions');
const radioGroup = document.querySelector('.radio-group');
const prevBtn = document.querySelectorAll('.nav-button')[0];
const nextBtn = document.querySelectorAll('.nav-button')[1];

//FETCH QUESTIONS FROM FAKE JSON API
fetch("https://mocki.io/v1/8400ff94-7b81-49a2-84f3-7d12c3e3d74b")
  .then(response => {
    if (!response.ok) throw new Error("Network response was not ok");
    return response.json();
  })
  .then(data => {
    appState.questions = data.questions;
    shuffleQuestions(appState.questions);
    renderQuestion(appState.currentQuestionIndex);
  })
  .catch(error => {
    console.error("Error fetching data:", error);
    document.getElementById("questionText").textContent =
      "Failed to load questions. Please refresh the page.";
  });

function shuffleQuestions(questions) {
  for (let i = questions.length - 1; i > 0; i--) {
    var j = Math.floor(Math.random() * (i + 1));
    var temp = questions[i];
    questions[i] = questions[j];
    questions[j] = temp;
  }
}

//EVENT: Toggle Flag and ADD/REMOVE marked question from sidebar
markButton.addEventListener('click', () => {
  const index = appState.currentQuestionIndex;

  if (appState.markedQuestions.has(index)) {
    appState.markedQuestions.delete(index);
    markButton.style.backgroundColor = '';
    flagIcon.src = './assets/svg/flag-regular 1.svg';
    removeFromSidebar(index);
  } else {
    appState.markedQuestions.add(index);
    markButton.style.backgroundColor = '#ffe4e1';
    flagIcon.src = './assets/svg/flag-solid.svg';
    addToSidebar(index);
  }
});

//SIDEBAR FUNCTIONS
function addToSidebar(index) {
  if (sidebar.querySelector(`[data-index="${index}"]`)) return;

  const div = document.createElement('div');
  div.className = 'flagged';
  div.dataset.index = index;
  div.innerText = `Q${index + 1}`;

  div.addEventListener('click', () => {
    saveCurrentAnswer();
    appState.currentQuestionIndex = index;
    renderQuestion(index);
    updateUI(index);
  });

  sidebar.appendChild(div);
}

function removeFromSidebar(index) {
  const item = sidebar.querySelector(`[data-index="${index}"]`);
  if (item) item.remove();
}

//DISPLAY QUESTION ON CURRENT SCREEN
function renderQuestion(index) {
  if (!appState.questions || appState.questions.length === 0) {
    console.error("No questions available");
    return;
  }

  const question = appState.questions[index];

  document.getElementById("questionNumber").textContent = `Q${index + 1}. `;
  document.getElementById("questionText").textContent = question.question;

  const options = document.querySelectorAll(".radio-text");
  const optionValues = Object.values(question.options);
  options.forEach((option, i) => {
    option.textContent = optionValues[i];
    document.querySelectorAll('input[type="radio"]')[i].value = Object.keys(question.options)[i];
  });

  document.getElementById("pageNumber").textContent = `${index + 1}/${appState.questions.length}`;

  const radios = document.querySelectorAll('input[type="radio"]');
  radios.forEach(radio => radio.checked = false);

  const savedValue = appState.answers[index];
  if (savedValue) {
    const savedRadio = document.querySelector(`input[value="${savedValue}"]`);
    if (savedRadio) savedRadio.checked = true;
  }

  updateUI(index);
}

//SAVE ANSWERS FOR FINAL SCORE
function saveCurrentAnswer() {
  const selectedOption = document.querySelector('input[type="radio"]:checked');
  if (selectedOption) {
    appState.answers[appState.currentQuestionIndex] = selectedOption.value;
    return true;
  }
  return false;
}

//UPDATE UI AFTER RENDER
function updateUI(index) {
  const isMarked = appState.markedQuestions.has(index);
  markButton.style.backgroundColor = isMarked ? '#ffe4e1' : '';
  flagIcon.src = isMarked ? '/ExamPage/assets/svg/flag-solid.svg' : '/ExamPage/assets/svg/flag-regular 1.svg';

  const saved = appState.answers[index];
  const options = radioGroup.querySelectorAll('input[type="radio"]');
  options.forEach(opt => {
    const text = opt.closest('label').querySelector('.radio-text').innerText;
    opt.checked = opt.value === saved;
  });
}

//TRACK ANSWERS FOR WHEN WE NAVIGATE BACK FROM SIDE BAR
radioGroup.addEventListener('change', (e) => {
  if (e.target.name === 'option') {
    const selectedValue = e.target.value;
    appState.answers[appState.currentQuestionIndex] = selectedValue;
  }
});

//NAVIGATION BUTTONS LOGIC
prevBtn.addEventListener('click', () => {
  if (appState.currentQuestionIndex > 0) {
    saveCurrentAnswer();
    appState.currentQuestionIndex--;
    renderQuestion(appState.currentQuestionIndex);
  }
});

nextBtn.addEventListener('click', () => {
  saveCurrentAnswer();
  if (appState.currentQuestionIndex < appState.questions.length - 1) {
    appState.currentQuestionIndex++;
    renderQuestion(appState.currentQuestionIndex);
  }
});

window.onload = function () {
  var firstName = localStorage.getItem("firstName");
  var lastName = localStorage.getItem("lastName");

  var today = new Date();
  var dateString = today.getDate().toString().padStart(2, '0') + '/' +
               (today.getMonth() + 1).toString().padStart(2, '0') + '/' +
               today.getFullYear();
  localStorage.setItem("examDate", dateString);

  var duration = 2 * 60;
  var timerDisplay = document.querySelector(".time-left");
  var interval;

  function startTimer() {
    interval = setInterval(function () {
      var minutes = Math.floor(duration / 60);
      var seconds = duration % 60;

      minutes = minutes < 10 ? "0" + minutes : minutes;
      seconds = seconds < 10 ? "0" + seconds : seconds;

      if (timerDisplay) {
        timerDisplay.textContent = minutes + ":" + seconds;
      }

      if (duration <= 0) {
        clearInterval(interval);
        localStorage.setItem("status", "timeout");
        localStorage.setItem("fullName", firstName + " " + lastName);
        location.replace("../ResultPage/Result.html");
      }

      duration--;
    }, 1000);
  }

  startTimer();

  var submitBtn = document.querySelector(".submit-button");
  submitBtn.addEventListener("click", function () {
    document.getElementById("submitModal").style.display = "flex";
  });
  
  document.getElementById("cancelSubmit").addEventListener("click", function () {
    document.getElementById("submitModal").style.display = "none";
  });
  
  document.getElementById("confirmSubmit").addEventListener("click", function () {
    clearInterval(interval);
    let finalScore = 0;
    for (let i = 0; i < appState.questions.length; i++) {
      if (appState.answers[i] === appState.questions[i].correctAnswer) {
        finalScore++;
      }
    }
    localStorage.setItem("quizScore", finalScore);
    localStorage.setItem("totalQuestions", appState.questions.length);
    localStorage.setItem("status", "onTime");
    localStorage.setItem("fullName", firstName + " " + lastName);
    location.replace("../ResultPage/Result.html");
  });

  }
 ;