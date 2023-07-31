type question =  {
    category: string;
    id: string;
    correctAnswer: string;
    incorrectAnswers: string[];
    question: {
      text: string;
    };
    tags: string[];
    type: string;
    difficulty: string;
    regions: string[];
    isNiche: boolean;
  }

let questions:question[]


// async function getData(url = "https://the-trivia-api.com/v2/questions?category=music") {
//   const response = await fetch(url);
//   const data = await response.json();
//   questions = data;
// }

// getData().then(() => {
//   console.log(questions);
// });

const category_name: HTMLHeadingElement = document.createElement("h2"); 

const question_container: HTMLDivElement = document.createElement("div");

const question: HTMLHeadingElement = document.createElement("h2");

const answer_container: HTMLDivElement = document.createElement("div");

// for (let i = 0; i < 3; i++) {
//   document.createElement("p").setAttribute("id", questions[i]);
// }
