const canvas = document.getElementById('poolTable');
const ctx = canvas.getContext('2d');

canvas.width = 800;
canvas.height = 400;

const BALL_RADIUS = 10;
const FRICTION = 0.98;
const MAX_POWER = 100;
const POWER_MULTIPLIER = 0.1;

let cueBall;
let balls = [];
let isAiming = false;
let shootingPower = 0;
let shootingAngle = 0;
let powerChargeInterval;

// Initialize the cue ball
function setupBalls() {
    // Cue Ball
    cueBall = { x: canvas.width / 4, y: canvas.height / 2, vx: 0, vy: 0, color: "#ffffff", radius: BALL_RADIUS };
    balls.push(cueBall);

    // Pool Balls (15 balls in a triangle)
    const startX = (canvas.width / 4) * 3;
    const startY = canvas.height / 2;
    const rowOffset = BALL_RADIUS * 2; // Spacing for rows

    let colors = ["#FF0000", "#0000FF", "#00FF00", "#FFFF00", "#FF00FF", "#00FFFF", "#FFA500", "#A52A2A", "#000000", "#8A2BE2", "#DEB887", "#5F9EA0", "#7FFF00", "#DC143C", "#FF1493"];
    let colorIndex = 0;

    let row = 0;
    let ballsInRow = 1;

    // Arrange balls in a triangle
    for (let i = 0; i < 15; i++) {
        const x = startX + row * BALL_RADIUS * Math.sqrt(3);
        const y = startY + (i - (row * (row + 1)) / 2) * rowOffset - (rowOffset * row) / 2;
        
        balls.push({
            x: x,
            y: y,
            vx: 0,
            vy: 0,
            color: colors[colorIndex % colors.length],
            radius: BALL_RADIUS
        });

        colorIndex++;
        
        if (ballsInRow === row + 1) {
            row++;
            ballsInRow = 0;
        } else {
            ballsInRow++;
        }
    }
}

// Draw a ball
function drawBall(ball) {
    ctx.beginPath();
    ctx.arc(ball.x, ball.y, ball.radius, 0, Math.PI * 2);
    ctx.fillStyle = ball.color;
    ctx.fill();
    ctx.closePath();
}

// Draw cue stick and power bar
function drawCue() {
    if (!isAiming) return;

    // Draw cue stick
    ctx.strokeStyle = "#ffffff";
    ctx.lineWidth = 2;
    ctx.beginPath();
    ctx.moveTo(cueBall.x, cueBall.y);
    ctx.lineTo(
        cueBall.x - Math.cos(shootingAngle) * -100,
        cueBall.y - Math.sin(shootingAngle) * -100
    );
    ctx.stroke();

    // Draw power bar
    ctx.fillStyle = "#ffffff";
    ctx.fillRect(10, canvas.height - 30, shootingPower, 20);
}

function updateBalls() {
    for (let i = 0; i < balls.length; i++) {
        const ball = balls[i];

        if (Math.abs(ball.vx) > 0.01 || Math.abs(ball.vy) > 0.01) {
            ball.vx *= FRICTION;
            ball.vy *= FRICTION;
            ball.x += ball.vx;
            ball.y += ball.vy;

            // Wall collisions
            if (ball.x + ball.radius > canvas.width || ball.x - ball.radius < 0) ball.vx = -ball.vx;
            if (ball.y + ball.radius > canvas.height || ball.y - ball.radius < 0) ball.vy = -ball.vy;
        } else {
            // Stop the ball if it's moving very slowly
            ball.vx = 0;
            ball.vy = 0;
        }
    }

    // Check for collisions between balls
    handleCollisions();
}


// Handle aiming with mouse movement
canvas.addEventListener("mousemove", (e) => {
    if (cueBall.vx === 0 && cueBall.vy === 0) { // Only aim if ball is stationary
        const rect = canvas.getBoundingClientRect();
        const dx = e.clientX - rect.left - cueBall.x;
        const dy = e.clientY - rect.top - cueBall.y;
        shootingAngle = Math.atan2(dy, dx);
    }
});

// Start charging power with spacebar down
document.addEventListener("keydown", (e) => {
    if (e.code === "Space" && cueBall.vx === 0 && cueBall.vy === 0 && !isAiming) { 
        isAiming = true;
        shootingPower = 0;

        // Start charging power
        powerChargeInterval = setInterval(() => {
            shootingPower = Math.min(shootingPower + 1, MAX_POWER); // Increase power up to MAX_POWER
        }, 10);
    }
});

// Release the shot on spacebar up
document.addEventListener("keyup", (e) => {
    if (e.code === "Space" && isAiming) {
        if (powerChargeInterval) clearInterval(powerChargeInterval); // Stop charging power

        // Apply velocity based on angle and power
        cueBall.vx = Math.cos(shootingAngle) * shootingPower * POWER_MULTIPLIER;
        cueBall.vy = Math.sin(shootingAngle) * shootingPower * POWER_MULTIPLIER;

        // Reset aiming and power
        isAiming = false;
        shootingPower = 0;
    }
});

function handleCollisions() {
    for (let i = 0; i < balls.length; i++) {
        for (let j = i + 1; j < balls.length; j++) {
            const ball1 = balls[i];
            const ball2 = balls[j];

            const dx = ball2.x - ball1.x;
            const dy = ball2.y - ball1.y;
            const distance = Math.sqrt(dx * dx + dy * dy);

            // Check if the balls are colliding
            if (distance < ball1.radius + ball2.radius) {
                // Calculate collision response
                const angle = Math.atan2(dy, dx);
                const sin = Math.sin(angle);
                const cos = Math.cos(angle);

                // Rotate ball velocities into collision frame
                const vx1 = cos * ball1.vx + sin * ball1.vy;
                const vy1 = cos * ball1.vy - sin * ball1.vx;
                const vx2 = cos * ball2.vx + sin * ball2.vy;
                const vy2 = cos * ball2.vy - sin * ball2.vx;

                // Swap the velocities in the collision direction
                const temp = vx1;
                ball1.vx = cos * vx2 - sin * vy1;
                ball1.vy = sin * vx2 + cos * vy1;
                ball2.vx = cos * temp - sin * vy2;
                ball2.vy = sin * temp + cos * vy2;
            }
        }
    }
}

// Game loop to update and render everything
function gameLoop() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    balls.forEach(drawBall);
    drawCue();
    updateBalls();
    requestAnimationFrame(gameLoop);
}

// Start the game
setupBalls();
gameLoop();
