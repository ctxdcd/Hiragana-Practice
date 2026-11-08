/* =========================
   DATA
   Hiragana and Katakana each have their own datasets: three base sets plus
   a Yōon set for each of them. Every character's `id` is the character (or
   Yōon combination) itself; ids are unique within a module (checked at
   startup in createModule). Selection is tracked by id, never by array
   index, so switching filters can't shift anything.
   `alt` lists extra romaji spellings accepted in Japanese → Romaji mode.
   ========================= */

/* ----- HIRAGANA ----- */

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


/* =========================
   KATAKANA
   Its own datasets: the same structure as Hiragana, with the katakana
   characters and their readings. ヂ/ヅ share a reading with ジ/ズ, exactly
   like ぢ/づ do in Hiragana. Yōon uses the small ャ / ュ / ョ, and ヂャ / ヂュ / ヂョ
   are intentionally left out. (ヴ is not part of the standard 46 + 20 + 5.)
   ========================= */

const BASIC_KATAKANA = [
    { id: "ア", char: "ア", romaji: "a" },
    { id: "イ", char: "イ", romaji: "i" },
    { id: "ウ", char: "ウ", romaji: "u" },
    { id: "エ", char: "エ", romaji: "e" },
    { id: "オ", char: "オ", romaji: "o" },

    { id: "カ", char: "カ", romaji: "ka" },
    { id: "キ", char: "キ", romaji: "ki" },
    { id: "ク", char: "ク", romaji: "ku" },
    { id: "ケ", char: "ケ", romaji: "ke" },
    { id: "コ", char: "コ", romaji: "ko" },

    { id: "サ", char: "サ", romaji: "sa" },
    { id: "シ", char: "シ", romaji: "shi", alt: ["si"] },
    { id: "ス", char: "ス", romaji: "su" },
    { id: "セ", char: "セ", romaji: "se" },
    { id: "ソ", char: "ソ", romaji: "so" },

    { id: "タ", char: "タ", romaji: "ta" },
    { id: "チ", char: "チ", romaji: "chi", alt: ["ti"] },
    { id: "ツ", char: "ツ", romaji: "tsu", alt: ["tu"] },
    { id: "テ", char: "テ", romaji: "te" },
    { id: "ト", char: "ト", romaji: "to" },

    { id: "ナ", char: "ナ", romaji: "na" },
    { id: "ニ", char: "ニ", romaji: "ni" },
    { id: "ヌ", char: "ヌ", romaji: "nu" },
    { id: "ネ", char: "ネ", romaji: "ne" },
    { id: "ノ", char: "ノ", romaji: "no" },

    { id: "ハ", char: "ハ", romaji: "ha" },
    { id: "ヒ", char: "ヒ", romaji: "hi" },
    { id: "フ", char: "フ", romaji: "fu", alt: ["hu"] },
    { id: "ヘ", char: "ヘ", romaji: "he" },
    { id: "ホ", char: "ホ", romaji: "ho" },

    { id: "マ", char: "マ", romaji: "ma" },
    { id: "ミ", char: "ミ", romaji: "mi" },
    { id: "ム", char: "ム", romaji: "mu" },
    { id: "メ", char: "メ", romaji: "me" },
    { id: "モ", char: "モ", romaji: "mo" },

    { id: "ヤ", char: "ヤ", romaji: "ya" },
    { id: "ユ", char: "ユ", romaji: "yu" },
    { id: "ヨ", char: "ヨ", romaji: "yo" },

    { id: "ラ", char: "ラ", romaji: "ra" },
    { id: "リ", char: "リ", romaji: "ri" },
    { id: "ル", char: "ル", romaji: "ru" },
    { id: "レ", char: "レ", romaji: "re" },
    { id: "ロ", char: "ロ", romaji: "ro" },

    { id: "ワ", char: "ワ", romaji: "wa" },
    { id: "ヲ", char: "ヲ", romaji: "wo", alt: ["o"] },
    { id: "ン", char: "ン", romaji: "n" }
];

