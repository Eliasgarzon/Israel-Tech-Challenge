function displayStockChange(element, data) {
  let colorClass;
  if (data.changesPercentage > 0) {
    colorClass = "text-success";
  } else colorClass = "text-danger";
  element.classList.add(colorClass);
  element.innerHTML = `(${Number(data.changesPercentage).toFixed(2)}%)`;
}
