/**
 * This module handles the Memory test.
 * @module MemoryTest
*/

import { shuffle } from './helpers.js';
import { Test } from './test.js';

/**
 * Array of memory images.
 * @type {Array<object>}
 */
const memoryImages = [
    {
        image: './img/bild1.png',
        description: 'Anka',
        id: 1
    },
    {
        image: './img/bild2.png',
        description: 'Bomerang',
        id: 2
    },
    {
        image: './img/bild3.png',
        description: 'Fotboll',
        id: 3
    },
    {
        image: './img/bild4.png',
        description: 'Spargris',
        id: 4
    },
    {
        image: './img/bild5.png',
        description: 'Kudde',
        id: 5
    },
    {
        image: './img/bild6.png',
        description: 'Party',
        id: 6
    },
    {
        image: './img/bild7.png',
        description: 'Pirat',
        id: 7
    },
    {
        image: './img/bild8.png',
        description: 'Jordglob',
        id: 8
    },
    {
        image: './img/bild9.png',
        description: 'Bil',
        id: 9
    }
];

/**
 * Class representing a Memory Test.
 * @extends Test
 */
class MemoryTest extends Test {
    /**
     * Create a MemoryTest.
     * @param {string} name - The name of the test.
     * @param {string} description - The description of the test.
     */
    constructor (name, description) {
        super(name, description);
        this.maxPoints = 9;
    }

    /**
     * Render the MemoryTest in a container element.
     * @param {HTMLElement} container - The container element to render the test in.
     */
    render (container) {
        // Empty questions and copy content from memoryImages
        this.questions = [];
        memoryImages.forEach((image) => {
            this.questions.push(image);
        });
        // Shuffle images
        shuffle(this.questions);

        // Save ID's of shuffled images
        this.correctOrder = []; // THIS IS USED TO TRACK CORRECT ANSWERS
        // Track which answer we are on.
        this.currentQuestionIndex = 0;

        this.questions.forEach((image) => {
            this.correctOrder.push(image.id);
        });

        this.questions = shuffle(this.questions);
        const questionElement = document.createElement('h2');
        container.appendChild(questionElement);

        const optionElement = document.createElement('button');
        optionElement.textContent = "Start";
        container.appendChild(optionElement);
        optionElement.addEventListener('click', () => {
            this.displayImages(container);
        });
    }

    /**
     * Display the memory images in a grid for a specific duration.
     * @param {HTMLElement} container - The container element to display the images in.
     */
    displayImages (container) {
        container.innerHTML = '';
        // Show all images in a grid for 5 seconds along with numbers under them
        const imageGrid = document.createElement('div');
        imageGrid.classList.add('image-grid');

        this.questions.forEach((question, index) => {
            const imageContainer = document.createElement('div');
            imageContainer.id = question.id;
            imageContainer.classList.add('card');
            imageContainer.style.backgroundImage = `url("${question.image}")`;
            const numberElement = document.createElement('span');
            numberElement.textContent = index + 1;
            imageContainer.appendChild(numberElement);
            imageGrid.appendChild(imageContainer);
        });
        container.appendChild(imageGrid);

        setTimeout(() => {
            this.hideImages(container);
        }, 5000);
    }

    /**
     * Hide the memory images and display the buttons with descriptions.
     * @param {HTMLElement} container - The container element to hide the images and display the buttons in.
     */
    hideImages (container) {
        // vi ska gå igenom alla elementen som är bilder och gråa ut dem.
        // Sedan så ska de ha eventlyssnare som vänder bilden och gör grön eller röd frame
        const images = document.getElementsByClassName('card');

        for (const image of images) {
            image.style.backgroundImage = 'none';
        }

        // Display 9 Buttons with descriptions
        const buttonGrid = document.createElement('div');
        buttonGrid.classList.add('button-grid');

        // go through each image and add a button in the standard order ((NOT this.questions))
        memoryImages.forEach((item, i) => {
            const button = document.createElement('button');
            button.classList.add('button');
            button.textContent = item.description;
            button.id = item.id + 100;
            button.addEventListener('click', () => {
                this.handleButtonClick(button, i);
            });
            buttonGrid.appendChild(button);
        });

        container.appendChild(buttonGrid);
    }

    /**
     * Handle the button click event for the MemoryTest.
     * @param {HTMLElement} button - The clicked button element.
     * @param {number} index - The index of the clicked button.
     */
    handleButtonClick (button, index) {
        const question = this.questions[this.currentQuestionIndex];

        // As user clicks on buttons, the images are flipped with a green background/frame for correct clicks
        // In the correct order list, we take the current question index and check the id, which should be the same as button index.
        if (question.id === button.id - 100) {
            const imageContainer = document.getElementById(question.id);
            // Reveal image
            imageContainer.style.backgroundImage = `url("${question.image}")`;
            // Make it green
            imageContainer.classList.add('green');
            this.currentQuestionIndex++;
            this.points++;
        } else {
            const imageContainer = document.getElementById(question.id);
            // Reveal image
            imageContainer.style.backgroundImage = `url("${question.image}")`;
            // Make it red
            imageContainer.classList.add('redd');
        }

        // If the user guesses wrong or all questions are answered, disable all buttons and get next button
        if (
            question.id !== button.id - 100 ||
            this.currentQuestionIndex >= this.questions.length
        ) {
            this.disableButtons();
            // get a button that can be clicked to proceed
            const testContainer = document.getElementById('test-container');
            const nextButton = document.createElement('button');
            nextButton.textContent = 'Next';
            nextButton.addEventListener('click', () => {
                this.showScore();
            });
            testContainer.appendChild(nextButton);
        }
    }

    /**
     * Disable all buttons.
     */
    disableButtons () {
        const buttons = document.getElementsByClassName('button');
        for (const button of buttons) {
            button.disabled = true;
        }
    }

    /**
     * Show the final score of the MemoryTest.
     */
    showScore () {
        const container = document.getElementById('test-container');
        container.innerHTML = '';

        const scoreElement = document.createElement('p');
        scoreElement.textContent = `Your score: ${this.points}/${this.maxPoints}`;
        container.appendChild(scoreElement);

        const nextTestButton = document.createElement('button');
        nextTestButton.textContent = 'Next Test';
        nextTestButton.addEventListener('click', () => {
            this.nextTest();
        });
        container.appendChild(nextTestButton);
    }

    // Display a range of 9 Buttons with button descriptions

    // As user clicks on buttons, the images are flipped with a green background/frame.
    // For correct clicks, increment points by 1.
    // If the user clicks on the wrong answer, the image is flipped with a red background/frame
    // If the user guesses wrong, the buttons are no longer clickable and a button takes the user to the next test.
}

export { MemoryTest };
