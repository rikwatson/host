// Debug functions

function dataQueryDebug(name, method, params, postData, callback, errorCallback){
  
  if(parent.ideDbConnectionString)
    dqDB(name, method, params, postData, callback, errorCallback);
  else
    dqLocal(name, method, params, postData, callback, errorCallback);
}

function dqLocal(name, method, params, postData, callback, errorCallback){
  var result = {};
  var temp = [];
  if(parent.dataQueries){
    temp = parent.dataQueries;
  }
  else{
    temp = dataQueries;
  }
  
  if(method === "post"){
    console.log("Data Query with name '"+ name +"' posted data:");
    console.log(JSON.stringify(postData, null, 2));
  }
  
  for(var i = 0; i < temp.length; i++){
      if(temp[i]["name"] === name){
          var isMatch = true;

          if(temp[i]["params"]){

              for(var p = 0; p < params.length; p++){
                  var paramKey = params[p].key;
                  if(paramKey.startsWith("DQ-"))
                    paramKey = paramKey.replace("DQ-", "");
                  else
                    continue;
                  
                  if(!temp[i]["params"][paramKey] || temp[i]["params"][paramKey] !== params[p].value){
                      isMatch = false;
                  }
              }
          }
          
          if(isMatch){
              if(temp[i]["result"]){
                  result = JSON.parse(JSON.stringify(temp[i]["result"]));
              }
          }
      }
  }

  callback(result);
}

function dqDB(name, method, params, postData, callback, errorCallback){
  var paramString = "";
  if (params) {
      for (var i = 0; i < params.length; i++) {
          paramString += "&" + params[i].key + "=" + params[i].value;
      }
  }

  if(method === "get"){
      httpRequest(window.location.origin + "/ide/dataquery?dbq="+ parent.ideDbConnectionString +"&name=" + name + paramString, function (result) {
          callback(result);
      },
      function(err){
      errorCallback(err);
  });
  }
  else if (method === "post"){
      httpPostRequest(window.location.origin + "/ide/dataquery?dbq="+ parent.ideDbConnectionString +"&name=" + name + paramString, postData, function(result){
          callback(result);
      },
      function(err){
          errorCallback(err);
      });
  }
}

function navigate(name, imdbSubset, callback, errorCallback) {
    var pointerForms = parent.forms ? parent.forms : forms;

    if(!pointerForms){
      errorCallback({ message: "Failed to find a form with the name '" + name + "'" });
      return;
    }

    for(var i = 0 ; i < pointerForms.length; i++){
      if(pointerForms[i].name === name){
        var form = JSON.parse(JSON.stringify(pointerForms[i]));
        if(imdbSubset){
          Object.assign(form.imdb, imdbSubset);
        }
        callback(form);
        return;
      }
    }

    errorCallback({ message: "Failed to find a form with the name '" + name + "'" });
}

