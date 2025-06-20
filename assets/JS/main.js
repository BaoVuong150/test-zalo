const yesBtn = document.querySelector('.yes');
const noBtn = document.querySelector('.no');
const other = document.querySelector('.other');
const modal1 = document.getElementById('modal-1');
const modal2 = document.getElementById('modal-2');
const closeModal = document.querySelector('.close-modal');
const section = document.querySelector('.section');
const surely = document.querySelector('.surely');
const cancel = document.querySelector('.cancel');
let hasSurelyClicked = false;

document.addEventListener('DOMContentLoaded', function () {
    let isPlayed = false;
    let isPlaying = false;

    yesBtn.addEventListener('click', function () {
        modal1.style.display = 'flex';
        section.style.display = 'none';


        if (isPlayed || isPlaying) return;
        isPlayed = true;   // ✅ đánh dấu đã bắn pháo một lần trong phiên này
        isPlaying = true;


        yesBtn.style.backgroundColor = '#008140';
        yesBtn.style.color = 'white';
        noBtn.disabled = true;
        other.disabled = true;
        noBtn.style.opacity = 0.5;
        other.style.opacity = 0.5;
        noBtn.style.cursor = 'not-allowed';
        other.style.cursor = 'not-allowed';



        const duration = 5 * 1000;
        const animationEnd = Date.now() + duration;
        const interval = setInterval(function () {
            confetti({
                particleCount: 40,
                angle: 60,
                spread: 90,
                origin: { x: 0 }
            });

            confetti({
                particleCount: 40,
                angle: 120,
                spread: 90,
                origin: { x: 1 }
            });

            confetti({
                particleCount: 50,
                startVelocity: 30,
                spread: 360,
                origin: { x: 0.5, y: 0.3 }
            });

            if (Date.now() > animationEnd) {
                clearInterval(interval);
                isPlaying = false; // Nếu bạn muốn cho bấm lại trong cùng phiên thì bỏ dòng isPlayed = true
            }
        }, 250);
    });

});

noBtn.addEventListener('click', function () {
    if (hasSurelyClicked) return;

    modal2.style.display = 'flex';
    section.style.display = 'none';
});

cancel.addEventListener('click', function () {
    modal2.style.display = 'none';
    section.style.display = 'flex';
});

surely.addEventListener('click', function () {
    hasSurelyClicked = true;

    modal2.style.display = 'none';
    section.style.display = 'flex';
    noBtn.style.backgroundColor = '#e02525';
    noBtn.style.color = 'white'
    yesBtn.disabled = true;
    other.disabled = true;
    yesBtn.style.opacity = 0.5;
    other.style.opacity = 0.5;
    yesBtn.style.cursor = 'not-allowed';
    other.style.cursor = 'not-allowed';
    other.innerHTML = 'Tui có còn cơ hội không?'
});

other.addEventListener('click', function () {
    other.style.backgroundColor = '#0000F7';
    other.style.color = 'white';

    yesBtn.disabled = true;
    noBtn.disabled = true;
    noBtn.style.opacity = 0.5;
    yesBtn.style.opacity = 0.5;
    noBtn.style.cursor = 'not-allowed';
    yesBtn.style.cursor = 'not-allowed';
});

document.querySelectorAll('.close-modal').forEach(btn => {
    btn.addEventListener('click', function () {
        modal1.style.display = 'none';
        modal2.style.display = 'none';
        section.style.display = 'flex';
    });
});

window.addEventListener('click', function (e) {
    if (e.target === modal1) {
        modal1.style.display = 'none';
        section.style.display = 'flex';
        section.style.animation = 'none';
    };
});