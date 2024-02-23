/**
 * This module handles the Visual Test.
 * @module VisualTest
*/

import { shuffle } from './helpers.js';
import { Test } from './test.js';

/**
 * Class representing a Visual Test, a child of the Test class.
 * @extends Test
 */
class VisualTest extends Test {
    /**
     * Create a VisualTest.
     * @param {string} name - The name of the test.
     * @param {string} description - The description of the test.
     */
    constructor (name, description) {
        super(name, description);
        this.objects = ['square', 'circle', 'triangle', 'rectangle'];
        this.colors = ['red', 'blue', 'green', 'yellow'];
        this.numObjects = 10;
        this.sequence = [];
        this.maxPoints = this.numObjects * this.pointValue;
        this.currentIndex = 0;
    }

    /**
     * Reset the VisualTest to its initial state.
     */
    reset () {
        this.points = 0;
        this.currentIndex = 0;
        this.sequence = [];
        const testContainer = document.getElementById('test-container');
        testContainer.classList.remove('grid');
        this.startTest();
    }

    /**
     * Generate a random sequence of objects and colors.
     */
    generateSequence () {
        // Generate random objects
        for (let i = 0; i < this.numObjects; i++) {
            const object = this.objects[Math.floor(Math.random() * this.objects.length)];
            const color = this.colors[Math.floor(Math.random() * this.colors.length)];
            let flag = true;
            // Check for uniqueness, if we have a duplicate, reduce i, else push to array.
            for (const item of this.sequence) {
                if (item.object === object && item.color === color) {
                    // Do it again
                    i--;
                    flag = false;
                }
            }
            // Only add if not a duplicate
            if (flag) {
                this.sequence.push({ object, color });
            }
        }
    }

    /**
     * Render the VisualTest in a container element.
     * @param {HTMLElement} container - The container element to render the test in.
     */
    render (container) {
        const startButton = document.createElement('button');
        startButton.textContent = 'Start Test';
        startButton.addEventListener('click', () => {
            this.startTest();
        });
        container.appendChild(startButton);
    }

    /**
     * Start the VisualTest.
     */
    startTest () {
        const testContainer = document.getElementById('test-container');
        testContainer.innerHTML = '';
        this.window.currentTest = this;
        this.generateSequence();
        this.displayObjects(testContainer);
        this.displayPrompt(testContainer);
    }

    /**
     * Display the objects in a grid.
     * @param {HTMLElement} container - The container element to display the objects in.
     */
    displayObjects (container) {
        const testContainer = document.getElementById('test-container');
        testContainer.classList.add('grid'); // GLÖM INTE TA BORT GRID SEN

        // Array to store references to the event listener functions
        this.eventListeners = [];

        // Take all the objects in the sequence and put them on the board
        for (const item of this.sequence) {
            const object = item;
            const objectElement = document.createElement('div');
            objectElement.classList.add('object', object.object, object.color);

            /**
             * Event listener for handling clicks on objects.
             * @function clickHandler
             * @listens document#click
             */
            const clickHandler = () => {
                this.checkAnswer(objectElement);
            };

            objectElement.addEventListener('click', clickHandler);
            container.appendChild(objectElement);

            // Store the event listener function reference
            this.eventListeners.push({ element: objectElement, listener: clickHandler });
        }

        // Timer before test ends.
        this.timeout = setTimeout(() => {
            this.endTest();
        }, 15000);
    }

    /**
     * Display the prompt for the sequence of objects and colors.
     * @param {HTMLElement} container - The container element to display the prompt in.
     */
    displayPrompt (container) {
        // Skriv prompt för sekvensen
        const promptList = document.createElement('div');
        promptList.classList.add('prompt');
        // Slumpa ordningen på promptsen så att de inte kommer i samma ordning
        shuffle(this.sequence);
        let x = 1;
        for (const item of this.sequence) {
            const prompt = document.createElement('div');
            prompt.id = x;
            prompt.innerHTML = x + '. ' + item.color + ' ' + item.object + '.<br>';
            x++;
            promptList.appendChild(prompt);
        }
        container.appendChild(promptList);
    }

    /**
     * Check the user's answer when they click on an object.
     * @param {HTMLElement} shape - The clicked shape element.
     */
    checkAnswer (shape) {
        // Clicks should happen in order of this.sequence
        // Current index is this.currentIndex
        // Selected object
        const shapeColorBool = shape.classList.contains(this.sequence[this.currentIndex].color);
        const shapeObjectBool = shape.classList.contains(this.sequence[this.currentIndex].object);
        const prompt = document.getElementById(this.currentIndex + 1);

        if (shapeColorBool && shapeObjectBool) {
            // What happens on correct
            // Green the prompt
            prompt.classList.add('green');
            // increment currentIndex
            this.currentIndex++;
            // + point
            this.points += this.pointValue;
        } else {
            // What happens on miss
            // Red the prompt
            prompt.classList.add('red');
            // increment currentIndex
            this.currentIndex++;
        }

        // IF WE ARE AT MAX INDEX// ALL ANSWERS GIVEN THEN PROCEED
        if (this.currentIndex >= this.numObjects) {
            clearTimeout(this.timeout);
            this.endTest();
        }
        // On missclick, we move to next in list (NEED TO BLOCK PREVIOUS(RED? GREEN?))
        // Correct gives +1 point, wrong gives 0points
    }

    /**
     * End the VisualTest.
     */
    endTest () {
        // Remove the event listeners
        const objects = document.getElementsByClassName('object');
        console.log(objects);
        for (const { element, listener } of this.eventListeners) {
            element.removeEventListener('click', listener);
        }

        // Show button to continue
        const nextButton = document.createElement('button');
        nextButton.textContent = 'Next';
        nextButton.addEventListener('click', () => {
            this.showScore();
        });
        const testContainer = document.getElementById('test-container');
        testContainer.appendChild(nextButton);
    }

    /**
     * Show the final score of the VisualTest.
     */
    showScore () {
        const testContainer = document.getElementById('test-container');
        testContainer.classList.remove('grid');
        testContainer.innerHTML = '';

        const scoreMessage = document.createElement('p');
        scoreMessage.textContent = `Your score: ${this.points}/${this.maxPoints}`;
        testContainer.appendChild(scoreMessage);

        const nextTestButton = document.createElement('button');
        nextTestButton.textContent = 'See results!';
        nextTestButton.addEventListener('click', () => {
            this.nextTest();
        });
        testContainer.appendChild(nextTestButton);
    }
}

export { VisualTest };