const DAKUTEN_KATAKANA = [
    { id: "ガ", char: "ガ", romaji: "ga" },
    { id: "ギ", char: "ギ", romaji: "gi" },
    { id: "グ", char: "グ", romaji: "gu" },
    { id: "ゲ", char: "ゲ", romaji: "ge" },
    { id: "ゴ", char: "ゴ", romaji: "go" },

    { id: "ザ", char: "ザ", romaji: "za" },
    { id: "ジ", char: "ジ", romaji: "ji", alt: ["zi"] },
    { id: "ズ", char: "ズ", romaji: "zu" },
    { id: "ゼ", char: "ゼ", romaji: "ze" },
    { id: "ゾ", char: "ゾ", romaji: "zo" },

    { id: "ダ", char: "ダ", romaji: "da" },
    { id: "ヂ", char: "ヂ", romaji: "ji", alt: ["di"] },
    { id: "ヅ", char: "ヅ", romaji: "zu", alt: ["du"] },
    { id: "デ", char: "デ", romaji: "de" },
    { id: "ド", char: "ド", romaji: "do" },

    { id: "バ", char: "バ", romaji: "ba" },
    { id: "ビ", char: "ビ", romaji: "bi" },
    { id: "ブ", char: "ブ", romaji: "bu" },
    { id: "ベ", char: "ベ", romaji: "be" },
    { id: "ボ", char: "ボ", romaji: "bo" }
];

const HANDAKUTEN_KATAKANA = [
    { id: "パ", char: "パ", romaji: "pa" },
    { id: "ピ", char: "ピ", romaji: "pi" },
    { id: "プ", char: "プ", romaji: "pu" },
    { id: "ペ", char: "ペ", romaji: "pe" },
    { id: "ポ", char: "ポ", romaji: "po" }
];

const BASIC_KATAKANA_YOON = [
    { id: "キャ", char: "キャ", romaji: "kya" },
    { id: "キュ", char: "キュ", romaji: "kyu" },
    { id: "キョ", char: "キョ", romaji: "kyo" },

    { id: "シャ", char: "シャ", romaji: "sha", alt: ["sya"] },
    { id: "シュ", char: "シュ", romaji: "shu", alt: ["syu"] },
    { id: "ショ", char: "ショ", romaji: "sho", alt: ["syo"] },

    { id: "チャ", char: "チャ", romaji: "cha", alt: ["tya"] },
    { id: "チュ", char: "チュ", romaji: "chu", alt: ["tyu"] },
    { id: "チョ", char: "チョ", romaji: "cho", alt: ["tyo"] },

    { id: "ニャ", char: "ニャ", romaji: "nya" },
    { id: "ニュ", char: "ニュ", romaji: "nyu" },
    { id: "ニョ", char: "ニョ", romaji: "nyo" },

    { id: "ヒャ", char: "ヒャ", romaji: "hya" },
    { id: "ヒュ", char: "ヒュ", romaji: "hyu" },
    { id: "ヒョ", char: "ヒョ", romaji: "hyo" },

    { id: "ミャ", char: "ミャ", romaji: "mya" },
    { id: "ミュ", char: "ミュ", romaji: "myu" },
    { id: "ミョ", char: "ミョ", romaji: "myo" },

    { id: "リャ", char: "リャ", romaji: "rya" },
    { id: "リュ", char: "リュ", romaji: "ryu" },
    { id: "リョ", char: "リョ", romaji: "ryo" }
];

