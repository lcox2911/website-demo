document.addEventListener('DOMContentLoaded', () => {
    const back = document.getElementById("backButton");
    back.addEventListener("pointerdown", () => { 
        window.location.href = "contents.html"; 
    });
});

// Question 1
document.addEventListener("DOMContentLoaded", function () {
    const mauiInput = document.getElementById("ans1");
    const enterButton = document.getElementById("ent1");

    enterButton.addEventListener("pointerdown", function () {
        const answer = mauiInput.value.trim().toLowerCase();
        if (answer === "maui") {
            document.getElementById("Qtn1").style.display = "none";
            document.getElementById("Qtn2").style.display = "block";
        }
    });
});

// Question 2
document.addEventListener("DOMContentLoaded", function () {
    const ansInput = document.getElementById("ans2");
    const entBtn2 = document.getElementById("ent2");

    entBtn2.addEventListener("pointerdown", function () {
        const answer = ansInput.value.trim().toLowerCase();
        if (answer === "te ikaroa") {
            document.getElementById("Qtn1").style.display = "none";
            document.getElementById("Qtn2").style.display = "none";
            document.getElementById("Qtn3").style.display = "block";
        }
    });
});

// Question 3
document.getElementById("ent3").addEventListener("pointerdown", function () {
    const userAnswer = document.getElementById("ans3").value.trim().toLowerCase();
    const correctAnswer = "hek busby";
    if (userAnswer === correctAnswer) {
        document.getElementById("number").innerHTML = "31";
        document.getElementById("number").style.display = "block";
        document.getElementById("Qtn3").style.display = "none";
        document.getElementById("overlay").style.display = "block";
    }
});


// Hint button
const btn = document.getElementById("hintBtn");
const hint = document.getElementById("hint");

btn.addEventListener("pointerdown", () => {
  const isHidden = window.getComputedStyle(hint).display === "none";
  hint.style.display = isHidden ? "block" : "none";
});


document.addEventListener('DOMContentLoaded', (event) => {

    const timerDisplay = document.getElementById('timer-display');
    const totalDuration = 20 * 60; // 20 minutes in seconds
    let startTime = localStorage.getItem('timerStartTime');

    if (!startTime) {
        
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

    
    const timerInterval = setInterval(updateTimer, 1000);

    
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

