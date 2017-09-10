import UIKit
import WebKit

class ViewController: UIViewController, WKUIDelegate, WKNavigationDelegate, WKScriptMessageHandler {
    
    var webView: WKWebView!
    
    override func loadView() {
        super.loadView()
        
        let contentController = WKUserContentController();
        
        let userScript = WKUserScript(
            source: "redHeader()",
            injectionTime: WKUserScriptInjectionTime.atDocumentEnd,
            forMainFrameOnly: true)
        
        contentController.addUserScript(userScript)
        contentController.add(
            self,
            name: "callbackHandler")
        
        let webConfiguration = WKWebViewConfiguration()
        webConfiguration.userContentController = contentController
        
        webView = WKWebView(frame: .zero, configuration: webConfiguration)
        webView.uiDelegate = self
        
        view = webView
        
    }
    
    /*
     override func viewDidLoad() {
     super.viewDidLoad()
     
     let myURL = URL(string: "https://www.apple.com")
     let myRequest = URLRequest(url: myURL!)
     webView.load(myRequest)
     }
     
     */
    
    override func viewDidLoad() {
        super.viewDidLoad()
        
        
        
        
        let webView = WKWebView()
        let htmlPath = Bundle.main.path(forResource: "index", ofType: "html")
        let htmlUrl = URL(fileURLWithPath: htmlPath!, isDirectory: false)
        webView.loadFileURL(htmlUrl, allowingReadAccessTo: htmlUrl)
        webView.navigationDelegate = self
        view = webView
        
        
        delay(0.1) {
            print("PRE")
            webView.evaluateJavaScript("redHeader()") { (result, error) in
                if error != nil {
                    print(result ?? "Error message here")
                }
            }
            print("POST")
        }
        
        
        fileIOtest()
        
        
    }
    
    func webView(_ webView: WKWebView, didFinish navigation: WKNavigation!) {
        print("Finished navigating to url \(String(describing: webView.url))")
    }
    
    
    func userContentController(_ userContentController: WKUserContentController, didReceive message: WKScriptMessage) {
        
        print("userContentController called")
        
        let body = message.body
        if let dict = body as? Dictionary<String, AnyObject> {
            if let test = dict["key1"] {
                print("JavaScript is sending a message \(test)")
            }
        }
    }
    
    func userContentController___UNUSED(_ userContentController: WKUserContentController, didReceive message: WKScriptMessage) {
        if(message.name == "callbackHandler") {
            print("JavaScript is sending a message \(message.body)")
        }
    }
    
    override func didReceiveMemoryWarning() {
        super.didReceiveMemoryWarning()
        // Dispose of any resources that can be recreated.
    }
    
    func delay(_ delay:Double, closure:@escaping ()->()) {
        let when = DispatchTime.now() + delay
        DispatchQueue.main.asyncAfter(deadline: when, execute: closure)
    }
    
    func fileIOtest() {
        
        // Save data to file
        let fileName = "Test"
        let DocumentDirURL = try! FileManager.default.url(for: .documentDirectory, in: .userDomainMask, appropriateFor: nil, create: true)
        
        let fileURL = DocumentDirURL.appendingPathComponent(fileName).appendingPathExtension("txt")
        print("FilePath: \(fileURL.path)")
        
        let writeString = "Write this text to the fileURL as text in iOS using Swift"
        
        do {
            // Write to the file
            try writeString.write(to: fileURL, atomically: true, encoding: String.Encoding.utf8)
        } catch let error as NSError {
            print("Failed writing to URL: \(fileURL), Error: " + error.localizedDescription)
        }
        
        var readString = "" // Used to store the file contents
        do {
            // Read the file contents
            readString = try String(contentsOf: fileURL)
        } catch let error as NSError {
            print("Failed reading from URL: \(fileURL), Error: " + error.localizedDescription)
        }
        print("File Text: \(readString)")
    }
}


/*
 
 import UIKit
 import WebKit
 
 class ViewController: UIViewController, WKScriptMessageHandler {
 
 @IBOutlet var containerView : UIView! = nil
 var webView: WKWebView?
 
 override func loadView() {
 super.loadView()
 
 var contentController = WKUserContentController();
 var userScript = WKUserScript(
 source: "redHeader()",
 injectionTime: WKUserScriptInjectionTime.AtDocumentEnd,
 forMainFrameOnly: true
 )
 contentController.addUserScript(userScript)
 contentController.addScriptMessageHandler(
 self,
 name: "callbackHandler"
 )
 
 var config = WKWebViewConfiguration()
 config.userContentController = contentController
 
 self.webView = WKWebView(
 frame: self.containerView.bounds,
 configuration: config
 )
 self.view = self.webView!
 }
 
 override func viewDidLoad() {
 super.viewDidLoad()
 
 var url = NSURL(string:"http://localhost/~raw/tests/WKDemo/")
 var req = NSURLRequest(URL:url)
 self.webView!.loadRequest(req)
 }
 
 func userContentController(userContentController: WKUserContentController!, didReceiveScriptMessage message: WKScriptMessage!) {
 if(message.name == "callbackHandler") {
 println("JavaScript is sending a message \(message.body)")
 }
 }
 
 override func didReceiveMemoryWarning()...
 }
 
 
 
 */


//
//  ViewController.swift
//  host
//
//  Created by Rik Watson on 09/09/2017.
//  Copyright © 2017 Rik Watson. All rights reserved.
/*

import UIKit

class ViewController: UIViewController {

    override func viewDidLoad() {
        super.viewDidLoad()
        // Do any additional setup after loading the view, typically from a nib.
    }

    override func didReceiveMemoryWarning() {
        super.didReceiveMemoryWarning()
        // Dispose of any resources that can be recreated.
    }


}
*/
