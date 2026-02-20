const mainPage = new (class {

    #url = "http://localhost:5173";

    #update_page () {
        const badge = document.createElement("div");
        badge.innerHTML = `
            <iframe src="${this.#url}" style="width:100vw;height:100vh;"/>
        `;
        return badge ;
    }

    #page ;

    constructor(){
        this.#page = this.#update_page();
    }

    render (html) {
        html.insertAdjacentElement("beforebegin", this.#page);
    }
})() ;

function renderReadingTime() {
  mainPage.render(document.body) ;
}

renderReadingTime();

const observer = new MutationObserver((mutations) => {
  for (const mutation of mutations) {
    // If a new article was added.
    for (const node of mutation.addedNodes) {
        renderReadingTime(node);
    }
  }
});

// https://developer.chrome.com/ is a SPA (Single Page Application) so can
// update the address bar and render new content without reloading. Our content
// script won't be reinjected when this happens, so we need to watch for
// changes to the content.
observer.observe(document.querySelector('#a-page'), {
  childList: true
});
