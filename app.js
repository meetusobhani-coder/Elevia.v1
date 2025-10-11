function calculateManifestation() {
    const intention = document.getElementById("intention").value;
    const timing = parseInt(document.getElementById("timing").value);
    const action = parseInt(document.getElementById("action").value);
    const clarity = parseInt(document.getElementById("clarity").value);
    const patience = document.getElementById("patience").value;
    const energy = parseInt(document.getElementById("energy").value);

    // Validation: ensure all values are selected
    if (!intention || !timing || !action || !clarity || !patience || isNaN(energy)) {
        alert("Please select all values before calculating!");
        return;
    }

    // Map patience to numeric value for calculation
    let patienceVal = 5; // default
    if (patience === "Low") patienceVal = 3;
    else if (patience === "Medium") patienceVal = 5;
    else if (patience === "High") patienceVal = 8;

    // Normalize energy to 10-point scale
    const normalizedEnergy = energy / 36 * 10;

    // Calculate probability as average of numeric factors
    const factors = [timing, action, clarity, patienceVal, normalizedEnergy];
    const probability = Math.round(factors.reduce((a,b) => a + b, 0)/factors.length);

    // Find lowest factor to personalize interpretation
    const lowestVal = Math.min(timing, action, clarity, patienceVal, normalizedEnergy);
    let lowestAspect = "";
    if (lowestVal === timing) lowestAspect = "Timing";
    else if (lowestVal === action) lowestAspect = "Action";
    else if (lowestVal === clarity) lowestAspect = "Clarity";
    else if (lowestVal === patienceVal) lowestAspect = "Patience";
    else lowestAspect = "Emotional Energy";

    // Personalized interpretation
    let interpretation = `Your manifestation readiness is around ${probability}/10.<br>`;
    interpretation += `Your strongest factors are supporting your goal, but <strong>${lowestAspect}</strong> could be improved for better results.<br>`;

    if (probability >= 8) interpretation += "🌟 Great! You are highly aligned to manifest this desire.";
    else if (probability >= 5) interpretation += "✨ Moderate alignment — a little focus and adjustment can help.";
    else interpretation += "⚠️ Low alignment — reflect and strengthen the lowest factor to increase your manifestation power.";

    document.getElementById("result").innerHTML = `<h3>Result</h3><p>${interpretation}</p>`;
}

function resetForm() {
    document.getElementById("manifestationForm").reset();
    document.getElementById("result").innerHTML = "";
}
