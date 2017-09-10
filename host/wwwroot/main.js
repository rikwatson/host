function callNativeApp () {
    
    console.log("callNativeApp()")
    
    try {
        var dictionary = {"key1":"value1", "key2":"value2", "subDictionary": {"name": "foo"}}
        window.webkit.messageHandlers.callbackHandler.postMessage(dictionary);
    } catch(error) {
        console.log('The native context does not exist yet');
        console.log(error)
    }
}

setTimeout(function () {
           callNativeApp();
           }, 5000);

function redHeader() {
    document.querySelector('h1').style.color = "red";
}
