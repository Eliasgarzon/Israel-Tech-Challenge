const queryString = new URLSearchParams(window.location.search);
const companySymbol = queryString.get("symbol");
const AMOUNT_OF_PREVIOUS_ENTRIES = 100;
const companyPageSpinner = document.getElementById("companyPageSpinner");

(async () => {
  displayElement(companyPageSpinner);
  await displayCompanyProfile();
  await displayCompanyHistory();

  hideElement(companyPageSpinner);
  async function displayCompanyProfile() {
    const data = (await getCompanyProfile([companySymbol]))[0];
    const companyImage = document.getElementById("companyImage");
    const companyName = document.getElementById("companyName");
    const stockPrice = document.getElementById("stockPrice");
    const stockChange = document.getElementById("stockChange");
    const companyDescription = document.getElementById("companyDescription");
    companyName.innerHTML = data.profile.companyName;
    stockPrice.innerHTML = `Stock price: <b>${Number(
      data.profile.price
    ).toFixed(2)} ${data.profile.currency}<b>`;
    displayStockChange(stockChange, data);
    companyDescription.innerHTML = data.profile.description;
    companyImage.src = data.profile.image;
    companyImage.setAttribute(
      "onerror",
      "this.src ='https://via.placeholder.com/80'"
    );
    companyImage.classList.add("companyPictureProfile");
  }

  async function getCompanyStockHistory() {
    try {
      const response = await fetch(
        `https://stock-exchange-dot-full-stack-course-services.ew.r.appspot.com/api/v3/historical-price-full/${companySymbol}?serietype=line`
      );
      return await response.json();
    } catch (err) {
      console.log(err);
    }
  }

  async function displayCompanyHistory() {
    const stockHistory = await getCompanyStockHistory();
    const dataArray = stockHistory.historical
      .reverse()
      .slice(-AMOUNT_OF_PREVIOUS_ENTRIES)
      .map((obj) => ({
        x: obj.date,
        y: obj.close,
      }));
    const data = {
      datasets: [
        {
          label: "Stock Price History",
          borderColor: "#0D6EFD",
          data: dataArray,
        },
      ],
    };
    const config = {
      type: "line",
      data: data,
      option: {},
    };
    const myChart = new Chart(document.getElementById("myChart"), config);
  }
})();
