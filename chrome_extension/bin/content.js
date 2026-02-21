var mainPage = new (/** @class */ (function () {
    function class_1() {
        this.url = "http://localhost:5173";
        this.page = this.update_page();
    }
    class_1.prototype.update_page = function () {
        var badge = document.createElement("div");
        this.iframe = document.createElement("iframe");
        this.iframe.src = this.url;
        this.iframe.style.cssText = "width:100%; height:50vw;";
        badge.appendChild(this.iframe);
        return badge;
    };
    class_1.prototype.render = function (html) {
        html.insertAdjacentElement("beforebegin", this.page);
    };
    class_1.prototype.sendMessageToLocal = function (data) {
        if (this.iframe && this.iframe.contentWindow) {
            this.iframe.contentWindow.postMessage(data, this.url);
        }
    };
    return class_1;
}()))();
function renderReadingTime() {
    mainPage.render(document.body);
    mainPage.sendMessageToLocal("hello");
}
renderReadingTime();
var observer = new MutationObserver(function (mutations) {
    for (var _i = 0, mutations_1 = mutations; _i < mutations_1.length; _i++) {
        var mutation = mutations_1[_i];
        // If a new article was added.
        for (var i = 0; i < mutation.addedNodes.length; i++) {
            renderReadingTime();
        }
    }
});
// https://developer.chrome.com/ is a SPA (Single Page Application) so can
// update the address bar and render new content without reloading. Our content
// script won't be reinjected when this happens, so we need to watch for
// changes to the content.
(function () {
    var ob_elm = document.querySelector('#a-page');
    if (!ob_elm)
        return;
    console.log("#a-pageが見つかりませんでした。");
    observer.observe(ob_elm, {
        childList: true
    });
})();
