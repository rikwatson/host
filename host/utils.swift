//
//  utils.swift
//  host
//
//  Created by Rik Watson on 11/09/2017.
//  Copyright © 2017 Rik Watson. All rights reserved.
//

import Foundation

func delay(_ delay:Double, closure:@escaping ()->()) {
    let when = DispatchTime.now() + delay
    DispatchQueue.main.asyncAfter(deadline: when, execute: closure)
}
