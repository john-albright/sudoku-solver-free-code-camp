'use strict';

const SudokuSolver = require('../controllers/sudoku-solver.js');

module.exports = function (app) {
  
  let solver = new SudokuSolver();

  app.route('/api/check')
    .post((req, res) => {
      // Get the information sent to the route
      const puzzle = req.body.puzzle;
      const coordinate = req.body.coordinate;
      const value = req.body.value;
      //console.log(puzzle, coordinate, value);

      // Make sure puzzle, coordinate, and value are submitted in the POST request
      if (!puzzle || !coordinate || !value) return res.json({ "error": "Required field(s) missing" });

      // Make sure the puzzle passes validate
      if (!solver.validate(puzzle)) {
        if (puzzle.length > 81) return res.json({ "error": "Expected puzzle to be 81 characters long" });
        else return res.json({ "error": "Invalid characters in puzzle" });
      }

      // Make sure the coordinate is of valid length (2 characters)
      if (coordinate.length !== 2) return res.json({ "error": "Invalid coordinate" });

      const row = coordinate.charCodeAt(0) - 64;
      const column = coordinate[1];
      //console.log(row, column);

      // Make sure that the characters are numbers between 0 and 8
      if (row < 0 || row > 8 || column < 0 || column > 8) return res.json({ "error": "Invalid value" });

      const rowOk = solver.checkRowPlacement(puzzle, row, column, value);
      const colOk = solver.checkColPlacement(puzzle, row, column, value);
      const regOk = solver.checkRegionPlacement(puzzle, row, column, value);

      const jsonResponse = {};

      if (rowOk && colOk && regOk) jsonResponse["valid"] = true;
      else {
        jsonResponse["valid"] = false;
        jsonResponse["conflict"] = [];
        if (!rowOk) jsonResponse["conflict"].push("row");
        if (!colOk) jsonResponse["conflict"].push("column");
        if (!regOk) jsonResponse["conflict"].push("region");
      }

      return res.json(jsonResponse);

    });
    
  app.route('/api/solve')
    .post((req, res) => {
      const puzzle = req.body.puzzle;

      // Guard statements to validate the puzzle sent to the route
      if (!puzzle) return res.json({ "error": "Required field missing" });
      if (!solver.validate(puzzle)) {
        if (puzzle.length > 81) return res.json({ "error": "Expected puzzle to be 81 characters long" });
        else return res.json({ "error": "Invalid characters in puzzle" });
      }

      const solution = solver.solve(puzzle);

      if (!solution) return res.json({ "error": "Puzzle cannot be solved" });

      return res.json(solution);

    });
};
