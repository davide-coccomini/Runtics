// ES6 module syntax
import LocalizedStrings from 'react-native-localization';

// CommonJS syntax
// let LocalizedStrings  = require ('react-native-localization');

let Strings = new LocalizedStrings({
 en:{
    homeNewGame: "NEW GAME",
    homeHowToPlay: "HOW TO PLAY",
    homeScores: "SCORES",
    homeSettings: "SETTINGS",
    homeQuit: "QUIT", 
    tutorial1: "The game's goal is to find the best route in the grid made by numbers ordered in descending order ...",
    tutorial2: "In this case 10 -> 9 -> 7 -> 6 -> 5 -> 3 -> 1 is the best route findable. It is decreasing and all the numbers are adjacent to each other. Diagonal is not admitted ...",
    tutorial3: "The score is the sum of the numbers in the route, in this case the score is 41 ...",
    tutorial4: "If you press a number higher than the last pressed or not adjacent to it, a new route will be started.",
    tutorialButton: "LET'S PLAY",
    scoresTotal: "Total",
    scoresWin: "Win",
    scoresLost: "Lost",
    scoresAvg: "Average time",
    scoresBest: "Best time",
    settingsMusic: "Music",
    settingsButtonEnable: "ENABLE",
    settingsButtonDisable: "DISABLE",
    reportYour: "YOUR SCORE",
    reportBest: "TO WIN",
    reportTitleWin: "You win",
    reportTitleLose: "You lose",
    reportRoute: "A good route was",
    reportButtonPlay: "PLAY AGAIN",
    reportButtonBack: "BACK TO MENU"
 },
 it: {
    homeNewGame: "NUOVA PARTITA",
    homeHowToPlay: "COME GIOCARE",
    homeScores: "STATISTICHE",
    homeSettings: "IMPOSTAZIONI",
    homeQuit: "ESCI", 
    tutorial1: "Lo scopo del gioco è trovare il miglior percorso sulla griglia, fatto da numeri in ordine decrescente ...",
    tutorial2: "In questo caso 10 -> 9 -> 7 -> 6 -> 5 -> 3 -> 1 è il miglior percorso individuabile. E' decrescente e tutti i numeri sono adiacenti l'un l'altro. Le diagonali non sono ammesse ...",
    tutorial3: "Il punteggio è dato dalla somma dei numeri sul percorso scelto, in questo caso è 41 ...",
    tutorial4: "Se premi un numero maggiore dell'ultimo numero premuto oppure non adiacente ad esso, inizierà un nuovo percorso",
    tutorialButton: "GIOCA",
    scoresTotal: "Totali",
    scoresWin: "Vinte",
    scoresLost: "Perse",
    scoresAvg: "Tempo medio",
    scoresBest: "Miglior tempo",
    settingsMusic: "Musica",
    settingsButtonEnable: "ATTIVA",
    settingsButtonDisable: "DISATTIVA",
    reportYour: "PUNTEGGIO",
    reportBest: "PER VINCERE",
    reportTitleWin: "Hai vinto",
    reportTitleLose: "Hai perso",
    reportRoute: "Un buon percorso era",
    reportButtonPlay: "RIPROVA",
    reportButtonBack: "TORNA AL MENU"

 }
});

module.exports = Strings;