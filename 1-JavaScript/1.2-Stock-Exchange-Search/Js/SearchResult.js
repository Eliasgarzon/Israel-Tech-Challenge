class SearchResult {
  constructor(domElement) {
    this.domElement = domElement;
    this.MAX_ELEMENTS_PER_FETCH = 3;
    this.COMP_PROFILE_URL =
      "https://stock-exchange-dot-full-stack-course-services.ew.r.appspot.com/api/v3/company/profile/";
    this.resultsSpinner = this.createResultsSpinner();
    this.onCompare = () => {};
  }
  setOnCompare(callBack) {
    this.onCompare = callBack;
  }

  async renderResults(companies) {
    const companiesArray = companies.searchResults;
    this.clearSearchResults();
    this.domElement.prepend(this.resultsSpinner);
    const searchProfiles = await this.getCompanyProfile(
      this.splitArray(
        companiesArray.map((e) => e.symbol),
        this.MAX_ELEMENTS_PER_FETCH
      )
    );
    companiesArray.sort(this.sortAlphabeticalOrder);
    searchProfiles.sort(this.sortAlphabeticalOrder);
    for (let i = 0; i < companiesArray.length; i++) {
      if (searchProfiles[i]) {
        this.displaySearchResult(
          companiesArray[i],
          searchProfiles[i],
          companies.searchInput
        );
      }
    }
    this.domElement.firstChild.remove();
  }

  splitArray(array, maxElementsPerChunk) {
    const newArray = [];
    for (let i = 0; i < array.length; i += maxElementsPerChunk) {
      newArray.push(array.slice(i, i + maxElementsPerChunk));
    }
    return newArray;
  }

  async getCompanyProfile(companySymbolsArray) {
    try {
      const response = await Promise.all(
        companySymbolsArray.map((e) =>
          fetch(this.COMP_PROFILE_URL + `${e.join(",")}`)
        )
      );
      const data = await Promise.all(response.map((e) => e.json()));
      return data
        .map((e) => {
          if (e.companyProfiles) return e.companyProfiles;
          else return e;
        })
        .flat();
    } catch (err) {
      console.log(err);
    }
  }

  displaySearchResult(searchResult, companyProfile, searchInput) {
    const resultsList = this.domElement;
    const li = document.createElement("li");
    const a = document.createElement("a");
    const img = document.createElement("img");
    const spanSymbol = document.createElement("span");
    const spanStockChange = document.createElement("span");
    const compareButton = this.createCompareButton();
    const listElementClasses = [
      "savedCalculation",
      "border-bottom",
      "border-dark",
      "border-1",
      "d-flex",
      "align-items-center",
      "pb-2",
      "mb-2",
      "fs-4",
    ];
    const anchorElementClasses = ["text-decoration-none"];
    const imgElementClasses = ["companyPictureSearch", "me-2"];
    const spanSymbolElementClasses = ["ms-3", "fs-6", "text-secondary"];
    const spanStockChangeElementClasses = ["fs-6"];

    li.classList.add(...listElementClasses);
    img.src = companyProfile.profile.image;
    img.alt = "cmpy logo";
    img.classList.add(...imgElementClasses);
    img.setAttribute("onerror", "this.src ='https://via.placeholder.com/30'");
    a.classList.add(...anchorElementClasses);
    a.href = `./company.html?symbol=${searchResult.symbol}`;
    a.innerHTML = `${searchResult.name}`;
    a.innerHTML = this.highlightText(searchInput, a.innerHTML);
    spanSymbol.innerHTML = `(${companyProfile.symbol})`;
    spanSymbol.innerHTML = this.highlightText(
      searchInput,
      spanSymbol.innerHTML
    );
    spanSymbol.classList.add(...spanSymbolElementClasses);
    spanStockChange.innerHTML = `(${Number(
      companyProfile.profile.changesPercentage
    ).toFixed(2)})`;
    displayStockChange(spanStockChange, companyProfile.profile);
    spanStockChange.classList.add(...spanStockChangeElementClasses);
    compareButton.addEventListener("click", () => {
      this.onCompare(companyProfile);
    });
    li.append(img, a, spanSymbol, spanStockChange, compareButton);
    resultsList.append(li);
  }

  clearSearchResults() {
    this.domElement.innerHTML = "";
  }

  createResultsSpinner() {
    const spinner = document.createElement("span");
    const spanClasses = [
      "spinner-border",
      "spinner-border-sm",
      "me-1",
      "align-self-center",
    ];
    spinner.classList.add(...spanClasses);
    spinner.style = "width:5rem; height: 5rem;";
    spinner.role = "status";
    spinner.ariaHidden = true;
    return spinner;
  }

  createCompareButton() {
    const compareButton = document.createElement("button");
    const compareButtonClasses = ["btn", "btn-primary", "ms-auto"];

    compareButton.classList.add(...compareButtonClasses);
    compareButton.type = "button";
    compareButton.textContent = "Compare";
    return compareButton;
  }

  highlightText(target, string) {
    const targetString = target;
    const regex = new RegExp(targetString, "gi");

    string = string.replace(/(<mark class="highlight">|<\/mark>)/gim, "");
    const newText = string.replace(regex, '<mark class="highlight">$&</mark>');
    return newText;
  }

  sortAlphabeticalOrder(a, b) {
    if (a.symbol > b.symbol) {
      return 1;
    } else if (a.symbol < b.symbol) {
      return -1;
    }
    return 0;
  }
}
