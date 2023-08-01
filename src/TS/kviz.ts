type Question_type = {
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
};

function shuffleArray(array: number[]): number[] {
  const shuffledArray = [...array]; // Create a shallow copy of the original array

  for (let i = shuffledArray.length - 1; i > 0; i--) {
    const randomIndex = Math.floor(Math.random() * (i + 1));

    // Swap elements between the current index and the random index
    [shuffledArray[i], shuffledArray[randomIndex]] = [
      shuffledArray[randomIndex],
      shuffledArray[i],
    ];
  }

  return shuffledArray;
}

const category_name: HTMLHeadingElement = document.createElement("h2");
category_name.setAttribute("id", "category_name");

const question_container: HTMLDivElement = document.createElement("div");
question_container.classList.add(
  "question",
  "border",
  "background-blue-white",
  "container1"
);

const question: HTMLHeadingElement = document.createElement("h2");
question.setAttribute("id", "question");

const answer_container: HTMLDivElement = document.createElement("div");
answer_container.classList.add("container1","flex-answers");

const answer_0: HTMLButtonElement = document.createElement("button");
answer_0.classList.add("background-blue-white", "border");
answer_0.setAttribute("id", "answer_0");

const answer_1: HTMLButtonElement = document.createElement("button");
answer_1.classList.add("background-blue-white", "border");
answer_1.setAttribute("id", "answer_1");

const answer_2: HTMLButtonElement = document.createElement("button");
answer_2.classList.add("background-blue-white", "border");
answer_2.setAttribute("id", "answer_2");

const answer_3: HTMLButtonElement = document.createElement("button");
answer_3.classList.add("background-blue-white", "border");
answer_3.setAttribute("id", "answer_3");

document.getElementById("main")?.appendChild(category_name);

document.getElementById("main")?.appendChild(question_container);
question_container.appendChild(question);

document.getElementById("main")?.appendChild(answer_container);
answer_container.appendChild(answer_0);
answer_container.appendChild(answer_1);
answer_container.appendChild(answer_2);
answer_container.appendChild(answer_3);

async function getData() {
  let difficultyJson = localStorage.getItem("difficulty");

  let categoryJson = localStorage.getItem("categories");
  if (!categoryJson) return false;

  let answeredJson = localStorage.getItem("answered");
  if (!answeredJson) return false;

  let answered: number = JSON.parse(answeredJson);
  if (answered === 5) location.href = "./index.html";

  let categories_chosen: string[] = JSON.parse(categoryJson);
  if (!categories_chosen) return false;

  let randomNumber1 = Math.floor(Math.random() * categories_chosen.length);

  const category = categories_chosen[randomNumber1];
  console.log(category, difficultyJson);

  let url: string =
    "https://the-trivia-api.com/v2/questions?" +
    "categories=" +
    category +
    "&limit=4&" +
    "difficulties=" +
    difficultyJson;

  const response = await fetch(url);
  const question_api = <Question_type[]>await response.json();
  if (!response.ok) return false;

  category_name.innerHTML = category;

  console.log(question_api);

  question.innerHTML = question_api[randomNumber1].question.text;

  let incorrectAnswers: string[] = question_api[randomNumber1].incorrectAnswers;

  let correctAnswer: string = question_api[randomNumber1].correctAnswer;

  let answers = incorrectAnswers;
  answers.push(correctAnswer);

  let numberArray: number[] = shuffleArray([0, 1, 2, 3]);

  let temp;

  console.log(answers);

  for (let i = 0; i < 4; i++) {
    temp = answers[i];
    answers[i] = answers[numberArray[i]];
    answers[numberArray[i]] = temp;
  }

  console.log(numberArray);

  console.log(answers);

  for (let i = 0; i < 4; i++) {
    let currentAnswer = document.getElementById("answer_" + numberArray[i]);
    if (currentAnswer) currentAnswer.innerHTML = answers[i];

    // if (currentAnswer?.innerHTML === correctAnswer)
    //   currentAnswer.classList.add("correct");
    // else currentAnswer?.classList.add("incorrect");
    // console.log(currentAnswer?.innerHTML);
  }

  const isCorrect = (answerDOM: string) => {
    let answer = document.getElementById(answerDOM);
    answered++;
    localStorage.setItem("answered", JSON.stringify(answered));

    if (answer?.innerHTML === correctAnswer) {
      answer.classList.add("correct");
      answer?.classList.remove("button");
    } else {
      answer?.classList.add("incorrect");
      answer?.classList.remove("button");
      for (let i = 0; i < 4; i++) {
        let currentAnswer = document.getElementById("answer_" + i);
        if (currentAnswer?.innerHTML === correctAnswer) {
          currentAnswer.classList.add("correct");
          currentAnswer.classList.remove("button");
        }
      }
    }
    setTimeout(() => {
      location.href = "./kviz.html";
    }, 2000);
  };

  console.log("Correct answer is " + correctAnswer);

  answer_0.addEventListener("click", () => {
    isCorrect("answer_0");
  });

  answer_1.addEventListener("click", () => {
    isCorrect("answer_1");
  });

  answer_2.addEventListener("click", () => {
    isCorrect("answer_2");
  });

  answer_3.addEventListener("click", () => {
    isCorrect("answer_3");
  });
}

getData();
