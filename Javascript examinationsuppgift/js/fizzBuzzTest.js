/**
 * This module handles the Fizz Buzz test.
 * @module FizzBuzzTest
*/

import { shuffle } from './helpers.js';
import { Test } from './test.js';

/**
 * Class representing a FizzBuzz Test.
 * @extends Test
 */
class FizzBuzzTest extends Test {
    /**
     * Create a FizzBuzzTest.
     * @param {string} name - The name of the test.
     * @param {string} description - The description of the test.
     * @param {function} next - The callback function to proceed to the next test.
     */
    constructor (name, description, next) {
        super(name, description);
        this.currentAnswer = '';
        this.pointValue = 3;
        this.next = next;
        this.question = this.generateFizzBuzzQuestion();
        this.questions = [];
        this.questions.push(this.question);
        this.maxPoints = this.questions.length * this.pointValue;
    }

    /**
     * Generate a FizzBuzz question.
     * @returns {string} The generated FizzBuzz question.
     */
    generateFizzBuzzQuestion () {
        const startNumber = Math.floor(Math.random() * 20) + 1;
        const sequence = [];

        for (let i = 0; i < 7; i++) {
            const number = startNumber + i;
            if (number % 3 === 0 && number % 5 === 0) {
                sequence.push('fizzbuzz');
            } else if (number % 3 === 0) {
                sequence.push('fizz');
            } else if (number % 5 === 0) {
                sequence.push('buzz');
            } else {
                sequence.push(number.toString());
            }
        }

        this.correctAnswer = startNumber + 7;
        sequence.push('?');

        return `Question: ${sequence.join(', ')}`;
    }

    /**
     * Reset the FizzBuzzTest.
     */
    reset () {
        // Reset all values for reset
        this.question = this.generateFizzBuzzQuestion();
        this.questions = [];
        this.questions.push(this.question);
        this.maxPoints = this.questions.length * this.pointValue;
        this.points = 0;
        this.currentAnswer = '';
        this.start();
    }

    /**
     * Render the FizzBuzzTest in a container element.
     * @param {HTMLElement} container - The container element to render the test in.
     */
    render (container) {
        const questionElement = document.createElement('p');
        questionElement.textContent = this.question;
        container.appendChild(questionElement);

        const options = ['fizz', 'buzz', 'fizzbuzz'];
        for (let i = 1; i <= 3; i++) {
            options.push((Math.floor(Math.random() * 20) + 8).toString());
        }

        // Add correct answer to array if it is not already in array
        if (this.correctAnswer % 3 === 0 && this.correctAnswer % 5 === 0) {
            this.correctAnswer = 'fizzbuzz';
        } else if (this.correctAnswer % 3 === 0) {
            this.correctAnswer = 'fizz';
        } else if (this.correctAnswer % 5 === 0) {
            this.correctAnswer = 'buzz';
        } else if (!options.includes(this.correctAnswer)) {
            options.push(this.correctAnswer);
        }

        // Randomize the button indexes.
        shuffle(options);

        options.forEach(option => {
            const optionElement = document.createElement('button');
            optionElement.textContent = option;
            optionElement.addEventListener('click', () => {
                this.checkAnswer(option);
            });
            container.appendChild(optionElement);
        });
    }

    /**
     * Check the answer for the FizzBuzzTest.
     * @param {string} selectedOption - The selected option as the answer.
     */
    checkAnswer (selectedOption) {
        const isCorrect = (selectedOption === this.correctAnswer);
        if (isCorrect) {
            this.points += 3;
        }
        this.currentAnswer = selectedOption;
        this.showResult(isCorrect, this.correctAnswer);
    }
}

export { FizzBuzzTest };
