const mainPage = new (class {
    private url = "http://localhost:5173";
    private iframe? : HTMLIFrameElement ;
    private page : HTMLDivElement;
    private iframe_load : boolean = false ;
    private message_queue : string[] = [] ;

    private update_page () {
        const badge = document.createElement("div");
        this.iframe = document.createElement("iframe");
        this.iframe.src = this.url;
        this.iframe.style.cssText = "width:100%; height:50vw;";
        badge.appendChild(this.iframe) ;
        this.iframe.addEventListener("load",()=>{
            this.iframe_load = true ;
            console.log("送信");
            for(const b of this.message_queue) {
                this.iframe?.contentWindow?.postMessage(b);
            }
            this.message_queue = [] ;
        })
        return badge ;
    }
    constructor(){
        this.page = this.update_page();
    }

    public render (html:Element) {
        html.insertAdjacentElement("beforebegin", this.page);
    }
    public sendMessageToLocal(data:string) {
        if(this.iframe && this.iframe.contentWindow)if(this.iframe_load) {
            this.iframe.contentWindow.postMessage(data, "*");
        }else{
            this.message_queue.push(data) ;
        }
    }
    
})() ;

window.onload = ()=>{
    function renderReadingTime() {
      mainPage.render(document.body) ;
      mainPage.sendMessageToLocal("hello");
    }

    renderReadingTime();

    const observer = new MutationObserver((mutations) => {
      for (const mutation of mutations) {
        // If a new article was added.
        for (let i = 0; i < mutation.addedNodes.length; i++) {
            renderReadingTime();
        }
      }
    });

    // https://developer.chrome.com/ is a SPA (Single Page Application) so can
    // update the address bar and render new content without reloading. Our content
    // script won't be reinjected when this happens, so we need to watch for
    // changes to the content.
    (()=>{
        const ob_elm = document.querySelector('#a-page') ;
        if (!ob_elm) return ;
        console.log("#a-pageが見つかりませんでした。");
        observer.observe(ob_elm, {
          childList: true
        });
    })();

}