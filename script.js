/* =========================
   DATA
   Three separate datasets.
   Every character's `id` is the hiragana character itself, which is unique
   across all three sets (checked at startup below). Selection is tracked by
   id, never by array index, so switching filters can't shift anything.
   `alt` lists extra romaji spellings accepted in Japanese → Romaji mode.
   ========================= */

const BASIC_HIRAGANA = [
    { id: "あ", char: "あ", romaji: "a" },
    { id: "い", char: "い", romaji: "i" },
    { id: "う", char: "う", romaji: "u" },
    { id: "え", char: "え", romaji: "e" },
    { id: "お", char: "お", romaji: "o" },

    { id: "か", char: "か", romaji: "ka" },
    { id: "き", char: "き", romaji: "ki" },
    { id: "く", char: "く", romaji: "ku" },
    { id: "け", char: "け", romaji: "ke" },
    { id: "こ", char: "こ", romaji: "ko" },

    { id: "さ", char: "さ", romaji: "sa" },
    { id: "し", char: "し", romaji: "shi", alt: ["si"] },
    { id: "す", char: "す", romaji: "su" },
    { id: "せ", char: "せ", romaji: "se" },
    { id: "そ", char: "そ", romaji: "so" },

    { id: "た", char: "た", romaji: "ta" },
    { id: "ち", char: "ち", romaji: "chi", alt: ["ti"] },
    { id: "つ", char: "つ", romaji: "tsu", alt: ["tu"] },
    { id: "て", char: "て", romaji: "te" },
    { id: "と", char: "と", romaji: "to" },

    { id: "な", char: "な", romaji: "na" },
    { id: "に", char: "に", romaji: "ni" },
    { id: "ぬ", char: "ぬ", romaji: "nu" },
    { id: "ね", char: "ね", romaji: "ne" },
    { id: "の", char: "の", romaji: "no" },

    { id: "は", char: "は", romaji: "ha" },
    { id: "ひ", char: "ひ", romaji: "hi" },
    { id: "ふ", char: "ふ", romaji: "fu", alt: ["hu"] },
    { id: "へ", char: "へ", romaji: "he" },
    { id: "ほ", char: "ほ", romaji: "ho" },

    { id: "ま", char: "ま", romaji: "ma" },
    { id: "み", char: "み", romaji: "mi" },
    { id: "む", char: "む", romaji: "mu" },
    { id: "め", char: "め", romaji: "me" },
    { id: "も", char: "も", romaji: "mo" },

    { id: "や", char: "や", romaji: "ya" },
    { id: "ゆ", char: "ゆ", romaji: "yu" },
    { id: "よ", char: "よ", romaji: "yo" },

    { id: "ら", char: "ら", romaji: "ra" },
    { id: "り", char: "り", romaji: "ri" },
    { id: "る", char: "る", romaji: "ru" },
    { id: "れ", char: "れ", romaji: "re" },
    { id: "ろ", char: "ろ", romaji: "ro" },

    { id: "わ", char: "わ", romaji: "wa" },
    { id: "を", char: "を", romaji: "wo", alt: ["o"] },
    { id: "ん", char: "ん", romaji: "n" }
];

const DAKUTEN_HIRAGANA = [
    { id: "が", char: "が", romaji: "ga" },
    { id: "ぎ", char: "ぎ", romaji: "gi" },
    { id: "ぐ", char: "ぐ", romaji: "gu" },
    { id: "げ", char: "げ", romaji: "ge" },
    { id: "ご", char: "ご", romaji: "go" },

    { id: "ざ", char: "ざ", romaji: "za" },
    { id: "じ", char: "じ", romaji: "ji", alt: ["zi"] },
    { id: "ず", char: "ず", romaji: "zu" },
    { id: "ぜ", char: "ぜ", romaji: "ze" },
    { id: "ぞ", char: "ぞ", romaji: "zo" },

    { id: "だ", char: "だ", romaji: "da" },
    { id: "ぢ", char: "ぢ", romaji: "ji", alt: ["di"] },
    { id: "づ", char: "づ", romaji: "zu", alt: ["du"] },
    { id: "で", char: "で", romaji: "de" },
    { id: "ど", char: "ど", romaji: "do" },

    { id: "ば", char: "ば", romaji: "ba" },
    { id: "び", char: "び", romaji: "bi" },
    { id: "ぶ", char: "ぶ", romaji: "bu" },
    { id: "べ", char: "べ", romaji: "be" },
    { id: "ぼ", char: "ぼ", romaji: "bo" }
];

