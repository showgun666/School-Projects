/**
 * This module handles the Quiz test.
 * @module QuizTest
*/

import { Test } from './test.js';

/**
 * Class representing a Quiz Test.
 * @extends Test
 */
class QuizTest extends Test {
    /**
     * Create a QuizTest instance.
     * @param {string} name - The name of the Quiz Test.
     * @param {string} description - The description of the Quiz Test.
     * @returns {null}
     */
    constructor (name, description) {
        super(name, description);
        this.questions = quizQuestions;
        this.pointValue = 3;
        this.maxPoints = this.questions.length * this.pointValue;
        this.currentQuestionIndex = 0;
    }

    /**
     * Reset the Quiz Test.
     * @returns {null}
     */
    reset () {
        // Reset for reset function
        this.points = 0;
        this.currentQuestionIndex = 0;
        this.start();
    }

    /**
     * Render the Quiz Test in the specified container.
     * @param {HTMLElement} container - The container element to render the Quiz Test in.
     * @returns {null}
    */
    render (container) {
        const questionElement = document.createElement('h2');
        questionElement.textContent = this.questions[this.currentQuestionIndex].question;
        container.appendChild(questionElement);

        const options = this.questions[this.currentQuestionIndex].options;
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
     * Check the selected answer against the correct answer and update points accordingly.
     * @param {string} selectedOption - The selected option/answer.
     * @returns {null}
    */
    checkAnswer (selectedOption) {
        const correctAnswer = this.questions[this.currentQuestionIndex].correctAnswer;
        if (selectedOption === correctAnswer) {
            this.points += this.pointValue;
            this.showResult(true);
        } else {
            this.showResult(false, correctAnswer);
        }
    }
}

/**
 * The Quiz questions.
 * @type {Array.<{question: string, options: string[], correctAnswer: string}>}
 */
const quizQuestions = [
    {
        question: 'Question 1: How many fingers do most humans have?',
        options: ['Five', 'Ten', 'Twenty'],
        correctAnswer: 'Ten'
    },
    {
        question: 'Question 2: What is the primary ingredient in chocolate?',
        options: ['Sugar', 'Cocoa Beans', 'Happiness'],
        correctAnswer: 'Cocoa Beans'
    },
    {
        question: 'Question 3: What is the national bird of Antarctica?',
        options: ['Penguin', 'Seagull', 'Articune'],
        correctAnswer: 'Penguin'
    },
    {
        question: 'Question 4: How many months have 28 days?',
        options: ['One', 'Half', 'All'],
        correctAnswer: 'All'
    },
    {
        question: 'Question 5: Which planet is famous for its ring?',
        options: ['Saturn', 'Mars', 'Uranus'],
        correctAnswer: 'Saturn'
    }
];

export { QuizTest };
