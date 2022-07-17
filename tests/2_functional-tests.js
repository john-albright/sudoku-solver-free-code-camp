const chai = require("chai");
const chaiHttp = require('chai-http');
const assert = chai.assert;
const server = require('../server');
const Strings = require('../controllers/puzzle-strings.js');

chai.use(chaiHttp);

suite('Functional Tests', () => {

    // #1: Solve a puzzle with valid puzzle string: POST request to /api/solve
    test('#1 Solve a puzzle with a valid puzzle string', function() {
        chai
            .request(server)
            .post('/api/solve')
            .send({
                "puzzle": Strings.puzzlesAndSolutions[0][0]
            })
            .end((err, res) => {
                assert.equal(res.status, 200, 'Response status should be 200');
                assert.equal(res.type, 'application/json', 'Response should be of type json');
                assert.equal(res.body.solution, Strings.puzzlesAndSolutions[0][1]);
            });
    });

    // #2: Solve a puzzle with missing puzzle string: POST request to /api/solve
    test('#2 Solve a puzzle with missing puzzle string', function() {
        chai
            .request(server)
            .post('/api/solve')
            .send({})
            .end((err, res) => {
                assert.equal(res.status, 200, 'Response status should be 200');
                assert.equal(res.type, 'application/json', 'Response should be of type json');
                assert.equal(res.body.error, 'Required field missing', 'The error key should have a value of "Required field missing"');
            });
    });

    // #3: Solve a puzzle with invalid characters: POST request to /api/solve
    test('#3 Solve a puzzle with invalid characters', function() {
        chai
            .request(server)
            .post('/api/solve')
            .send({
                "puzzle": ('*&!$@#$^*').repeat(9)
            })
            .end((err, res) => {
                assert.equal(res.status, 200, 'Response status should be 200');
                assert.equal(res.type, 'application/json', 'Response should be of type json');
                assert.equal(res.body.error, 'Invalid characters in puzzle', 'The error key should have a value of "Invalid characters in puzzle"');
            });
    });

    // #4: Solve a puzzle with incorrect length: POST request to /api/solve
    test('#4 Solve a puzzle with incorrect length', function() {
        chai
            .request(server)
            .post('/api/solve')
            .send({
                "puzzle": ('.').repeat(85)
            })
            .end((err, res) => {
                assert.equal(res.status, 200, 'Response status should be 200');
                assert.equal(res.type, 'application/json', 'Response should be of type json');
                assert.equal(res.body.error, 'Expected puzzle to be 81 characters long', 'The error key should have a value of "Expected puzzle to be 81 characters long"');
            });
    });

    // #5: Solve a puzzle that cannot be solved: POST request to /api/solve
    test('#5 Solve a puzzle that cannot be solved', function() {
        chai
            .request(server)
            .post('/api/solve')
            .send({
                "puzzle": ('123456789').repeat(9)
            })
            .end((err, res) => {
                assert.equal(res.status, 200, 'Response status should be 200');
                assert.equal(res.type, 'application/json', 'Response should be of type json');
                assert.equal(res.body.error, 'Puzzle cannot be solved', 'The error key should have a value of "Puzzle cannot be solved"');
            });
    });

    // #6: Check a puzzle placement with all fields: POST request to /api/check
    test('#6 Check a puzzle placement with all fields', function() {
        chai
            .request(server)
            .post('/api/check')
            .send({
                "puzzle": Strings.puzzlesAndSolutions[1][0],
                "coordinate": "I8",
                "value": 4
            })
            .end((err, res) => {
                assert.equal(res.status, 200, 'Response status should be 200');
                assert.equal(res.type, 'application/json', 'Response should be of type json');
                assert.isTrue(res.body.valid, 'The valid key should have a property of true');
            });
    });

    // #7: Check a puzzle placement with single placement conflict: POST request to /api/check
    test('#7 Check a puzzle placement with single placement conflict', function() {
        chai
            .request(server)
            .post('/api/check')
            .send({
                "puzzle": Strings.puzzlesAndSolutions[0][0],
                "coordinate": "I9",
                "value": 6
            })
            .end((err, res) => {
                assert.equal(res.status, 200, 'Response status should be 200');
                assert.equal(res.type, 'application/json', 'Response should be of type json');
                assert.isFalse(res.body.valid, 'The valid key should have a value of false');
                assert.isArray(res.body.conflict, 'The conflict key should have an array value');
                assert.lengthOf(res.body.conflict, 1, 'The array value should be 1 in length');
                assert.include(res.body.conflict, 'row', 'The only element of the array should be "row"');
            });
    });

    // #8: Check a puzzle placement with multiple placement conflicts: POST request to /api/check
    test('#8 Check a puzzle placement with multiple placement conflicts', function() {
        chai
            .request(server)
            .post('/api/check')
            .send({
                "puzzle": Strings.puzzlesAndSolutions[0][0],
                "coordinate": "I9",
                "value": 4
            })
            .end((err, res) => {
                assert.equal(res.status, 200, 'Response status should be 200');
                assert.equal(res.type, 'application/json', 'Response should be of type json');
                assert.isFalse(res.body.valid, 'The valid key should have a value of false');
                assert.isArray(res.body.conflict, 'The conflict key should have an array value');
                assert.lengthOf(res.body.conflict, 2, 'The array value should be 2 in length');
                assert.include(res.body.conflict, 'row', 'One of the array values should be "row"');
                assert.include(res.body.conflict, 'column', 'One of the array values should be "column"');
            });
    });

    // #9: Check a puzzle placement with all placement conflicts: POST request to /api/check
    test('#9 Check a puzzle placement with all placement conflicts', function() {
        chai
            .request(server)
            .post('/api/check')
            .send({
                "puzzle": Strings.puzzlesAndSolutions[0][0],
                "coordinate": "I9",
                "value": 7
            })
            .end((err, res) => {
                assert.equal(res.status, 200, 'Response status should be 200');
                assert.equal(res.type, 'application/json', 'Response should be of type json');
                assert.isFalse(res.body.valid, 'The valid key should have a value of false');
                assert.isArray(res.body.conflict, 'The conflict key should have an array value');
                assert.lengthOf(res.body.conflict, 3, 'The array value should be 3 in length');
                assert.include(res.body.conflict, 'row', 'One of the array values should be "row"');
                assert.include(res.body.conflict, 'column', 'One of the array values should be "column"');
                assert.include(res.body.conflict, 'region', 'One of the array values should be "region"');
            });
    });

    // #10: Check a puzzle placement with missing required fields: POST request to /api/check
    test('#10 Check a puzzle placement with missing required fields', function() {
        chai
            .request(server)
            .post('/api/check')
            .send({
                "puzzle": Strings.puzzlesAndSolutions[4][0],
                "coordinate": "I9"
            })
            .end((err, res) => {
                assert.equal(res.status, 200, 'Response status should be 200');
                assert.equal(res.type, 'application/json', 'Response should be of type json');
                assert.equal(res.body.error, 'Required field(s) missing', 'The error key should have a value of "Required field(s) missing"');            
            });
    });

    // #11: Check a puzzle placement with invalid characters: POST request to /api/check
    test('#11 Check a puzzle placement with invalid characters', function() {
        chai
            .request(server)
            .post('/api/check')
            .send({
                "puzzle": ('*&!$@#$^*').repeat(9),
                "coordinate": "I9",
                "value": 5
            })
            .end((err, res) => {
                assert.equal(res.status, 200, 'Response status should be 200');
                assert.equal(res.type, 'application/json', 'Response should be of type json');
                assert.equal(res.body.error, 'Invalid characters in puzzle', 'The error key should have a value of "Required field(s) missing"');            
            });
    });

    // #12: Check a puzzle placement with incorrect length: POST request to /api/check
    test('#12 Check a puzzle placement with incorrect length', function() {
        chai
            .request(server)
            .post('/api/check')
            .send({
                "puzzle": Strings.puzzlesAndSolutions[4][0] + "...",
                "coordinate": "I9",
                "value": 5
            })
            .end((err, res) => {
                assert.equal(res.status, 200, 'Response status should be 200');
                assert.equal(res.type, 'application/json', 'Response should be of type json');
                assert.equal(res.body.error, 'Expected puzzle to be 81 characters long', 'The error key should have a value of "Expected puzzle to be 81 characters long"');            
            });
    });

    // #13: Check a puzzle placement with invalid placement coordinate: POST request to /api/check
    test('#13 Check a puzzle placement with invalid placement coordinate', function() {
        chai
            .request(server)
            .post('/api/check')
            .send({
                "puzzle": Strings.puzzlesAndSolutions[4][0],
                "coordinate": "J10",
                "value": 5
            })
            .end((err, res) => {
                assert.equal(res.status, 200, 'Response status should be 200');
                assert.equal(res.type, 'application/json', 'Response should be of type json');
                assert.equal(res.body.error, 'Invalid coordinate', 'The error key should have a value of "Invalid coordinate"');            
            });
    });

    
    // #14: Check a puzzle placement with invalid placement value: POST request to /api/check
    test('#14 Check a puzzle placement with invalid placement value', function() {
        chai
            .request(server)
            .post('/api/check')
            .send({
                "puzzle": Strings.puzzlesAndSolutions[4][0],
                "coordinate": "I9",
                "value": 10
            })
            .end((err, res) => {
                assert.equal(res.status, 200, 'Response status should be 200');
                assert.equal(res.type, 'application/json', 'Response should be of type json');
                assert.equal(res.body.error, 'Invalid value', 'The error key should have a value of "Invalid value"');            
            });
    });
});

