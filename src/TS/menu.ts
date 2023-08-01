// empty then adding option based on button clicks
const categories_chosen: string[] = [];
let difficulty_chosen: string = "";

const categories: HTMLDivElement = <HTMLDivElement>(
  document.createElement("div")
  );
  categories.setAttribute("class", "categories");
  
  const categories_h: HTMLHeadingElement = document.createElement("h2");
  categories_h.textContent = "Categories";
  
  const music: HTMLButtonElement = document.createElement("button");
  music.setAttribute("class", "button");
  music.setAttribute("id", "music");
  music.textContent = "Music";
  
  const hist: HTMLButtonElement = document.createElement("button");
  hist.setAttribute("class", "button");
  hist.setAttribute("id", "history");
  hist.textContent = "History";
  
  const science: HTMLButtonElement = document.createElement("button");
  science.setAttribute("class", "button");
  science.setAttribute("id", "science");
  science.textContent = "Science";
  
  const geography: HTMLButtonElement = document.createElement("button");
  geography.setAttribute("class", "button");
  geography.setAttribute("id", "geography");
  geography.textContent = "Geography";
  
  document.querySelector("#main")?.appendChild(categories_h);
document.querySelector("#main")?.appendChild(categories);
categories.appendChild(music);
categories.appendChild(hist);
categories.appendChild(science);
categories.appendChild(geography);

const difficulty: HTMLDivElement = document.createElement("div");
difficulty.setAttribute("class", "difficulty");

const difficulty_h: HTMLHeadingElement = document.createElement("h2");
difficulty_h.textContent = "Difficulty";

const easy: HTMLButtonElement = document.createElement("button");
easy.setAttribute("class", "button");
easy.setAttribute("id", "easy");
easy.textContent = "Easy";

const medium: HTMLButtonElement = document.createElement("button");
medium.setAttribute("class", "button");
medium.setAttribute("id", "medium");
medium.textContent = "Medium";

const hard: HTMLButtonElement = document.createElement("button");
hard.setAttribute("class", "button");
hard.setAttribute("id", "hard");
hard.textContent = "Hard";

document.querySelector("#main")?.appendChild(difficulty_h);
document.querySelector("#main")?.appendChild(difficulty);
difficulty.appendChild(easy);
difficulty.appendChild(medium);
difficulty.appendChild(hard);

const start: HTMLButtonElement = document.createElement("button");
start.textContent = "Start";

document.querySelector("#main")?.appendChild(start);

let choose_category = (category: string) => {
  if (categories_chosen.length < 1) {
    categories_chosen.push(category);
    document
    .getElementById(category)
    ?.classList.replace("button", "tgl_button");
    console.log(categories_chosen);
    return;
  }
  
  let flag = 0;
  for (let i = 0; i <= categories_chosen.length; i++) {
    if (category === categories_chosen[i]) flag++;
  }
  
  if (flag)
  for (let i = 0; i <= categories_chosen.length; i++) {
    if (category === categories_chosen[i]) {
      categories_chosen.splice(i, 1);
      document
      .getElementById(category)
      ?.classList.replace("tgl_button", "button");
    }
  }
  else {
    categories_chosen.push(category);
    document
    .getElementById(category)
    ?.classList.replace("button", "tgl_button");
  }
  
  console.log(categories_chosen);
};

let choose_difficulty = (difficulty: string) => {
  if (difficulty_chosen === "") {
    difficulty_chosen = difficulty;
    document
    .getElementById(difficulty_chosen)
    ?.classList.replace("button", "tgl_button");
    console.log(difficulty_chosen);
    return;
  }

  if (difficulty_chosen !== difficulty) {
    document
    .getElementById(difficulty_chosen)
    ?.classList.replace("tgl_button", "button");
    difficulty_chosen = difficulty;
    document
    .getElementById(difficulty_chosen)
    ?.classList.replace("button", "tgl_button");

    console.log(difficulty_chosen);
  }
};

music.addEventListener("click", () => {
  choose_category("music");
});
hist.addEventListener("click", () => {
  choose_category("history");
});
science.addEventListener("click", () => {
  choose_category("science");
});
geography.addEventListener("click", () => {
  choose_category("geography");
});

easy.addEventListener("click", () => {
  choose_difficulty("easy");
});

medium.addEventListener("click", () => {
  choose_difficulty("medium");
});

hard.addEventListener("click", () => {
  choose_difficulty("hard");
});

start.addEventListener("click", () => {
  localStorage.setItem("categories",JSON.stringify(categories_chosen))
  localStorage.setItem("difficulty",difficulty_chosen)
  location.href="./kviz.html"
});
