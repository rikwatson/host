var taapApi = {
 isReady: false,
 onReady: function(callback){
    if(taapApi.isReady){
      callback();
    }
    else{
      setTimeout(function() {
        taapApi.onReady(callback);
      }, 50);
    }
  }
};

var main = function(platform){
  document.write("<script src='assets/taap-api/taap-api.helpers.js' ><\/script>");

  if(platform === "Browser"){
    document.write("<script src='assets/taap-api/taap-api.browser.js' ><\/script>");
  }
  else if(platform === "Device"){
    document.write("<script src='assets/taap-api/taap-api.device.js' ><\/script>");
  }
  else if(platform === "Preview"){
    document.write("<script src='assets/taap-api/taap-api.preview.js' ><\/script>");
  }
  else{
    document.write("<script src='assets/taap-api/taap-api.debug.js' ><\/script>");
  }
};

main(PlatformType);