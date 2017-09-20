import UIKit
import WebKit


class ViewController: UIViewController, WKUIDelegate, WKNavigationDelegate, WKScriptMessageHandler {
    
    var webView: WKWebView!
    
    var theHandler:messageHandler?

    
    override func viewDidLoad() {
        super.viewDidLoad()

        
        theHandler = messageHandler(theController: self)

/*
        fileIOtest()
        
        let webView = WKWebView()

        if (1 < 0) {
            let myURL = URL(string: "https://www.apple.com")
            let myRequest = URLRequest(url: myURL!)
            webView.load(myRequest)
            view = webView
            return
        }

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
        

 */
        
        
    }
    
    func webView(_ webView: WKWebView, didFinish navigation: WKNavigation!) {
        print("Finished navigating to url \(String(describing: webView.url))")
    }
    
    
    
    func webView(_ webView: WKWebView, runJavaScriptAlertPanelWithMessage message: String, initiatedByFrame frame: WKFrameInfo,
                 completionHandler: @escaping () -> Void) {
        
        let alertController = UIAlertController(title: nil, message: message, preferredStyle: .actionSheet)
        alertController.addAction(UIAlertAction(title: "OK", style: .default, handler: { (action) in
            completionHandler()
        }))
        
        present(alertController, animated: true, completion: nil)
    }
    
    
    func webView(_ webView: WKWebView, runJavaScriptConfirmPanelWithMessage message: String, initiatedByFrame frame: WKFrameInfo,
                 completionHandler: @escaping (Bool) -> Void) {
        
        let alertController = UIAlertController(title: nil, message: message, preferredStyle: .actionSheet)
        
        alertController.addAction(UIAlertAction(title: "OK", style: .default, handler: { (action) in
            completionHandler(true)
        }))
        
        alertController.addAction(UIAlertAction(title: "Cancel", style: .default, handler: { (action) in
            completionHandler(false)
        }))
        
        present(alertController, animated: true, completion: nil)
    }
    
    
    func webView(_ webView: WKWebView, runJavaScriptTextInputPanelWithPrompt prompt: String, defaultText: String?, initiatedByFrame frame: WKFrameInfo,
                 completionHandler: @escaping (String?) -> Void) {
        
        let alertController = UIAlertController(title: nil, message: prompt, preferredStyle: .actionSheet)
        
        alertController.addTextField { (textField) in
            textField.text = defaultText
        }
        
        alertController.addAction(UIAlertAction(title: "OK", style: .default, handler: { (action) in
            if let text = alertController.textFields?.first?.text {
                completionHandler(text)
            } else {
                completionHandler(defaultText)
            }
        }))
        
        alertController.addAction(UIAlertAction(title: "Cancel", style: .default, handler: { (action) in
            completionHandler(nil)
        }))
        
        present(alertController, animated: true, completion: nil)
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
 

 
 */
