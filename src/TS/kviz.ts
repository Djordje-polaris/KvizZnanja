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

const question_container: HTMLDivElement = document.createElement("div");

const question: HTMLHeadingElement = document.createElement("h2");
question.setAttribute("id", "question");

const answer_container: HTMLDivElement = document.createElement("div");

const answer_1: HTMLButtonElement = document.createElement("button");
answer_1.setAttribute("class", "button");
answer_1.setAttribute("id", "answer_0");

const answer_2: HTMLButtonElement = document.createElement("button");
answer_2.setAttribute("class", "button");
answer_2.setAttribute("id", "answer_1");

const answer_3: HTMLButtonElement = document.createElement("button");
answer_3.setAttribute("class", "button");
answer_3.setAttribute("id", "answer_2");

const answer_4: HTMLButtonElement = document.createElement("button");
answer_4.setAttribute("class", "button");
answer_4.setAttribute("id", "answer_3");

document.getElementById("main")?.appendChild(category_name);

document.getElementById("main")?.appendChild(question_container);
question_container.appendChild(question);

document.getElementById("main")?.appendChild(answer_container);
answer_container.appendChild(answer_1);
answer_container.appendChild(answer_2);
answer_container.appendChild(answer_3);
answer_container.appendChild(answer_4);

async function getData() {
  let difficultyJson = localStorage.getItem("difficulty");

  let categoryJson = localStorage.getItem("categories");
  if (!categoryJson) return false;

  let categories_chosen: string[] = JSON.parse(categoryJson);
  if (!categories_chosen) return false;

  let randomNumber1 = Math.floor(Math.random() * categories_chosen.length);
  console.log(randomNumber1);

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

  let numberArray: number[] = shuffleArray([1, 2, 3, 4]);

  console.log(numberArray);

  for (let i = 0; i < 4; i++) {
    let currentAnswer = document.getElementById("answer_" + i);
    if (currentAnswer) currentAnswer.innerHTML = answers[i];

    if(currentAnswer?.innerHTML === correctAnswer)
    currentAnswer.setAttribute("class","correct")
    else
    currentAnswer?.setAttribute("class","incorrect")
    console.log(currentAnswer?.innerHTML);
  }

  console.log("Correct answer is " + correctAnswer);

  answer_1.addEventListener("click",()=>{
    
  })

  answer_2.addEventListener("click",()=>{
    
  })

  answer_3.addEventListener("click",()=>{
    
  })

  answer_4.addEventListener("click",()=>{
    
  })

}



getData();
