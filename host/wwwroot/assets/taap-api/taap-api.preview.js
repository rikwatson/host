var previewId = "0";

(function(){
    var index = window.location.href.indexOf("id=");
    if(index != -1){
        var tempId = window.location.href.substring(index + 3, window.location.href.length);
        
        previewId = tempId;
    }
})();

// Browser Functions

function getConfig(callback, errorCallback){
    httpRequest(window.location.origin + "/preview/getconfig/?id=" + previewId, function(result){
        callback(result);
    },
    function(err){
      errorCallback(err);
    });
}

function dataQueryPreview(name, method, params, postData, callback, errorCallback) {
    var paramString = "";
    if (params) {
        for (var i = 0; i < params.length; i++) {
            paramString += "&" + params[i].key + "=" + params[i].value;
        }
    }

    if(method === "get"){
        httpRequest(window.location.origin + "/preview/dataquery/?id=" + previewId +"&name=" + name + paramString, function (result) {
            callback(result);
        },
        function(err){
        errorCallback(err);
    });
    }
    else if (method === "post"){
        httpPostRequest(window.location.origin + "/preview/dataquery/?id=" + previewId + "&name=" + name + paramString, postData, function(result){
            callback(result);
        },
        function(err){
            errorCallback(err);
        });
    }

}

function navigate(name, imdbSubset, callback, errorCallback) {
    var sessionId = getSessionId();

    if (imdbSubset) {
        httpPostRequest(window.location.origin + "/preview/navigate/?SessionId=" + sessionId + "&id=" + previewId + "&name=" + name, imdbSubset, function (result) {
            callback(result);
        },
            function (err) {
                errorCallback(err);
            });
    }
    else {
        httpRequest(window.location.origin + "/preview/navigate/?SessionId=" + sessionId + "&id=" + previewId + "&name=" + name, function (result) {
            callback(result);
        },
        function (err) {
            errorCallback(err);
        });
    }
}

taapApi.isReady = true;