var forms = 
[
  {
    "name": "Home",
    "imdb": {
      "DataTableExampleList.ListItems": "0,1",
      "DataTableExampleList.0.Col1": "Val1",
      "DataTableExampleList.0.Col2": "Val2",
      "DataTableExampleList.0.Col3": "Val3",
      "DataTableExampleList.1.Col1": "Val1",
      "DataTableExampleList.1.Col2": "Val2",
      "DataTableExampleList.1.Col3": "Val3",
      "CalcList.ListItems": "0,1,2",
      "CalcList.0.Col1": "10",
      "CalcList.0.Col2": "20",
      "CalcList.1.Col1": "30",
      "CalcList.1.Col2": "40",
      "CalcList.2.Col1": "50",
      "CalcList.2.Col2": "60",
      "Val1": "10",
      "Val2": "3",
      "CalcExpression": "{Val1}*{Val2}",
      "DateTime": "09/12/2016 11:29",
    },
    "form": {
      "type": "form",
      "settings": {
        "datetimeformat": "MM/DD/YYYY HH:mm"
      },
      "scripts": [
        {
          "type": "jsscript",
          "name": "PreFillDateTimeScript",
          "script": "var val = api.getValue('PreFilledDateTime'); val.value = new Date().toISOString(); api.setValue(val); var val2 = api.getValue('SetFromScript'); val2.text = 'Set From Script'; api.setValue(val2);"
        }
      ],
      "menu": {
        "type": "menu",
        "logotext": "LOGO",
        "logo": "https://www.tescoplc.com/assets/images/logos/tesco-logo.svg",
        "items": [
          {
            "type": "menuitem",
            "label": "Item 1",
            "align": "left",
            "items": [
              {
                "type": "menuitem",
                "label": "Item 1",
                "align": "left",
                "items": [
                  {
                    "type": "menuitem",
                    "label": "Item 5",
                    "align": "left",
                    "clickevent": {
                      "actions": [
                        {
                          "type": "navigateaction",
                          "name": "form2"
                        }
                      ]
                    }
                  },
                  {
                    "type": "menuitem",
                    "label": "Item 6 Long Text",
                    "align": "left",
                    "items": [
                      {
                        "type": "menuitem",
                        "label": "Item 5",
                        "align": "left",
                        "clickevent": {
                          "actions": [
                            {
                              "type": "navigateaction",
                              "name": "form2"
                            }
                          ]
                        }
                      },
                      {
                        "type": "menuitem",
                        "label": "Item 6",
                        "align": "left",
                        "items": [
                          {
                            "type": "menuitem",
                            "label": "Item 5",
                            "align": "left",
                            "clickevent": {
                              "actions": [
                                {
                                  "type": "navigateaction",
                                  "name": "form2"
                                }
                              ]
                            }
                          },
                          {
                            "type": "menuitem",
                            "label": "Item 6",
                            "align": "left"
                          }
                        ]
                      }
                    ]
                  }
                ]
              },
              {
                "type": "menuitem",
                "label": "Item 2",
                "align": "left",
                "items": [{
                  "type": "menuitem",
                  "label": "Item 5",
                  "align": "left",
                  "clickevent": {
                    "actions": [
                      {
                        "type": "navigateaction",
                        "name": "form2"
                      }
                    ]
                  }
                }]
              }
            ] 
          },
          {
            "type": "menuitem",
            "label": "Item 3",
            "align": "right",
            "items": [
              {
                "type": "menuitem",
                "label": "Item 5",
                "align": "left",
                "clickevent": {
                  "actions": [
                    {
                      "type": "navigateaction",
                      "name": "form2"
                    }
                  ]
                }
              },
              {
                "type": "menuitem",
                "label": "Item 6",
                "align": "left",
                "items": [
                  {
                    "type": "menuitem",
                    "label": "Item 5",
                    "align": "left",
                    "clickevent": {
                      "actions": [
                        {
                          "type": "navigateaction",
                          "name": "form2"
                        }
                      ]
                    }
                  },
                  {
                    "type": "menuitem",
                    "label": "Item 6",
                    "align": "left",
                    "items": [
                      {
                        "type": "menuitem",
                        "label": "Item 5",
                        "align": "left",
                        "clickevent": {
                          "actions": [
                            {
                              "type": "navigateaction",
                              "name": "form2"
                            }
                          ]
                        }
                      },
                      {
                        "type": "menuitem",
                        "label": "Item 6",
                        "align": "left"
                      }
                    ]
                  }
                ]
              }
            ] 
          },
          {
            "type": "menuitem",
            "label": "Item 2",
            "align": "left" 
          },
          {
            "type": "menuitem",
            "label": "Item 4",
            "align": "right" 
          }
        ]
      },
      "footer": {
        "buttons": [
          {
            "type": "button",
            "label": "Action 1",
            "events": [
              {
                "type": "clickevent",
                "actions": [
                  {
                    "type": "showmessageboxaction",
                    "title": "Action 1",
                    "message": "You clicked action 1!"
                  }
                ]
              }
            ]
          },
          {
            "type": "button",
            "label": "Action 1",
            "events": [
              {
                "type": "clickevent",
                "actions": [
                  {
                    "type": "showmessageboxaction",
                    "title": "Action 1",
                    "message": "You clicked action 1!"
                  }
                ]
              }
            ]
          },
          {
            "type": "button",
            "label": "Action 1",
            "events": [
              {
                "type": "clickevent",
                "actions": [
                  {
                    "type": "showmessageboxaction",
                    "title": "Action 1",
                    "message": "You clicked action 1!"
                  }
                ]
              }
            ]
          }
        ],
        "iconbuttons": [
          {
            "type": "iconbutton",
            "icon": "home",
            "label": "HOME",
            "events": [
              {
                "type": "clickevent",
                "actions": [
                  {
                    "type": "showmessageboxaction",
                    "title": "Home Icon",
                    "message": "You clicked Home Icon!"
                  }
                ]
              }
            ]
          },
          {
            "type": "iconbutton",
            "icon": "error",
            "label": "HOME",
            "events": [
              {
                "type": "clickevent",
                "actions": [
                  {
                    "type": "showmessageboxaction",
                    "title": "Home Icon",
                    "message": "You clicked Home Icon!"
                  }
                ]
              }
            ]
          },
          {
            "type": "iconbutton",
            "icon": "home",
            "label": "HOME",
            "events": [
              {
                "type": "clickevent",
                "actions": [
                  {
                    "type": "showmessageboxaction",
                    "title": "Home Icon",
                    "message": "You clicked Home Icon!"
                  }
                ]
              }
            ]
          }
        ]
      },
      "formactions": [
        {
          "type": "formaction",
          "title": "List",
          "layout": {
            "type": "stacklayout",
            "children": [
              {
                "type": "dataquerysender",
                "dataqueries": [{
                  "type": "dataquery",
                  "name": "ExampleList"
                }]
              },
              {
                "type": "actionrunner",
                "actions": [
                  {
                    "type": "dataqueryaction",
                    "query": {
                      "type": "dataquery",
                      "name": "ExampleList"
                    }
                  }
                ]
              },
              {
                "type": "list",
                "label": "List Example",
                "datasource": "ExampleList",
                "templatelayout": {
                  "type": "stacklayout",
                  "children": [
                    {
                      "type": "summary",
                      "rows": [
                        {
                          "type": "summaryrow",
                          "columns": [
                            {
                              "type": "summarycolumn",
                              "label": "COL 1",
                              "value": "##Col1##"
                            },
                            {
                              "type": "summarycolumn",
                              "label": "COL 2",
                              "value": "##Col1##"
                            }
                          ]
                        },
                        {
                          "type": "summaryrow",
                          "columns": [
                            {
                              "type": "summarycolumn",
                              "label": "COL 3",
                              "value": "##Col3##"
                            },
                            {
                              "type": "summarycolumn",
                              "label": "COL 4",
                              "value": "##Col4##"
                            }
                          ]
                        }
                      ]
                    }
                  ]
                }
              }
            ]
          }
        },
        {
          "type": "formaction",
          "title": "Date Time Picker",
          "layout": {
            "type": "stacklayout",
            "children": [
              {
                "type": "label",
                "label": "The date time picker allows the user to select the date, time, or both.",
                "fontsize": 20
              },
              {
                "type": "spacer",
              },
              {
                "label": "Example (date and time)",
                "type": "datetimepicker",
                "datasource": "DateTime"
              },
              {
                "type": "spacer",
              },
              {
                "label": "Example (date only)",
                "type": "datetimepicker",
                "datasource": "Date",
                "dateonly": true
              },
              {
                "type": "spacer",
              },
              {
                "label": "Example (time only)",
                "type": "datetimepicker",
                "datasource": "Time",
                "timeonly": true
              },
              {
                "type": "spacer",
              },
              {
                "type": "actionrunner",
                "actions": [
                  {
                    "type": "runscriptaction",
                    "name": "PreFillDateTimeScript"
                  }
                ]
              },
              {
                "label": "Example (pre filled with todays date)",
                "type": "datetimepicker",
                "datasource": "PreFilledDateTime"
              },
              {
                "label": "Example (to UTC): ##DateTime|utc|format(DD/MM/YYYY HH:mm)##",
                "type": "label"
              },
              {
                "label": "Example (to Local): ##DateTime|local|format(DD/MM/YYYY HH:mm)##",
                "type": "label"
              }
            ]
          }
        },
        {
          "type": "formaction",
          "title": "Combo",
          "layout": {
            "type": "stacklayout",
            "children": [
              {
                "type": "dataquerysender",
                "dataqueries": [
                  {
                    "type": "dataquery",
                    "name": "GetExampleCombo1Options",
                    "for": "ExampleCombo1"
                  }
                ]
              },
              {
                "type": "combo",
                "label": "Example Combo",
                "datasource": "ExampleCombo1",
                "id": "ExampleCombo1",
                "optionsdatasource": "GetExampleCombo1Options"
              },
              {
                "type": "label",
                "label": "Example Label -- ##ExampleCombo1##",
              },
              {
                "type": "actionrunner",
                "actions": [
                  {
                    "type": "setbrandingaction",
                    "for": "ExampleCombo1",
                    "branding": {
                      "primary": "#ffffff"
                    }
                  }
                ]
              },
              {
                "type": "iconbutton",
                "icon": "home"
              },
              {
                "type": "signature",
                "datasource": "Signature",
                "label": "Signature"
              }
            ]
          }
        },
        {
          "type": "formaction",
          "title": "Combo Selector",
          "layout": {
            "type": "stacklayout",
            "children": [
              {
                "type": "comboselector",
                "label": "Example Combo Selector",
                "datasource": "ExampleComboSelector1",
                "options": [
                  {
                    "type": "comboselectoroption",
                    "label": "Option One"
                  },
                  {
                    "type": "comboselectoroption",
                    "label": "Option Two"
                  },
                  {
                    "type": "comboselectoroption",
                    "label": "Option Three"
                  }
                ]
              },
              {
                "type": "summary",
                "rows": [
                  {
                    "type": "summaryrow",
                    "columns": [
                      {
                        "type": "summarycolumn",
                        "value": "##DateTime|local|format(DD/MM/YYYY - HH:mm)##"
                      }
                    ]
                  }
                ]
              }
            ]
          }
        },
        {
          "type": "formaction",
          "title": "Data Table",
          "layout": {
            "type": "stacklayout",
            "children": [
              {
                "type": "tabslayout",
                "tabs": [
                  {
                    "type": "tab",
                    "header": "Tab 1",
                    "layout": {
                      "type": "stacklayout",
                      "children": [
                        {
                          "type": "text",
                          "label": "Text 1"
                        }
                      ]
                    }
                  },
                  {
                    "type": "tab",
                    "header": "Tab 2",
                    "layout": {
                      "type": "stacklayout",
                      "children": [
                        {
                          "type": "text",
                          "label": "Text 2"
                        }
                      ]
                    }
                  }
                ]
              },
              {
                "type": "datatable",
                "datasource": "DataTableExampleList",
                "rowclickevent": {
                  "type": "clickevent",
                  "actions": [
                    {
                      "type": "dummyaction"
                    }
                  ]
                },
                "columns": [
                  {
                    "label": "Col 1",
                    "datasource": "Col1"
                  },
                  {
                    "label": "Col 2",
                    "datasource": "Col2"
                  },
                  {
                    "label": "Col 3",
                    "datasource": "Col3"
                  }
                ]
              }
            ]
          }
        },
        {
          "type": "formaction",
          "title": "Actions",
          "layout": {
            "type": "stacklayout",
            "spacing": "20",
            "children": [
              {
                "type": "label",
                "label": "Calculate Action"
              },
              {
                "type": "text",
                "label": "Value 1 (Val1)",
                "datasource": "Val1"
              },
              {
                "type": "text",
                "label": "Value 2 (Val2)",
                "datasource": "Val2"
              },
              {
                "label": "Pre set List Items (CalcList)",
                "type": "datatable",
                "datasource": "CalcList",
                "columns": [
                  {
                    "label": "Col 1",
                    "datasource": "Col1"
                  },
                  {
                    "label": "Col 2",
                    "datasource": "Col2"
                  },
                ]
              },
              {
                "type": "text",
                "label": "Expression",
                "datasource": "CalcExpression"
              },
              {
                "type": "button",
                "label": "CALCULATE",
                "events": [
                  {
                    "type": "clickevent",
                    "actions": [
                      {
                        "type": "calculateaction",
                        "datasource": "ResultOfCalc",
                        "expressiondatasource": "CalcExpression"
                      }
                    ]
                  }
                ]
              },
              {
                "type": "label",
                "label": "RESULT: ##ResultOfCalc##"
              }
            ]
          }
        },
        {
          "type": "formaction",
          "title": "Menu",
          "layout": {
            "type": "stacklayout",
            "spacing": 0,
            "children": [
              {
                "type": "menu",
                "logotext": "LOGO",
                "logo": "https://www.tescoplc.com/assets/images/logos/tesco-logo.svg",
                "items": [
                  {
                    "type": "menuitem",
                    "label": "Test",
                    "align": "left",
                    "items": []
                  },
                  {
                    "type": "menuitem",
                    "label": "Item 1",
                    "align": "left",
                    "items": [
                      {
                        "type": "menuitem",
                        "label": "Item 1",
                        "align": "left",
                        "items": [
                          {
                            "type": "menuitem",
                            "label": "Item 5",
                            "align": "left",
                            "clickevent": {
                              "actions": [
                                {
                                  "type": "navigateaction",
                                  "name": "form2"
                                }
                              ]
                            }
                          },
                          {
                            "type": "menuitem",
                            "label": "Item 6",
                            "align": "left",
                            "items": [
                              {
                                "type": "menuitem",
                                "label": "Item 5",
                                "align": "left",
                                "clickevent": {
                                  "actions": [
                                    {
                                      "type": "navigateaction",
                                      "name": "form2"
                                    }
                                  ]
                                }
                              },
                              {
                                "type": "menuitem",
                                "label": "Item 6",
                                "align": "left",
                                "items": [
                                  {
                                    "type": "menuitem",
                                    "label": "Item 5",
                                    "align": "left",
                                    "clickevent": {
                                      "actions": [
                                        {
                                          "type": "navigateaction",
                                          "name": "form2"
                                        }
                                      ]
                                    }
                                  },
                                  {
                                    "type": "menuitem",
                                    "label": "Item 6",
                                    "align": "left"
                                  }
                                ]
                              }
                            ]
                          }
                        ]
                      },
                      {
                        "type": "menuitem",
                        "label": "Item 2",
                        "align": "left",
                        "clickevent": {
                          "actions": [
                            {
                              "type": "navigateaction",
                              "name": "form2"
                            }
                          ]
                        }
                      }
                    ] 
                  },
                  {
                    "type": "menuitem",
                    "label": "Item 3",
                    "align": "right",
                    "items": [
                      {
                        "type": "menuitem",
                        "label": "Item 5",
                        "align": "left",
                        "clickevent": {
                          "actions": [
                            {
                              "type": "navigateaction",
                              "name": "form2"
                            }
                          ]
                        }
                      },
                      {
                        "type": "menuitem",
                        "label": "Item 6",
                        "align": "left",
                        "items": [
                          {
                            "type": "menuitem",
                            "label": "Item 5",
                            "align": "left",
                            "clickevent": {
                              "actions": [
                                {
                                  "type": "navigateaction",
                                  "name": "form2"
                                }
                              ]
                            }
                          },
                          {
                            "type": "menuitem",
                            "label": "Item 6",
                            "align": "left",
                            "items": [
                              {
                                "type": "menuitem",
                                "label": "Item 5",
                                "align": "left",
                                "clickevent": {
                                  "actions": [
                                    {
                                      "type": "navigateaction",
                                      "name": "form2"
                                    }
                                  ]
                                }
                              },
                              {
                                "type": "menuitem",
                                "label": "Item 6",
                                "align": "left"
                              }
                            ]
                          }
                        ]
                      }
                    ] 
                  },
                  {
                    "type": "menuitem",
                    "label": "Item 2",
                    "align": "left" 
                  },
                  {
                    "type": "menuitem",
                    "label": "Item 4",
                    "align": "right" 
                  }
                ]
              }
            ]
          }
        }
      ]
    }
  },
  {
    "name": "form2",
    "imdb": {},
    "form": {
      "type": "form",
      "formactions": [
        {
          "type": "formaction",
          "title": "FORM 2",
          "layout": {
            "type": "stacklayout",
            "children": [
              {
                "type": "text",
                "label": "TEXT"
              },
              {
                "type": "datetimepicker",
                "label": "DATE TIME"
              }
            ]
          }
        }
      ]
    }
  }
]


