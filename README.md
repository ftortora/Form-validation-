# Form-validation-
La funzione che controlla se il form è valido prima di inviarlo è validateAllFields().
Valida tutti i campi usando validateField() per ogni input
Usa Promise.all() per aspettare i risultati di tutte le validazioni
Controlla con .every() se TUTTI i risultati sono true
Controlla il checkbox "terms" - se non è spuntato, mostra errore e restituisce false
Restituisce false se qualcosa non è valido, true se tutto è corretto

Questa funzione è chiamata nella saveRegistration() all'inizio:
const isValid = await validateAllFields();

if (!isValid) {
  console.log("Validation failed");
  showToast("Please fill out the form correctly", "error");
  btn.disabled = false;
  btn.innerHTML = originalText;
  return;  // 👈 Blocca l'invio del form
}
Se qualcosa non è valido, il form NON viene inviato e mostra un messaggio di errore.

Un form che raccoglie dati utente, li controlla e li salva. Valida mentre digiti e blocca l'invio se c'è un errore.

📁 I 3 FILE
FileCosa faindex.htmlLa struttura e i campi del formmain.jsControlla i dati e gestisce l'inviostyle.cssColori, animazioni e responsive design

🔍 COME FUNZIONA
1. Controlli Password: Controlla lunghezza, maiuscola, numero, simboli. Mostra ✓ verde o X rossa mentre digiti.
2. Validazione Campi: Ogni campo ha regole diverse (nome = solo lettere, email = deve avere @, ecc.). Se corretto = verde, se sbagliato = rosso.
3. Validare Tutto: Quando clicchi "Sign Up", controlla TUTTI i campi. Se uno è sbagliato, blocca tutto.
4. Salvare: Se tutto è ok, salva i dati nel browser (localStorage).
5. Inviare: Spedisce i dati a un server remoto.
6. Risposta: Mostra un messaggio di successo o errore.

✅ REGOLE VALIDAZIONE

Nome/Cognome: Min 2 caratteri, solo lettere
Email: Deve contenere @ e .
Età: Tra 18 e 120
CAP: Esattamente 5 numeri
Username: Min 3 caratteri, lettere/numeri/trattini
Password: Min 8 caratteri, maiuscola, numero, simbolo
Conferma Password: Identica alla password
Termini: Deve essere spuntato


📊 FLUSSO
Utente scrive → Valida in tempo reale (X o ✓)
    ↓
Clicca "Sign Up" → Controlla TUTTI i campi
    ↓
Se errore → Mostra errore e STOP
    ↓
Se ok → Salva localmente + Invia a server + Mostra successo

🎨 DESIGN

Bootstrap: Responsive e stili pronti
CSS Personalizzato: Adattato a tutti i dispositivi
