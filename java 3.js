// Оголошуємо глобальні змінні для доступу до canvas та контексту
const canvas = document.getElementById('gameCanvas');
const ctx = canvas.getContext('2d');

// Параметри крана
const craneWidth = 60;
const craneHeight = 20;
let craneX = (canvas.width - craneWidth) / 2;
const craneSpeed = 5;

// Параметри гачка
const hookWidth = 10;
const hookHeight = 20;
let hookX = craneX + craneWidth / 2 - hookWidth / 2;
let hookY = canvas.height - 30;
const hookSpeed = 2;

// Початковий рахунок
let score = 0;

// Додамо глобальну змінну для визначення стану руху гачка
let hookMoving = false;

// Функція для малювання крана
function drawCrane() {
    ctx.fillStyle = 'gray';
    ctx.fillRect(craneX, canvas.height - craneHeight, craneWidth, craneHeight);
}

// Функція для малювання гачка
function drawHook() {
    ctx.fillStyle = 'black';
    ctx.fillRect(hookX, hookY, hookWidth, hookHeight);
    ctx.beginPath();
    ctx.moveTo(hookX + hookWidth / 2, hookY);
    ctx.lineTo(hookX + hookWidth / 2, hookY - 10);
    ctx.strokeStyle = 'black';
    ctx.lineWidth = 2;
    ctx.stroke();
}

// Функція для малювання сцени
function draw() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    drawCrane();
    drawHook();
    ctx.fillStyle = 'black';
    ctx.font = '20px Arial';
    ctx.fillText('Score: ' + score, 10, 30);
}

// Функція для руху крана
function moveCrane(direction) {
    if (direction === 'left' && craneX > 0) {
        craneX -= craneSpeed;
        if (!hookMoving) {
            hookX -= craneSpeed;
        }
    } else if (direction === 'right' && craneX < canvas.width - craneWidth) {
        craneX += craneSpeed;
        if (!hookMoving) {
            hookX += craneSpeed;
        }
    }
}

// Функція для оновлення сцени
function update() {
    if (hookMoving) {
        hookY -= hookSpeed;
        if (hookY <= 0) {
            hookY = canvas.height - 30;
            hookX = craneX + craneWidth / 2 - hookWidth / 2;
            hookMoving = false;
            score -= 5;
        } else if (hookY < canvas.height - craneHeight && hookY > canvas.height - craneHeight - hookHeight &&
                hookX >= craneX && hookX <= craneX + craneWidth) {
            hookY = canvas.height - 30;
            hookX = craneX + craneWidth / 2 - hookWidth / 2;
            hookMoving = false;
            score += 10;
        }
    }
    draw();
    requestAnimationFrame(update);
}

// Обробник подій клавіатури
document.addEventListener('keydown', (event) => {
    if (event.key === 'ArrowLeft') {
        moveCrane('left');
    } else if (event.key === 'ArrowRight') {
        moveCrane('right');
    } else if (event.key === ' ') {
        if (!hookMoving) {
            hookMoving = true;
        }
    }
});

// Запускаємо оновлення анімації
update();
