// ================= Manifestation Calculator Logic ===================
const calculateBtn = document.getElementById('calculateBtn');
const resetBtn = document.getElementById('resetBtn');
const resultDiv = document.getElementById('result');
const popup = document.getElementById('popup');
const popupClose = document.getElementById('popupClose');

function getDropdownValue(id){
  const val = document.getElementById(id).value;
  return val === "" ? null : val;
}

if (popupClose) popupClose.onclick = ()=>popup.style.display="none";

if (calculateBtn) {
  calculateBtn.onclick = ()=>{
    const intention = getDropdownValue('intention');
    const timing = parseInt(getDropdownValue('timing'));
    const action = parseInt(getDropdownValue('action'));
    const clarity = parseInt(getDropdownValue('clarity'));
    const patience = getDropdownValue('patience');
    const phi = parseInt(getDropdownValue('phi'));

    if(!intention || !timing || !action || !clarity || !patience || isNaN(phi)){
      alert("Please select all fields before calculating!");
      return;
    }

    const scores = [timing, action, clarity];
    const minScore = Math.min(...scores);
    const sumScore = timing + action + clarity;
    const totalScore = Math.round((sumScore + phi/36 + (patience==="Low"?1:patience==="Medium"?5:10))/5);

    let interpretation = `✨ Your readiness to manifest “${intention}” is ${totalScore}/10.\n`;
    interpretation += totalScore > 6 
      ? "You're on a strong path—stay consistent and trust the process!" 
      : "You're building momentum—focus more on key areas for better alignment.\n";
    interpretation += `🎯 Key area to nurture: ${minScore===timing?"Timing Readiness":minScore===action?"Action Alignment":"Milestone Clarity"}`;

    resultDiv.style.display="block";
    resultDiv.textContent=interpretation;

    popup.style.display="block";
  }
}

if (resetBtn) {
  resetBtn.onclick=()=>{
    document.getElementById('manifestationForm').reset();
    resultDiv.style.display="none";
    popup.style.display="none";
  }
}

// ================= Auth Modal Logic ===================
const authModal = document.getElementById('authModal');
const closeAuth = document.getElementById('closeAuth');
const toggleAuth = document.getElementById('toggleAuth');
const authTitle = document.getElementById('authTitle');
const authForm = document.getElementById('authForm');
const mainContent = document.getElementById('mainContent');
let isSignIn = true;

if (toggleAuth) {
  toggleAuth.addEventListener('click', (e) => {
    e.preventDefault();
    isSignIn = !isSignIn;
    authTitle.textContent = isSignIn ? 'Sign In' : 'Sign Up';
    toggleAuth.textContent = isSignIn ? 'Sign Up' : 'Sign In';
    authForm.querySelector('button').textContent = isSignIn ? 'Sign In' : 'Sign Up';
  });
}

if (closeAuth) {
  closeAuth.addEventListener('click', () => {
    alert("You need to Sign In or Sign Up to use the calculator.");
  });
}

if (authForm) {
  authForm.addEventListener('submit', (e) => {
    e.preventDefault();
    authModal.style.display = 'none';
    mainContent.style.filter = 'none';
    mainContent.style.pointerEvents = 'auto';
    alert(isSignIn ? 'Signed In Successfully!' : 'Account Created Successfully!');
  });
}
