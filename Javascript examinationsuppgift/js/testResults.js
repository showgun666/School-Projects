/**
 * This module handles the test results.
 * @module TestResult
*/

import { Test } from './test.js';

/**
 * Class representing the TestResult.
 * @extends Test
 */
class TestResult extends Test {
    /**
     * Render the TestResult in a container element.
     * @param {HTMLElement} container - The container element to render the test result in.
     */
    render (container) {
        this.averageResult = 30;
        const results = document.createElement('div');

        // Print out the results
        const quizPoints = this.window.quizTest.points;
        const fizzBuzzPoints = this.window.fizzBuzzTest.points;
        const memoryPoints = this.window.memoryTest.points;
        const visualPoints = this.window.visualTest.points;
        const totalPoints = quizPoints + fizzBuzzPoints + memoryPoints + visualPoints;

        const quizMaxPoints = this.window.quizTest.maxPoints;
        const fizzBuzzMaxPoints = this.window.fizzBuzzTest.maxPoints;
        const memoryMaxPoints = this.window.memoryTest.maxPoints;
        const visualMaxPoints = this.window.visualTest.maxPoints;
        const totalMaxPoints = quizMaxPoints + fizzBuzzMaxPoints + memoryMaxPoints + visualMaxPoints;

        results.innerHTML += "Quiz Test: " + quizPoints + "/" + quizMaxPoints + "<br>";
        results.innerHTML += "FizzBuzz Test: " + fizzBuzzPoints + "/" + fizzBuzzMaxPoints + "<br>";
        results.innerHTML += "Memory Test: " + memoryPoints + "/" + memoryMaxPoints + "<br>";
        results.innerHTML += "Visual Test: " + visualPoints + "/" + visualMaxPoints + "<br><br>";
        results.innerHTML += "Total Points: " + totalPoints + "/" + totalMaxPoints + "<br>";
        results.innerHTML += "Your Estimated IQ: " + Math.round(totalPoints / this.averageResult * 100) + "<br>";
        results.innerHTML += "Max Possible IQ in this test: " + Math.round(totalMaxPoints / this.averageResult * 100);
        // Get an IQ value
        container.appendChild(results);
    }
}

export { TestResult };
