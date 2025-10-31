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
