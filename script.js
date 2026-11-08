/* =========================
   DATA
   Three separate datasets, plus a Yōon dataset for each of them.
   Every character's `id` is the hiragana character (or Yōon combination)
   itself, which is unique across all sets (checked at startup below).
   Selection is tracked by id, never by array index, so switching filters
   can't shift anything.
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


/* =========================
   YŌON (拗音)
   Each combination is ONE quiz item (two characters, small ゃ/ゅ/ょ).
   Its id is the full combination, so it can never collide with a
   single-character id. ぢゃ / ぢゅ / ぢょ are intentionally left out.
   ========================= */

const BASIC_YOON = [
    { id: "きゃ", char: "きゃ", romaji: "kya" },
    { id: "きゅ", char: "きゅ", romaji: "kyu" },
    { id: "きょ", char: "きょ", romaji: "kyo" },

    { id: "しゃ", char: "しゃ", romaji: "sha", alt: ["sya"] },
    { id: "しゅ", char: "しゅ", romaji: "shu", alt: ["syu"] },
    { id: "しょ", char: "しょ", romaji: "sho", alt: ["syo"] },

    { id: "ちゃ", char: "ちゃ", romaji: "cha", alt: ["tya"] },
    { id: "ちゅ", char: "ちゅ", romaji: "chu", alt: ["tyu"] },
    { id: "ちょ", char: "ちょ", romaji: "cho", alt: ["tyo"] },

    { id: "にゃ", char: "にゃ", romaji: "nya" },
    { id: "にゅ", char: "にゅ", romaji: "nyu" },
    { id: "にょ", char: "にょ", romaji: "nyo" },

    { id: "ひゃ", char: "ひゃ", romaji: "hya" },
    { id: "ひゅ", char: "ひゅ", romaji: "hyu" },
    { id: "ひょ", char: "ひょ", romaji: "hyo" },

    { id: "みゃ", char: "みゃ", romaji: "mya" },
    { id: "みゅ", char: "みゅ", romaji: "myu" },
    { id: "みょ", char: "みょ", romaji: "myo" },

    { id: "りゃ", char: "りゃ", romaji: "rya" },
    { id: "りゅ", char: "りゅ", romaji: "ryu" },
    { id: "りょ", char: "りょ", romaji: "ryo" }
];

const DAKUTEN_YOON = [
    { id: "ぎゃ", char: "ぎゃ", romaji: "gya" },
    { id: "ぎゅ", char: "ぎゅ", romaji: "gyu" },
    { id: "ぎょ", char: "ぎょ", romaji: "gyo" },

    { id: "じゃ", char: "じゃ", romaji: "ja", alt: ["jya", "zya"] },
    { id: "じゅ", char: "じゅ", romaji: "ju", alt: ["jyu", "zyu"] },
    { id: "じょ", char: "じょ", romaji: "jo", alt: ["jyo", "zyo"] },

    { id: "びゃ", char: "びゃ", romaji: "bya" },
    { id: "びゅ", char: "びゅ", romaji: "byu" },
    { id: "びょ", char: "びょ", romaji: "byo" }
];

const HANDAKUTEN_YOON = [
    { id: "ぴゃ", char: "ぴゃ", romaji: "pya" },
    { id: "ぴゅ", char: "ぴゅ", romaji: "pyu" },
    { id: "ぴょ", char: "ぴょ", romaji: "pyo" }
];

const CATEGORIES = {
    basic: BASIC_HIRAGANA,
    dakuten: DAKUTEN_HIRAGANA,
    handakuten: HANDAKUTEN_HIRAGANA
};

// The Yōon set that belongs to each category.
const YOON_CATEGORIES = {
    basic: BASIC_YOON,
    dakuten: DAKUTEN_YOON,
    handakuten: HANDAKUTEN_YOON
};

