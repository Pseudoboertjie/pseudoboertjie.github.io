// puzzles.js
class Puzzle {
    constructor(number, phrase, answer, clue) {
      this.number = number;   // A unique identifier for the puzzle
      this.phrase = phrase;   // The puzzle's phrase or question
      this.answer = answer;   // The correct answer to the puzzle
      this.clue = clue;       // A hint or clue to help solve the puzzle
    }
  }
  
  // Array to store all the puzzles
  const puzzles = {
    1: new Puzzle(1, "What has keys but can't open locks?", "keyboard", "Think of something you type on."),
    2: new Puzzle(2, "I speak without a mouth and hear without ears. I have no body, but I come alive with the wind. What am I?", "echo", "Think of a sound."),
    3: new Puzzle(3, "What has a heart that doesn’t beat?", "artichoke", "It’s a type of vegetable."),
    4: new Puzzle(4, "What can travel around the world while staying in a corner?", "stamp", "It’s found on mail."),
    5: new Puzzle(5, "What begins with T, ends with T, and has T in it?", "teapot", "It’s used to brew something."),
    // Add more puzzles as needed
  };
  