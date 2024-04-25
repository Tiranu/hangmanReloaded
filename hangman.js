let woerter = ['Programmieren', 'Javascript', 'Hangman', 'Spiel'];
//Auswahl eines zufälligen Wortes
let btnEingabe = document.getElementById("btnEingabe")
btnEingabe.addEventListener("click", raten)
let tfEingabe = document.getElementById("eingabe")
let lblErgebnis = document.getElementById("ergebnis")
let lblVersuche = document.getElementById("versuche")
let lblGalgen0 = document.getElementById("galgen0")
let lblGalgen1 = document.getElementById("galgen1")
let lblGalgen2 = document.getElementById("galgen2")
let lblGalgen3 = document.getElementById("galgen3")
let lblGalgen4 = document.getElementById("galgen4")
let lblGalgen5 = document.getElementById("galgen5")
let lblGalgen6 = document.getElementById("galgen6")


let anzahlVersuche = 6
let wort = ""
let versucheVerbleibend = anzahlVersuche
let benutzteBuchstaben = []
let wortArray = []
let aktuellerStand = ""

spielStart()
//Beginn Spiellogik

function spielStart() {
    wort = wortAuswaehlen()
    wortArray = wort.split("") // Das Wort wird in ein Array von Buchstaben umgewandelt
    aktuellerStand = "" // beinhaltet später den aktuellen Stand des Wortes z.B. "_ p f _ _ "
    //Die Schleife wird einmal für jeden Buchstaben im Wort ausgeführt und fügt
    //dabei jeweils einen Unterstrich zu aktuellerStand hinzu
    // Ergebnis: "_ _ _ _ _ " für das Wort "Apfel"
    for (let i = 0; i < wortArray.length; i++) {
        aktuellerStand += "_ "
    }
    //console.log(aktuellerStand)
    benutzteBuchstaben = [] //Liste aller bisher geratenen Buchstaben
    versucheVerbleibend = anzahlVersuche //versucheVerbleibend enthält die übrigen Versuche.
    guiAktualisieren(aktuellerStand, versucheVerbleibend) //Werte werden auf das HTML Dokument übertragen.
}

function wortAuswaehlen() {
    //Der Befehl prompt öffnet ein Eingabefenster, in dem der Benutzer ein Wort eingeben kann
    wort = prompt("Bitte das zu ratende Wort eingeben oder leer lassen für zufälliges Wort")
    // Wenn das eingebene Wort leer ist, wird ein zufälliges Wort aus der Liste gewählt
    console.log(wort)
    if (wort === null || wort === "") {
        wort = woerter[Math.floor(Math.random() * woerter.length)]
    }
    wort = wort.toLowerCase(); // Alle Buchstaben in Kleinbuchstaben umwandeln
    return wort
}

function raten() {
    // liest den geratenen Buchstaben aus dem Textfeld tfEingabe aus
    let geratenerBuchstabe = tfEingabe.value
    tfEingabe.value = "" // Textfeld wird geleert -> Inhalt wird auf einen leeren String gesetzt

    //Die Funktion auswertungRateversuch() wird aufgerufen mit dem zu prüfenden Buchstaben
    // aufgerufen und prüft, ob die Eingabe gültig ist. Falls ja erfolgt die Auswertung der Eingabe
    auswertungRateversuch(geratenerBuchstabe)
}

function auswertungRateversuch(geratenerBuchstabe) {
    if (geratenerBuchstabe.length === 0) { //Wenn kein Buchstabe eingegeben wurde
        alert("Bitte gib einen Buchstaben ein.")
    }else if (geratenerBuchstabe.length > 1) { //Wenn mehr als ein Buchstabe eingegeben wurde
            alert("Bitte gib nur einen Buchstaben ein.")
        } else {
            geratenerBuchstabe = geratenerBuchstabe.toLowerCase(); //Buchstabe in Kleinbuchstaben umwandeln
            benutzteBuchstaben.push(geratenerBuchstabe) //Buchstabe wird der Liste der geratenen Buchstaben hinzugefügt
            if (wortArray.includes(geratenerBuchstabe)) {

                // Wenn der geratene Buchstabe im Wort enthalten ist, dann muss die Anzeige aktualisiert werden
                // dafür wird die Funktion auswertungsTextAktualisieren() aufgerufen
                // falls nicht, dann werden lediglich die verbleibenden Versuche um 1 reduziert
                aktuellerStand = auswertungsTextAktualisieren()
            }else{
                versucheVerbleibend--

                // Prüfung, ob das Spiel verloren wurde -> verbleibende Versuche sind 0
                if (versucheVerbleibend === 0) {
                    alert("Leider verloren! Das Wort war " + wort + "!");
                }
            }
    guiAktualisieren(aktuellerStand, versucheVerbleibend) //HTML-Seite wird mit den neuen Werten aktualisiert
    }
}

function auswertungsTextAktualisieren() {
    let text = ""
    // Die Schleife wird einmal für jeden Buchstaben im Wort ausgeführt
    for (let i = 0; i < wortArray.length; i++) {
        // Wenn der aktuelleBuchstabe des Wortes bereits geraten wurde( also in geratenen Buch, wird er zu text hinzugefügt,
        // falls nicht wird ein Unterstrich hinzugefügt
        if (benutzteBuchstaben.includes(wortArray[i])) {
            text += wortArray[i]
        } else {
            text += "_ "
        }
    }
    return text //Rückgabe des Textes z.B. "_ p f _ _ " wenn p und f des Wortes Apfel bereits korrekt geraten wurden
}

function guiAktualisieren(ergebnis, versuche) {
    lblErgebnis.innerText = "Aktueller Stand: " + ergebnis
    lblVersuche.innerText = "Es verbleiben " + versuche + " Versuche"
    galgenAktualisieren(versuche)
}


function galgenAktualisieren(versuche) {
    /* Version mit if-else -> Switch ist aber übersichtlicher
    if (versuche === 6) {
        lblGalgen6.style.visibility = "visible"
    }else if (versuche === 5) {
        lblGalgen5.style.visibility = "visible"
        lblGalgen6.style.visibility = "hidden"
    } else if (versuche === 4) {
        lblGalgen4.style.visibility = "visible"
        lblGalgen5.style.visibility = "hidden"
    }
    */

    switch (versuche) {
        case 5:
            lblGalgen6.innerHTML = lblGalgen5.innerHTML
            break;
        case 4:
            lblGalgen6.innerHTML = lblGalgen4.innerHTML
            break;
        case 3:
            lblGalgen6.innerHTML = lblGalgen3.innerHTML
            break;
        case 2:
            lblGalgen6.innerHTML = lblGalgen2.innerHTML
            break;
        case 1:
            lblGalgen6.innerHTML = lblGalgen1.innerHTML
            break;
        case 0:
            lblGalgen6.innerHTML = lblGalgen0.innerHTML
            break;
        default:
            break;

    }
}




// Wörter einlesen
//Logik zum Einlesen der Wörter aus einer Datei und der Auswahl eines zufälligen Wortes daraus
/*
async function readWordsFromFile() {
    const response = await fetch('wortliste.txt');
    const text = await response.text();
    const words = text.split('\n');
    console.log(words);
    return words
}



let vieleWoerter
readWordsFromFile().then(rückgabe => {
    vieleWoerter = rückgabe
    wort = vieleWoerter[Math.floor(Math.random() * vieleWoerter.length)];
    console.log(wort)
})
console.log(vieleWoerter)
*/
