# [Sudoku Solver](https://www.freecodecamp.org/learn/quality-assurance/quality-assurance-projects/sudoku-solver)

This project is the third of five projects completed for FreeCodeCamp's sixth (final JavaScript) certificate: [Quality Assurance](https://www.freecodecamp.org/learn/quality-assurance/). The Personal Library's [assignment instructions](https://www.freecodecamp.org/learn/quality-assurance/quality-assurance-projects/sudoku-solver) and [starter code on GitHub](https://github.com/freeCodeCamp/boilerplate-project-sudoku-solver) were provided by FreeCodeCamp. A live demo of the project can be found on [Replit](https://replit.com/@john-albright/sudoku-solver-free-code-camp).

The application was created with Express.js (a Node.js framework) to solve a sudoku puzzle. The routes /api/solve and /api/check can receive and process POST requests. Unit tests and functional tests were written with Chai.js. A SudokuSolver class is used to validate and solve a puzzle, the latter of which uses the helper functions checkRowPlacement(), checkColPlacement(), and checkRegionPlacement(). To solve the puzzle, a brute force approach is used in conjunction with recursion, passing a dictionary of indices mapped to an array of values with each call to the function.