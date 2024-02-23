
import { QuizTest } from './quizTest.js';
import { FizzBuzzTest } from './fizzBuzzTest.js';
import { MemoryTest } from './memoryTest.js';
import { VisualTest } from './visualTest.js';
import { TestResult } from './testResults.js';

window.quizTest = new QuizTest('Quiz Test', 'Flervalsfrågor, tryck på det alternativ du tror är rätt.');
window.fizzBuzzTest = new FizzBuzzTest('FizzBuzz Test', 'Tryck på den knapp som du tror är näst i sekvensen');
window.memoryTest = new MemoryTest('Bildminne Test', 'När testet startar har du 5 sekunder på dig att memorera 9 bilder. Tryck sedan på knapparna i rätt ordning.');
window.visualTest = new VisualTest('Visuellt test', 'När testet startar har du 15 sekunder på dig att klicka på 10 objekt i den ordningen som är skriven.');
window.testResult = new TestResult('Testresultat', 'Nedan visas hur det gick på testet.');

window.totalPoints = 0;
window.counter = 0;

// Reset Function
window.reset = function () {
    this.currentTest.reset();
};

// Decide the order of the tests.
window.quizTest.next = window.fizzBuzzTest;
window.fizzBuzzTest.next = window.memoryTest;
window.fizzBuzzTest.next = window.memoryTest;
window.memoryTest.next = window.visualTest;
window.visualTest.next = window.testResult;

// Give access to window for the tests
window.quizTest.window = window;
window.fizzBuzzTest.window = window;
window.memoryTest.window = window;
window.visualTest.window = window;
window.testResult.window = window;

// Event listener for the start link/button
const startLink = document.getElementById('start-link');
startLink.addEventListener('click', () => {
    window.quizTest.start(); // FIRST TEST IN THE SEQUENCE GOES HERE (( IF YOU FORGET TO CHANGE BACK AFTER DEBUG, THIS IS WHERE THE PROBLEM IS))
});