// Flat list + lookup by id, built once. Yōon items are included so that
// selected Yōon cards flow into the quiz pool and answer checking.
const ALL_HIRAGANA = [
    ...BASIC_HIRAGANA,
    ...DAKUTEN_HIRAGANA,
    ...HANDAKUTEN_HIRAGANA,
    ...BASIC_YOON,
    ...DAKUTEN_YOON,
    ...HANDAKUTEN_YOON
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

// Set of character ids selected across ALL categories and views.
const selectedCards = new Set();

let currentCategory = "basic";

// One flag shared by all categories, so it survives category switching.
let showYoon = false;

let quizPool = [];
let practiceMode = "writing";   // "writing" (typing) or "recognition" (4 cards)
let quizMode = "jp-romaji";   // direction of the Writing Quiz only
let currentItem = null;
let previousId = null;
let practiceNumber = 1;
let trueCount = 0;
let falseCount = 0;
let answerLocked = false;
let nextQuestionTimer = null;
let feedbackTimer = null;

const FEEDBACK_DELAY = 1100;

// Recognition Practice
const CHOICE_COUNT = 4;
let lastCorrectIndex = -1;   // where the correct card was on the last question
let correctStreak = 0;       // how many questions in a row it sat there
const MAX_SAME_POSITION = 2; // never more than this many in a row


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
const toggleYoonBtn = document.getElementById("toggleYoon");
const practiceModeSelect = document.getElementById("practiceMode");
const quizModeLabel = document.getElementById("quizModeLabel");
const quizModeSelect = document.getElementById("quizMode");
const recognitionHint = document.getElementById("recognitionHint");
const startQuizBtn = document.getElementById("startQuiz");
const startMessage = document.getElementById("startMessage");

const backButton = document.getElementById("backButton");
const questionNumberEl = document.getElementById("questionNumber");
const trueCountEl = document.getElementById("trueCount");
const falseCountEl = document.getElementById("falseCount");
const questionEl = document.getElementById("question");
const answerArea = document.getElementById("answerArea");
const choiceArea = document.getElementById("choiceArea");
const answerInput = document.getElementById("answerInput");
const checkAnswerBtn = document.getElementById("checkAnswer");
const feedbackEl = document.getElementById("feedback");


/* =========================
   SELECTION SCREEN
   ========================= */

// The cards currently on screen: the active category's Yōon set when
// Yōon is shown, otherwise its original characters.
function getVisibleItems() {
    const source = showYoon ? YOON_CATEGORIES : CATEGORIES;
    return source[currentCategory];
}

function renderChart() {
    hiraganaChart.innerHTML = "";
    hiraganaChart.classList.toggle("yoon-view", showYoon);

    getVisibleItems().forEach(item => {
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
    // Total across ALL categories and views, not only the visible cards.
    selectedCountEl.textContent = selectedCards.size + " selected";
    hideStartMessage();
}

function updateYoonButton() {
    toggleYoonBtn.textContent = showYoon ? "Hide Yōon" : "Show Yōon";
    toggleYoonBtn.setAttribute("aria-pressed", showYoon);
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

// Show / Hide Yōon: swaps the chart for the active category.
toggleYoonBtn.addEventListener("click", () => {
    showYoon = !showYoon;
    updateYoonButton();
    renderChart();
});

// Select All: only the cards currently displayed.
selectAllBtn.addEventListener("click", () => {
    getVisibleItems().forEach(item => selectedCards.add(item.id));
    renderChart();
    updateSelectedCount();
});

// Clear All: only the cards currently displayed.
clearAllBtn.addEventListener("click", () => {
    getVisibleItems().forEach(item => selectedCards.delete(item.id));
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

    if (practiceMode === "recognition") {
        showRecognitionQuestion();
        return;
    }

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
    // NFC keeps composed and decomposed forms of the same kana equal.
    const answer = rawAnswer.trim().normalize("NFC");

    if (quizMode === "jp-romaji") {
        const normalized = answer.toLowerCase();
        const accepted = [currentItem.romaji, ...(currentItem.alt || [])];
        return accepted.includes(normalized);
    }

    // Romaji → Japanese: several characters share a reading (じ/ぢ, ず/づ),
    // so accept any hiragana that has the same romaji as the question.
    // A Yōon answer must be the full combination (e.g. きゃ), written with
    // the small ゃ/ゅ/ょ; a single character or a large や/ゆ/よ is wrong.
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

    const correctText =
        quizMode === "jp-romaji" ? currentItem.romaji : currentItem.char;
    resolveAnswer(isCorrectAnswer(rawAnswer), correctText);
}

// Shared by both modes: counters, feedback, and the automatic next question.
function resolveAnswer(isCorrect, correctText) {
    if (isCorrect) {
        trueCount++;
        showFeedback("Correct!", true);
    } else {
        falseCount++;
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


/* =========================
   RECOGNITION PRACTICE
   Romaji prompt, four hiragana cards. Uses the same quizPool, counters,
   feedback and timing as the Writing Quiz.
   ========================= */

function shuffle(list) {
    const copy = list.slice();
    for (let i = copy.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [copy[i], copy[j]] = [copy[j], copy[i]];
    }
    return copy;
}

// Recognition needs 4 different READINGS in the pool, not just 4 characters:
// じ/ぢ and ず/づ share a reading, so showing both would give two right answers.
function countReadings(items) {
    return new Set(items.map(item => item.romaji)).size;
}

function buildChoices(correct) {
    // Group the other pool items by reading (the correct reading is excluded,
    // so no distractor can also be a correct answer).
    const groups = new Map();
    quizPool.forEach(item => {
        if (item.romaji === correct.romaji) return;
        if (!groups.has(item.romaji)) groups.set(item.romaji, []);
        groups.get(item.romaji).push(item);
    });

    // Three random, different readings; one random character from each.
    const distractors = shuffle([...groups.keys()])
        .slice(0, CHOICE_COUNT - 1)
        .map(reading => {
            const group = groups.get(reading);
            return group[Math.floor(Math.random() * group.length)];
        });

    const choices = shuffle([correct, ...distractors]);

    // The shuffle is already uniform; this only stops a long run of the
    // correct card landing in the same slot.
    let index = choices.indexOf(correct);
    if (index === lastCorrectIndex && correctStreak >= MAX_SAME_POSITION) {
        let other;
        do {
            other = Math.floor(Math.random() * choices.length);
        } while (other === index);
        [choices[index], choices[other]] = [choices[other], choices[index]];
        index = other;
    }
    correctStreak = index === lastCorrectIndex ? correctStreak + 1 : 1;
    lastCorrectIndex = index;

    return choices;
}

function showRecognitionQuestion() {
    questionEl.textContent = currentItem.romaji;

    choiceArea.innerHTML = "";
    choiceArea.classList.remove("locked");
    choiceArea.setAttribute(
        "aria-label", "Choose the hiragana for " + currentItem.romaji
    );

    buildChoices(currentItem).forEach(item => {
        const card = document.createElement("button");
        card.type = "button";
        card.className = "choice-card";
        card.dataset.id = item.id;
        card.textContent = item.char;
        choiceArea.appendChild(card);
    });

    answerLocked = false;
    updateStats();
}

function chooseAnswer(card) {
    // One answer per question.
    if (answerLocked || !currentItem || practiceMode !== "recognition") return;
    answerLocked = true;

    const isCorrect = card.dataset.id === currentItem.id;

    choiceArea.classList.add("locked");
    card.classList.add("selected");
    Array.from(choiceArea.children).forEach(other => {
        if (other.dataset.id === currentItem.id) other.classList.add("correct");
    });
    if (!isCorrect) card.classList.add("wrong");

    resolveAnswer(isCorrect, currentItem.char);
}

choiceArea.addEventListener("click", event => {
    const card = event.target.closest(".choice-card");
    if (card) chooseAnswer(card);
});


/* =========================
   PRACTICE SETUP
   ========================= */

function showStartMessage(text) {
    startMessage.textContent = text;
    startMessage.classList.remove("hidden");
}

function hideStartMessage() {
    startMessage.classList.add("hidden");
}

// Quiz Mode (direction) belongs to the Writing Quiz only.
function updatePracticeModeUI() {
    const recognition = practiceModeSelect.value === "recognition";
    quizModeLabel.classList.toggle("hidden", recognition);
    quizModeSelect.classList.toggle("hidden", recognition);
    recognitionHint.classList.toggle("hidden", !recognition);
    hideStartMessage();
}

practiceModeSelect.addEventListener("change", updatePracticeModeUI);

function startQuiz() {
    // Build the pool from every selected id, whatever category or view
    // (normal or Yōon) it came from.
    quizPool = [];
    selectedCards.forEach(id => {
        const item = HIRAGANA_BY_ID.get(id);
        if (item) quizPool.push(item);
    });

    const recognition = practiceModeSelect.value === "recognition";

    if (quizPool.length === 0 && !recognition) {
        selectedCountEl.textContent = "Select at least one hiragana to start";
        return;
    }

    if (recognition && countReadings(quizPool) < CHOICE_COUNT) {
        showStartMessage(
            "Select at least " + CHOICE_COUNT + " characters with different " +
            "readings to start Recognition Practice."
        );
        return;
    }

    hideStartMessage();
    practiceMode = recognition ? "recognition" : "writing";
    answerArea.classList.toggle("hidden", recognition);
    choiceArea.classList.toggle("hidden", !recognition);

    quizMode = quizModeSelect.value;
    lastCorrectIndex = -1;
    correctStreak = 0;
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

    // selectedCards and showYoon are untouched, so the chart restores
    // exactly as left.
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
updatePracticeModeUI();
updateYoonButton();
updateSelectedCount();
showScreen("selection");