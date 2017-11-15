// ------- STUB FUNCTIONS FOR COMMUNICATING WITH DEVICE ----------

/*
    fetchImdb()
    --------------
    This fetches the current imdb for the job, passing this back via the callback specified.  
    The callback should accept a single parameter which will be passed a string representation of a JSON object representing the Imdb.
    Example: { "Customer.Name": "David", "Customer.Phone": "02083871762" }

    prefix: Filters the data returned by this call to items starting with the prefix.  If not present then returns the entire Imdb document.
    callback: The method executed to pass the data back.  If not present then a method named OnFetchImdb will be executed.
*/
function fetchImdb(prefix, callback) {
    var scriptModel = {
        Method: "FetchImdb",
        Parameters: {
            Prefix: prefix,
            Callback: callback
        }
    };
    window.external.notify(JSON.stringify(scriptModel));
    //notify(scriptModel);
}

/*
    setImdb()
    --------------
    This sets values within the Imdb, the parameter should be a JSON object representing the items you wish to set.
    Example: { "Customer.Name": "David", "Customer.Phone": "02083871762" }

    values: The JSON object containing the items you wish to set
*/
function setImdb(values) {
    var scriptModel = {
        Method: "SetImdb",
        Parameters: values
    };
    notify(scriptModel);
}

/*
    saveMessage()
    --------------
    Save the message
*/
function saveMessage() {
    var scriptModel = {
        Method: "SaveMessage",
        Parameters: {}
    };
    notify(scriptModel);
}

/*
    closeMessage()
    --------------
    Close the message, if any changes are present the standard are you sure prompt will be shown
*/
function closeMessage() {
    var scriptModel = {
        Method: "CloseMessage",
        Parameters: {}
    };
    notify(scriptModel);
}

/*
    executeFormAction()
    --------------
    Execute a FormAction by name

    title: Title of the FormAction you wish to execute
*/
function executeFormAction(title) {
    var scriptModel = {
        Method: "ExecuteFormAction",
        Parameters: {
            Title: title
        }
    };
    notify(scriptModel);
}


function displayForm(form, version) {
    var scriptModel = {
        Method: "DisplayForm",
        Parameters: {
            Form: form,
            Version: version
        }
    };
    notify(scriptModel);
}


function launchFile(fileLocation, fileSource, version) {
    var scriptModel = {
        Method: "LaunchFile",
        Parameters: {
            FileLocation: fileLocation,
            FileSource: fileSource,
            Version: version
        }
    };
    notify(scriptModel);
}

function loadConfigurationFile(callback, errorCallback) {
    var fileLocation = "Html/config.json";
    var fileSource = undefined;
    var version = undefined;

    var scriptModel = {
        Method: "LoadConfigurationFile",
        Parameters: {
            FileLocation: fileLocation,
            FileSource: fileSource,
            Version: version,
            Callback: function(data){
                callback(JSON.parse(data));
            },
            ErrorCallback: errorCallback
        }
    };
    notify(scriptModel);
}

function deviceLog(message) {
    var scriptModel = {
        Method: "Log",
        Parameters: {
            Message: message
        }
    };
    notify(scriptModel);
}

function notify(json){
    if(window && window.external){
        window.external.notify(JSON.stringify(json));
    }
}


// --- API ---

// Device Functions
var fetchImdbCallback;
function onFetchImdb(imdb){
    fetchImdbCallback(JSON.parse(imdb));
}

function getImdb(callback, errorCallback){
    fetchImdbCallback = callback;
    fetchImdb();
}

function deviceSpecificSetImdb(imdb){
    setImdb(imdb);
}

var getConfigCallback;
function onLoadConfigurationFile(config){
    getConfigCallback(JSON.parse(config));
}

var getConfigCallbackError;
function onLoadConfigurationFileError(err){
    getConfigCallbackError({ message: err });
}

function getConfig(callback, errorCallback){
    getConfigCallback = callback;
    getConfigCallbackError = errorCallback;
    loadConfigurationFile();
}

function dataQueryDevice(name, method, params, postData, callback, errorCallback) {
    deviceDataQuery(name, function(data){
        callback(data);
    }, function(err){
        errorCallback(err);
    });
}

function deviceDataQuery(name, callback, errorCallback) {
    var scriptModel = {
        Method: "DataQuery",
        Parameters: {
            Name: name
        }
    };
    notify(scriptModel);
}

taapApi.isReady = true;