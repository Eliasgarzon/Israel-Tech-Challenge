"use strict";
async function fibonacciPreviousResultsAll(elementId) {
  displaySpinnerResults();
  await getFibonacciPreviousResultsAll(returnSortFunction(elementId));
  hideSpinnerResults();
}

async function getFibonacciPreviousResultsAll(sortFunction) {
  try {
    const response = await fetch("http://localhost:5050/getFibonacciResults");
    const data = await response.json();
    data.results.sort(sortFunction);
    clearResultsList();
    for (let i = 0; i < data.results.length; i++) {
      displaySavedResult(data.results[i]);
    }
  } catch (error) {
    displayServerError("Could not retrieve the previous results");
  }
}

function clearResultsList() {
  const resultsList = document.getElementById("resultsList");
  resultsList.innerHTML = "";
}

function displaySpinnerResults() {
  const spinner = document.getElementById("resultsSpinner");
  spinner.classList.remove("d-none");
}

function hideSpinnerResults() {
  const spinner = document.getElementById("resultsSpinner");
  spinner.classList.add("d-none");
}

function displaySavedResult(object) {
  const resultsList = document.getElementById("resultsList");
  const li = document.createElement("li");
  li.className =
    "savedCalculation border-bottom border-dark border-1 d-inline pb-2 mb-2 fs-4";
  li.innerHTML = `The fibonacci of <b class="fibNumber">${
    object.number
  }</b> is <b>${
    object.result
  }</b>. Calculated at: <span class="createdDate">${new Date(
    object.createdDate
  )}</span>`;
  resultsList.prepend(li);
}

function displayServerError(data) {
  const outputAnswer = document.getElementById("output");
  outputAnswer.classList.add("fs-6", "text-danger");
  outputAnswer.textContent = `Server Error: ${data}`;
}

function clearDisplays() {
  const outputError = document.getElementById("rangeError");
  const outputAnswer = document.getElementById("output");
  outputError.classList.add("d-none");
  outputAnswer.textContent = "";
  outputAnswer.className = "";
}

function isInputInRange(fibInput) {
  const errorMessage50 = "number can't be bigger than 50";
  const errorMessage1 = "number can't be smaller than 1";

  if (fibInput > 50) {
    displayErrorRange(errorMessage50);
    return 0;
  } else if (fibInput < 1) {
    displayErrorRange(errorMessage1);
    return 0;
  }
  return 1;
}

function displayErrorRange(data) {
  const outputError = document.getElementById("rangeError");
  outputError.classList.remove("d-none");
  outputError.textContent = data;
}

function displaySpinnerCalc() {
  const spinner = document.getElementById("calcSpinner");
  spinner.classList.remove("d-none");
}

function hideSpinnerCalc() {
  const spinner = document.getElementById("calcSpinner");
  spinner.classList.add("d-none");
}

function displayFibResult(result) {
  const outputAnswer = document.getElementById("output");
  outputAnswer.classList.add("fw-bold", "text-decoration-underline", "fs-5");
  outputAnswer.textContent = result;
}