const DAKUTEN_KATAKANA_YOON = [
    { id: "ギャ", char: "ギャ", romaji: "gya" },
    { id: "ギュ", char: "ギュ", romaji: "gyu" },
    { id: "ギョ", char: "ギョ", romaji: "gyo" },

    { id: "ジャ", char: "ジャ", romaji: "ja", alt: ["jya", "zya"] },
    { id: "ジュ", char: "ジュ", romaji: "ju", alt: ["jyu", "zyu"] },
    { id: "ジョ", char: "ジョ", romaji: "jo", alt: ["jyo", "zyo"] },

    { id: "ビャ", char: "ビャ", romaji: "bya" },
    { id: "ビュ", char: "ビュ", romaji: "byu" },
    { id: "ビョ", char: "ビョ", romaji: "byo" }
];

const HANDAKUTEN_KATAKANA_YOON = [
    { id: "ピャ", char: "ピャ", romaji: "pya" },
    { id: "ピュ", char: "ピュ", romaji: "pyu" },
    { id: "ピョ", char: "ピョ", romaji: "pyo" }
];


/* =========================
   CATEGORIES
   Each module groups its data the same way: three categories, and the
   Yōon set that belongs to each category.
   ========================= */

const HIRAGANA_CATEGORIES = {
    basic: BASIC_HIRAGANA,
    dakuten: DAKUTEN_HIRAGANA,
    handakuten: HANDAKUTEN_HIRAGANA
};

const HIRAGANA_YOON_CATEGORIES = {
    basic: BASIC_YOON,
    dakuten: DAKUTEN_YOON,
    handakuten: HANDAKUTEN_YOON
};

const KATAKANA_CATEGORIES = {
    basic: BASIC_KATAKANA,
    dakuten: DAKUTEN_KATAKANA,
    handakuten: HANDAKUTEN_KATAKANA
};

const KATAKANA_YOON_CATEGORIES = {
    basic: BASIC_KATAKANA_YOON,
    dakuten: DAKUTEN_KATAKANA_YOON,
    handakuten: HANDAKUTEN_KATAKANA_YOON
};


/* =========================
   MODULES
   One object per learning module. Everything that belongs to a module (its
   datasets, selection, settings and practice state) lives on that object,
   so Hiragana and Katakana can never overwrite each other. The screens and
   the quiz engine below are shared: they always read and write the ACTIVE
   module (see activeModule).
   ========================= */

function createModule(config) {
    const categories = config.categories;
    const yoonCategories = config.yoonCategories;

    // Flat list + lookup by id, built once. Yōon items are included so that
    // selected Yōon cards flow into the quiz pool and answer checking.
    const all = [
        ...categories.basic,
        ...categories.dakuten,
        ...categories.handakuten,
        ...yoonCategories.basic,
        ...yoonCategories.dakuten,
        ...yoonCategories.handakuten
    ];

    const byId = new Map();
    all.forEach(item => {
        if (byId.has(item.id)) {
            console.warn("Duplicate " + config.name + " id:", item.id);
        }
        byId.set(item.id, item);
    });

    return {
        // ----- fixed data -----
        id: config.id,
        name: config.name,
        categories,
        yoonCategories,
        all,
        byId,

        // ----- selection screen state -----
        // Set of character ids selected across ALL categories and views.
        selectedCards: new Set(),
        currentCategory: "basic",
        // One flag shared by all of the module's categories, so it survives
        // category switching.
        showYoon: false,
        practiceModeChoice: "writing",   // value of the Practice Mode select
        quizModeChoice: "jp-romaji",     // value of the Quiz Mode select

        // ----- practice state -----
        quizPool: [],
        practiceMode: "writing",   // "writing" (typing) or "recognition" (4 cards)
        quizMode: "jp-romaji",     // direction of the Writing Quiz only
        currentItem: null,
        previousId: null,
        practiceNumber: 1,
        trueCount: 0,
        falseCount: 0,
        answerLocked: false,
        lastCorrectIndex: -1,      // Recognition: slot of the correct card last time
        correctStreak: 0           // ...and how many questions in a row it sat there
    };
}

