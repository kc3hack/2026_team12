window.addEventListener("message", (event) => {
    // セキュリティのため、送り主が拡張機能が動いているページかチェック
    // if (event.origin !== "https://developer.chrome.com") return;

    console.log("受信データ:", event.data);
    
    if (event.data.type === "CHANGE_COLOR") {
        document.body.style.backgroundColor = event.data.color;
    }
});