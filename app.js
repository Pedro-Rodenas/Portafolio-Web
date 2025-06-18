document.querySelectorAll(".nav a").forEach(link => {
    link.addEventListener("click", e => {
        e.preventDefault();


        document.querySelectorAll(".nav a").forEach(a => a.classList.remove("active-link"));
        link.classList.add("active-link");

        const target = link.getAttribute("data-target");


        document.querySelectorAll(".content-section").forEach(section => {
            section.classList.remove("active");
        });
        document.getElementById(target).classList.add("active");
    });
});
const canvas = document.getElementById("bubble-canvas");
const ctx = canvas.getContext("2d");

let bubbles = [];

function resizeCanvas() {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
}
window.addEventListener("resize", resizeCanvas);
resizeCanvas();

function createBubbles(count) {
    bubbles = [];
    for (let i = 0; i < count; i++) {
        bubbles.push({
            x: Math.random() * canvas.width,
            y: Math.random() * canvas.height,
            r: Math.random() * 10 + 2,
            dx: Math.random() * 0.3 + 0.05,
            dy: Math.random() * 0.4 + 0.05,
            alpha: Math.random() * 0.05 + 0.0
        });
    }
}

function drawBubbles() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    for (let b of bubbles) {
        ctx.beginPath();
        ctx.arc(b.x, b.y, b.r, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(255, 255, 255, ${b.alpha})`;
        ctx.shadowColor = `rgba(255, 255, 255, ${b.alpha})`;
        ctx.shadowBlur = 5;
        ctx.fill();


        b.x += b.dx;
        b.y += b.dy;


        if (b.y - b.r > canvas.height || b.x - b.r > canvas.width) {
            b.x = Math.random() * canvas.width;
            b.y = -b.r;
        }
    }

    requestAnimationFrame(drawBubbles);
}

createBubbles(50)
drawBubbles();
