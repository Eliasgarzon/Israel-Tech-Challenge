class SearchForm {
  constructor(domElement) {
    this.domElement = domElement;
    this.domElementClasses = ["input-group", "mb-3"];
    this.inputForm = this.createInputForm();
    this.searchButton = this.createSubmitButton();
    this.searchSpinner = this.createLoadSpinner();
    this.renderResults = () => {};
    this.MAX_RESULTS_LENGTH = 10;
  }

  init() {
    this.domElement.classList.add(...this.domElementClasses);
    this.domElement.append(this.inputForm, this.searchButton);
    window.addEventListener("keydown", (e) => {
      if (e.key === "Enter") this.searchResults();
    });
  }

  onSearch(callBack) {
    this.renderResults = callBack;
  }

  createInputForm() {
    const input = document.createElement("input");
    const inputElementClasses = ["form-control"];

    input.id = "searchInput";
    input.type = "text";
    input.classList.add(...inputElementClasses);
    input.placeholder = "Company name...";
    input.ariaLabel = "Recipient's username";
    input.ariaDescribedBy = "button-addon2";
    // input.addEventListener("keydown", this.searchResults);
    return input;
  }

  createLoadSpinner() {
    const spinner = document.createElement("span");
    const spanClasses = ["spinner-border", "spinner-border-sm", "me-1"];
    spinner.classList.add(...spanClasses);
    spinner.role = "status";
    spinner.ariaHidden = true;
    return spinner;
  }

  createSubmitButton() {
    const submitButton = document.createElement("button");
    const submitButtonClasses = ["btn", "btn-outline-secondary"];

    submitButton.id = "searchBtn";
    submitButton.classList.add(...submitButtonClasses);
    submitButton.type = "button";
    submitButton.textContent = "Search";
    submitButton.addEventListener("click", this.searchResults);

    return submitButton;
  }

  searchResults = async () => {
    const searchInput = this.inputForm.value;
    this.searchButton.disabled = true;
    this.searchButton.prepend(this.searchSpinner);
    const searchResults = await this.getSearchResults(searchInput);
    const resultAndInput = {
      searchResults: searchResults.slice(
        0,
        Math.min(searchResults.length, this.MAX_RESULTS_LENGTH)
      ),
      searchInput: searchInput,
    };
    this.renderResults(resultAndInput);
    this.searchButton.disabled = false;
    this.searchButton.firstChild.remove();
  };

  async getSearchResults(input) {
    try {
      const response = await fetch(
        `https://stock-exchange-dot-full-stack-course-services.ew.r.appspot.com/api/v3/search?query=${input}&limit=10&exchange=NASDAQ`
      );
      return await response.json();
    } catch (err) {
      console.log(err);
    }
  }
}
