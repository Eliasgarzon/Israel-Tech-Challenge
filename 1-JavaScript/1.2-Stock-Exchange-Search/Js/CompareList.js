class CompareList {
  constructor(domElement) {
    this.domElement = domElement;
    this.companiesToCompare = [];
    this.compareButton = this.createCompareButton();
  }

  init() {
    this.domElement.append(this.compareButton);
  }

  createCompareButton() {
    const compareButton = document.createElement("button");
    const compareButtonClasses = ["btn", "btn-outline-secondary"];
    compareButton.id = "compareButton";
    compareButton.classList.add(...compareButtonClasses);
    compareButton.type = "button";
    compareButton.textContent = "Compare";
    compareButton.disabled = true;
    compareButton.onclick = () => {
      location.href = `compare.html?symbols=${this.companiesToCompare
        .map((e) => e.symbol)
        .join(",")}`;
    };
    return compareButton;
  }
  addCompanyToCompare(companyProfile) {
    if (this.companiesToCompare.length === 3) return;
    if (this.companiesToCompare.includes(companyProfile)) return;
    const companyButton = document.createElement("button");
    const companyButtonClasses = ["btn", "btn-secondary", "me-2"];

    companyButton.classList.add(...companyButtonClasses);
    companyButton.textContent = companyProfile.symbol + " X";
    companyButton.addEventListener("click", (e) => {
      this.companiesToCompare = this.companiesToCompare.filter(
        (e) => e !== companyProfile
      );
      if (this.companiesToCompare.length === 0) {
        this.compareButton.disabled = true;
      }
      e.target.remove();
    });
    this.domElement.prepend(companyButton);
    this.companiesToCompare.push(companyProfile);
    this.compareButton.disabled = false;
  }
}
