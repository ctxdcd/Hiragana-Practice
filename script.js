// =========================
// HIRAGANA DATA
// =========================

const hiragana = [
    { jp: "あ", romaji: "a" },
    { jp: "い", romaji: "i" },
    { jp: "う", romaji: "u" },
    { jp: "え", romaji: "e" },
    { jp: "お", romaji: "o" },

    { jp: "か", romaji: "ka" },
    { jp: "き", romaji: "ki" },
    { jp: "く", romaji: "ku" },
    { jp: "け", romaji: "ke" },
    { jp: "こ", romaji: "ko" },

    { jp: "さ", romaji: "sa" },
    { jp: "し", romaji: "shi" },
    { jp: "す", romaji: "su" },
    { jp: "せ", romaji: "se" },
    { jp: "そ", romaji: "so" },

    { jp: "た", romaji: "ta" },
    { jp: "ち", romaji: "chi" },
    { jp: "つ", romaji: "tsu" },
    { jp: "て", romaji: "te" },
    { jp: "と", romaji: "to" },

    { jp: "な", romaji: "na" },
    { jp: "に", romaji: "ni" },
    { jp: "ぬ", romaji: "nu" },
    { jp: "ね", romaji: "ne" },
    { jp: "の", romaji: "no" },

    { jp: "は", romaji: "ha" },
    { jp: "ひ", romaji: "hi" },
    { jp: "ふ", romaji: "fu" },
    { jp: "へ", romaji: "he" },
    { jp: "ほ", romaji: "ho" },

    { jp: "ま", romaji: "ma" },
    { jp: "み", romaji: "mi" },
    { jp: "む", romaji: "mu" },
    { jp: "め", romaji: "me" },
    { jp: "も", romaji: "mo" },

    { jp: "や", romaji: "ya" },
    { jp: "ゆ", romaji: "yu" },
    { jp: "よ", romaji: "yo" },

    { jp: "ら", romaji: "ra" },
    { jp: "り", romaji: "ri" },
    { jp: "る", romaji: "ru" },
    { jp: "れ", romaji: "re" },
    { jp: "ろ", romaji: "ro" },

    { jp: "わ", romaji: "wa" },
    { jp: "を", romaji: "wo" },

    { jp: "ん", romaji: "n" }
];


// =========================
// VARIABLES
// =========================

let selectedCards = [];

let quizQuestions = [];
let currentQuestion = 0;
let score = 0;

let quizMode = "jp-romaji";


// =========================
// ELEMENTS
// =========================

const selectionScreen = document.getElementById("selectionScreen");
const quizScreen = document.getElementById("quizScreen");

const chart = document.getElementById("hiraganaChart");

const selectedCount = document.getElementById("selectedCount");

const selectAllButton = document.getElementById("selectAll");
const clearAllButton = document.getElementById("clearAll");

const startQuizButton = document.getElementById("startQuiz");

const quizModeSelect = document.getElementById("quizMode");

const backButton = document.getElementById("backButton");

const questionNumber = document.getElementById("questionNumber");
const scoreDisplay = document.getElementById("score");

const questionDisplay = document.getElementById("question");

const answerInput = document.getElementById("answerInput");

const checkAnswerButton = document.getElementById("checkAnswer");

const feedback = document.getElementById("feedback");

const nextQuestionButton = document.getElementById("nextQuestion");


// =========================
// CREATE HIRAGANA CHART
// =========================

function createChart() {

    chart.innerHTML = "";

    hiragana.forEach((item, index) => {

        const card = document.createElement("button");

        card.className = "hiragana-card";

        card.innerHTML = `
            <span class="japanese">${item.jp}</span>
            <span class="romaji">${item.romaji}</span>
        `;

        card.addEventListener("click", () => {

            if (selectedCards.includes(index)) {

                selectedCards = selectedCards.filter(
                    i => i !== index
                );

                card.classList.remove("selected");

            } else {

                selectedCards.push(index);

                card.classList.add("selected");
            }

            updateSelectedCount();
        });

        chart.appendChild(card);
    });
}


// =========================
// SELECTED COUNT
// =========================

function updateSelectedCount() {

    selectedCount.textContent =
        `${selectedCards.length} selected`;
}


// =========================
// SELECT ALL
// =========================

selectAllButton.addEventListener("click", () => {

    selectedCards = hiragana.map((_, index) => index);

    document
        .querySelectorAll(".hiragana-card")
        .forEach(card => {
            card.classList.add("selected");
        });

    updateSelectedCount();
});


// =========================
// CLEAR ALL
// =========================

clearAllButton.addEventListener("click", () => {

    selectedCards = [];

    document
        .querySelectorAll(".hiragana-card")
        .forEach(card => {
            card.classList.remove("selected");
        });

    updateSelectedCount();
});


// =========================
// SHUFFLE
// =========================