const MODULES = {
    hiragana: createModule({
        id: "hiragana",
        name: "Hiragana",
        categories: HIRAGANA_CATEGORIES,
        yoonCategories: HIRAGANA_YOON_CATEGORIES
    }),
    katakana: createModule({
        id: "katakana",
        name: "Katakana",
        categories: KATAKANA_CATEGORIES,
        yoonCategories: KATAKANA_YOON_CATEGORIES
    })
};


/* =========================
   SHARED RUNTIME
   Only one module is on screen at a time, so the timers are shared. Leaving
   a module always stops its quiz first (see stopQuiz).
   ========================= */

let activeModule = null;   // null while the homepage is showing

let nextQuestionTimer = null;
let feedbackTimer = null;

const FEEDBACK_DELAY = 1100;

// Recognition Practice
const CHOICE_COUNT = 4;
const MAX_SAME_POSITION = 2; // the correct card never sits in one slot more than this many questions in a row


/* =========================
   ELEMENTS
   ========================= */

const homeScreen = document.getElementById("homeScreen");
const moduleCards = document.querySelectorAll(".module-card");
const aboutButton = document.getElementById("aboutButton");
const aboutModal = document.getElementById("aboutModal");
const aboutClose = document.getElementById("aboutClose");

const selectionScreen = document.getElementById("selectionScreen");
const quizScreen = document.getElementById("quizScreen");

const homeButton = document.getElementById("homeButton");
const moduleTitleEl = document.getElementById("moduleTitle");
const moduleSubtitleEl = document.getElementById("moduleSubtitle");

const kanaChart = document.getElementById("kanaChart");
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
    const m = activeModule;
    const source = m.showYoon ? m.yoonCategories : m.categories;
    return source[m.currentCategory];
}

function renderChart() {
    const m = activeModule;

    kanaChart.innerHTML = "";
    kanaChart.classList.toggle("yoon-view", m.showYoon);

    getVisibleItems().forEach(item => {
        const card = document.createElement("div");
        card.className = "kana-card";
        card.dataset.id = item.id;
        card.setAttribute("role", "button");
        card.setAttribute("tabindex", "0");

        if (m.selectedCards.has(item.id)) {
            card.classList.add("selected");
        }
        card.setAttribute("aria-pressed", m.selectedCards.has(item.id));

        const japanese = document.createElement("span");
        japanese.className = "japanese";
        japanese.textContent = item.char;

        const romaji = document.createElement("span");
        romaji.className = "romaji";
        romaji.textContent = item.romaji;

        card.appendChild(japanese);
        card.appendChild(romaji);
        kanaChart.appendChild(card);
    });
}

function updateSelectedCount() {
    // Total across ALL categories and views, not only the visible cards.
    selectedCountEl.textContent = activeModule.selectedCards.size + " selected";
    hideStartMessage();
}

function updateYoonButton() {
    const showYoon = activeModule.showYoon;
    toggleYoonBtn.textContent = showYoon ? "Hide Yōon" : "Show Yōon";
    toggleYoonBtn.setAttribute("aria-pressed", showYoon);
}

function toggleCard(card) {
    const selectedCards = activeModule.selectedCards;
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
    const m = activeModule;
    if (!m.categories[category]) return;

    m.currentCategory = category;

    filterButtons.forEach(button => {
        const isActive = button.dataset.category === category;
        button.classList.toggle("active", isActive);
        button.setAttribute("aria-pressed", isActive);
    });

    // Re-render from selectedCards, so selections are always restored.
    renderChart();
}

kanaChart.addEventListener("click", event => {
    const card = event.target.closest(".kana-card");
    if (card) toggleCard(card);
});

kanaChart.addEventListener("keydown", event => {
    if (event.key !== "Enter" && event.key !== " ") return;
    const card = event.target.closest(".kana-card");
    if (!card) return;
    event.preventDefault();
    toggleCard(card);
});

filterButtons.forEach(button => {
    button.addEventListener("click", () => setCategory(button.dataset.category));
});

