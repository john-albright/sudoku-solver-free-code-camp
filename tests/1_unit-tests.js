const chai = require('chai');
const assert = chai.assert;

const Solver = require('../controllers/sudoku-solver.js');
const Strings = require('../controllers/puzzle-strings.js');
let solver = new Solver();

suite('Unit Tests', () => {
    // #1: Logic handles a valid puzzle string of 81 characters
    test('#1 handle valid puzzle strings', function() {
        assert.isTrue(solver.validate(Strings.puzzlesAndSolutions[0][0]), 'The first sample puzzle should be a valid puzzle string');
        assert.isTrue(solver.validate(Strings.puzzlesAndSolutions[1][0]), 'The second sample puzzle should be a valid puzzle string');
        assert.isTrue(solver.validate(Strings.puzzlesAndSolutions[2][0]), 'The third sample puzzle should be a valid puzzle string');
        assert.isTrue(solver.validate(Strings.puzzlesAndSolutions[3][0]), 'The fourth sample puzzle should be a valid puzzle string');
        assert.isTrue(solver.validate(Strings.puzzlesAndSolutions[4][0]), 'The fifth sample puzzle should be a valid puzzle string');
    });

    // #2: Logic handles a puzzle string with invalid characters (not 1-9 or .)
    test('#2 handle puzzle strings with invalid characters', function() {
        assert.isFalse(solver.validate(('*&!$@#$^*').repeat(9)), 'A puzzle with the characters *&!$@#$^* should be invalid');
        assert.isFalse(solver.validate(('easyoidef').repeat(9)), 'A puzzle with the alphabetic characters should be invalid');
        assert.isFalse(solver.validate(('d12hj...f').repeat(9)), 'A puzzle with characters and letters should be invalid');
        assert.isFalse(solver.validate('5..91372.3...8.5.9.9.25..8.68.47.23...95..46.7.4..d..5.2.......4..8916..85.72...3'), 'A puzzle with characters and letters should be invalid');
    });

    // #3: Logic handles a puzzle string that is not 81 characters in length
    test('#3 handle puzzle strings that are not 81 characters in length', function() {
        assert.isFalse(solver.validate(('.').repeat(85)), 'A puzzle of length 85 should be invalid');
        assert.isFalse(solver.validate(('123456789').repeat(10)), 'A puzzle of length 90 should be invalid');
        assert.isFalse(solver.validate('123456789'), 'A puzzle of length 9 should be invalid');
    });

    // #4: Logic handles a valid row placement
    test('#4 handle valid row placement', function() {
        assert.isTrue(solver.checkRowPlacement(Strings.puzzlesAndSolutions[0][0], 1, 2, 3), 'For the first puzzle, 3 should pass the checkRowPlacement() function at row 1, column 2');
        assert.isTrue(solver.checkRowPlacement(Strings.puzzlesAndSolutions[1][0], 9, 8, 4), 'For the second puzzle, 4 should pass the checkRowPlacement() function at row 9, column 8');
        assert.isTrue(solver.checkRowPlacement(Strings.puzzlesAndSolutions[2][0], 3, 2, 9), 'For the third puzzle, 9 should pass the checkRowPlacement() function at row 3, column 2');
        assert.isTrue(solver.checkRowPlacement(Strings.puzzlesAndSolutions[3][0], 5, 1, 3), 'For the fourth puzzle, 3 should pass the checkRowPlacement() function at row 5, column 1');
        assert.isTrue(solver.checkRowPlacement(Strings.puzzlesAndSolutions[4][0], 9, 7, 6), 'For the fifth puzzle, 6 should pass the checkRowPlacement() function at row 9, column 7');
    });

    // #5: Logic handles an invalid row placement
    test('#5 handle invalid row placement', function() {
        assert.isFalse(solver.checkRowPlacement(Strings.puzzlesAndSolutions[0][0], 1, 2, 2), 'For the first puzzle, 2 should fail the checkRowPlacement() function at row 1, column 2');
        assert.isFalse(solver.checkRowPlacement(Strings.puzzlesAndSolutions[1][0], 1, 9, 5), 'For the second puzzle, 5 should fail the checkRowPlacement() function at row 1, column 9');
        assert.isFalse(solver.checkRowPlacement(Strings.puzzlesAndSolutions[2][0], 3, 2, 1), 'For the third puzzle, 1 should fail the checkRowPlacement() function at row 3, column 2');
        assert.isFalse(solver.checkRowPlacement(Strings.puzzlesAndSolutions[3][0], 5, 1, 6), 'For the fourth puzzle, 6 should fail the checkRowPlacement() function at row 5, column 1');
        assert.isFalse(solver.checkRowPlacement(Strings.puzzlesAndSolutions[4][0], 8, 2, 6), 'For the fifth puzzle, 6 should fail the checkRowPlacement() function at row 8, column 2');
    });

    // #6: Logic handles a valid column placement
    test('#6 handle valid column placement', function() {
        assert.isTrue(solver.checkColPlacement(Strings.puzzlesAndSolutions[0][0], 1, 2, 3), 'For the first puzzle, 3 should pass the checkColPlacement() function at row 1, column 2');
        assert.isTrue(solver.checkColPlacement(Strings.puzzlesAndSolutions[1][0], 2, 8, 1), 'For the second puzzle, 1 should pass the checkColPlacement() function at row 2, column 8');
        assert.isTrue(solver.checkColPlacement(Strings.puzzlesAndSolutions[2][0], 2, 3, 3), 'For the third puzzle, 3 should pass the checkColPlacement() function at row 2, column 3');
        assert.isTrue(solver.checkColPlacement(Strings.puzzlesAndSolutions[3][0], 3, 4, 3), 'For the fourth puzzle, 3 should pass the checkColPlacement() function at row 3, column 4');
        assert.isTrue(solver.checkColPlacement(Strings.puzzlesAndSolutions[4][0], 6, 7, 9), 'For the fifth puzzle, 9 should pass the checkColPlacement() function at row 6, column 7');
    });

    // #7: Logic handles an invalid column placement
    test('#7 handle invalid column placement', function() {
        assert.isFalse(solver.checkColPlacement(Strings.puzzlesAndSolutions[0][0], 1, 2, 9), 'For the first puzzle, 9 should fail the checkColPlacement() function at row 1, column 2');
        assert.isFalse(solver.checkColPlacement(Strings.puzzlesAndSolutions[1][0], 2, 8, 6), 'For the second puzzle, 6 should fail the checkColPlacement() function at row 2, column 8');
        assert.isFalse(solver.checkColPlacement(Strings.puzzlesAndSolutions[2][0], 2, 3, 9), 'For the third puzzle, 9 should fail the checkColPlacement() function at row 2, column 3');
        assert.isFalse(solver.checkColPlacement(Strings.puzzlesAndSolutions[3][0], 3, 4, 6), 'For the fourth puzzle, 6 should fail the checkColPlacement() function at row 3, column 4');
        assert.isFalse(solver.checkColPlacement(Strings.puzzlesAndSolutions[4][0], 6, 7, 2), 'For the fifth puzzle, 2 should fail the checkColPlacement() function at row 6, column 7');
    });

    // #8: Logic handles a valid region (3x3 grid) placement
    test('#8 handle valid region placement', function() {
        assert.isTrue(solver.checkRegionPlacement(Strings.puzzlesAndSolutions[0][0], 1, 2, 3), 'For the first puzzle, 3 should pass the checkRegionPlacement() function at row 1, column 2');
        assert.isTrue(solver.checkRegionPlacement(Strings.puzzlesAndSolutions[1][0], 1, 9, 4), 'For the second puzzle, 4 should pass the checkRegionPlacement() function at row 1, column 9');
        assert.isTrue(solver.checkRegionPlacement(Strings.puzzlesAndSolutions[2][0], 3, 2, 1), 'For the third puzzle, 1 should pass the checkRegionPlacement() function at row 3, column 2');
        assert.isTrue(solver.checkRegionPlacement(Strings.puzzlesAndSolutions[3][0], 7, 3, 4), 'For the fourth puzzle, 4 should pass the checkRegionPlacement() function at row 7, column 3');
        assert.isTrue(solver.checkRegionPlacement(Strings.puzzlesAndSolutions[4][0], 5, 4, 3), 'For the fifth puzzle, 3 should pass the checkRegionPlacement() function at row 5, column 4');
    });

    // #9: Logic handles an invalid region (3x3 grid) placement
    test('#9 handle invalid region placement', function() {
        assert.isFalse(solver.checkRegionPlacement(Strings.puzzlesAndSolutions[0][0], 6, 6, 1), 'For the first puzzle, 3 should pass the checkRegionPlacement() function at row 6, column 6');
        assert.isFalse(solver.checkRegionPlacement(Strings.puzzlesAndSolutions[1][0], 8, 8, 3), 'For the second puzzle, 3 should pass the checkRegionPlacement() function at row 8, column 8');
        assert.isFalse(solver.checkRegionPlacement(Strings.puzzlesAndSolutions[2][0], 5, 8, 9), 'For the third puzzle, 9 should pass the checkRegionPlacement() function at row 5, column 8');
        assert.isFalse(solver.checkRegionPlacement(Strings.puzzlesAndSolutions[3][0], 7, 3, 6), 'For the fourth puzzle, 6 should pass the checkRegionPlacement() function at row 7, column 3');
        assert.isFalse(solver.checkRegionPlacement(Strings.puzzlesAndSolutions[4][0], 5, 4, 5), 'For the fifth puzzle, 5 should pass the checkRegionPlacement() function at row 5, column 4');
    });

    // #10: Valid puzzle strings pass the solver
    test('#10 valid puzzle strings pass the solver', function() {
        assert.equal(solver.solve(Strings.puzzlesAndSolutions[0][1]), Strings.puzzlesAndSolutions[0][1], 'The first puzzle solutions should match');
        assert.equal(solver.solve(Strings.puzzlesAndSolutions[1][1]), Strings.puzzlesAndSolutions[1][1], 'The second puzzle solutions should match');
        assert.equal(solver.solve(Strings.puzzlesAndSolutions[2][1]), Strings.puzzlesAndSolutions[2][1], 'The third puzzle solutions should match');
        assert.equal(solver.solve(Strings.puzzlesAndSolutions[3][1]), Strings.puzzlesAndSolutions[3][1], 'The fourth puzzle solutions should match');
        assert.equal(solver.solve(Strings.puzzlesAndSolutions[4][1]), Strings.puzzlesAndSolutions[4][1], 'The fifth puzzle solutions should match');
    });

    // #11: Invalid puzzle strings fail the solver
    test('#11 invalid puzzle strings fail the solver', function() {
        assert.isNull(solver.solve(('*&!$@#$^*').repeat(9)), 'A puzzle of symbols should fail the solver');
        assert.isNull(solver.solve(('easyoidef').repeat(9)), 'A puzzle of letters should fail the solver');
        assert.isNull(solver.solve(('d12hj...f').repeat(9)), 'A puzzle of periods, letters, and numbers should fail the solver');
        assert.isNull(solver.solve(('123456789').repeat(9)), 'A puzzle of numbers repeated over every row should fail the solver');
        assert.isNull(solver.solve(''), 'An empty string should fail the solver');
        assert.isNull(solver.solve('9.9..5.1.85.4....2432......1...69.83.9.....6.62.71...9......1945....4.37.4.3..6..'), 'A puzzle containing incorrect starting values should fail the solver');
        assert.isNull(solver.solve('123456789'), 'A puzzle of 9 numbers should fail the solver');
        assert.isNull(solver.solve(('.........').repeat(9)), 'A puzzle of only periods should fail the solver');
    });

    // #12: Solver returns the expected solution for an incomplete puzzle
    test('#12 solver returns expected solution', function() {
        assert.equal(solver.solve(Strings.puzzlesAndSolutions[0][0]), Strings.puzzlesAndSolutions[0][1]);
        assert.equal(solver.solve(Strings.puzzlesAndSolutions[1][0]), Strings.puzzlesAndSolutions[1][1]);
        assert.equal(solver.solve(Strings.puzzlesAndSolutions[2][0]), Strings.puzzlesAndSolutions[2][1]);
        assert.equal(solver.solve(Strings.puzzlesAndSolutions[3][0]), Strings.puzzlesAndSolutions[3][1]);
        assert.equal(solver.solve(Strings.puzzlesAndSolutions[4][0]), Strings.puzzlesAndSolutions[4][1]);
    });
});