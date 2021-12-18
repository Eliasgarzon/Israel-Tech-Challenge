class CompanyInfo {
  constructor(domElement, companySymbol) {
    this.domElement = domElement;
    this.companySymbol = companySymbol;
    this.COMP_PROFILE_URL = `https://stock-exchange-dot-full-stack-course-services.ew.r.appspot.com/api/v3/company/profile/${this.companySymbol}`;
    this.COMP_STOCK_HISTORY_URL = `https://stock-exchange-dot-full-stack-course-services.ew.r.appspot.com/api/v3/historical-price-full/${this.companySymbol}?serietype=line`;
    this.ENTRIES_AMOUNT_TO_SHOW_ON_CHART = 100;
    this.companyLoadSpinner = this.createLoadSpinner();
    this.companyDomElementClasses = [
      "container",
      "shadow-lg",
      "my-5",
      "p-5",
      "bg-body",
      "rounded",
    ];
  }
  async load() {
    this.domElement.classList.add(...this.companyDomElementClasses);
    this.domElement.append(this.companyLoadSpinner);
    await this.displayCompanyProfile();
  }

  async addChart() {
    const data = (await this.getUrl(this.COMP_STOCK_HISTORY_URL)).historical;
    const stockHistoryDom = this.createStockHistoryDom(data);
    this.domElement.append(stockHistoryDom);
    this.domElement.firstChild.remove();
  }

  async displayCompanyProfile() {
    const data = (await this.getUrl(this.COMP_PROFILE_URL)).profile;
    const companyProfileDom = this.createCompanyProfileDom(data);
    this.domElement.append(companyProfileDom);
  }

  async getUrl(url) {
    try {
      const response = await fetch(url);
      return await response.json();
    } catch (err) {
      console.log(err);
    }
  }

  createCompanyProfileDom(data) {
    const companyProfileWrapper = document.createElement("div");
    const titleWrapper = document.createElement("div");
    const imgWrapper = document.createElement("div");
    const companyImage = document.createElement("img");
    const companyName = document.createElement("h1");
    const stockInfoWrapper = document.createElement("div");
    const stockPrice = document.createElement("span");
    const stockChange = document.createElement("span");
    const companyDescription = document.createElement("div");
    const companyProfileClasses = ["mb-5"];
    const titleWrapperClasses = ["d-flex", "align-items-center"];
    const companyImageClasses = ["companyPictureProfile"];
    const companyNameClasses = ["ms-3"];
    const stockInfoWrapperClasses = ["fs-4", "my-5"];

    companyProfileWrapper.classList.add(...companyProfileClasses);
    titleWrapper.classList.add(...titleWrapperClasses);
    companyImage.classList.add(...companyImageClasses);
    companyName.classList.add(...companyNameClasses);
    stockInfoWrapper.classList.add(...stockInfoWrapperClasses);

    companyName.innerHTML = data.companyName;
    stockPrice.innerHTML = `Stock price: <b>${Number(data.price).toFixed(2)} ${
      data.currency
    }<b>`;
    displayStockChange(stockChange, data);
    companyDescription.innerHTML = data.description;
    companyDescription.id = "companyDescription";
    companyImage.src = data.image;
    companyImage.setAttribute(
      "onerror",
      "this.src ='https://via.placeholder.com/80'"
    );

    imgWrapper.append(companyImage);
    titleWrapper.append(imgWrapper, companyName);
    stockInfoWrapper.append(stockPrice, stockChange);
    companyProfileWrapper.append(
      titleWrapper,
      stockInfoWrapper,
      companyDescription
    );
    return companyProfileWrapper;
  }

  createStockHistoryDom(stockHistory) {
    const div = document.createElement("div");
    const canvas = document.createElement("canvas");
    canvas.id = "myChart";
    const dataArray = stockHistory
      .reverse()
      .slice(-this.ENTRIES_AMOUNT_TO_SHOW_ON_CHART)
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
    const myChart = new Chart(canvas, config);
    div.append(canvas);
    return div;
  }

  createLoadSpinner() {
    const loadButton = document.createElement("button");
    const spanSpinner = document.createElement("span");
    const spanText = document.createElement("span");
    const loadButtonClasses = ["btn", "btn-outline-secondary", "mb-5"];
    const spanSpinnerClasses = ["spinner-grow", "spinner-grow-sm"];
    const spanTextClasses = ["sr-only"];

    loadButton.id = "companyPageSpinner";
    loadButton.classList.add(...loadButtonClasses);
    loadButton.type = "button";
    loadButton.disabled = true;

    spanSpinner.classList.add(...spanSpinnerClasses);
    spanSpinner.role = "status";
    spanSpinner.ariaHidden = "true";

    spanText.classList.add(...spanTextClasses);
    spanText.textContent = "Loading...";

    loadButton.append(spanSpinner, spanText);
    return loadButton;
  }
}