// Show / Hide Yōon: swaps the chart for the active category.
toggleYoonBtn.addEventListener("click", () => {
    activeModule.showYoon = !activeModule.showYoon;
    updateYoonButton();
    renderChart();
});

// Select All: only the cards currently displayed.
selectAllBtn.addEventListener("click", () => {
    getVisibleItems().forEach(item => activeModule.selectedCards.add(item.id));
    renderChart();
    updateSelectedCount();
});

// Clear All: only the cards currently displayed.
clearAllBtn.addEventListener("click", () => {
    getVisibleItems().forEach(item => activeModule.selectedCards.delete(item.id));
    renderChart();
    updateSelectedCount();
});


/* =========================
   QUIZ
   ========================= */

function showScreen(screen) {
    homeScreen.classList.toggle("hidden", screen !== "home");
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
    const m = activeModule;
    trueCountEl.textContent = m.trueCount;
    falseCountEl.textContent = m.falseCount;
    questionNumberEl.textContent = "Practice #" + m.practiceNumber;
}

function pickNextItem() {
    const m = activeModule;
    let next;

    if (m.quizPool.length === 1) {
        next = m.quizPool[0];
    } else {
        // Avoid showing the same character twice in a row.
        do {
            next = m.quizPool[Math.floor(Math.random() * m.quizPool.length)];
        } while (next.id === m.previousId);
    }

    return next;
}

function showQuestion() {
    const m = activeModule;

    m.currentItem = pickNextItem();
    m.previousId = m.currentItem.id;

    if (m.practiceMode === "recognition") {
        showRecognitionQuestion();
        return;
    }

    questionEl.textContent =
        m.quizMode === "jp-romaji" ? m.currentItem.char : m.currentItem.romaji;

    answerInput.value = "";
    answerInput.placeholder =
        m.quizMode === "jp-romaji"
            ? "Type the romaji..."
            : "Type the " + m.name.toLowerCase() + "...";
    m.answerLocked = false;
    answerInput.disabled = false;
    checkAnswerBtn.disabled = false;
    updateStats();
    answerInput.focus();
}

function isCorrectAnswer(rawAnswer) {
    const m = activeModule;

    // NFC keeps composed and decomposed forms of the same kana equal.
    const answer = rawAnswer.trim().normalize("NFC");

    if (m.quizMode === "jp-romaji") {
        const normalized = answer.toLowerCase();
        const accepted = [m.currentItem.romaji, ...(m.currentItem.alt || [])];
        return accepted.includes(normalized);
    }

    // Romaji → Japanese: several characters share a reading (じ/ぢ, ず/づ),
    // so accept any character of THIS module that has the same romaji as the
    // question (a hiragana answer is never accepted in Katakana, and vice versa).
    // A Yōon answer must be the full combination (e.g. きゃ / キャ), written with
    // the small ゃ/ゅ/ょ (ャ/ュ/ョ); a single character or a large や/ゆ/よ is wrong.
    return m.all.some(
        item => item.romaji === m.currentItem.romaji && item.char === answer
    );
}

function checkAnswer() {
    const m = activeModule;
    if (m.answerLocked || !m.currentItem) return;

    const rawAnswer = answerInput.value;
    if (rawAnswer.trim() === "") {
        answerInput.focus();
        return;
    }

    m.answerLocked = true;

    const correctText =
        m.quizMode === "jp-romaji" ? m.currentItem.romaji : m.currentItem.char;
    resolveAnswer(isCorrectAnswer(rawAnswer), correctText);
}

// Shared by both modes: counters, feedback, and the automatic next question.
function resolveAnswer(isCorrect, correctText) {
    const m = activeModule;

    if (isCorrect) {
        m.trueCount++;
        showFeedback("Correct!", true);
    } else {
        m.falseCount++;
        showFeedback("Wrong! Answer: " + correctText, false);
    }

    updateStats();

    clearTimeout(nextQuestionTimer);
    nextQuestionTimer = setTimeout(() => {
        if (activeModule !== m) return;
        hideFeedback();
        m.practiceNumber++;
        showQuestion();
    }, FEEDBACK_DELAY);
}


