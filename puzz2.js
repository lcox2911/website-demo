document.addEventListener('DOMContentLoaded', () => {
  const back = document.getElementById("backButton");

  function goBack() {
    window.location.href = "contents.html";
  }

  back.addEventListener("pointerup", goBack);
});

// ----- GAME DATA -----
const groups = [
  {
    name: "ON THE STAR PATH",
    items: ["MATARIKI", "PUANGA", "TAUTORU", "TE WAKA O TAMARERETI"],
    // color: "#6DA34D"
  },
  {
    name: "PHASES IN THE MARAMATAKA",
    items: ["RĀKAUNUI", "TIRIA", "MĀWHARU", "TANGAROA-A-MUA"],
    // color: "#F5A623"
  },
  {
    name: "WHARE IN THE STAR COMPASS",
    items: ["KORE", "RĀ", "MANU", "NGOI"],
    // color: "#D92B4C"
  },
  {
    name: "PLANETS IN TE REO",
    items: ["WHIRO", "MATAWHERO", "TANGAROA", "KŌPŪ"],
    // color: "#4A90E2"
  }
];

// ----- GAME STATE -----
let cards = [];
let selectedIndices = [];
let solvedGroups = [];
// let attemptsRemaining = 4;
let answer = 29;

// ----- INITIAL SETUP -----
function initGame() {
  cards = [];
  groups.forEach((group, gIndex) => {
    group.items.forEach(word => {
      cards.push({
        word,
        groupName: group.name,
        groupIndex: gIndex,
        solved: false
      });
    });
  });

  shuffleCards();
  renderGrid();
  renderStatus();
  document.getElementById("found-groups").innerHTML = "";
  solvedGroups = [];
  selectedIndices = [];
}

// Fisher–Yates shuffle
function shuffleCards() {
  for (let i = cards.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [cards[i], cards[j]] = [cards[j], cards[i]];
  }
}

// ----- RENDERING -----
function renderGrid() {
  const grid = document.getElementById("grid");
  grid.innerHTML = "";

  cards.forEach((card, index) => {
    const div = document.createElement("div");
    div.className = "card";
    if (card.solved) div.classList.add("solved");
    if (selectedIndices.includes(index)) div.classList.add("selected");

    div.textContent = card.word;
    div.addEventListener("pointerup", () => onCardClick(index));
    grid.appendChild(div);
  });
}

function renderStatus(message = "") {
  //   document.getElementById("attempts-remaining").textContent = attemptsRemaining;
  document.getElementById("message").textContent = message;
}

function addSolvedGroupDisplay(groupName, words, color) {
  const container = document.getElementById("found-groups");
  const row = document.createElement("div");
  row.className = "group-row";
  //   row.style.borderLeftColor = color;

  const title = document.createElement("div");
  title.className = "group-title";
  title.textContent = groupName;

  const items = document.createElement("div");
  items.className = "group-items";
  items.textContent = words.join(", ");

  row.appendChild(title);
  row.appendChild(items);
  container.appendChild(row);
}

// ----- INTERACTION -----
function onCardClick(index) {
  const card = cards[index];
  if (card.solved) return;

  const pos = selectedIndices.indexOf(index);
  if (pos >= 0) {
    selectedIndices.splice(pos, 1);
  } else {
    if (selectedIndices.length >= 4) return;
    selectedIndices.push(index);
  }
  renderGrid();
}

function onSubmitGroup() {
  if (selectedIndices.length !== 4) {
    renderStatus("Select exactly 4 cards.");
    return;
  }

  const groupIndex = cards[selectedIndices[0]].groupIndex;
  const allSame = selectedIndices.every(
    i => cards[i].groupIndex === groupIndex && !cards[i].solved
  );

  if (allSame) {
    const groupInfo = groups[groupIndex];
    selectedIndices.forEach(i => (cards[i].solved = true));
    solvedGroups.push(groupInfo.name);

    addSolvedGroupDisplay(groupInfo.name, groupInfo.items, groupInfo.color);
    renderGrid();
    renderStatus("Nice! You found a group.");
    selectedIndices = [];

    if (solvedGroups.length === groups.length) {
      renderStatus("You solved all groups!");
      document.getElementById("submit-btn").disabled = true;
      document.getElementById("shuffle-btn").disabled = true;
      giveNumber();
    }
  } else {
    renderStatus("Not quite. Try again.");
  }
  selectedIndices = [];
  renderGrid();
}


function onShuffle() {
  shuffleCards();
  selectedIndices = [];
  renderGrid();
  renderStatus("Cards shuffled.");
}

function revealAll() {
  cards.forEach(card => (card.solved = true));
  renderGrid();
}

// ----- EVENT LISTENERS -----
document.getElementById("submit-btn").addEventListener("pointerup", onSubmitGroup);

document.getElementById("shuffle-btn").addEventListener("click", onShuffle);


function giveNumber() {
  // document.getElementById("number").textContent = answer;
  const numberDiv = document.getElementById("number");
  numberDiv.textContent = answer;
  numberDiv.style.display = "block";   // show the styled box
  document.getElementById("overlay").style.display = "block";
}



// Start game
initGame();

document.addEventListener('DOMContentLoaded', (event) => {

    const timerDisplay = document.getElementById('timer-display');
    const totalDuration = 20 * 60; // 20 minutes in seconds
    let startTime = localStorage.getItem('timerStartTime');

    if (!startTime) {
        // If no start time is saved, set one now and save it
        startTime = Date.now();
        localStorage.setItem('timerStartTime', startTime);
    }

    function updateTimer() {
        const currentTime = Date.now();
        const elapsedTime = Math.floor((currentTime - startTime) / 1000); // in seconds
        const remainingTime = totalDuration - elapsedTime;

      if (remainingTime <= 0) {
    timerDisplay.textContent = "00:00";
    clearInterval(timerInterval);
    localStorage.removeItem('timerStartTime');

    // Show overlay
    const overlay = document.getElementById("timeOverlay");
    if (overlay) overlay.style.display = "flex";

    return;
}


        const minutes = Math.floor(remainingTime / 60);
        const seconds = remainingTime % 60;

        const formattedTime =
            `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;

        timerDisplay.textContent = formattedTime;
    }

    // Update the timer every second
    const timerInterval = setInterval(updateTimer, 1000);

    // Initial call to display immediately
    updateTimer();

    const resetBtn = document.getElementById('startBtn');

    if (resetBtn) {
        resetBtn.addEventListener('click', () => {
            localStorage.removeItem('timerStartTime');
            startTime = Date.now();
            localStorage.setItem('timerStartTime', startTime);

            clearInterval(timerInterval);
            timerInterval = setInterval(updateTimer, 1000);

            updateTimer();
        });
    }
})

const btn = document.getElementById("hintBtn");
const hint = document.getElementById("hint");

function toggleHint() {
  const isHidden = window.getComputedStyle(hint).display === "none";
  hint.style.display = isHidden ? "block" : "none";
}

// Works for mouse, touch, pen — and does NOT double-trigger
btn.addEventListener("pointerup", toggleHint);


