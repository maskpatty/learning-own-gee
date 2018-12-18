 function handleDOB(guestDob) {
        var parsedt = parseDate(guestDob);
        var age = calculateAge(parsedt, new Date());
        return age;
}
//parse date
function parseDate(dateStr) {
    var dateParts = dateStr.split("-");
    return new Date(dateParts[0], (dateParts[1]), dateParts[2]);
}

//calculate Age
function calculateAge(dateOfBirth, dateToCalculate) {
    var calculateYear = dateToCalculate.getFullYear();
    var calculateMonth = dateToCalculate.getMonth() + 1;
    var calculateDay = dateToCalculate.getDate();

    var birthYear = dateOfBirth.getFullYear();
    var birthMonth = dateOfBirth.getMonth();
    var birthDay = dateOfBirth.getDate();

    var age = calculateYear - birthYear;
    var ageMonth = calculateMonth - birthMonth;
    var ageDay = calculateDay - birthDay;

    if (ageMonth < 0 || (ageMonth === 0 && ageDay < 0)) {
        age = age - 1;
    }
    return JSON.stringify(age);
}




try {

    var backendRequest = {
        "BookingNumber": "",
        "Rate": {
            "Code": ""
        },
        "Currency": {
            "Code": ""
        },
        "Sailings": [{
            "Cruise": {
                "Code": ""
            },
            "Cabins": [{
                "Number": "",
                "Category": {
                    "Code": "",
                    "UpgradeCode": ""
                }
            }]
        }],
        "Guests": [{
            "SeqNumber": "",
            "Action": "",
            "Age": {
                "Code": "",
                "Amount": ""
            },
            "FirstName": "",
            "LastName": "",
            "BirthDate": "",
            "Insurance": {
                "Code": ""
            },
            "Sailings": [{
                "Cruise": {
                    "Code": ""
                },
                "Cabin": {
                    "Number": ""
                }
            }],
            "Transportations": [{
                "Type": "",
                "Direction": "",
                "City": {
                    "Code": ""
                },
                "Class": "",
                "MainAirline": ""
            }],
			 "Vouchers": [{
				"Id": ""          
				}] 
        }]
    };

    var jsonSchema = {
   "$schema":"http://json-schema.org/draft-04/schema#",
   "definitions":{

   },
   "id":"http://example.com/example.json",
   "properties":{
      "BookingNumber":{
         "type":"string"
      },
      "Currency":{
         "properties":{
            "Code":{
               "type":"string"
            }
         },
         "required":[
            "Code"
         ],
         "type":"object"
      },
      "Guests":{
         "items":{
            "properties":{
               "Action":{
                  "type":"string"
               },
               "Age":{
                  "properties":{
                     "Amount":{
                        "type":"string"
                     },
                     "Code":{
                        "type":"string"
                     }
                  },
                  "required":[
                     "Amount",
                     "Code"
                  ],
                  "type":"object"
               },
               "BirthDate":{
                  "type":"string"
               },
               "FirstName":{
                  "type":"string"
               },
               "Insurance":{
                  "properties":{
                     "Code":{
                        "type":"string"
                     }
                  },
                  "required":[
                     "Code"
                  ],
                  "type":"object"
               },
               "LastName":{
                  "type":"string"
               },
               "Sailings":{
                  "items":{
                     "properties":{
                        "Cabin":{
                           "properties":{
                              "Number":{
                                 "type":"string"
                              }
                           },
                           "required":[
                              "Number"
                           ],
                           "type":"object"
                        },
                        "Cruise":{
                           "properties":{
                              "Code":{
                                 "type":"string"
                              }
                           },
                           "required":[
                              "Code"
                           ],
                           "type":"object"
                        },
                        "Specialservices":{
                           "items":{
                              "properties":{
                                 "Code":{
                                    "type":"string"
                                 },
                                 "Delivery":{
                                    "type":"string"
                                 },
                                 "EndDate":{
                                    "type":"string"
                                 },
                                 "GiftText":{
                                    "type":"string"
                                 },
                                 "Instruction":{
                                    "type":"string"
                                 },
                                 "IsAuto":{
                                    "type":"string"
                                 },
                                 "PrintOnConfirmation":{
                                    "type":"string"
                                 },
                                 "PrintOnTicket":{
                                    "type":"string"
                                 },
                                 "StartDate":{
                                    "type":"string"
                                 },
                                 "TypeCode":{
                                    "type":"string"
                                 }
                              },
                              "required":[
                                 "StartDate",
                                 "Code",
                                 "EndDate",
                                 "TypeCode",
                                 "Instruction",
                                 "PrintOnTicket",
                                 "Delivery",
                                 "IsAuto",
                                 "PrintOnConfirmation",
                                 "GiftText"
                              ],
                              "type":"object"
                           },
                           "type":"array"
                        }
                     },
                     "required":[
                        "Cabin",
                        "Cruise"
                     ],
                     "type":"object"
                  },
                  "type":"array"
               },
               "SeqNumber":{
                  "type":"string"
               },
               "Transportations":{
                  "items":{
                     "properties":{
                        "City":{
                           "properties":{
                              "Code":{
                                 "type":"string"
                              }
                           },
                           "required":[
                              "Code"
                           ],
                           "type":"object"
                        },
                        "Class":{
                           "type":"string"
                        },
                        "Direction":{
                           "type":"string"
                        },
                        "MainAirline":{
                           "type":"string"
                        },
                        "Type":{
                           "type":"string"
                        }
                     },
                     "required":[
                        "City",
                        "Direction",
                        "Type"
                     ],
                     "type":"object"
                  },
                  "type":"array"
               },
               "Vouchers":{
                  "items":{
                     "properties":{
                        "Id":{
                           "type":"string"
                        }
                     },
                     "required":[
                        "Id"
                     ],
                     "type":"object"
                  },
                  "type":"array"
               }
            },
            "required":[
               "Transportations",
               "SeqNumber",
               "Age",
               "Sailings",
               "Action"
            ],
            "type":"object"
         },
         "type":"array"
      },
      "Rate":{
         "properties":{
            "Code":{
               "type":"string"
            }
         },
         "required":[
            "Code"
         ],
         "type":"object"
      },
      "Sailings":{
         "items":{
            "properties":{
               "Cabins":{
                  "items":{
                     "properties":{
                        "Category":{
                           "properties":{
                              "Code":{
                                 "type":"string"
                              },
                              "UpgradeCode":{
                                 "type":"string"
                              }
                           },
                           "required":[
                              "UpgradeCode",
                              "Code"
                           ],
                           "type":"object"
                        },
                        "Number":{
                           "type":"string"
                        }
                     },
                     "required":[
                        "Category",
                        "Number"
                     ],
                     "type":"object"
                  },
                  "type":"array"
               },
               "Cruise":{
                  "properties":{
                     "Code":{
                        "type":"string"
                     }
                  },
                  "required":[
                     "Code"
                  ],
                  "type":"object"
               }
            },
            "required":[
               "Cabins",
               "Cruise"
            ],
            "type":"object"
         },
         "type":"array"
      }
   },
   "required":[
      "Sailings",
      "Currency",
      "Rate",
      "Guests"
   ],
   "type":"object"
};
    
    var actualRequest = context.getVariable("request.content");
	context.setVariable("clientRequest", actualRequest);
    var actualRequestObj = JSON.parse(actualRequest);

	delete actualRequestObj.marinerId;
  delete actualRequestObj.firstName;
  delete actualRequestObj.lastName;
	
    var agencyId = context.getVariable("request.header.agencyId");
    var currencyCode = context.getVariable("request.header.currencyCode");
    var categoryCode = actualRequestObj.selectedRooms[0].categoryCode;
    var cruiseId = context.getVariable("proxy.pathsuffix");

    var cruiseCode = cruiseId.split("/")[1];
	
	if(currencyCode)
    backendRequest.Currency.Code = currencyCode;

	backendRequest.Rate.Code = actualRequestObj.selectedRooms[0].cabin.rateCode;

    var backendsailingsArray = [];

    for (z = 0; z < actualRequestObj.selectedRooms.length; z++) {
        var emptyBackendSailingsObj = JSON.parse(JSON.stringify(backendRequest.Sailings[0]));
        emptyBackendSailingsObj.Cabins[0].Category.Code = actualRequestObj.selectedRooms[z].categoryCode;
        emptyBackendSailingsObj.Cabins[0].Category.UpgradeCode = actualRequestObj.selectedRooms[z].categoryCode;
        emptyBackendSailingsObj.Cabins[0].Number = actualRequestObj.selectedRooms[z].cabin.number;
        emptyBackendSailingsObj.Cruise.Code = cruiseCode;
        backendsailingsArray.push(emptyBackendSailingsObj);
    }
    backendRequest.Sailings = backendsailingsArray;


    var backendGuestArray = [];


    for (var i = 0; i < actualRequestObj.selectedRooms.length; i++) {
        var emptyBackendGuestObject = JSON.parse(JSON.stringify(backendRequest.Guests[0]));


        if (actualRequestObj.selectedRooms[i] !== null) {
            for (var j = 0; j < actualRequestObj.selectedRooms[i].guests.length; j++) {
                var populatedBackendGuestObject = JSON.parse(JSON.stringify(emptyBackendGuestObject));
                var actualGuestObj = actualRequestObj.selectedRooms[i].guests[j];

                populatedBackendGuestObject.SeqNumber = JSON.stringify(actualGuestObj.seqNo);
                populatedBackendGuestObject.Action = "N";
                populatedBackendGuestObject.Age.Code = actualGuestObj.type;
                
                if(actualGuestObj.dob) {
					populatedBackendGuestObject.Age.Amount = handleDOB(actualGuestObj.dob);
                }else {
                    populatedBackendGuestObject.Age.Amount = actualGuestObj.age;
                }

                populatedBackendGuestObject.FirstName = actualGuestObj.firstName;
                populatedBackendGuestObject.LastName = actualGuestObj.lastName;
                populatedBackendGuestObject.BirthDate = actualGuestObj.dob;
				if(actualGuestObj.insuranceCode){
					populatedBackendGuestObject.Insurance.Code = actualGuestObj.insuranceCode;
				}else{
					delete populatedBackendGuestObject.Insurance.Code
				}

                populatedBackendGuestObject.Sailings[0].Cruise.Code = cruiseCode;
                populatedBackendGuestObject.Sailings[0].Cabin.Number = actualRequestObj.selectedRooms[i].cabin.number;


                if (actualRequestObj.transportation && actualRequestObj.transportation.direction &&
					actualRequestObj.transportation.type && actualRequestObj.transportation.code) {
                    populatedBackendGuestObject.Transportations[0].Direction = actualRequestObj.transportation.direction;
                    populatedBackendGuestObject.Transportations[0].Type = actualRequestObj.transportation.type;
                    populatedBackendGuestObject.Transportations[0].City.Code = actualRequestObj.transportation.code;

                }else{
                   delete populatedBackendGuestObject.Transportations; 
                }


                
                var backendVouchersArray=[];
                 if(actualGuestObj.voucherCodes!==undefined)
                 for(m=0;m<actualGuestObj.voucherCodes.length;m++) {
                     var  backendVoucherObject = JSON.parse(JSON.stringify(populatedBackendGuestObject.Vouchers[0]));
                     backendVoucherObject.Id = actualGuestObj.voucherCodes[m];
                     backendVouchersArray.push(backendVoucherObject);
                 }
                populatedBackendGuestObject.Vouchers = backendVouchersArray;


                backendGuestArray.push(populatedBackendGuestObject);

            }

        }

        backendRequest.Guests = backendGuestArray;

    }

   var transformedRequest=JSON.parse(JSON.stringify(backendRequest));
//   var validSchema = tv4.validateMultiple(transformedRequest, jsonSchema);

//    if (!validSchema.valid) {
//        context.setVariable("schemaValidationFailed", "true");
//        throw error;
//     }

    context.setVariable("request.content", JSON.stringify(backendRequest));
	context.setVariable("targetRequest", JSON.stringify(backendRequest));

} catch (error) {

    throw error;
}