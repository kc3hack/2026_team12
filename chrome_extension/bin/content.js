/**
 * 誰かに読ませる気ははなからないコードを書いています。
 * 評価の人ごめんなさい。
 */
var MAIN_PAGE_URL = "http://localhost:5173";
var mainPage = new (/** @class */ (function () {
    function class_1() {
        this.iframe_load = false;
        this.message_queue = [];
        this.page = this.update_page();
    }
    class_1.prototype.update_page = function () {
        var _this = this;
        var badge = document.createElement("div");
        this.iframe = document.createElement("iframe");
        this.iframe.src = MAIN_PAGE_URL;
        this.iframe.style.cssText = "width:100%; height:50vw;";
        badge.appendChild(this.iframe);
        this.iframe.addEventListener("load", function () {
            var _a, _b;
            _this.iframe_load = true;
            console.log("送信");
            for (var _i = 0, _c = _this.message_queue; _i < _c.length; _i++) {
                var b = _c[_i];
                (_b = (_a = _this.iframe) === null || _a === void 0 ? void 0 : _a.contentWindow) === null || _b === void 0 ? void 0 : _b.postMessage(b);
            }
            _this.message_queue = [];
        });
        return badge;
    };
    class_1.prototype.render = function (html) {
        html.insertAdjacentElement("beforebegin", this.page);
    };
    class_1.prototype.sendMessageToLocal = function (data) {
        if (this.iframe && this.iframe.contentWindow)
            if (this.iframe_load) {
                this.iframe.contentWindow.postMessage(data, "*");
            }
            else {
                this.message_queue.push(data);
            }
    };
    return class_1;
}()))();
var subPage = new Map([
    ["kakiuchi_sprite", new (/** @class */ (function () {
            function P1() {
                var _this = this;
                this.page = document.createElement("div");
                this.sprite = document.createElement("div");
                this.name = "kakiuchi_sprite";
                this.x = 0;
                this.pItem = "";
                this.isStartInterval = false;
                this.onSprite = function () {
                    var sendData = encodeURIComponent(_this.pItem);
                    open("".concat(MAIN_PAGE_URL, "/?name=").concat(sendData));
                };
                this.isItemEventSet = false;
                this.sprite.style.position = "fixed";
                this.sprite.style.bottom = "0rem";
                this.sprite.style.left = "0rem";
                this.sprite.style.width = "20rem";
                this.sprite.style.zIndex = "100000";
                this.updateSprite("<p>\u3044\u3084\u30FC\uFF01\u2764\uFE0F</p>\n                <p>\u30E9\u30F3\u30D7\u306E\u9B54\u4EBA\u3060\u3088\uD83D\uDE04</p>\n                ");
                this.sprite.id = "inner_sprite";
                this.sprite.addEventListener("click", this.onSprite);
                this.page.appendChild(this.sprite);
            }
            P1.prototype.updateSprite = function (text) {
                var imageUrl = chrome.runtime.getURL("bin/Assets/kakiuchi.png");
                this.sprite.innerHTML = "\n                <div style=\"display: flex; align-items: center; gap: 1rem;\">\n                    <img src=\"".concat(imageUrl, "\" style=\"flex-shrink: 0; width: 12rem; height: 20rem;\">\n                    <div class=\"bubble\">\n                        ").concat(text, "\n                    </div>\n                </div>\n                <style>\n                .bubble{\n                    border-radius:1rem;\n                    border:1px double;\n                    text-align:center;\n                    background-color:white;\n                    width:21rem;\n                    height:14rem;\n                    font-size:1.5rem;\n                    display: flex;\n                    flex-direction: column;\n                    align-items: center;\n                    justify-content: center;\n                    flex-shrink: 0;\n                    padding:0.8rem;\n                }\n                </style>\n            ");
            };
            P1.prototype.intervalSetup = function () {
                var _this = this;
                // const elm = document.querySelector("#inner_sprite") as HTMLDivElement;
                if (!this.isStartInterval) {
                    setInterval(function () {
                        _this.x += 0.2;
                        _this.sprite.style.bottom = "".concat(Math.abs(Math.sin(_this.x) * 3), "rem");
                    }, 20);
                    this.isStartInterval = true;
                }
            };
            P1.prototype.updateItem = function (parent) {
                var _this = this;
                // 明示的にキャストしておきます
                var elm = parent.querySelector("#twotabsearchtextbox");
                elm = elm !== null && elm !== void 0 ? elm : parent.querySelector("#nav-search-keywords");
                if (elm) {
                    elm.addEventListener("input", function (e) {
                        var IElm = e.target;
                        _this.pItem = IElm.value;
                        if (IElm.value == "") {
                            _this.updateSprite("\n                            <p>\u30A2\u30EB\u30B3\u30FC\u30EB\u30E9\u30F3\u30D7\uD83E\uDE94\u306E\u307E\u3058\u3093\u3060\u3088?</p>\n                            <p>\u4F55\u3092\u8CB7\u3046\u306E\u304B\u306A\uFF1F</p>\n                        ");
                        }
                        else {
                            _this.updateSprite("\n                            <p>\u541B\u306F</p>\n                            <p>".concat(IElm.value, "</p>\n                            <p>\u304C\u6B32\u3057\u3044\u306E\u304B\u306A\uFF1F\uFF1F</p>\n                        "));
                        }
                    });
                    this.isItemEventSet = true;
                }
            };
            P1.prototype.render = function (parent) {
                parent.appendChild(this.page);
                if (!this.isItemEventSet)
                    this.updateItem(parent);
                this.intervalSetup();
            };
            return P1;
        }()))()],
]);
window.onload = function () {
    function renderReadingTime() {
        var a = subPage.get("kakiuchi_sprite");
        if (!a) {
            console.log("kakiuchi_sprite is not found ;");
            return;
        }
        a.render(document.body);
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
};