var imdb = {
  "Text1": "TEST string",
  "Books.1.Checks.ListItems": "1,2,3",
  "Books.2.Checks.ListItems": "1,2",
  "Books.3.Checks.ListItems": "1",
  "Books.ListItems": "1,2,3",

  "Books.1.Option": "List Item Option 1 Value",
  "Books.1.Option.Text": "List Item Option 1",
  "Books.1.Option.Value": "List Item Option 1 Value",
  "Books.1.FormName": "Form 1",
  "Books.1.Week": "1",
  "Books.1.Day": "1",
  "Books.1.TimeSlot": "1pm",
  "Books.1.TimeCompleted": "Not Completed",
  "Books.1.Checks": "3",
  "Books.1.Red": "3",
  "Books.1.Green": "0",
  "Books.1.OpenNextSteps": "3",
  "Books.1.Progress": "30",

  "Books.1.Checks.1.CheckID": "123456",
  "Books.1.Checks.1.Status": "RED",
  "Books.1.Checks.1.CheckText": "This is the check question that is to be asked?",
  "Books.1.Checks.1.DisplayName": "Steve",
  "Books.1.Checks.1.Time": "1pm",
  "Books.1.Checks.1.Assigned": "Dave",
  "Books.1.Checks.1.Initials": "DJ",
  "Books.1.Checks.1.Opened": "1/1/1991 17:50",
  "Books.1.Checks.1.Closed": "1/1/1991 17:50",
  "Books.1.Checks.1.ClosedBy": "Dave",
  "Books.1.Checks.1.NextSteps": "Yes",
  "Books.1.Checks.1.Notes": "Some Notes",

  "Books.1.Checks.2.CheckID": "123456",
  "Books.1.Checks.2.Status": "RED",
  "Books.1.Checks.2.CheckText": "This is the check question that is to be asked?",
  "Books.1.Checks.2.DisplayName": "Steve",
  "Books.1.Checks.2.Time": "1pm",

  "Books.1.Checks.3.CheckID": "123456",
  "Books.1.Checks.3.Status": "RED",
  "Books.1.Checks.3.CheckText": "This is the check question that is to be asked?",
  "Books.1.Checks.3.DisplayName": "Steve",
  "Books.1.Checks.3.Time": "1pm",

  "Books.2.Option": "List Item Option 2 Value",
  "Books.2.Option.Text": "List Item Option 2",
  "Books.2.Option.Value": "List Item Option 2 Value",
  "Books.2.FormName": "Form 2",
  "Books.2.Week": "1",
  "Books.2.Day": "1",
  "Books.2.TimeSlot": "1pm",
  "Books.2.TimeCompleted": "Not Completed",
  "Books.2.Checks": "3",
  "Books.2.Red": "3",
  "Books.2.Green": "0",
  "Books.2.OpenNextSteps": "3",
  "Books.2.Progress": "60",

  "Books.2.Checks.1.CheckID": "123456",
  "Books.2.Checks.1.Status": "RED",
  "Books.2.Checks.1.CheckText": "This is the check question that is to be asked?",
  "Books.2.Checks.1.DisplayName": "Steve",
  "Books.2.Checks.1.Time": "1pm",

  "Books.2.Checks.2.CheckID": "123456",
  "Books.2.Checks.2.Status": "RED",
  "Books.2.Checks.2.CheckText": "This is the check question that is to be asked?",
  "Books.2.Checks.2.DisplayName": "Steve",
  "Books.2.Checks.2.Time": "1pm",

  "Books.3.Option": "List Item Option 3 Value",
  "Books.3.Option.Text": "List Item Option 3",
  "Books.3.Option.Value": "List Item Option 3 Value",
  "Books.3.FormName": "Form 3",
  "Books.3.Week": "1",
  "Books.3.Day": "1",
  "Books.3.TimeSlot": "1pm",
  "Books.3.TimeCompleted": "Not Completed",
  "Books.3.Checks": "3",
  "Books.3.Red": "3",
  "Books.3.Green": "0",
  "Books.3.OpenNextSteps": "3",
  "Books.3.Progress": "90",

  "Books.3.Checks.1.CheckID": "123456",
  "Books.3.Checks.1.Status": "RED",
  "Books.3.Checks.1.CheckText": "This is the check question that is to be asked?",
  "Books.3.Checks.1.DisplayName": "Steve",
  "Books.3.Checks.1.Time": "1pm",

  "DataTable.ListItems":"1,2,3",
  "DataTable.1.Blah": "1.Blah",
  "DataTable.1.Blah2": "1.Blah1",
  "DataTable.1.Blah3": "1.Blah2",

  "DataTable.2.Blah": "2.Blah",
  "DataTable.2.Blah2": "2.Blah1",
  "DataTable.2.Blah3": "2.Blah2",

  "DataTable.3.Blah": "3.Blah",
  "DataTable.3.Blah2": "3.Blah1",
  "DataTable.3.Blah3": "3.Blah2",

  "TestList.ListItems":"0,1",
  "TestList.0.Test":"TestVal1",
  "TestList.1.Test":"TestVal2",

  "sig1":"Signed",
  "sig1.Text":"Signed",
  "sig1.Value": "<Signature dpi=\"192\" date=\"31/May/2017\" time=\"3:43\"><Segments><Segment Stroke=\"#FF0000\" RenderStroke=\"#FF0000\">168.39999389648438,115,168.39999389648438,115;168.39999389648438,115,154.39999389648438,124;154.39999389648438,124,131.39999389648438,146;131.39999389648438,146,115.39999389648438,166;115.39999389648438,166,106.39999389648438,184;106.39999389648438,184,102.39999389648438,199;102.39999389648438,199,102.39999389648438,210;102.39999389648438,210,116.39999389648438,218;116.39999389648438,218,127.39999389648438,222;127.39999389648438,222,206.39999389648438,224;206.39999389648438,224,290.3999938964844,210;290.3999938964844,210,362.3999938964844,187;362.3999938964844,187,400.3999938964844,174;400.3999938964844,174,407.3999938964844,170;407.3999938964844,170,402.3999938964844,172;402.3999938964844,172,386.3999938964844,184;386.3999938964844,184,366.3999938964844,198;366.3999938964844,198,358.3999938964844,212;358.3999938964844,212,358.3999938964844,218;358.3999938964844,218,363.3999938964844,222;363.3999938964844,222,378.3999938964844,220;378.3999938964844,220,386.3999938964844,218;386.3999938964844,218,416.3999938964844,206</Segment></Segments></Signature>"
};

