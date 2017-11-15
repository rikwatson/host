// Browser Functions

function getConfig(callback, errorCallback){
    httpRequest(window.location + "api/getconfig", function(result){
        callback(result);
    },
    function(err){
      errorCallback(err);
    });
}

function navigate(name, imdbSubset, callback, errorCallback) {
    var sessionId = getSessionId();

    if(imdbSubset){
        httpPostRequest(window.location + "api/navigate?SessionId=" + sessionId + "&name=" + name, imdbSubset, function(result){
            callback(result);
        },
        function(err){
            errorCallback(err);
        });
    }
    else{
        httpRequest(window.location + "api/navigate?SessionId=" + sessionId + "&name=" + name, function (result) {
            callback(result);
        },
        function (err) {
            errorCallback(err);
        });
    }
}

function dataQueryBrowser(name, method, params, postData, callback, errorCallback) {
    var paramString = "";
    if (params) {
        for (var i = 0; i < params.length; i++) {
            paramString += "&" + params[i].key + "=" + params[i].value;
        }
    }

    if(method === "get"){
        httpRequest(window.location + "api/dataquery?name=" + name + paramString, function (result) {
            callback(result);
        },
        function(err){
        errorCallback(err);
    });
    }
    else if (method === "post"){
        httpPostRequest(window.location + "api/dataquery?name=" + name + paramString, postData, function(result){
            callback(result);
        },
        function(err){
            errorCallback(err);
        });
    }

}

taapApi.isReady = true;