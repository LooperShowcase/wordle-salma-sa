const LINES_COUNT = 5;
const CHAR_COUNT = 5;
// salma
const mywordle = document.getElementById("words");

for (let i = 0; i < LINES_COUNT; i++) {
  const wDiv = document.createElement("div");
  wDiv.className = "word";
  wDiv.style.background = "";

  wDiv.className = "word";
  for (let j = 0; j < CHAR_COUNT; j++) {
    const cDiv = document.createElement("div");
    cDiv.className = "char";
    wDiv.appendChild(cDiv);
  }
  mywordle.appendChild(wDiv);
}

let currentword = 0;
let currentchar = 0;
document.addEventListener("keydown", async (event) => {
  const firstword = mywordle.children[currentword];

  if (event.code == "Enter") {
    if (currentchar == CHAR_COUNT) {
      const myAnswer = getcurrentword();
      const result = await guess(myAnswer);
      colorize(result);
      console.log(result);
      currentword++;
      currentchar = 0;
    } else {
      alert("spongebob ");
    }
  } else if (event.code == "Backspace") {
    if (currentchar > 0) {
      currentchar--;
      firstword.children[currentchar].innerHTML = "";
    }
  } else if (currentchar < CHAR_COUNT) {
    firstword.children[currentchar].innerHTML = event.key;
    currentchar++;
  }
});


async function guess(word) {
  const request = await fetch("/guess/" + word);
  const response = await request.json();
  return (response);
}

//hi
function getcurrentword() {
  var word = "";
  var wordDiv = document.getElementById("words").children[currentword];
  for (var i = 0; i < wordDiv.children.length; i++) {
    word = word + wordDiv.children[i].innerHTML;
  }
  return word;
}

async function colorize(results) {
  const wordDiv =
    document.getElementById("words").children[currentword].children;
  for (let i = 0; i < results.length; i++) {
    if (results[i] == 1) {
      wordDiv[i].style.backgroundColor = "green";
    } else if (results[i] == 0) {
      wordDiv[i].style.backgroundColor = "yellow";
    } else {
      wordDiv[i].style.backgroundColor = "gray";
    } await animateCSS(wordDiv[i], "swing")
  }
}

function animateCSS(element, animation, prefix = "animate__") {
  // We create a Promise and return it
  return new Promise((resolve, reject) => {
    const animationName = `${prefix}${animation}`;

    element.classList.add(`${prefix}animated`, animationName);

    // When the animation ends, we clean the classes and resolve the Promise
    function handleAnimationEnd(event) {
      event.stopPropagation();
      element.classList.remove(`${prefix}animated`, animationName);
      resolve("Animation ended");
    }
    element.addEventListener("animationend", handleAnimationEnd, {
      once: true,
    });
  });
}
