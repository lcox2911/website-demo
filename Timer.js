
// document.addEventListener('DOMContentLoaded', (event) => {

//     const timerDisplay = document.getElementById('timer-display');
//     const totalDuration = 20 * 60; // 20 minutes in seconds
//     let startTime = localStorage.getItem('timerStartTime');

//     if (!startTime) {
//         // If no start time is saved, set one now and save it
//         startTime = Date.now();
//         localStorage.setItem('timerStartTime', startTime);
//     }

//     function updateTimer() {
//         const currentTime = Date.now();
//         const elapsedTime = Math.floor((currentTime - startTime) / 1000); // in seconds
//         const remainingTime = totalDuration - elapsedTime;

//         if (remainingTime <= 0) {
//             timerDisplay.textContent = "00:00";
//             // Optionally, clear the timer and redirect or display a message
//             clearInterval(timerInterval);
//             localStorage.removeItem('timerStartTime'); // Reset for next session
//             alert("Time is up!");
//             // window.location.href = "timeout_page.html"; // Redirect example
//             return;
//         }

//         const minutes = Math.floor(remainingTime / 60);
//         const seconds = remainingTime % 60;

//         const formattedTime =
//             `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;

//         timerDisplay.textContent = formattedTime;
//     }

//     // Update the timer every second
//     const timerInterval = setInterval(updateTimer, 1000);

//     // Initial call to display immediately
//     updateTimer();

//     const resetBtn = document.getElementById('startBtn');

//     if (resetBtn) {
//         resetBtn.addEventListener('click', () => {
//             localStorage.removeItem('timerStartTime');
//             startTime = Date.now();
//             localStorage.setItem('timerStartTime', startTime);

//             clearInterval(timerInterval);
//             timerInterval = setInterval(updateTimer, 1000);

//             updateTimer();
//         });
//     }
// })


