function activeSortState(e) {
  const activeSortBtn = document.querySelector(".activeSortBtn");
  activeSortBtn.classList.remove("activeSortBtn", "bg-primary", "text-white");
  e.target.classList.add("activeSortBtn", "bg-primary", "text-white");
  fibonacciPreviousResultsAll(e.target.id);
}

function returnSortFunction(elementId) {
  const activeSortBtn = document.querySelector(".activeSortBtn");
  if (elementId === "sortDateAscending") return sortDateAscending;
  if (elementId === "sortDateDescending") return sortDateDescending;
  if (elementId === "sortNumberAscending") return sortNumberAscending;
  if (elementId === "sortNumberDescending") return sortNumberDescending;
  return returnSortFunction(activeSortBtn.id);

  function sortDateDescending(a, b) {
    if (a.createdDate < b.createdDate) {
      return -1;
    }
    if (a.createdDate > b.createdDate) {
      return 1;
    }
    return 0;
  }

  function sortDateAscending(a, b) {
    if (a.createdDate < b.createdDate) {
      return 1;
    }
    if (a.createdDate > b.createdDate) {
      return -1;
    }
    return 0;
  }

  function sortNumberDescending(a, b) {
    if (a.number < b.number) {
      return -1;
    }
    if (a.number > b.number) {
      return 1;
    }
    return 0;
  }

  function sortNumberAscending(a, b) {
    if (a.number < b.number) {
      return 1;
    }
    if (a.number > b.number) {
      return -1;
    }
    return 0;
  }
}
