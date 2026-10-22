
/* =========================
   HIRAGANA DATA
   ========================= */

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


/* =========================
   SETTINGS
   ========================= */

const FEEDBACK_DURATION = 1000; // 3 seconds


/* =========================
   VARIABLES
   ========================= */

let selectedCards = [];
let quizQuestions = [];
let currentQuestion = 0;

let trueTotal = 0;
let falseTotal = 0;

let quizMode = "jp-romaji";
let answered = false;
let feedbackTimer = null;


/* =========================
   ELEMENTS
   ========================= */

const selectionScreen =
    document.getElementById("selectionScreen");

const quizScreen =
    document.getElementById("quizScreen");

const chart =
    document.getElementById("hiraganaChart");

const selectedCount =
    document.getElementById("selectedCount");

const selectAllButton =
    document.getElementById("selectAll");

const clearAllButton =
    document.getElementById("clearAll");

const startQuizButton =
    document.getElementById("startQuiz");

const quizModeSelect =
    document.getElementById("quizMode");

const backButton =
    document.getElementById("backButton");

const questionNumber =
    document.getElementById("questionNumber");

const trueCountDisplay =
    document.getElementById("trueCount");

const falseCountDisplay =
    document.getElementById("falseCount");

const questionDisplay =
    document.getElementById("question");

const answerInput =
    document.getElementById("answerInput");

const checkAnswerButton =
    document.getElementById("checkAnswer");

const feedback =
    document.getElementById("feedback");


/* =========================
   CREATE HIRAGANA CHART
   ========================= */

