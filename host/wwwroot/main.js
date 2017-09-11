// Reasigning the webkit messageHandlers.native to the `host` var
// simplifies later code and allows the iOS and Android versions
// of the code to be consistant.
//
var native = window.webkit.messageHandlers.native





var clicks = 0
function sendCount(){
    
    var callback = function(responseAsJSON)
    {
        var response = JSON.parse(responseAsJSON)
        clicks = response['count']
        document.querySelector("#messages_from_swift").innerText = "Count is "+clicks
    }
    
    var message = {
        "cmd"          : "increment",
        "count"        : clicks,
        "callbackFunc" : callback.toString()
    }
    
    native.postMessage(message)
}