var dataQueries = [
  {
    name: "testQueryForComboBox",
    params: {},
    result: {
      options: [
        {
          "label": "ListItems Combo Option 1 Label",
          "value": "ListItems Combo Option 1 Value"
        },
        {
          "label": "ListItems Combo Option 2 Label",
          "value": "ListItems Combo Option 2 Value"
        },
        {
          "label": "ListItems Combo Option 3 Label",
          "value": "ListItems Combo Option 3 Value"
        }
      ]
    }
  },
  {
    name: "GetUncompletedChecks",
    params: {},
    result: {
      "~UncompletedChecks.ListItems":"0,1,2",
      "~UncompletedChecks.0.Created":"03-16-2017 10:23",
      "~UncompletedChecks.0.TimeSlot":"7pm",
      "~UncompletedChecks.0.BookName":"Book 1",
      "~UncompletedChecks.0.FormName":"Form 1",

      "~UncompletedChecks.1.Created":"03-16-2017 10:23",
      "~UncompletedChecks.1.TimeSlot":"7pm",
      "~UncompletedChecks.1.BookName":"Book 2",
      "~UncompletedChecks.1.FormName":"Form 2",

      "~UncompletedChecks.2.Created":"03-16-2017 10:23",
      "~UncompletedChecks.2.TimeSlot":"7pm",
      "~UncompletedChecks.2.BookName":"Book 3",
      "~UncompletedChecks.2.FormName":"Form 3"
    }
  },
  {
    name: "GetTodaysChecks",
    params: {},
    result: {
      "TodaysChecks.ListItems":"0,1,2",
      "TodaysChecks.0.FormName":"Form 1",
      "TodaysChecks.0.TimeSlot":"7pm",
      "TodaysChecks.0.TimeCompleted":"6:30am",
      "TodaysChecks.0.#Checks":"30",
      "TodaysChecks.0.#Answered":"30",
      "TodaysChecks.0.#OpenNextSteps":"2",
      "TodaysChecks.0.Progress":"100",

      "TodaysChecks.1.FormName":"Form 2",
      "TodaysChecks.1.TimeSlot":"12pm",
      "TodaysChecks.1.TimeCompleted":"1:00pm",
      "TodaysChecks.1.#Checks":"30",
      "TodaysChecks.1.#Answered":"15",
      "TodaysChecks.1.#OpenNextSteps":"2",
      "TodaysChecks.1.Progress":"50",

      "TodaysChecks.2.FormName":"Form 3",
      "TodaysChecks.2.TimeSlot":"12pm",
      "TodaysChecks.2.TimeCompleted":"1:00am",
      "TodaysChecks.2.#Checks":"30",
      "TodaysChecks.2.#Answered":"0",
      "TodaysChecks.2.#OpenNextSteps":"2",
      "TodaysChecks.2.Progress":"0",
    }
  },
  {
    name: "GetUsers",
    params: {},
    result: {
      "NewUsers.ListItems": "0,1,2",
      "NewUsers.0.Username": "TestUserName",
      "NewUsers.1.Username": "TestUserName",
      "NewUsers.2.Username": "TestUserName",

      "NewLastName": "Phillips"
    }
  },
  {
    name: "GetBooksList",
    params: {},
    result: {
      "Books.ListItems": "1",

      "Books.1.Option": "List Item Option 1 Value",
      "Books.1.Option.Text": "List Item Option 1",
      "Books.1.Option.Value": "List Item Option 1 Value",
      "Books.1.FormName": "Form 1",
      "Books.1.Week": "1",
      "Books.1.Day": "1",
      "Books.1.TimeSlot": "1pm",
      "Books.1.TimeCompleted": "Not Completed",
      "Books.1.Checks": "3",
      "Books.1.Red": "3",
      "Books.1.Green": "0",
      "Books.1.OpenNextSteps": "3",
      "Books.1.Progress": "30",
      "Books.1.TestText": "Test Text New Value"
    }
  },
  {
    name: "GetExampleCombo1Options",
    params: {},
    result: {
      "GetExampleCombo1Options.ListItems": "0,1,2,3,4,5",
      "GetExampleCombo1Options.0.Option": "Option 1",
      "GetExampleCombo1Options.0.Option.Value":"Opt 1",
      "GetExampleCombo1Options.1.Option":"Option 2",
      "GetExampleCombo1Options.1.Option.Value":"Opt 2",
      "GetExampleCombo1Options.2.Option":"Option 3",
      "GetExampleCombo1Options.2.Option.Value":"Opt 3",
      "GetExampleCombo1Options.3.Option":"Option 4",
      "GetExampleCombo1Options.3.Option.Value":"Opt 4",
      "GetExampleCombo1Options.4.Option":"Option 5",
      "GetExampleCombo1Options.4.Option.Value":"Opt 5",
      "GetExampleCombo1Options.5.Option":"Option 6",
      "GetExampleCombo1Options.5.Option.Value":"Opt 6"
    }
  }
];

taapApi.isReady = true;