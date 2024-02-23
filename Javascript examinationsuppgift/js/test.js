/**
 * This module handles the base class for tests.
 * @module Test
*/

/**
 * Class representing a base Test.
 */
class Test {
    /**
     * Create a Test.
     * @param {string} name - The name of the test.
     * @param {string} description - The description of the test.
     */
    constructor (name, description) {
        this.name = name;
        this.description = description;
        this.points = 0;
        this.maxPoints = 1;
        this.pointValue = 1;
        this.currentQuestionIndex = 0;
    }

    /**
     * Start the Test.
     */
    start () {
        // Set this test as current test in window.
        this.window.currentTest = this;
        const welcomeMessage = document.getElementById('welcome-message');
        welcomeMessage.innerHTML = '';

        const testContainer = document.getElementById('test-container');
        testContainer.innerHTML = '';

        const testHeading = document.createElement('h2');
        testHeading.textContent = this.name;
        testContainer.appendChild(testHeading);

        const testDescription = document.createElement('p');
        testDescription.textContent = this.description;
        testContainer.appendChild(testDescription);

        this.render(testContainer);
    }

    /**
     * Render the Test in a container element.
     * @param {HTMLElement} container - The container element to render the test in.
     */
    render (container) {
        // Empty, base for children
    }

    /**
     * Reset the Test to its initial state.
     */
    reset () {
        this.points = 0;
        this.start();
    }

    /**
     * Check the user's answer for a selected option.
     * @param {any} selectedOption - The selected answer option.
     */
    checkAnswer (selectedOption) {
        // Empty, base for children
    }

    /**
     * Show the result of the user's answer.
     * @param {boolean} isCorrect - Indicates if the user's answer is correct.
     * @param {any} [answer=null] - The correct answer.
     */
    showResult (isCorrect, answer = null) {
        const testContainer = document.getElementById('test-container');
        testContainer.innerHTML = '';

        const resultMessage = document.createElement('p');
        resultMessage.textContent = isCorrect ? 'Correct!' : `Incorrect! The answer was ${answer}`;
        testContainer.appendChild(resultMessage);

        const nextButton = document.createElement('button');
        nextButton.textContent = 'Next';
        nextButton.addEventListener('click', () => {
            this.moveToNextQuestion();
        });
        testContainer.appendChild(nextButton);
    }

    /**
     * Move to the next question in the Test.
     */
    moveToNextQuestion () {
        const testContainer = document.getElementById('test-container');
        testContainer.innerHTML = '';

        this.currentQuestionIndex++;
        if (this.currentQuestionIndex < this.questions.length) {
            this.render(document.getElementById('test-container'));
        } else {
            this.showScore();
        }
    }

    /**
     * Show the final score of the Test.
     */
    showScore () {
        const testContainer = document.getElementById('test-container');
        testContainer.innerHTML = '';

        const scoreMessage = document.createElement('p');
        scoreMessage.textContent = `Your score: ${this.points}/${this.maxPoints}`;
        testContainer.appendChild(scoreMessage);

        const nextTestButton = document.createElement('button');
        nextTestButton.textContent = 'Next Test';
        nextTestButton.addEventListener('click', () => {
            testContainer.innerHTML = '';
            this.nextTest();
            console.log("STARTING NEXT TEST: " + this.next.name);
        });
        testContainer.appendChild(nextTestButton);
    }

    /**
     * Start the next test.
     */
    nextTest () {
        this.next.start();
    }
}

export { Test };