/* =========================
   RECOGNITION PRACTICE
   Romaji prompt, four character cards. Uses the same quizPool, counters,
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
// じ/ぢ and ず/づ (ジ/ヂ and ズ/ヅ) share a reading, so showing both would
// give two right answers.
function countReadings(items) {
    return new Set(items.map(item => item.romaji)).size;
}

function buildChoices(correct) {
    const m = activeModule;

    // Group the other pool items by reading (the correct reading is excluded,
    // so no distractor can also be a correct answer).
    const groups = new Map();
    m.quizPool.forEach(item => {
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
    if (index === m.lastCorrectIndex && m.correctStreak >= MAX_SAME_POSITION) {
        let other;
        do {
            other = Math.floor(Math.random() * choices.length);
        } while (other === index);
        [choices[index], choices[other]] = [choices[other], choices[index]];
        index = other;
    }
    m.correctStreak = index === m.lastCorrectIndex ? m.correctStreak + 1 : 1;
    m.lastCorrectIndex = index;

    return choices;
}

function showRecognitionQuestion() {
    const m = activeModule;

    questionEl.textContent = m.currentItem.romaji;

    choiceArea.innerHTML = "";
    choiceArea.classList.remove("locked");
    choiceArea.setAttribute(
        "aria-label", "Choose the " + m.name.toLowerCase() + " for " + m.currentItem.romaji
    );

    buildChoices(m.currentItem).forEach(item => {
        const card = document.createElement("button");
        card.type = "button";
        card.className = "choice-card";
        card.dataset.id = item.id;
        card.textContent = item.char;
        choiceArea.appendChild(card);
    });

    m.answerLocked = false;
    updateStats();
}

function chooseAnswer(card) {
    const m = activeModule;

    // One answer per question.
    if (m.answerLocked || !m.currentItem || m.practiceMode !== "recognition") return;
    m.answerLocked = true;

    const isCorrect = card.dataset.id === m.currentItem.id;

    choiceArea.classList.add("locked");
    card.classList.add("selected");
    Array.from(choiceArea.children).forEach(other => {
        if (other.dataset.id === m.currentItem.id) other.classList.add("correct");
    });
    if (!isCorrect) card.classList.add("wrong");

    resolveAnswer(isCorrect, m.currentItem.char);
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

practiceModeSelect.addEventListener("change", () => {
    activeModule.practiceModeChoice = practiceModeSelect.value;
    updatePracticeModeUI();
});

quizModeSelect.addEventListener("change", () => {
    activeModule.quizModeChoice = quizModeSelect.value;
});

function startQuiz() {
    const m = activeModule;

    // Build the pool from every selected id, whatever category or view
    // (normal or Yōon) it came from.
    m.quizPool = [];
    m.selectedCards.forEach(id => {
        const item = m.byId.get(id);
        if (item) m.quizPool.push(item);
    });

    const recognition = practiceModeSelect.value === "recognition";

    if (m.quizPool.length === 0 && !recognition) {
        selectedCountEl.textContent =
            "Select at least one " + m.name.toLowerCase() + " to start";
        return;
    }

    if (recognition && countReadings(m.quizPool) < CHOICE_COUNT) {
        showStartMessage(
            "Select at least " + CHOICE_COUNT + " characters with different " +
            "readings to start Recognition Practice."
        );
        return;
    }

    hideStartMessage();
    m.practiceMode = recognition ? "recognition" : "writing";
    answerArea.classList.toggle("hidden", recognition);
    choiceArea.classList.toggle("hidden", !recognition);

    m.quizMode = quizModeSelect.value;
    m.lastCorrectIndex = -1;
    m.correctStreak = 0;
    m.practiceNumber = 1;
    m.trueCount = 0;
    m.falseCount = 0;
    m.previousId = null;

    hideFeedback();
    showScreen("quiz");
    showQuestion();
}

// Stops whatever quiz is running in the active module: pending next question,
// feedback pop-up, and the answer lock.
function stopQuiz() {
    clearTimeout(nextQuestionTimer);
    hideFeedback();
    if (activeModule) {
        activeModule.answerLocked = false;
        activeModule.currentItem = null;
    }
    answerInput.blur();
}

function leaveQuiz() {
    stopQuiz();

    // The module's selectedCards and showYoon are untouched, so the chart
    // restores exactly as left.
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
   NAVIGATION
   Single page: the homepage and the selection / quiz screens are shown and
   hidden, never reloaded. The address bar hash (#hiragana, #katakana, #home)
   records where you are, so the browser / phone Back button works and a
   module can be opened directly.
   ========================= */

