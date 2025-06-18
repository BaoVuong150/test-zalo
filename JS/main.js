const yesBtn = document.querySelector('.yes');
const noBtn = document.querySelector('.no');
const other = document.querySelector('.other');
const modal = document.querySelector('.modal-tks')

document.addEventListener('DOMContentLoaded', function () {
    yesBtn.addEventListener('click', function () {
        yesBtn.style.backgroundColor = '#008140';
        yesBtn.style.color = 'white';

        noBtn.disabled = true;
        other.disabled = true;
        noBtn.style.opacity = 0.5;
        other.style.opacity = 0.5;
        noBtn.style.cursor = 'not-allowed';
        other.style.cursor = 'not-allowed';
        modal.style.display = 'block';


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

            // Bắn thêm giữa màn hình
            confetti({
                particleCount: 50,
                startVelocity: 30,
                spread: 360,
                origin: { x: 0.5, y: 0.3 }
            });
            // Dừng sau 5 giây
            if (Date.now() > animationEnd) {
                clearInterval(interval);
            }
        }, 250); // mỗi 250ms bắn 1 lần
    });
});

noBtn.addEventListener('click', function () {
    noBtn.style.backgroundColor = '#8B1302';
    noBtn.style.color = 'white';

    yesBtn.disabled = true;
    other.disabled = true;
    yesBtn.style.opacity = 0.5;
    other.style.opacity = 0.5;
    yesBtn.style.cursor = 'not-allowed';
    other.style.cursor = 'not-allowed';
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
