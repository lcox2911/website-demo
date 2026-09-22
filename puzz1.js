document.addEventListener('DOMContentLoaded', () => {
  const back = document.getElementById("backButton");

  function goBack() {
    window.location.href = "contents.html";
  }

  back.addEventListener("click", goBack);
  back.addEventListener("touchstart", (e) => {
    e.preventDefault();
    goBack();
  });
});

// Game data
const items = [
  {
    id: 1,
    name: "Matariki",
    description: "The star cluster celebrated at New Year",
    image: "Images/Matariki.jpg"
  },
  {
    id: 2,
    name: "Puanga",
    description: "The star some iwi use to celebrate New Year",
    image: "Images/Puanga.jpg"
  },
  {
    id: 3,
    name: "Hautapu",
    description: "A ceremony to make food offerings to the Matariki Stars",
    image: "Images/Hautapu.jpg"
  },
  {
    id: 4,
    name: "Waitī",
    description: "The Star that represents freshwater",
    image: "Images/Eel.jpg"
  },
    {
    id: 5,
    name:"Te Waka o Rangi",
    description: "The waka that Taramainuku captains and collects the souls of the dead.  He carries them to the underworld until Matariki rises",
    image: "Images/Te_Waka.png"
  }
];

// Track selected items
let selected = { picture: null, description: null, name: null };

// Shuffle helper
function shuffle(array) {
  return array.sort(() => Math.random() - 0.5);
}

function createColumnItems() {
  const picCol = document.getElementById("pictures");
  const descCol = document.getElementById("descriptions");
  const nameCol = document.getElementById("names");

  const shuffledPics = shuffle([...items]);
  const shuffledDescs = shuffle([...items]);
  const shuffledNames = shuffle([...items]);

  // Pictures
  shuffledPics.forEach(item => {
    const div = document.createElement("div");
    div.className = "item";
    div.dataset.id = item.id;
    div.innerHTML = `<img src="${item.image}">`;
    div.addEventListener("pointerdown", () => selectItem("picture", item.id, div));
    picCol.appendChild(div);
  });

  // Descriptions
  shuffledDescs.forEach(item => {
    const div = document.createElement("div");
    div.className = "item";
    div.dataset.id = item.id;
    div.textContent = item.description;
    div.addEventListener("pointerdown", () => selectItem("description", item.id, div));
    descCol.appendChild(div);
  });

  // Names
  shuffledNames.forEach(item => {
    const div = document.createElement("div");
    div.className = "item";
    div.dataset.id = item.id;
    div.textContent = item.name;
    div.addEventListener("pointerdown", () => selectItem("name", item.id, div));
    nameCol.appendChild(div);
  });
}

function selectItem(type, id, element) {
  if (element.classList.contains("locked")) return; // ignore locked

  // Clear previous selection in that column
  document
    .querySelectorAll(`#${type}s .item`)
    .forEach(el => el.classList.remove("selected"));

  element.classList.add("selected");
  selected[type] = id;

}

function checkMatch() {
  const { picture, description, name } = selected;

  if (picture && description && name) {
    const result = document.getElementById("result");

    if (picture === description && description === name) {
      result.textContent = "Correct match!";
      result.style.color = "green";

      lockMatchedItems(picture);

      // Reset selection for next round
      selected = { picture: null, description: null, name: null };
    } else {
      result.textContent = "Incorrect — try again.";
      result.style.color = "red";
    }
  }
}

function lockMatchedItems(id) {
  ["pictures", "descriptions", "names"].forEach(colId => {
    const el = document.querySelector(
      `#${colId} .item[data-id="${id}"]`
    );
    if (el) {
      el.classList.add("locked");
      el.classList.remove("selected");
    }
  });
}

const submitBtn = document.getElementById('submitBtn');

if (submitBtn) {
  function submitAction() {
    checkMatch();
  }

  submitBtn.addEventListener("click", submitAction);
  submitBtn.addEventListener("touchstart", (e) => {
    e.preventDefault();
    submitAction();
  });
}


createColumnItems();

function lockMatchedItems(id) {
  ["pictures", "descriptions", "names"].forEach(colId => {
    const el = document.querySelector(`#${colId} .item[data-id="${id}"]`);
    if (el) {
      el.classList.add("locked");
      el.classList.remove("selected");
    }
  });

  checkIfAllMatched();
}

function checkIfAllMatched() {
  const lockedItems = document.querySelectorAll(".item.locked").length;

  // Each match locks 3 items
  const totalItems = items.length * 3;

  if (lockedItems === totalItems) {
    const numberDiv = document.getElementById("number");
    numberDiv.textContent = "42";
    numberDiv.style.display = "block";
    document.getElementById("overlay").style.display = "block";
  }
}


//Timer

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

btn.addEventListener("click", toggleHint);
btn.addEventListener("touchstart", (e) => {
  e.preventDefault();
  toggleHint();
});






