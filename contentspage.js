
document.addEventListener("DOMContentLoaded", () => {

    function addTouchNavigation(id, target) {
        const el = document.getElementById(id);
        if (!el) return;

        let touched = false;

        el.addEventListener("touchstart", () => {
            touched = true;
            window.location.href = target;
        });

        el.addEventListener("click", () => {
            if (!touched) window.location.href = target;
            touched = false;
        });
    }

    // Navigation buttons
    addTouchNavigation("btn1", "puzzle1.html");
    addTouchNavigation("btn2", "puzzle2.html");
    addTouchNavigation("btn3", "puzzle3.html");
    addTouchNavigation("btn4", "puzzle4.html");
    addTouchNavigation("enter_btn", "entercode.html");

    // Timer logic
    const timerDisplay = document.getElementById('timer-display');
    const totalDuration = 20 * 60;
    let startTime = localStorage.getItem('timerStartTime');

    if (!startTime) {
        startTime = Date.now();
        localStorage.setItem('timerStartTime', startTime);
    }

    function updateTimer() {
        const elapsed = Math.floor((Date.now() - startTime) / 1000);
        const remaining = totalDuration - elapsed;

        if (remaining <= 0) {
            timerDisplay.textContent = "00:00";
            clearInterval(timerInterval);
            localStorage.removeItem('timerStartTime');

            const overlay = document.getElementById("timeOverlay");
            if (overlay) overlay.style.display = "flex";
            return;
        }

        const minutes = Math.floor(remaining / 60);
        const seconds = remaining % 60;

        timerDisplay.textContent =
            `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
    }

    let timerInterval = setInterval(updateTimer, 1000);
    updateTimer();

    // Reset button
    const resetBtn = document.getElementById('startBtn');
    if (resetBtn) {
        let touched = false;

        resetBtn.addEventListener("touchstart", () => {
            touched = true;
            resetTimer();
        });

        resetBtn.addEventListener("click", () => {
            if (!touched) resetTimer();
            touched = false;
        });
    }

    function resetTimer() {
        localStorage.removeItem('timerStartTime');
        startTime = Date.now();
        localStorage.setItem('timerStartTime', startTime);

        clearInterval(timerInterval);
        timerInterval = setInterval(updateTimer, 1000);
        updateTimer();
    }
});
