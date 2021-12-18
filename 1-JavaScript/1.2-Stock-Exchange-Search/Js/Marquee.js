class Marquee {
  constructor(domElement) {
    this.elementsToShow = 200;
    this.domElement = domElement;
    this.domElementClasses = ["marquee", "border-bottom", "py-2"];
    this.marqueeSpinner = this.createMarqueeSpinner();
  }

  async init() {
    this.domElement.prepend(this.marqueeSpinner);
    const marqueeElements = await this.getMarqueeElements();
    this.domElement.firstChild.remove();
    this.domElement.classList.add(...this.domElementClasses);
    this.domElement.append(
      this.populateMarquee(marqueeElements, this.elementsToShow)
    );
  }

  async getMarqueeElements() {
    try {
      const response = await fetch(
        "https://stock-exchange-dot-full-stack-course-services.ew.r.appspot.com/api/v3/stock/list?/AAPL"
      );
      const data = await response.json();
      return data;
    } catch (err) {
      console.log(err);
    }
  }

  createMarquee() {
    const marquee = document.createElement("div");
    const marqueeClasses = [
      "marquee-text-wrap",
      "d-flex",
      "align-items-center",
    ];

    marquee.id = "stockMarquee";
    marquee.classList.add(...marqueeClasses);
    return marquee;
  }
  populateMarquee(array, elements) {
    const marquee = this.createMarquee();
    for (let i = 0; i < elements; i++) {
      marquee.append(this.createMarqueeElement(array[i]));
    }
    return marquee;
  }

  createMarqueeElement(object) {
    const elementWrap = document.createElement("div");
    const symbol = document.createElement("span");
    const price = document.createElement("span");
    const elementWrapClasses = ["marquee-element", "d-flex"];
    const symbolWrapClasses = ["text-primary", "fw-bold"];

    symbol.innerHTML = object.symbol;
    symbol.classList.add(...symbolWrapClasses);
    price.innerHTML = `$${object.price}`;
    elementWrap.classList.add(...elementWrapClasses);
    elementWrap.append(symbol, price);
    return elementWrap;
  }

  createMarqueeSpinner() {
    const spinner = document.createElement("span");
    const spanClasses = ["spinner-border", "spinner-border-sm", "mx-auto"];
    spinner.classList.add(...spanClasses);
    spinner.role = "status";
    spinner.ariaHidden = true;
    return spinner;
  }
}
