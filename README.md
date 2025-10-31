Form-validation

La funzione che controlla se il form è valido prima di inviarlo è validateAllFields().
Questa funzione valida tutti i campi usando validateField() per ogni input. Utilizza Promise.all() per attendere i risultati di tutte le validazioni, poi controlla con .every() se tutti i risultati sono true.
Infine, verifica se il checkbox “terms” è selezionato: se non lo è, mostra un errore e restituisce false.
La funzione restituisce false se qualcosa non è valido e true se tutto è corretto.

Questa funzione è chiamata nella saveRegistration() all’inizio:

const isValid = await validateAllFields();

if (!isValid) {
  console.log("Validation failed");
  showToast("Please fill out the form correctly", "error");
  btn.disabled = false;
  btn.innerHTML = originalText;
  return; // 👈 Blocca l’invio del form
}

Se qualcosa non è valido, il form non viene inviato e viene mostrato un messaggio di errore.

Il form raccoglie i dati dell’utente, li controlla e li salva. La validazione avviene in tempo reale mentre si digita e l’invio viene bloccato in caso di errore.

I 3 FILE

index.html: forma la struttura e i campi del form.

main.js: controlla i dati e gestisce l’invio.

style.css: gestisce colori, animazioni e design responsivo.

COME FUNZIONA

Controlli Password: verifica lunghezza, presenza di maiuscola, numero e simbolo. Mostra ✓ verde o ✗ rossa mentre si digita.

Validazione Campi: ogni campo ha regole diverse (nome = solo lettere, email = deve contenere “@”, ecc.). Se corretto → verde, se sbagliato → rosso.

Validare Tutto: quando si clicca “Sign Up”, vengono controllati tutti i campi. Se uno è errato, l’invio viene bloccato.

Salvare: se tutto è corretto, i dati vengono salvati nel browser tramite localStorage.

Inviare: i dati vengono spediti a un server remoto.

Risposta: viene mostrato un messaggio di successo o di errore.

REGOLE DI VALIDAZIONE

Nome/Cognome: minimo 2 caratteri, solo lettere.

Email: deve contenere “@” e “.”.

Età: compresa tra 18 e 120.

CAP: esattamente 5 numeri.

Username: minimo 3 caratteri, lettere, numeri o trattini.

Password: minimo 8 caratteri, deve contenere una maiuscola, un numero e un simbolo.

Conferma Password: deve essere identica alla password.

Termini: deve essere spuntato.

🔄 FLUSSO

Utente scrive → validazione in tempo reale (✗ o ✓)
↓
Clicca “Sign Up” → controllo di tutti i campi
↓
Se errore → mostra errore e STOP
↓
Se tutto è ok → salva localmente + invia al server + mostra messaggio di successo

DESIGN

Bootstrap: utilizzato per garantire un design responsive e uno stile moderno.

CSS personalizzato: ottimizzato per tutti i dispositivi con approccio mobile-first, curando l’esperienza utente su smartphone e tablet.

MATERIALI PER LO STUDIO DELL’ESPERIENZA UTENTE

DesignLab – Form UI Design Best Practices

Medium – Email Validation with JavaScript Regex

UI Bakery – Regex Library for Passwords

RISORSE

MDN Web Docs – HTML: riferimento completo per tutti i tag HTML usati (es. <form>, <input>, <label>).

MDN Web Docs – CSS: riferimento per le proprietà CSS usate nel file style.css (es. linear-gradient, @keyframes).

MDN Web Docs – JavaScript: riferimento per le funzioni e proprietà JavaScript (es. addEventListener, classList, localStorage, RegExp.test()).

MDN Web Docs – Fetch API: guida all’uso della funzione fetch() per le richieste HTTP (sendToAPI), con dettagli su method: 'POST' e headers.

MDN Web Docs – Local Storage: documentazione su localStorage e i metodi setItem() e getItem() usati per salvare i dati di registrazione e la risposta API.

dummyjson.com: documentazione sull’API di test utilizzata per l’endpoint di aggiunta utenti (/users/add).

APPROFONDIMENTI TECNICI

Validazione con Regex: tutorial e riferimenti sulle espressioni regolari in JavaScript, utili per comprendere la validazione di firstName, postalCode, username e password.

Input Type e Attributi: riferimenti sugli attributi HTML come required, min, max e maxlength, usati negli elementi <input>.

Promises e async/await: guida sull’uso delle Promises e delle parole chiave async/await in JavaScript, fondamentali per la gestione ordinata delle operazioni asincrone (validateAllFields, sendToAPI, saveRegistration).

Ho umanizzato il form inserendo nomi e cognomi “campione”, rendendolo meno freddo e migliorando l’esperienza utente. Questo approccio segue le best practice di UX/UI, rendendo la compilazione più piacevole e intuitiva per l’utente finale.

