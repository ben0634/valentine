const envelopeWrapper = document.getElementById('envelopeWrapper');
const envelope = document.getElementById('envelope');
const noBtn = document.getElementById('noBtn');
const yesBtn = document.getElementById('yesBtn');
const initialCard = document.getElementById('initialCard');
const successCard = document.getElementById('successCard');

let noClicked = false;
let noAttempts = 0;

// Handle envelope click - open and reveal card
envelope.addEventListener('click', () => {
  // Open envelope
  envelope.classList.add('open');

  // Hide envelope and show card
  setTimeout(() => {
    envelopeWrapper.classList.add('hide');
    initialCard.classList.add('show');
    document.body.classList.add('card-open');
  }, 800);
});

// Make No button move away when mouse gets near it
noBtn.addEventListener('mouseenter', () => {
  if (noAttempts >= 10) return;
  if (!noClicked) {
    noClicked = true;
    noBtn.style.position = 'fixed';
  }
  moveNoButton();
  noAttempts++;
  if (noAttempts === 10) {
    setTimeout(() => {
      noBtn.textContent = ':(';
      noBtn.style.opacity = '1';
      noBtn.style.transform = 'scale(1)';
      noBtn.style.pointerEvents = 'auto';
    }, 300);
  }
});

function moveNoButton() {
  const card = document.querySelector('.card');
  const cardRect = card.getBoundingClientRect();
  
  // Calculate random position across the entire card area with much larger range
  const maxX = cardRect.width - noBtn.offsetWidth - 40;
  const maxY = cardRect.height - noBtn.offsetHeight - 40;
  const randomX = Math.random() * maxX;
  const randomY = Math.random() * maxY;
  
  noBtn.style.left = `${randomX}px`;
  noBtn.style.top = `${randomY}px`;
}

// Handle Yes button - transition to success state
yesBtn.addEventListener('click', () => {
  // Fade out initial card
  initialCard.classList.remove('show');
  initialCard.classList.add('fade-out');
  // Show success card after fade out
  setTimeout(() => {
    initialCard.style.display = 'none';
    successCard.classList.add('active');
  }, 500);
});

// Add shake animation to CSS
const style = document.createElement('style');
style.textContent = `
  @keyframes shake {
    0%, 100% { transform: translateX(0); }
    25% { transform: translateX(-5px); }
    75% { transform: translateX(5px); }
  }
`;
document.head.appendChild(style);

// Add sad screen element if not present
let sadScreen = document.getElementById('sadScreen');
if (!sadScreen) {
  sadScreen = document.createElement('div');
  sadScreen.id = 'sadScreen';
  sadScreen.style.display = 'none';
  sadScreen.style.position = 'fixed';
  sadScreen.style.top = '0';
  sadScreen.style.left = '0';
  sadScreen.style.width = '100vw';
  sadScreen.style.height = '100vh';
  sadScreen.style.background = "#fff5f7";
  sadScreen.style.zIndex = '1000';
  sadScreen.style.display = 'flex';
  sadScreen.style.flexDirection = 'column';
  sadScreen.style.justifyContent = 'center';
  sadScreen.style.alignItems = 'center';
  sadScreen.innerHTML = '<h1 style="color:#d4738c;font-family: Cormorant Garamond,serif;font-size:2.5rem;margin-bottom:1rem;">:(</h1>' +
    '<img src="images/sad.png" alt="Sad" style="max-width:320px;width:80vw;border-radius:18px;box-shadow:0 8px 32px #d4738c22;margin-top:1rem;">';
  document.body.appendChild(sadScreen);
}

// Remove any existing sad screen on load
window.addEventListener('DOMContentLoaded', () => {
  const existingSad = document.getElementById('sadScreen');
  if (existingSad) existingSad.remove();
});

noBtn.addEventListener('click', () => {
  if (noAttempts >= 10) {
    // Create sad screen only now
    let sadScreen = document.getElementById('sadScreen');
    if (!sadScreen) {
      sadScreen = document.createElement('div');
      sadScreen.id = 'sadScreen';
      sadScreen.style.position = 'fixed';
      sadScreen.style.top = '0';
      sadScreen.style.left = '0';
      sadScreen.style.width = '100vw';
      sadScreen.style.height = '100vh';
      sadScreen.style.background = "#fff5f7";
      sadScreen.style.zIndex = '1000';
      sadScreen.style.display = 'flex';
      sadScreen.style.flexDirection = 'column';
      sadScreen.style.justifyContent = 'center';
      sadScreen.style.alignItems = 'center';
      sadScreen.innerHTML = '<h1 style="color:#d4738c;font-family: Cormorant Garamond,serif;font-size:2.5rem;margin-bottom:1rem;">:(</h1>' +
        '<img src="images/sad.png" alt="Sad" style="max-width:320px;width:80vw;border-radius:18px;box-shadow:0 8px 32px #d4738c22;margin-top:1rem;">';
      document.body.appendChild(sadScreen);
    } else {
      sadScreen.style.display = 'flex';
    }
    // Hide all main content
    document.querySelector('.container').style.display = 'none';
  }
});
