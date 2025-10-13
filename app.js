const calculateBtn = document.getElementById('calculateBtn');
const resetBtn = document.getElementById('resetBtn');
const resultDiv = document.getElementById('result');
const popup = document.getElementById('popup');
const popupClose = document.getElementById('popupClose');

function getDropdownValue(id){
  const val = document.getElementById(id).value;
  return val === "" ? null : val;
}

function showPopup(){
  popup.style.display="block";
}
popupClose.onclick = ()=>popup.style.display="none";

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

  let interpretation = `Your Manifestation Score: ${totalScore}/10\n`;

  interpretation += `Positive: ${totalScore>6 ? "Good progress!" : "Needs improvement."}\n`;
  interpretation += `Focus on: ${minScore===timing?"Timing Readiness":minScore===action?"Action Alignment":"Milestone Clarity"}`;

  resultDiv.style.display="block";
  resultDiv.textContent=interpretation;

  popup.style.display="block";
}

resetBtn.onclick=()=>{
  document.getElementById('manifestationForm').reset();
  resultDiv.style.display="none";
  popup.style.display="none";
}
