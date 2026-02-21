/**
 * 誰かに読ませる気ははなからないコードを書いています。
 * 評価の人ごめんなさい。
 */

const MAIN_PAGE_URL = "http://localhost:5173";

const mainPage = new (class {
    private iframe? : HTMLIFrameElement ;
    private page : HTMLDivElement;
    private iframe_load : boolean = false ;
    private message_queue : string[] = [] ;

    private update_page () {
        const badge = document.createElement("div");
        this.iframe = document.createElement("iframe");
        this.iframe.src = MAIN_PAGE_URL;
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

interface Page {
    name : string ;
    render : (parent:Element)=>void ;
}
const subPage = new Map<string,Page>([
    [ "kakiuchi_sprite", new (class P1 implements Page{
        private page : HTMLDivElement = document.createElement("div");
        private sprite : HTMLDivElement = document.createElement("div");
        public name : string = "kakiuchi_sprite" ;
        private x : number = 0 ;
        constructor(){
            const imageUrl : string = chrome.runtime.getURL("bin/Assets/kakiuchi.png");
            this.sprite.style.position = "fixed" ;
            this.sprite.style.bottom = "0rem" ;
            this.sprite.style.left = "0rem" ;
            this.sprite.style.width = "20rem" ;
            this.sprite.style.zIndex = "100000" ;
            this.sprite.innerHTML = `
                <div style="display: flex; align-items: center; gap: 1rem;">
                    <img src="${imageUrl}" style="flex-shrink: 0; width: 12rem; height: 20rem;">
                    <div class="bubble">
                        いやー！❤️<br>
                        ランプの魔人だよ😄<br>
                        （アルコール）
                    </div>
                </div>
                <style>
                .bubble{
                    border-radius:1rem;
                    border:1px double;
                    text-align:center;
                    background-color:white;
                    width:21rem;
                    height:14rem;
                    font-size:1.5rem;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    flex-shrink: 0;
                }
                </style>
            `;
            this.sprite.id = "inner_sprite";
            this.sprite.addEventListener("click",this.onSprite);
            this.page.appendChild(this.sprite);
        }
        private onSprite(){
            open(MAIN_PAGE_URL);
        }
        private intervalSetup (){
            // const elm = document.querySelector("#inner_sprite") as HTMLDivElement;
            setInterval(()=>{
                this.x += 0.2;
                this.sprite.style.bottom = `${Math.abs(Math.sin(this.x)*3)}rem`;
            },20);
        }
        public render (parent:Element) {
            parent.appendChild(this.page) ;
            this.intervalSetup();
        }
    })() ],
])

window.onload = ()=>{
    function renderReadingTime() {
      const a = subPage.get("kakiuchi_sprite");
      if(!a) {
        console.log("kakiuchi_sprite is not found ;")
        return ;
      }
      a.render(document.body);
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