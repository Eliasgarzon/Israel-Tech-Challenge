"use strict";
(() => {
  fibonacciPreviousResultsAll();

  const submitBtn = document.getElementById("inputBtn");
  const sortBtns = document.querySelectorAll(".dropdown-item");

  submitBtn.addEventListener("click", ifChecked);

  sortBtns.forEach((element) => {
    element.addEventListener("click", activeSortState);
  });

  function ifChecked() {
    const checkBox = document.getElementById("saveCheckBox");

    if (checkBox.checked) calcFibonacciServer();
    else calcFibonacciLocal();
  }

  async function calcFibonacciServer() {
    const fibInput = document.getElementById("input").value;

    clearDisplays();
    if (fibInput === "") return;
    if (!isInputInRange(fibInput)) return;
    displaySpinnerCalc();
    await getFibonacciAnswer(fibInput);
    hideSpinnerCalc();
    await fibonacciPreviousResultsAll();
  }

  async function getFibonacciAnswer(input) {
    try {
      const response = await fetch(`http://localhost:5050/fibonacci/${input}`);
      if (!response.ok) throw await response.text();
      const data = await response.json();
      displayFibResult(data.result);
    } catch (error) {
      displayServerError(error);
    }
  }

  function calcFibonacciLocal() {
    const fibInput = document.getElementById("input").value;
    const fibArray = [1, 1];

    clearDisplays();
    if (fibInput === "") return;
    if (!isInputInRange(fibInput)) return;
    displaySpinnerCalc();
    for (let i = 2; i < fibInput; i++) {
      fibArray[i] = fibArray[i - 1] + fibArray[i - 2];
    }
    displayFibResult(fibArray[fibInput - 1]);
    hideSpinnerCalc();
  }
})();