function shuffle(array) {

    const shuffled = [...array];

    for (let i = shuffled.length - 1; i > 0; i--) {

        const j = Math.floor(Math.random() * (i + 1));

        [shuffled[i], shuffled[j]] =
            [shuffled[j], shuffled[i]];
    }

    return shuffled;
}


// =========================
// START QUIZ
// =========================

startQuizButton.addEventListener("click", () => {

    if (selectedCards.length === 0) {

        alert("Please select at least one hiragana.");

        return;
    }

    quizMode = quizModeSelect.value;

    quizQuestions = shuffle(
        selectedCards.map(index => hiragana[index])
    );

    currentQuestion = 0;
    score = 0;

    // Switch screens
    selectionScreen.classList.add("hidden");
    quizScreen.classList.remove("hidden");

    showQuestion();

    answerInput.focus();
});


// =========================
// SHOW QUESTION
// =========================

function showQuestion() {

    const current = quizQuestions[currentQuestion];

    questionNumber.textContent =
        `Question ${currentQuestion + 1} / ${quizQuestions.length}`;

    scoreDisplay.textContent =
        `Score: ${score}`;

    feedback.textContent = "";

    answerInput.value = "";

    answerInput.disabled = false;

    checkAnswerButton.disabled = false;

    nextQuestionButton.classList.add("hidden");

    if (quizMode === "jp-romaji") {

        questionDisplay.textContent = current.jp;

    } else {

        questionDisplay.textContent = current.romaji;
    }
}


// =========================
// CHECK ANSWER
// =========================

checkAnswerButton.addEventListener("click", checkAnswer);


function checkAnswer() {

    const current = quizQuestions[currentQuestion];

    const userAnswer =
        answerInput.value.trim().toLowerCase();

    let correctAnswer;

    if (quizMode === "jp-romaji") {

        correctAnswer = current.romaji;

    } else {

        correctAnswer = current.jp;
    }

    if (userAnswer === correctAnswer.toLowerCase()) {

        score++;

        feedback.textContent = "Correct! ✓";

    } else {

        feedback.textContent =
            `Not quite. The answer is ${correctAnswer}`;
    }

    scoreDisplay.textContent =
        `Score: ${score}`;

    answerInput.disabled = true;

    checkAnswerButton.disabled = true;

    nextQuestionButton.classList.remove("hidden");

    nextQuestionButton.focus();
}


// =========================
// NEXT QUESTION
// =========================

nextQuestionButton.addEventListener("click", () => {

    currentQuestion++;

    if (currentQuestion >= quizQuestions.length) {

        finishQuiz();

        return;
    }

    showQuestion();

    answerInput.focus();
});


// =========================
// FINISH QUIZ
// =========================

function finishQuiz() {

    questionDisplay.textContent =
        "Finished! 🎉";

    questionNumber.textContent =
        "Quiz Complete";

    scoreDisplay.textContent =
        `Score: ${score} / ${quizQuestions.length}`;

    feedback.textContent =
        "Nice work! Keep practicing.";

    answerInput.classList.add("hidden");

    checkAnswerButton.classList.add("hidden");

    nextQuestionButton.textContent =
        "Back to Selection";

    nextQuestionButton.classList.remove("hidden");

    nextQuestionButton.disabled = false;

    nextQuestionButton.onclick = returnToSelection;
}


// =========================
// RETURN TO SELECTION
// =========================

function returnToSelection() {

    quizScreen.classList.add("hidden");

    selectionScreen.classList.remove("hidden");

    answerInput.classList.remove("hidden");

    checkAnswerButton.classList.remove("hidden");

    nextQuestionButton.textContent =
        "Next Question →";

    nextQuestionButton.onclick = null;

    createChart();

    // Restore selected cards visually
    selectedCards.forEach(index => {

        const cards =
            document.querySelectorAll(".hiragana-card");

        if (cards[index]) {
            cards[index].classList.add("selected");
        }
    });

    updateSelectedCount();
}


// =========================
// BACK BUTTON
// =========================

backButton.addEventListener("click", () => {

    quizScreen.classList.add("hidden");

    selectionScreen.classList.remove("hidden");

    answerInput.classList.remove("hidden");

    checkAnswerButton.classList.remove("hidden");

    nextQuestionButton.textContent =
        "Next Question →";

    nextQuestionButton.classList.add("hidden");

    createChart();

    selectedCards.forEach(index => {

        const cards =
            document.querySelectorAll(".hiragana-card");

        if (cards[index]) {
            cards[index].classList.add("selected");
        }
    });

    updateSelectedCount();
});


// =========================
// ENTER KEY
// =========================

answerInput.addEventListener("keydown", (event) => {

    if (event.key !== "Enter") {
        return;
    }

    if (!answerInput.disabled) {

        checkAnswer();

    } else if (!nextQuestionButton.classList.contains("hidden")) {

        nextQuestionButton.click();
    }
});


// =========================
// INITIALIZE
// =========================

createChart();
updateSelectedCount();