//  messageHandler.swift
//  host
//
//  Created by Rik Watson on 11/09/2017.
//  Copyright © 2017 Rik Watson. All rights reserved.
//
import Foundation

import WebKit

class messageHandler:NSObject, WKScriptMessageHandler {
    var appWebView:WKWebView?
    
    init(theController:ViewController){
        super.init()
        let theConfiguration = WKWebViewConfiguration()
        
        theConfiguration.userContentController.add(self, name: "native")

        appWebView = WKWebView(frame: theController.view.frame, configuration: theConfiguration)
        
        let htmlPath = Bundle.main.path(forResource: "index", ofType: "html")
        let htmlUrl = URL(fileURLWithPath: htmlPath!, isDirectory: false)
        let request = URLRequest(url: htmlUrl)
        appWebView!.load(request)
        theController.view.addSubview(appWebView!)
    }
    
    func userContentController(_ userContentController: WKUserContentController, didReceive message: WKScriptMessage) {
        let sentData = message.body as! NSDictionary
        
        print("SentData")
        print(sentData)
        
        let command = sentData["cmd"] as! String
        var response = Dictionary<String,AnyObject>()
        
        
        if command == "increment" {
            guard var count = sentData["count"] as? Int else {
                return
            }
            count += 1
            response["count"] = count as AnyObject
        }
        let callbackString = sentData["callbackFunc"] as? String
        sendResponse(aResponse: response, callback: callbackString)
    }
    
    
    func sendResponse(aResponse:Dictionary<String,AnyObject>, callback:String?){
        
        print("Send Response")
        print(aResponse)
        print("to")
        print(callback as Any)
        
        guard let callbackString = callback else {
            return
        }
        guard let generatedJSONData = try? JSONSerialization.data(withJSONObject: aResponse, options: JSONSerialization.WritingOptions(rawValue: 0)) else {
            print("failed to generate JSON for \(aResponse)")
            return
        }
        
        let script = "(\(callbackString)('\(String(data:generatedJSONData, encoding: .utf8)!)'))"
        
        appWebView!.evaluateJavaScript(script){(JSReturnValue:Any?, error:Error?) in
            if let errorDescription = error?.localizedDescription {
                print("returned value: \(errorDescription)")
            } else if JSReturnValue != nil {
                print("returned value: \(JSReturnValue!)")
            } else {
                print("no return from JS")
            }
        }
    }
}
