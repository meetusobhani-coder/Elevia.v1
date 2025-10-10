const home = document.getElementById('home');
const calculator = document.getElementById('calculator');
const startBtn = document.getElementById('startBtn');
const backBtn = document.getElementById('backBtn');
const calculateBtn = document.getElementById('calculateBtn');
const resultDiv = document.getElementById('result');

const intention = document.getElementById('intention');
const emotion = document.getElementById('emotion');
const phi = document.getElementById('phi');
const focus = document.getElementById('focus');
const action = document.getElementById('action');
const belief = document.getElementById('belief');

const cards = document.querySelectorAll('.card');
const cardDesc = document.getElementById('card-desc');

const probabilityBar = document.getElementById('probability-bar');
const probabilityText = document.getElementById('probability-text');

// Page navigation
startBtn.addEventListener('click', () => {
    home.classList.add('hidden');
    calculator.classList.remove('hidden');
});
backBtn.addEventListener('click', () => {
    calculator.classList.add('hidden');
    home.classList.remove('hidden');
    resultDiv.innerHTML = '';
    probabilityBar.style.width = '0%';
    probabilityText.textContent = 'Your manifestation alignment will appear here as you select options!';
});

// Cards hover
cards.forEach(card => {
    card.addEventListener('mouseover', () => cardDesc.textContent = card.dataset.desc);
    card.addEventListener('mouseout', () => cardDesc.textContent = "Hover over a card to see its meaning!");
    card.addEventListener('click', () => alert(card.dataset.desc));
});

// Probability bar
function updateProbabilityBar() {
    const scores = [parseInt(intention.value),parseInt(emotion.value),parseInt(phi.value),
        parseInt(focus.value),parseInt(action.value),parseInt(belief.value)];
    const weights = [2,3,2,3,4,5];
    let score = scores.reduce((acc,val,idx)=>acc+val*weights[idx],0);
    let maxScore = 66;
    let percentage = Math.round((score/maxScore)*100);

    probabilityBar.style.width = `${percentage}%`;
    if(percentage>=80) probabilityBar.style.background='linear-gradient(90deg,#2ecc71,#27ae60)';
    else if(percentage>=50) probabilityBar.style.background='linear-gradient(90deg,#f1c40f,#f39c12)';
    else probabilityBar.style.background='linear-gradient(90deg,#e74c3c,#c0392b)';

    probabilityText.textContent = `Manifestation Alignment: ${percentage}%`;
}

[intention,emotion,phi,focus,action,belief].forEach(el => el.addEventListener('change', updateProbabilityBar));

// Calculate
calculateBtn.addEventListener('click', () => {
    const scores = [parseInt(intention.value),parseInt(emotion.value),parseInt(phi.value),
        parseInt(focus.value),parseInt(action.value),parseInt(belief.value)];
    const weights = [2,3,2,3,4,5];
    let score = scores.reduce((acc,val,idx)=>acc+val*weights[idx],0);

    let interpretation='', color='';
    if(score>=60){ interpretation='High probability! The universe is aligned with your intention.'; color='#2ecc71'; }
    else if(score>=40){ interpretation='Moderate probability. Stay positive and consistent.'; color='#f1c40f'; }
    else{ interpretation='Low probability. Focus on mindset, belief, and taking action.'; color='#e74c3c'; }

    resultDiv.style.backgroundColor = color;
    resultDiv.style.color = '#fff';
    resultDiv.style.padding = '12px';
    resultDiv.style.borderRadius = '12px';
    resultDiv.innerHTML = `Your Manifestation Score: ${score} <br> ${interpretation}`;
});

// Service worker
if('serviceWorker' in navigator){
    navigator.serviceWorker.register('service-worker.js')
    .then(()=>console.log('Service Worker Registered'))
    .catch(err=>console.log('Service Worker Failed',err));
}