function createChart() {
    chart.innerHTML = "";

    hiragana.forEach((item, index) => {
        const card = document.createElement("button");

        card.type = "button";
        card.className = "hiragana-card";

        card.innerHTML = `
            <span class="japanese">${item.jp}</span>
            <span class="romaji">${item.romaji}</span>
        `;

        card.addEventListener("click", () => {
            if (selectedCards.includes(index)) {
                selectedCards = selectedCards.filter(
                    selectedIndex => selectedIndex !== index
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


/* =========================
   SELECTED COUNT
   ========================= */

function updateSelectedCount() {
    selectedCount.textContent =
        `${selectedCards.length} selected`;
}


/* =========================
   SELECT ALL
   ========================= */

selectAllButton.addEventListener("click", () => {
    selectedCards = hiragana.map((_, index) => index);

    document.querySelectorAll(".hiragana-card").forEach(card => {
        card.classList.add("selected");
    });

    updateSelectedCount();
});


/* =========================
   CLEAR ALL
   ========================= */

clearAllButton.addEventListener("click", () => {
    selectedCards = [];

    document.querySelectorAll(".hiragana-card").forEach(card => {
        card.classList.remove("selected");
    });

    updateSelectedCount();
});


/* =========================
   SHUFFLE
   ========================= */

function shuffle(array) {
    const shuffled = [...array];

    for (let i = shuffled.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));

        [shuffled[i], shuffled[j]] =
            [shuffled[j], shuffled[i]];
    }

    return shuffled;
}


/* =========================
   START ENDLESS PRACTICE
   ========================= */

startQuizButton.addEventListener("click", () => {
    if (selectedCards.length === 0) {
        alert("Please select at least one hiragana.");
        return;
    }

    clearFeedbackTimer();

    quizMode = quizModeSelect.value;

    quizQuestions = shuffle(
        selectedCards.map(index => hiragana[index])
    );

    currentQuestion = 0;
    trueTotal = 0;
    falseTotal = 0;
    answered = false;

    updateStats();

    selectionScreen.classList.add("hidden");
    quizScreen.classList.remove("hidden");

    showQuestion();

    // Open the mobile keyboard from the user's Start tap.
    // The input remains enabled during the quiz.
    answerInput.focus({ preventScroll: true });
});


/* =========================
   SHOW QUESTION
   ========================= */


function showQuestion() {
    const current = quizQuestions[currentQuestion];
    if (!current) return;

    hideFeedback();

    answered = false;

    questionNumber.textContent =
        `Practice #${currentQuestion + 1}`;

    questionDisplay.textContent =
        quizMode === "jp-romaji"
            ? current.jp
            : current.romaji;

    answerInput.value = "";
    answerInput.disabled = false;
    checkAnswerButton.disabled = false;

    // Restore focus after the question changes.
    answerInput.focus({ preventScroll: true });
}



/* =========================
   CHECK ANSWER
   ========================= */

checkAnswerButton.addEventListener("click", checkAnswer);


function checkAnswer() {
    if (answered) return;

    const current = quizQuestions[currentQuestion];
    if (!current) return;

    const userAnswer = answerInput.value.trim().toLowerCase();

    if (!userAnswer) {
        answerInput.focus({ preventScroll: true });
        return;
    }

    const correctAnswer =
        quizMode === "jp-romaji"
            ? current.romaji
            : current.jp;

    const isCorrect =
        userAnswer === correctAnswer.toLowerCase();

    answered = true;

    if (isCorrect) {
        trueTotal++;
        showFeedback("Correct! ✓", "correct");
    } else {
        falseTotal++;
        showFeedback(`Wrong! The answer is ${correctAnswer}`, "wrong");
    }

    updateStats();

    clearFeedbackTimer();

    feedbackTimer = setTimeout(() => {
        nextQuestion();
    }, FEEDBACK_DURATION);
}



/* =========================
   SHOW POP-UP FEEDBACK
   ========================= */

function showFeedback(message, resultClass) {
    feedback.textContent = message;

    feedback.classList.remove("correct", "wrong", "visible");
    feedback.classList.add(resultClass);

    // Restart the animation when showing a new result.
    void feedback.offsetWidth;

    feedback.classList.add("visible");
}


/* =========================
   HIDE POP-UP FEEDBACK
   ========================= */

function hideFeedback() {
    feedback.classList.remove(
        "visible",
        "correct",
        "wrong"
    );

    feedback.textContent = "";
}


/* =========================
   UPDATE T / F COUNTERS
   ========================= */

function updateStats() {
    trueCountDisplay.textContent = trueTotal;
    falseCountDisplay.textContent = falseTotal;
}


/* =========================
   AUTOMATIC NEXT QUESTION
   ========================= */

function nextQuestion() {
    clearFeedbackTimer();

    if (quizQuestions.length === 0) return;

    currentQuestion++;

    // When the current shuffled set is finished,
    // shuffle it again and continue forever.
    if (currentQuestion >= quizQuestions.length) {
        quizQuestions = shuffle(
            selectedCards.map(index => hiragana[index])
        );

        currentQuestion = 0;
    }

    showQuestion();

    // No button tap is required.
    // The input is not blurred or disabled.
}


/* =========================
   CLEAR FEEDBACK TIMER
   ========================= */

function clearFeedbackTimer() {
    if (feedbackTimer !== null) {
        clearTimeout(feedbackTimer);
        feedbackTimer = null;
    }
}


/* =========================
   BACK TO SELECTION
   ========================= */

backButton.addEventListener("click", returnToSelection);

function returnToSelection() {
    clearFeedbackTimer();
    hideFeedback();

    quizScreen.classList.add("hidden");
    selectionScreen.classList.remove("hidden");

    answerInput.value = "";
    answerInput.disabled = false;

    answered = false;

    createChart();
    restoreSelectedCards();
    updateSelectedCount();
}


/* =========================
   RESTORE SELECTED CARDS
   ========================= */

function restoreSelectedCards() {
    const cards = document.querySelectorAll(".hiragana-card");

    selectedCards.forEach(index => {
        if (cards[index]) {
            cards[index].classList.add("selected");
        }
    });
}


/* =========================
   ENTER KEY
   ========================= */

answerInput.addEventListener("keydown", event => {
    if (event.key !== "Enter") return;

    event.preventDefault();

    // Ignore additional submissions while the result is showing.
    if (answered) return;

    checkAnswer();
});


checkAnswerButton.addEventListener("pointerdown", event => {
    // Prevent the button from taking focus away from the input.
    event.preventDefault();
})

/* =========================
   INITIALIZE
   ========================= */

createChart();
updateSelectedCount();
updateStats();
