document.addEventListener('DOMContentLoaded', () => {
    const start = document.getElementById("startBtn");

    const handleStart = () => {
        localStorage.removeItem('timerStartTime');
        localStorage.setItem('timerStartTime', Date.now());
        window.location.href = "contents.html";
    };

    start.addEventListener("click", handleStart);

    start.addEventListener("touchstart", (e) => {
        e.preventDefault();
        handleStart();
    });
});





