// Http request wrapper
function httpRequest(url, callback, errorCallback) {
    var xhr = new XMLHttpRequest();
    xhr.open("GET", url, true);
    xhr.setRequestHeader("If-Modified-Since", "Mon, 26 Jul 1997 05:00:00 GMT");
    xhr.setRequestHeader("Cache-Control", "no-cache");
    xhr.setRequestHeader("Pragma", "no-cache");

    processGetPostRequestHelper(xhr, callback, errorCallback);

    xhr.send(null);
}

function httpPostRequest(url, postData, callback, errorCallback) {
    var xhr = new XMLHttpRequest();
    xhr.open("POST", url, true);
    xhr.setRequestHeader("Content-type", "application/json");

    processGetPostRequestHelper(xhr, callback, errorCallback);

    xhr.send(JSON.stringify(postData));
}


// Common GET/POST request handler
function processGetPostRequestHelper(xhr, callback, errorCallback){
    xhr.timeout = 10000;
    xhr.ontimeout = function(e){
      errorCallback({ status: 504, message: "The request to the server timed out." });
    }

    xhr.onreadystatechange = function () {
        if (xhr.readyState == XMLHttpRequest.DONE) {
          if(xhr.status === 200){
            console.log(xhr.responseText);
            var result = JSON.parse(xhr.responseText);
            if (result.hasOwnProperty("success") && !result.success)
              errorCallback(result);
            else
            {
                var responseType = xhr.getResponseHeader("X-TAAP-Response");

                if(!responseType)
                {
                    callback(result);
                    return;
                }

                responseType = responseType.toLowerCase();

                if(responseType === "imdb"){
                    callback(result);
                }
                else if(responseType === "urlredirect")
                {
                    window.open(result.url, '_blank');
                    callback({});
                }
                else if(responseType === "download")
                {
                    var dl = document.createElement("a");
                    dl.href = result.url;
                    dl.style.visibility = "hidden";
                    dl.download = result.name;
                    dl.click();
                    callback({});
                }
                else{
                    callback(result);
                }
            }
          }
          else if(xhr.status === 404){
            errorCallback({ status: xhr.status, message: "Status code 404 - The remote endpoint of the request was not found" });
          }
          else if(xhr.status === 204){
            var errorObject = JSON.parse(xhr.responseText)
            errorCallback({ status: xhr.status, message: errorObject.message });
          }
          else{
            errorCallback({ status: xhr.status, message: xhr.responseText });
          }
        }
    }
}

// Session
var taapSession = {};

if(PlatformType === "Device"){
    // Query device for cached user session
}

function setSessionValue(key, value){
    if(key.startsWith("Session."))
        key = key.replace("Session.", "");

    taapSession[key] = value;
}

function getSessionValue(key){
    if(taapSession[key])
        return taapSession[key];

    return "";
}

function getSessionId()
{
  if(taapSession && taapSession["Id"]){
    return taapSession["Id"];
  }

  return "";
}

// Data Query middleware

function dataQueryCallbackMiddleware(callback){
  return function(data){
      var keys = Object.keys(data);
      for(var i = 0; i < keys.length; i++){
          if(keys[i].startsWith("Session.")){
              setSessionValue(keys[i], data[keys[i]]);
              delete data[keys[i]];
          }
      }

      callback(data);
  }
}

function dataQuery(name, method, params, postData, callback, errorCallback)
{
    var sessionId = getSessionId();
    params.push({ key: "SessionId", value: sessionId });

    if(PlatformType === "Debug"){
        dataQueryDebug(name, method, params, postData, dataQueryCallbackMiddleware(callback), errorCallback);
    }
    else if(PlatformType === "Browser"){
        dataQueryBrowser(name, method, params, postData, dataQueryCallbackMiddleware(callback), errorCallback);
    }
    else if(PlatformType === "Device"){
        dataQueryDevice(name, method, params, postData, dataQueryCallbackMiddleware(callback), errorCallback);
    }
    else if(PlatformType === "Preview"){
        dataQueryPreview(name, method, params, postData, dataQueryCallbackMiddleware(callback), errorCallback);
    }
}