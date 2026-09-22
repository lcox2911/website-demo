document.addEventListener('DOMContentLoaded', () => {
    const solutions = {
        numOne: "42",
        numTwo: "29",
        numThree: "31"
    };

    function checkAllCorrect() {
        const numOne = document.getElementById('numOne').value.trim();
        const numTwo = document.getElementById('numTwo').value.trim();
        const numThree = document.getElementById('numThree').value.trim();

        if (numOne === solutions.numOne &&
            numTwo === solutions.numTwo &&
            numThree === solutions.numThree) {

            document.getElementById("congratsOverlay").style.display = "flex";

            const backBtn = document.getElementById("backButton");
            if (backBtn) backBtn.style.display = "none";

            const timer = document.getElementById("timer-container");
            if (timer) timer.style.display = "none";
        }
    }

    Object.keys(solutions).forEach(id => {
        const input = document.getElementById(id);
        const status = document.getElementById(`status-${id}`);

        input.addEventListener('input', () => {
            const value = input.value.trim();

            if (value.length < 2) {
                status.textContent = "";
                status.className = "status";
                return;
            }

            if (value === solutions[id]) {
                status.textContent = "✔";
                status.className = "status correct";
            } else {
                status.textContent = "✖";
                status.className = "status incorrect";
            }

            checkAllCorrect();
        });
    });
});

// Shared handler for back button
function goBack() {
    window.location.href = "contents.html";
}

const backButton = document.getElementById("backButton");
if (backButton) {
    backButton.addEventListener("click", goBack);
    backButton.addEventListener("touchstart", (e) => {
        e.preventDefault();
        goBack();
    });
}

document.addEventListener('DOMContentLoaded', () => {
    const timerDisplay = document.getElementById('timer-display');
    const totalDuration = 20 * 60;
    let startTime = localStorage.getItem('timerStartTime');

    if (!startTime) {
        startTime = Date.now();
        localStorage.setItem('timerStartTime', startTime);
    }

    function updateTimer() {
        const currentTime = Date.now();
        const elapsedTime = Math.floor((currentTime - startTime) / 1000);
        const remainingTime = totalDuration - elapsedTime;

        if (remainingTime <= 0) {
            timerDisplay.textContent = "00:00";
            clearInterval(timerInterval);
            localStorage.removeItem('timerStartTime');

            const overlay = document.getElementById("timeOverlay");
            if (overlay) overlay.style.display = "flex";
            return;
        }

        const minutes = Math.floor(remainingTime / 60);
        const seconds = remainingTime % 60;

        timerDisplay.textContent =
            `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
    }

    let timerInterval = setInterval(updateTimer, 1000);
    updateTimer();

    const resetBtn = document.getElementById('startBtn');

    function resetTimer() {
        localStorage.removeItem('timerStartTime');
        startTime = Date.now();
        localStorage.setItem('timerStartTime', startTime);

        clearInterval(timerInterval);
        timerInterval = setInterval(updateTimer, 1000);

        updateTimer();
    }

    if (resetBtn) {
        resetBtn.addEventListener('click', resetTimer);
        resetBtn.addEventListener('touchstart', (e) => {
            e.preventDefault();
            resetTimer();
        });
    }
});







