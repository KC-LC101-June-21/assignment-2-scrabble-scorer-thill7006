// inspired by https://exercism.io/tracks/javascript/exercises/etl/solutions/91f99a3cca9548cebe5975d7ebca6a85

const input = require("readline-sync");

//keys are point values, values are letters
const oldPointStructure = {
  1: ['A', 'E', 'I', 'O', 'U', 'L', 'N', 'R', 'S', 'T'],
  2: ['D', 'G'],
  3: ['B', 'C', 'M', 'P'],
  4: ['F', 'H', 'V', 'W', 'Y'],
  5: ['K'],
  8: ['J', 'X'],
  10: ['Q', 'Z']
};


//uses oldPointStructure to score each letter of word from user input
function oldScrabbleScorer(word) {
	word = word.toUpperCase();
	let letterPoints = "";
 
	for (let i = 0; i < word.length; i++) {
 
	  for (const pointValue in oldPointStructure) {
 
		 if (oldPointStructure[pointValue].includes(word[i])) {
			letterPoints += `Points for '${word[i]}': ${pointValue}\n`
		 }
 
	  }
	}
	return letterPoints;
 }

// your job is to finish writing these functions and variables that we've named //
// don't change the names or your program won't work as expected. //

function initialPrompt() {
   word = input.question("Let's play some scrabble! Enter a word: ");
  //  score = oldScrabbleScorer(word);
  //  console.log(score);
  return word;
};

//each character is worth one point
let simpleScore = function(word) {
  return word.length;
};

//vowels are worth 3 points, consonants are worth 1 point
let vowelBonusScore = function(word) {
  word = word.toUpperCase();
	const vowels = ["A", "E", "I", "O", "U"];
  let score = 0;
  for (let i=0; i<word.length; i++) {
    
    if (vowels.includes(word[i])) {
      score += 3;
    } else {
      score += 1;
    }
  }
  return score
};

//uses newPointStructure to score word (TO DO: print point values per letter)
let scrabbleScore = function(word) {
  let score = 0;
  word = word.toLowerCase();
  for (let i=0; i<word.length; i++) {
    for (letter in newPointStructure) {
      if (letter === word[i]) {
        score += newPointStructure[letter];
      } else {
        console.log("Special characters or numbers not allowed");
      }
    }
  }
	return score;
};

//an array of scoring method objects
const scoringAlgorithms = [ 
   {
     name: "Simple Score",
     description: "Each letter is worth 1 point.",
     scoringFunction: simpleScore
   },
   {
     name: "Bonus Vowels",
     description: "Vowels are 3 pts, consonants are 1 pt.",
     scoringFunction: vowelBonusScore
   },
   {
     name: "Scrabble",
     description: "The traditional scoring algorithm.",
     scoringFunction: scrabbleScore
   }   
]

//promts user to select a scoring method
function scorerPrompt() {
  let scorer = input.question(`Choose a scoring method: \n [0] = ${scoringAlgorithms[0].name}\n [1] = ${scoringAlgorithms[1].name}\n [2] = ${scoringAlgorithms[2].name}\n Enter 0, 1, or 2: `);
  if (scorer === "0") {
    console.log(`You have selected: ${scoringAlgorithms[0].name}`);
  } else if (scorer === "1") {
    console.log(`You have selected: ${scoringAlgorithms[1].name}`);
  } else if (scorer === "2") {
    console.log(`You have selected: ${scoringAlgorithms[2].name}`);
  }
  return scorer;
};

//returns letters as separate keys with point values as values
function transform(obj) {
  let newObj = {};
  for (let key in obj) {
    for (let val of obj[key]) {
      val = val.toLowerCase();
      newObj[val] = Number(key);
    }
  }
  return newObj;
};

//uses transform() on oldPointStructure to construct more efficient newPointStructure
let newPointStructure = transform(oldPointStructure);

//runs scrabble-scorer.js functions in proper order, is called in program.js
function runProgram() {
   let word = initialPrompt();
   let scorer = scorerPrompt();

   //calls scoring function on word depending on which score method was selected
   if (scorer === "0") {
     console.log(`Score for ${word}: ${scoringAlgorithms[0].scoringFunction(word)}`);
   } else if (scorer === "1") {
    console.log(`Score for ${word}: ${scoringAlgorithms[1].scoringFunction(word)}`);
    } else if (scorer === "2") {
    console.log(`Score for ${word}: ${scoringAlgorithms[2].scoringFunction(word)}`);
  }
};


// Don't write any code below this line //
// And don't change these or your program will not run as expected //
module.exports = {
   initialPrompt: initialPrompt,
   transform: transform,
   oldPointStructure: oldPointStructure,
   simpleScore: simpleScore,
   vowelBonusScore: vowelBonusScore,
   scrabbleScore: scrabbleScore,
   scoringAlgorithms: scoringAlgorithms,
   newPointStructure: newPointStructure,
	runProgram: runProgram,
	scorerPrompt: scorerPrompt
};

