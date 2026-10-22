
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
   VARIABLES
   ========================= */

let selectedCards = [];
let quizQuestions = [];
let currentQuestion = 0;
let score = 0;

let quizMode = "jp-romaji";
let practiceMode = "normal";

let answered = false;
let quizFinished = false;


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

const practiceModeSelect =
    document.getElementById("practiceMode");

const backButton =
    document.getElementById("backButton");

const questionNumber =
    document.getElementById("questionNumber");

const scoreDisplay =
    document.getElementById("score");

const questionDisplay =
    document.getElementById("question");

const answerInput =
    document.getElementById("answerInput");

const checkAnswerButton =
    document.getElementById("checkAnswer");

const feedback =
    document.getElementById("feedback");

const nextQuestionButton =
    document.getElementById("nextQuestion");


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

    document.querySelectorAll(".hiragana-card")
        .forEach(card => {
            card.classList.add("selected");
        });

    updateSelectedCount();
});


/* =========================
   CLEAR ALL
   ========================= */

clearAllButton.addEventListener("click", () => {
    selectedCards = [];

    document.querySelectorAll(".hiragana-card")
        .forEach(card => {
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
        const j = Math.floor(
            Math.random() * (i + 1)
        );

        [shuffled[i], shuffled[j]] =
            [shuffled[j], shuffled[i]];
    }

    return shuffled;
}


/* =========================
   START QUIZ
   ========================= */

startQuizButton.addEventListener("click", () => {
    if (selectedCards.length === 0) {
        alert("Please select at least one hiragana.");
        return;
    }

    quizMode = quizModeSelect.value;
    practiceMode = practiceModeSelect.value;

    quizQuestions = shuffle(
        selectedCards.map(index => hiragana[index])
    );

    currentQuestion = 0;
    score = 0;
    answered = false;
    quizFinished = false;

    selectionScreen.classList.add("hidden");
    quizScreen.classList.remove("hidden");

    nextQuestionButton.textContent =
        practiceMode === "endless"
            ? "Next Practice →"
            : "Next Question →";

    nextQuestionButton.disabled = false;

    // Restore the input and answer button.
    answerInput.classList.remove("hidden");
    answerInput.disabled = false;
    checkAnswerButton.classList.remove("hidden");
    checkAnswerButton.disabled = false;

    showQuestion();

    // This is triggered by the user's Start Quiz tap.
    // On Android, this gives the browser a chance to
    // open the keyboard while the user gesture is active.
    answerInput.focus({ preventScroll: true });
});


/* =========================
   SHOW QUESTION
   ========================= */

function showQuestion() {
    const current = quizQuestions[currentQuestion];

    if (!current) return;

    if (practiceMode === "endless") {
        questionNumber.textContent =
            `Practice #${currentQuestion + 1}`;
    } else {
        questionNumber.textContent =
            `Question ${currentQuestion + 1} / ${quizQuestions.length}`;
    }

    scoreDisplay.textContent = `Score: ${score}`;

    feedback.textContent = "";

    answered = false;

    answerInput.value = "";
    answerInput.disabled = false;

    checkAnswerButton.disabled = false;

    nextQuestionButton.classList.add("hidden");
    nextQuestionButton.disabled = false;

    questionDisplay.textContent =
        quizMode === "jp-romaji"
            ? current.jp
            : current.romaji;
}


/* =========================
   CHECK ANSWER
   ========================= */

checkAnswerButton.addEventListener("click", checkAnswer);

function checkAnswer() {
    if (answered || quizFinished) return;

    const current = quizQuestions[currentQuestion];

    const userAnswer = answerInput.value
        .trim()
        .toLowerCase();

    if (!userAnswer) {
        // Keep the user in the answer field.
        answerInput.focus({ preventScroll: true });
        return;
    }

    const correctAnswer =
        quizMode === "jp-romaji"
            ? current.romaji
            : current.jp;

    answered = true;

    if (userAnswer === correctAnswer.toLowerCase()) {
        score++;
        feedback.textContent = "Correct! ✓";
    } else {
        feedback.textContent =
            `Not quite. The answer is ${correctAnswer}`;
    }

    scoreDisplay.textContent = `Score: ${score}`;

    // Do not disable or blur the answer input.
    // The input stays focused so Android has a better
    // chance of keeping its keyboard visible.
    checkAnswerButton.disabled = true;

    nextQuestionButton.classList.remove("hidden");
}


/* =========================
   NEXT QUESTION
   ========================= */

nextQuestionButton.addEventListener("click", nextQuestion);

function nextQuestion() {
    if (quizFinished) {
        returnToSelection();
        return;
    }

    if (!answered) return;

    currentQuestion++;

    /* Endless practice */

    if (practiceMode === "endless") {
        if (currentQuestion >= quizQuestions.length) {
            quizQuestions = shuffle(
                selectedCards.map(index => hiragana[index])
            );

            currentQuestion = 0;
        }

        showQuestion();

        // Deliberately do not move focus to another
        // element or call blur() on the answer input.
        return;
    }

    /* Normal quiz */

    if (currentQuestion >= quizQuestions.length) {
        finishQuiz();
        return;
    }

    showQuestion();
}


/* =========================
   FINISH NORMAL QUIZ
   ========================= */

function finishQuiz() {
    quizFinished = true;
    answered = false;

    questionDisplay.textContent = "Finished! 🎉";

    questionNumber.textContent = "Quiz Complete";

    scoreDisplay.textContent =
        `Score: ${score} / ${quizQuestions.length}`;

    feedback.textContent =
        "Nice work! Keep practicing.";

    answerInput.classList.add("hidden");
    checkAnswerButton.classList.add("hidden");

    nextQuestionButton.textContent = "Back to Selection";
    nextQuestionButton.classList.remove("hidden");
    nextQuestionButton.disabled = false;
}


/* =========================
   RETURN TO SELECTION
   ========================= */

function returnToSelection() {
    quizScreen.classList.add("hidden");
    selectionScreen.classList.remove("hidden");

    answerInput.classList.remove("hidden");
    answerInput.disabled = false;
    answerInput.value = "";

    checkAnswerButton.classList.remove("hidden");
    checkAnswerButton.disabled = false;

    nextQuestionButton.textContent = "Next Question →";
    nextQuestionButton.classList.add("hidden");
    nextQuestionButton.disabled = false;

    answered = false;
    quizFinished = false;

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
   BACK BUTTON
   ========================= */

backButton.addEventListener("click", returnToSelection);


/* =========================
   KEEP BUTTON TAPS FROM
   STEALING INPUT FOCUS
   ========================= */

// Prevent pointer interaction from moving focus away
// from the answer field. The buttons still receive clicks
// in supported browsers.

[checkAnswerButton, nextQuestionButton].forEach(button => {
    button.addEventListener("pointerdown", event => {
        if (
            !answerInput.classList.contains("hidden") &&
            !answerInput.disabled
        ) {
            event.preventDefault();
        }
    });
});


/* =========================
   ENTER KEY
   ========================= */

answerInput.addEventListener("keydown", event => {
    if (event.key !== "Enter") return;

    event.preventDefault();

    if (quizFinished) return;

    if (!answered) {
        checkAnswer();
    } else {
        nextQuestion();
    }
});


/* =========================
   INITIALIZE
   ========================= */

createChart();
updateSelectedCount();
