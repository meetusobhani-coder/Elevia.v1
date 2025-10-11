document.addEventListener('DOMContentLoaded', () => {
  const calculateBtn = document.getElementById('calculateBtn');
  const resetBtn = document.getElementById('resetBtn');
  const resultContainer = document.getElementById('resultContainer');

  function escapeHtml(s){ return String(s).replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/>/g,'&gt;'); }

  calculateBtn.addEventListener('click', () => {
    // read values
    const intention = document.getElementById('intention').value;
    const timingVal = document.getElementById('timing').value;
    const actionVal = document.getElementById('action').value;
    const clarityVal = document.getElementById('clarity').value;
    const patienceVal = document.getElementById('patience').value;
    const energyVal = document.getElementById('energy').value;

    // validation: require every field selected
    if (!intention || !timingVal || !actionVal || !clarityVal || !patienceVal || !energyVal) {
      resultContainer.style.display = 'block';
      resultContainer.innerHTML = '<p style="color:#b00020;margin:0;">Please select or enter all values before calculating ✨</p>';
      return;
    }

    // numeric parsing
    const timing = parseInt(timingVal, 10);
    const action = parseInt(actionVal, 10);
    const clarity = parseInt(clarityVal, 10);

    // patience mapping: low=1, medium=5, high=10
    const patienceScore = patienceVal === 'high' ? 10 : (patienceVal === 'medium' ? 5 : 1);

    // energy (phi): 0, 180, 360 -> convert to 0..1 factor
    const phi = parseInt(energyVal, 10);
    const phiFactor = (isNaN(phi) ? 0.5 : (phi / 360)); // default 0.5 if weird

    // Build factors (1..10 scale)
    const factors = {
      'Timing Readiness': timing,
      'Action Alignment': action,
      'Milestone Clarity': clarity,
      'Patience': patienceScore
    };

    // Determine lowest factor and list strong factors (>=8)
    const lowestKey = Object.keys(factors).reduce((a,b) => factors[a] < factors[b] ? a : b);
    const lowestValue = factors[lowestKey];

    const strongFactors = Object.keys(factors).filter(k => factors[k] >= 8);

    // Probability based mainly on lowest factor + phi influence
    // lowestValue in 1..10 -> convert to 10..100 by *10
    // weight: 70% lowest factor, 30% phi
    let probability = Math.round((lowestValue * 10) * 0.7 + (phiFactor * 30));
    probability = Math.max(0, Math.min(100, probability));

    // Personalized interpretation + strengths/weakness
    let interpretation = '';
    if (probability >= 90) {
      interpretation = `✨ You’re glowing with alignment. Your ${lowestKey.toLowerCase()} is solid — keep the steady practices and gratitude.`;
    } else if (probability >= 75) {
      interpretation = `🌟 Very strong alignment. Most areas are ready; your ${lowestKey.toLowerCase()} needs a gentle boost to flow fully.`;
    } else if (probability >= 60) {
      interpretation = `💫 Good progress. Your ${lowestKey.toLowerCase()} could use attention — try one small, consistent step each day.`;
    } else if (probability >= 45) {
      interpretation = `🌱 The seeds are planted. Your ${lowestKey.toLowerCase()} is holding things back; simplify and act steadily.`;
    } else if (probability >= 25) {
      interpretation = `🌤 Readiness is low to moderate. ${lowestKey} looks tired — rest and reconnect, then move with clarity.`;
    } else {
      interpretation = `🌙 Quiet time — your ${lowestKey.toLowerCase()} is low. Rebuild from clarity, care, and small consistent steps.`;
    }

    // Build strengths string
    const strengthsText = strongFactors.length ? `<p><strong>Strengths:</strong> ${strongFactors.join(', ')}</p>` : '';

    // Render result
    resultContainer.style.display = 'block';
    resultContainer.innerHTML = `
      <div class="result-card">
        <h3>✨ Manifestation Probability: ${probability}%</h3>
        <p><strong>Intention:</strong> ${escapeHtml(intention)}</p>
        <p><strong>Lowest factor:</strong> ${escapeHtml(lowestKey)} (${escapeHtml(String(lowestValue))}/10)</p>
        ${strengthsText}
        <p style="margin-top:8px;">${escapeHtml(interpretation)}</p>
      </div>
    `;
  });

  resetBtn.addEventListener('click', () => {
    // reset form controls
    ['intention','timing','action','clarity','patience','energy'].forEach(id => {
      const el = document.getElementById(id);
      if (el) el.value = '';
    });
    resultContainer.style.display = 'none';
    resultContainer.innerHTML = '';
  });
});