const HANDAKUTEN_HIRAGANA = [
    { id: "ぱ", char: "ぱ", romaji: "pa" },
    { id: "ぴ", char: "ぴ", romaji: "pi" },
    { id: "ぷ", char: "ぷ", romaji: "pu" },
    { id: "ぺ", char: "ぺ", romaji: "pe" },
    { id: "ぽ", char: "ぽ", romaji: "po" }
];

const CATEGORIES = {
    basic: BASIC_HIRAGANA,
    dakuten: DAKUTEN_HIRAGANA,
    handakuten: HANDAKUTEN_HIRAGANA
};

// Flat list + lookup by id, built once.
const ALL_HIRAGANA = [
    ...BASIC_HIRAGANA,
    ...DAKUTEN_HIRAGANA,
    ...HANDAKUTEN_HIRAGANA
];

const HIRAGANA_BY_ID = new Map();
ALL_HIRAGANA.forEach(item => {
    if (HIRAGANA_BY_ID.has(item.id)) {
        console.warn("Duplicate hiragana id:", item.id);
    }
    HIRAGANA_BY_ID.set(item.id, item);
});


/* =========================
   STATE
   ========================= */

// Set of character ids selected across ALL categories.
const selectedCards = new Set();

let currentCategory = "basic";

let quizPool = [];
let quizMode = "jp-romaji";
let currentItem = null;
let previousId = null;
let practiceNumber = 1;
let trueCount = 0;
let falseCount = 0;
let answerLocked = false;
let nextQuestionTimer = null;
let feedbackTimer = null;

const FEEDBACK_DELAY = 1100;


/* =========================
   ELEMENTS
   ========================= */

const selectionScreen = document.getElementById("selectionScreen");
const quizScreen = document.getElementById("quizScreen");

const hiraganaChart = document.getElementById("hiraganaChart");
const selectedCountEl = document.getElementById("selectedCount");
const filterButtons = document.querySelectorAll(".filter-button");
const selectAllBtn = document.getElementById("selectAll");
const clearAllBtn = document.getElementById("clearAll");
const quizModeSelect = document.getElementById("quizMode");
const startQuizBtn = document.getElementById("startQuiz");

const backButton = document.getElementById("backButton");
const questionNumberEl = document.getElementById("questionNumber");
const trueCountEl = document.getElementById("trueCount");
const falseCountEl = document.getElementById("falseCount");
const questionEl = document.getElementById("question");
const answerInput = document.getElementById("answerInput");
const checkAnswerBtn = document.getElementById("checkAnswer");
const feedbackEl = document.getElementById("feedback");


/* =========================
   SELECTION SCREEN
   ========================= */

function renderChart() {
    hiraganaChart.innerHTML = "";

    CATEGORIES[currentCategory].forEach(item => {
        const card = document.createElement("div");
        card.className = "hiragana-card";
        card.dataset.id = item.id;
        card.setAttribute("role", "button");
        card.setAttribute("tabindex", "0");

        if (selectedCards.has(item.id)) {
            card.classList.add("selected");
        }
        card.setAttribute("aria-pressed", selectedCards.has(item.id));

        const japanese = document.createElement("span");
        japanese.className = "japanese";
        japanese.textContent = item.char;

        const romaji = document.createElement("span");
        romaji.className = "romaji";
        romaji.textContent = item.romaji;

        card.appendChild(japanese);
        card.appendChild(romaji);
        hiraganaChart.appendChild(card);
    });
}

function updateSelectedCount() {
    // Total across ALL categories, not only the visible one.
    selectedCountEl.textContent = selectedCards.size + " selected";
}

function toggleCard(card) {
    const id = card.dataset.id;

    if (selectedCards.has(id)) {
        selectedCards.delete(id);
        card.classList.remove("selected");
        card.setAttribute("aria-pressed", "false");
    } else {
        selectedCards.add(id);
        card.classList.add("selected");
        card.setAttribute("aria-pressed", "true");
    }

    updateSelectedCount();
}

function setCategory(category) {
    if (!CATEGORIES[category]) return;

    currentCategory = category;

    filterButtons.forEach(button => {
        const isActive = button.dataset.category === category;
        button.classList.toggle("active", isActive);
        button.setAttribute("aria-pressed", isActive);
    });

    // Re-render from selectedCards, so selections are always restored.
    renderChart();
}

hiraganaChart.addEventListener("click", event => {
    const card = event.target.closest(".hiragana-card");
    if (card) toggleCard(card);
});

hiraganaChart.addEventListener("keydown", event => {
    if (event.key !== "Enter" && event.key !== " ") return;
    const card = event.target.closest(".hiragana-card");
    if (!card) return;
    event.preventDefault();
    toggleCard(card);
});

filterButtons.forEach(button => {
    button.addEventListener("click", () => setCategory(button.dataset.category));
});