// Shows a module's selection screen, restoring everything from its own state.
function activateModule(m) {
    activeModule = m;

    moduleTitleEl.textContent = m.name + " Quiz";
    moduleSubtitleEl.textContent =
        "Select the " + m.name.toLowerCase() + " you want to practice.";
    filterButtons.forEach(button => {
        if (button.dataset.category === "basic") {
            button.textContent = "Basic " + m.name;
        }
    });
    recognitionHint.textContent = "Romaji → " + m.name + ": Good luck!";
    document.title = m.name + " Quiz – Japanese Practice";

    practiceModeSelect.value = m.practiceModeChoice;
    quizModeSelect.value = m.quizModeChoice;
    updatePracticeModeUI();

    setCategory(m.currentCategory);
    updateYoonButton();
    updateSelectedCount();
}

let currentRoute = null;   // "home", "hiragana" or "katakana"

function showRoute(route) {
    currentRoute = route;

    // Whatever was running in the module we are leaving stops here.
    stopQuiz();
    closeAbout();

    if (route === "home") {
        activeModule = null;
        document.title = "Japanese Practice";
        showScreen("home");
        return;
    }

    activateModule(MODULES[route]);
    showScreen("selection");
}

function routeFromHash() {
    const name = location.hash.replace(/^#/, "");
    return Object.prototype.hasOwnProperty.call(MODULES, name) ? name : "home";
}

// Buttons: switch screens immediately, then record the move in the address bar.
function navigate(route) {
    showRoute(route);
    if (routeFromHash() !== route) location.hash = route;
}

// Browser / phone Back and Forward (or an edited address): the hash changed
// without us, so follow it. Moves made by navigate() are already on screen.
window.addEventListener("hashchange", () => {
    const route = routeFromHash();
    if (route !== currentRoute) showRoute(route);
});

moduleCards.forEach(card => {
    card.addEventListener("click", () => navigate(card.dataset.module));
});

homeButton.addEventListener("click", () => navigate("home"));


/* =========================
   ABOUT
   ========================= */

function openAbout() {
    aboutModal.classList.remove("hidden");
    document.body.classList.add("modal-open");
    aboutClose.focus();
}

function closeAbout() {
    if (aboutModal.classList.contains("hidden")) return;
    aboutModal.classList.add("hidden");
    document.body.classList.remove("modal-open");
    aboutButton.focus();
}

aboutButton.addEventListener("click", openAbout);
aboutClose.addEventListener("click", closeAbout);

// Click on the dark backdrop (not on the box) closes it.
aboutModal.addEventListener("click", event => {
    if (event.target === aboutModal) closeAbout();
});

document.addEventListener("keydown", event => {
    if (aboutModal.classList.contains("hidden")) return;
    if (event.key === "Escape") {
        closeAbout();
    } else if (event.key === "Tab") {
        // The Close button is the only control in the dialog: keep focus there.
        event.preventDefault();
        aboutClose.focus();
    }
});


/* =========================
   INIT
   ========================= */

showRoute(routeFromHash());