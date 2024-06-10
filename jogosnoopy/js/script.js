const snoopy = document.querySelector('.snoopy');
const casa = document.querySelector('.casa');
const pont = document.querySelector('.pontos');

const jump = () => {
    snoopy.classList.add('jump');
    setTimeout(() => {
        snoopy.classList.remove('jump');
    }, 500);
}

const updateValue = () => {
    pont.innerHTML = cont.toString().padStart(3, '0'); // Formata a pontuação para sempre mostrar 3 dígitos
};

let cont = 0;
let casaPassou = false; 

const loop = setInterval(() => {    
    const casaPosition = casa.offsetLeft;
    const snoopyPosition = +window.getComputedStyle(snoopy).bottom.replace('px', '');
    
    
    if (casaPosition <= 113 && casaPosition > 0 && snoopyPosition < 60) {
        // Colisão detectada, jogo termina
        casa.style.animation = 'none';
        casa.style.left = `${casaPosition}px`;

        snoopy.style.animation = 'none';
        snoopy.style.bottom = `${snoopyPosition}px`;

        snoopy.src = './img/game-over2.png';
        snoopy.style.width = '75px';
        snoopy.style.margin = '5px';

        clearInterval(loop);
        
    } else if (casaPosition < 0 && !casaPassou) {
        // Snoopy passou pela casa sem colidir
        cont++;
        updateValue();
        casaPassou = true;

        // Reseta a posição da casa para recomeçar
        casa.style.animation = 'none';

        // Força o reflow para garantir que a animação reinicie
        casa.offsetHeight; // Gatilho de reflow

        // Reativa a animação após um curto intervalo
        setTimeout(() => {
            casa.style.animation = 'casa-animation 2s infinite linear';
            casaPassou = false;
        }, 20);
    }
}, 10);

document.addEventListener('keydown', jump);
