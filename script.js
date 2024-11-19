const length = document.querySelector(".length");
const slider = document.querySelector(".slider");
const indicator = document.querySelector(".indicator");
const display = document.querySelector(".display");
const copied = document.querySelector(".copied");
const copy = document.querySelector(".copy");
// checkboxes
const uppercase = document.querySelector("#uppercase");
const lowercase = document.querySelector("#lowercase");
const numbers = document.querySelector("#numbers");
const symbols = document.querySelector("#symbols");
const allCheckbox = document.querySelectorAll("input[type=checkbox]");
const generateButton = document.querySelector(".generate-btn");

const allSymbols = '~`!@#$%^&*()_-+={[}]|:;"<,>.?/';
let checkCount = 1;
let passwordLength = 11;
handleSlider();
let password = "";
uppercase.checked = true;
// Slider Handling
function handleSlider() {
  passwordLength = slider.value;
    length.innerText = passwordLength;
    
    const min = slider.min;
    const max = slider.max;
    slider.style.backgroundSize =
      ((passwordLength - min) * 100) / (max - min) + "% 100%";
}


slider.addEventListener("input", handleSlider);

//Random Generators
function randomInt(min, max) {
  return Math.floor(Math.random() * (max - min)) + min;
}

function randomNum() {
  return randomInt(0, 9);
}
function randomUppercase() {
  return String.fromCharCode(randomInt(65, 91));
}
function randomLowercase() {
  return String.fromCharCode(randomInt(97, 123));
}
function randomSymbol() {
  randIndex = randomInt(0, allCheckbox.length);
  return allSymbols.charAt(randIndex);
}

// Set indicators
function setIndicator(color) {
  indicator.style.backgroundColor = color;
  indicator.style.boxShadow = ` 2px 2px 10px 2px ${color}`;
}

// Calculating Strength
function calStrength() {
  let hasUppercase = false;
  let hasLowercase = false;
  let hasNumbers = false;
  let hasSymbols = false;

  if (uppercase.checked) hasUppercase = true;
  if (lowercase.checked) hasLowercase = true;
  if (numbers.checked) hasNumbers = true;
  if (uppercase.checked) hasSymbols = true;

  if (
    hasUppercase &&
    hasLowercase &&
    (hasNumbers || hasSymbols) &&
    passwordLength >= 8
  ) {
    setIndicator("lightgreen");
  } else if (
    (hasUppercase || hasLowercase) &&
    (hasNumbers || hasSymbols) &&
    passwordLength >= 6
  ) {
    setIndicator("#ff0");
  } else {
    setIndicator("#f00");
  }
}
//Calculating Checkbox Count
function checkboxCounting() {
  checkCount = 0;
  allCheckbox.forEach((checkbox) => {
    if (checkbox.checked) checkCount++;
  });
  if (checkCount > passwordLength) {
    slider.value = checkCount;
    handleSlider();
  }
}
allCheckbox.forEach((checkbox) => {
  checkbox.addEventListener("change", checkboxCounting);
});

// Shuffling the Str;
function shuffleArray(array) {
  for (let i = array.length; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    const temp = array[i];
    array[i] = array[j];
    array[j] = temp;
  }
  let str = "";
  str = array.join("");
  return str;
}

// copying mechanism
async function copyContent() {
    try {
        if (password === "") {
            alert("password not generated");
            throw "Failed";
        }
        await navigator.clipboard.writeText(password);
        copied.innerText = "Copied";
    } catch (e) {
        copied.innerText = e;
    }
    // copied.style.display = "block";
    copied.style.opacity = "1";
    setTimeout(() => {
        copied.style.opacity = "0";
    }, 1500);
}
copy.addEventListener("click", copyContent);

// generate password
function generatePassword() {
  if (checkCount < 1) {
    alert("Please select atleast 1 checkbox.");
  }
  if (password.length) password = "";
  let passArray = []; //for storing functions of genrating chars

  if (uppercase.checked) passArray.push(randomUppercase);
  if (lowercase.checked) passArray.push(randomLowercase);
  if (numbers.checked) passArray.push(randomNum);
  if (symbols.checked) passArray.push(randomSymbol);

  //creating password
  for (let i = 0; i < passArray.length; i++) {
    password += passArray[i]();
  }

  // creating remaining password;
  for (let i = 0; i < passwordLength - passArray.length; i++) {
    let randomIndex = randomInt(0, passArray.length);
    password += passArray[randomIndex]();
  }
  password = shuffleArray(Array.from(password));
  display.value = password;
  console.log(`Password is ${password}`);
  calStrength();
}

generateButton.addEventListener("click", generatePassword);
