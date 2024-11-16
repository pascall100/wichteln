// Event listener für den Button "Mischen"
document.getElementById('shuffleButton').addEventListener('click', generatePairs);

// Event listener für den Button "Löschen"
document.getElementById('clearButton').addEventListener('click', clearPairs);

// Event listener für den Impressum-Button
document.getElementById('impressumButton').addEventListener('click', toggleImpressum);

// Funktion, um Wichtelpaare zu erstellen
function generatePairs() {
    const input = document.getElementById('namesInput').value.trim();
    if (!input) {
        alert('Bitte trage die Namen der Wichtel ein.');
        return;
    }

    const names = input.split(',').map(name => name.trim()).filter(name => name);
    if (names.length < 2) {
        alert('Es müssen mindestens zwei Wichtel eingegeben werden.');
        return;
    }

    // Shuffle Namen (Fisher-Yates-Algorithmus)
    let shuffled = [...names];
    for (let i = shuffled.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
    }

    // Paare erstellen
    const pairs = [];
    for (let i = 0; i < shuffled.length; i++) {
        const wichtel = shuffled[i];
        const beschenkter = shuffled[(i + 1) % shuffled.length];
        pairs.push(`${wichtel} wichtelt für ${beschenkter}`);
    }

    // Paare anzeigen
    const pairsList = document.getElementById('pairsList');
    pairsList.innerHTML = ''; // Alte Paare löschen
    pairs.forEach(pair => {
        const li = document.createElement('li');
        li.textContent = pair;
        pairsList.appendChild(li);
    });
}

// Funktion, um Paare zu löschen
function clearPairs() {
    const pairsList = document.getElementById('pairsList');
    pairsList.innerHTML = ''; // Liste leeren
}

// Funktion, um das Impressum ein- und auszublenden
function toggleImpressum() {
    const impressumContent = document.getElementById('impressumContent');
    if (impressumContent.classList.contains('hidden')) {
        impressumContent.classList.remove('hidden');
        impressumContent.style.display = 'block';
    } else {
        impressumContent.classList.add('hidden');
        impressumContent.style.display = 'none';
    }
}
