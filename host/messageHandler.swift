//  messageHandler.swift
//  host
//
//  Created by Rik Watson on 11/09/2017.
//  Copyright © 2017 Rik Watson. All rights reserved.
//
import Foundation

import WebKit
import Zip
import os.log

class messageHandler:NSObject, WKScriptMessageHandler {
    var appWebView:WKWebView?

/*

import UIKit
import WebKit

class ViewController: UIViewController, WKNavigationDelegate {

    var webView: WKWebView!

    override func loadView() {
        webView = WKWebView()
        webView.navigationDelegate = self
        view = webView
    }

    override func viewDidLoad() {
        super.viewDidLoad()
        if let url = Bundle.main.url(forResource: "file", withExtension: "txt")
        {
            do
            {
                let contents = try String(contentsOfFile: url.path)
                webView.loadHTMLString(contents, baseURL: url.deletingLastPathComponent())
            }
            catch
            {
                print("Could not load the HTML string.")
            }
        }
    }
}

*/
    
    var logString = ""
    
    init(theController:ViewController){
        super.init()
        let theConfiguration = WKWebViewConfiguration()
//        let unzipDirectory: URL = getWwwRoot()

        
        theConfiguration.userContentController.add(self, name: "native")

        appWebView = WKWebView(frame: theController.view.frame, configuration: theConfiguration)
/*
        let zipURL = URL(fileURLWithPath: "wwwroot/index.html", relativeTo: unzipDirectory as URL?)
        
        os_log ("zipURL = %{public}@", zipURL.absoluteString )
        
        my_log ("zipURL = " + zipURL.absoluteString )
        
        let request = URLRequest(url: zipURL) // unzipDirectory)
        
        my_log ("Request is " + request.debugDescription)
        my_log("Hello!")
        
*/
        
        let htmlPath = Bundle.main.path(forResource: "index", ofType: "html")
        let htmlUrl = URL(fileURLWithPath: htmlPath!, isDirectory: false)
        let request = URLRequest(url: htmlUrl)
        
        
         // appWebView!.loadFileURL(zipURL, allowingReadAccessTo: zipURL)
         // appWebView!.navigationDelegate = self
        appWebView!.load(request)
        
        theController.view.addSubview(appWebView!)
    }
    
    func my_log(_ str: String) {
        
        os_log ("%{public}@", str)
        
        let viewportString = "<meta name='viewport' content='width=device-width'><meta name='viewport' content='initial-scale=1.0'>"

        
        logString += ("<pre>"+str+"</pre>")
        
        
        if (appWebView != nil) {
        
            appWebView!.loadHTMLString("<html>"+viewportString+"<body>"+logString+"</body></html>", baseURL: nil)
        }
    }
    
    func getWwwRoot() -> URL {
        
        var unzipDirectory: URL
        
        let htmlPath = Bundle.main.path(forResource: "index", ofType: "html")
        
        my_log ("htmlPath = \(htmlPath!)" )
        
        let htmlUrl = URL(fileURLWithPath: htmlPath!, isDirectory: false)
        
        my_log ("htmlUrl = \(htmlUrl)" )
        
        
        my_log  ("Start doUnzip")
        
        do {
            let filePath = Bundle.main.url(forResource: "wwwroot", withExtension: "zip")!
            unzipDirectory = try Zip.quickUnzipFile(filePath) // Unzip
            
            my_log ("unzipDirectory = \(unzipDirectory)")
            
            // let zipFilePath = try Zip.quickZipFiles([filePath], fileName: "archive") // Zip
        }
        catch {
            my_log("Something went wrong")
            return htmlUrl
        }
        
        my_log  ("End doUnzip")
        
        return unzipDirectory
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
