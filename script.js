/* =========================
   ELEMENTI DELLA PAGINA
========================= */
const screens = [...document.querySelectorAll('.screen')];

/* =========================
   DOMANDE DEL QUIZ
========================= */
const questions = [
  {
    icon: '🥞',
    text: 'Qual è la tua colazione ideale?',
    answers: [
      ['A', 'Pancake colorati con glitter edibili e sciroppo di stelle.'],
      ['B', 'Una macedonia di frutta fresca e molto colorata.'],
      ['C', 'Caffè e un cornetto veloce mentre controlli le email.']
    ]
  },
  {
    icon: '🌈',
    text: 'Come reagisci quando vedi un arcobaleno?',
    answers: [
      ['A', 'Corro fuori a cercarne l’inizio per scivolarci sopra!'],
      ['B', 'Mi fermo a scattare una foto: è sempre uno spettacolo magico.'],
      ['C', 'Lo guardo un secondo e penso: “Ah, rifrazione della luce”.']
    ]
  },
  {
    icon: '👗',
    text: 'Il tuo stile di abbigliamento è solitamente…',
    answers: [
      ['A', 'Paillettes, colori pastello e magari un cerchietto con un corno.'],
      ['B', 'Accessori colorati e originali che spiccano.'],
      ['C', 'Sobrio, pratico e preferibilmente dai colori neutri.']
    ]
  },
  {
    icon: '✨',
    text: 'Se potessi avere un superpotere, quale sceglieresti?',
    answers: [
      ['A', 'Trasformare tutto ciò che tocco in zucchero filato o cristalli.'],
      ['B', 'Guarire le persone con un tocco e portare la felicità.'],
      ['C', 'La telepatia o il volo, per pura efficienza.']
    ]
  },
  {
    icon: '💖',
    text: 'Cosa fai se un amico è triste?',
    answers: [
      ['A', 'Organizzo una festa a sorpresa con coriandoli e musica a palla.'],
      ['B', 'Lo ascolto e cerco di portargli un po’ di ottimismo e calore.'],
      ['C', 'Gli offro un consiglio pratico per risolvere il problema.']
    ]
  }
];

/* =========================
   RISULTATI
========================= */
const results = {
  A: {
    icon: '🦄',
    title: 'Unicorno puro al 100%!',
    text: 'Vivi in un mondo di magia, glitter e sogni. La realtà per te è solo una tela bianca da colorare con i colori dell’arcobaleno. Probabilmente hai del sangue magico nelle vene!'
  },
  B: {
    icon: '🌈',
    title: 'Unicorno nell’anima',
    text: 'Sei una persona solare, gentile e vedi il lato positivo in ogni cosa. Magari non hai un corno visibile, ma la tua energia è puramente leggendaria.'
  },
  C: {
    icon: '😎',
    title: 'Unicorno in incognito',
    text: 'Sei una persona pragmatica e con i piedi per terra. Forse gli unicorni ti sembrano un po’ troppo caotici, ma chissà… magari sotto quella giacca seria nascondi dei calzini con le nuvolette!'
  }
};

/* =========================
   STATO DEL QUIZ
========================= */
let current = 0;
let scores = {
  A: 0,
  B: 0,
  C: 0
};

/* =========================
   NAVIGAZIONE SCHERMATE
========================= */
function show(id) {
  screens.forEach((screen) => {
    screen.classList.toggle('active', screen.id === id);
  });

  window.scrollTo({
    top: 0,
    behavior: 'smooth'
  });
}

/* =========================
   EFFETTO GLITTER
========================= */
function glitter(amount = 24) {
  const layer = document.getElementById('sparkles');
  const symbols = ['✨', '⭐', '💖', '🌟', '💫'];

  for (let index = 0; index < amount; index += 1) {
    const sparkle = document.createElement('span');

    sparkle.className = 'sparkle';
    sparkle.textContent = symbols[Math.floor(Math.random() * symbols.length)];
    sparkle.style.left = `${Math.random() * 100}%`;
    sparkle.style.fontSize = `${14 + Math.random() * 22}px`;
    sparkle.style.animationDuration = `${1.8 + Math.random() * 2.5}s`;
    sparkle.style.animationDelay = `${Math.random() * 0.25}s`;

    layer.appendChild(sparkle);
    setTimeout(() => sparkle.remove(), 5000);
  }
}

/* =========================
   CREAZIONE DOMANDA
========================= */
function render() {
  const currentQuestion = questions[current];

  questionIcon.textContent = currentQuestion.icon;
  question.textContent = currentQuestion.text;
  counter.textContent = `Domanda ${current + 1} di ${questions.length}`;
  progressBar.style.width = `${((current + 1) / questions.length) * 100}%`;
  answers.innerHTML = '';

  currentQuestion.answers.forEach(([letter, text]) => {
    const button = document.createElement('button');

    button.className = 'answer';
    button.innerHTML = `<b>${letter}</b>${text}`;
    button.addEventListener('click', () => choose(letter));

    answers.appendChild(button);
  });
}

/* =========================
   RISPOSTA E AVANZAMENTO
========================= */
function choose(letter) {
  scores[letter] += 1;
  glitter(18);

  if (current < questions.length - 1) {
    current += 1;
    setTimeout(render, 220);
    return;
  }

  show('loading');
  glitter(35);
  setTimeout(showResult, 2200);
}

/* =========================
   CALCOLO RISULTATO
========================= */
function showResult() {
  const winner = ['A', 'B', 'C'].reduce((best, letter) => {
    return scores[letter] > scores[best] ? letter : best;
  }, 'A');

  const result = results[winner];

  resultIcon.textContent = result.icon;
  resultTitle.textContent = result.title;
  resultText.textContent = result.text;

  show('result');
  glitter(44);
}

/* =========================
   PULSANTI
========================= */
start.addEventListener('click', () => {
  current = 0;
  scores = { A: 0, B: 0, C: 0 };

  render();
  show('quiz');
  glitter(24);
});

openCard.addEventListener('click', () => {
  show('final');
  glitter(70);
});

printCardButton.addEventListener('click', () => {
  window.print();
});

restart.addEventListener('click', () => {
  current = 0;
  scores = { A: 0, B: 0, C: 0 };
  show('welcome');
});

/* Glitter leggero durante la navigazione */
setInterval(() => {
  if (document.visibilityState === 'visible') {
    glitter(4);
  }
}, 3000);