// Select All: only the currently displayed category.
selectAllBtn.addEventListener("click", () => {
    CATEGORIES[currentCategory].forEach(item => selectedCards.add(item.id));
    renderChart();
    updateSelectedCount();
});

// Clear All: only the currently displayed category.
clearAllBtn.addEventListener("click", () => {
    CATEGORIES[currentCategory].forEach(item => selectedCards.delete(item.id));
    renderChart();
    updateSelectedCount();
});


/* =========================
   QUIZ
   ========================= */

function showScreen(screen) {
    selectionScreen.classList.toggle("hidden", screen !== "selection");
    quizScreen.classList.toggle("hidden", screen !== "quiz");
}

function hideFeedback() {
    clearTimeout(feedbackTimer);
    feedbackEl.classList.remove("visible", "correct", "wrong");
}

function showFeedback(message, isCorrect) {
    clearTimeout(feedbackTimer);
    feedbackEl.textContent = message;
    feedbackEl.classList.remove("correct", "wrong");
    feedbackEl.classList.add(isCorrect ? "correct" : "wrong", "visible");
}

function updateStats() {
    trueCountEl.textContent = trueCount;
    falseCountEl.textContent = falseCount;
    questionNumberEl.textContent = "Practice #" + practiceNumber;
}

function pickNextItem() {
    let next;

    if (quizPool.length === 1) {
        next = quizPool[0];
    } else {
        // Avoid showing the same character twice in a row.
        do {
            next = quizPool[Math.floor(Math.random() * quizPool.length)];
        } while (next.id === previousId);
    }

    return next;
}

function showQuestion() {
    currentItem = pickNextItem();
    previousId = currentItem.id;

    questionEl.textContent =
        quizMode === "jp-romaji" ? currentItem.char : currentItem.romaji;

    answerInput.value = "";
    answerInput.placeholder =
        quizMode === "jp-romaji" ? "Type the romaji..." : "Type the hiragana...";
    answerLocked = false;
    answerInput.disabled = false;
    checkAnswerBtn.disabled = false;
    updateStats();
    answerInput.focus();
}

function isCorrectAnswer(rawAnswer) {
    const answer = rawAnswer.trim();

    if (quizMode === "jp-romaji") {
        const normalized = answer.toLowerCase();
        const accepted = [currentItem.romaji, ...(currentItem.alt || [])];
        return accepted.includes(normalized);
    }

    // Romaji → Japanese: several characters share a reading (じ/ぢ, ず/づ),
    // so accept any hiragana that has the same romaji as the question.
    return ALL_HIRAGANA.some(
        item => item.romaji === currentItem.romaji && item.char === answer
    );
}

function checkAnswer() {
    if (answerLocked || !currentItem) return;

    const rawAnswer = answerInput.value;
    if (rawAnswer.trim() === "") {
        answerInput.focus();
        return;
    }

    answerLocked = true;

    if (isCorrectAnswer(rawAnswer)) {
        trueCount++;
        showFeedback("Correct!", true);
    } else {
        falseCount++;
        const correctText =
            quizMode === "jp-romaji" ? currentItem.romaji : currentItem.char;
        showFeedback("Wrong! Answer: " + correctText, false);
    }

    updateStats();

    clearTimeout(nextQuestionTimer);
    nextQuestionTimer = setTimeout(() => {
        hideFeedback();
        practiceNumber++;
        showQuestion();
    }, FEEDBACK_DELAY);
}

function startQuiz() {
    // Build the pool from every selected id, whatever category it came from.
    quizPool = [];
    selectedCards.forEach(id => {
        const item = HIRAGANA_BY_ID.get(id);
        if (item) quizPool.push(item);
    });

    if (quizPool.length === 0) {
        selectedCountEl.textContent = "Select at least one hiragana to start";
        return;
    }

    quizMode = quizModeSelect.value;
    practiceNumber = 1;
    trueCount = 0;
    falseCount = 0;
    previousId = null;

    hideFeedback();
    showScreen("quiz");
    showQuestion();
}

function leaveQuiz() {
    clearTimeout(nextQuestionTimer);
    hideFeedback();
    answerLocked = false;
    currentItem = null;
    answerInput.blur();

    // selectedCards is untouched, so the chart restores exactly as left.
    showScreen("selection");
    renderChart();
    updateSelectedCount();
}

startQuizBtn.addEventListener("click", startQuiz);
backButton.addEventListener("click", leaveQuiz);
checkAnswerBtn.addEventListener("click", checkAnswer);

answerInput.addEventListener("keydown", event => {
    if (event.key === "Enter") {
        event.preventDefault();
        checkAnswer();
    }
});


/* =========================
   INIT
   ========================= */

setCategory("basic");
updateSelectedCount();
showScreen("selection");