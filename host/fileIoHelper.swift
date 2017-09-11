//
//  fileIoHelper.swift
//  host
//
//  Created by Rik Watson on 11/09/2017.
//  Copyright © 2017 Rik Watson. All rights reserved.
//

import Foundation

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
