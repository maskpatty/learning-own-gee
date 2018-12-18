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

  var backendRequest ={
    "BookingNum": "",
    "Rate": {
      "Code": "",
      "GroupId": "",
      "AirPromo": {
        "Type": "",
        "AirSolution": ""
      }
    },
    "Currency": {
      "Code": ""
    },
    "DiningWith": [
    {
      "BookingNum": ""
    }
    ],
    "TravelWith": [{
      "BookingNum": ""
    }],
    "Sailings": [
    {
      "Cruise": {
        "Code": ""
      },
      "Cabins": [
      {
        "Number": "",
        "Category": {
          "Code": "",
          "UpgradeCode": ""
        },
        "Dining": {
          "Restaurant": {
            "Code": "",
            "Name": ""
          },
          "Seating": {
            "Code": "",
            "Description": ""
          },
          "Table": {
            "Size": ""
          },
          "DiningWith": [
          {
            "BookingNum": "",
            "SeqNumber": ""
          },
          {
            "BookingNum": "",
            "SeqNumber": ""
          }
          ]
        }
      }
      ]
    }
    ],
    "Guests": [
    {
      "SeqNumber": "",
      "Action": "",
      "Age": {
        "Code": "",
        "Amount": ""
      },
      "FirstName": "",
      "LastName": "",
      "BirthDate": "",
      "LoyaltyNumber": "",
      "PlaceOfBirth": "",
      "Title": "",
      "Gender": {
        "Code": ""
      },
      "Nationality": {
        "Code": ""
      },
      "TravelInfo": {
        "Id" : "",
        "IdInsurance": "",
        "CreateTimestamp": ""
      },
      "Insurance": {
        "Code": ""
      },
      "Sailings": [
      {
        "Cruise": {
          "Code": ""
        },
        "Cabin": {
          "Number": "",
          "Position": ""
        },
        "TravelWith": [
        {
          "BookingNum": "",
          "SeqNumber": ""
        }
        ]
      }
      ],
      "Transportations": [
      {
        "Type": "",
        "Direction": "",
        "City": {
          "Code": "",
          "Name": ""
        },
        "Class": "",
        "MainAirline": ""
      }
      ],
      "SpecialItems": [
      {
        "Type": {
          "Code": "",
          "Description": ""
        },
        "Sailings": [
        {
          "Cruise": {
            "Code": ""
          },
          "Cabin": {
            "Number": ""
          }
        }
        ],
        "IsAuto": "",
        "Notes": ""
      }
      ],
      "Vouchers": [
      {
        "Id": ""
      }
      ],
      "Address": {
        "Street1": "",
        "Street2": "",
        "City": "",
        "State": {
          "Code": "",
          "Name": ""
        },
        "Country": {
          "Code": "",
          "Name": ""
        },
        "ZipCode": "",
        "Phones": [
        {
          "Type": {
            "Code": "",
            "Description": ""
          },
          "Number": ""
        }
        ],
        "Email": ""
      },
      "EmergencyContacts": [
      {
        "Type": {
          "Code": "",
          "Description": ""
        },
        "Number": "",
        "FirstName": "",
        "LastName": ""
      }
      ],
      "ImmigrationDocInfo": [
      {
        "Type": {
          "Code": "",
          "Description": ""
        },
        "IssueCountry": {
          "Code": "",
          "Name": ""
        },
        "IssueDate": "",
        "ExpireDate": "",
        "Number": "",
        "IssuePlace": ""
      }
      ]
    }
    ],
    "DocumentDelivery": {
      "Code": "",
      "Description": ""
    },
    "ConsumerInfo": {
      "FirstName": "",
      "LastName": "",
      "Street1": "",
      "Street2": "",
      "City": "",
      "State": {
        "Code": "",
        "Name": ""
      },
      "Country": {
        "Code": "",
        "Name": ""
      },
      "ZipCode": "",
      "Phones": [
      {
        "Type": {
          "Code": "",
          "Description": ""
        },
        "Number": ""
      }
      ],
      "Email": ""
    },
    "Payment": {
      "Type": {
        "Code": ""
      },
      "Amount": "",
      "Currency": {
        "Code": ""
      },
      "CreditCard": {
        "Instalments": {
          "Number": ""
        },
        "Token": {
          "Id": "",
          "Amount": "",
          "Currency": {
            "Code": ""
          },
          "Provider": {
            "Code": "BIBIT"
          },
          "Merchant": {
            "Code": ""
          }
        }
      },
      "Ideal": {
        "Bank": {
          "Code": ""
        },
        "RedirectsUrl": {
          "ConfirmUrl": "",
          "ErrorUrl": "",
          "CancelUrl": ""
        }
      }
    }
  };



  var jsonSchema = {
   "$schema":"http://json-schema.org/draft-04/schema#",
   "definitions":{

   },
   "id":"http://example.com/example.json",
   "properties":{
    "BookingNum":{
     "type":"string"
   },
   "SynchronizationID":{
     "type":"string"
   },    
   "ConsumerInfo":{
     "properties":{
      "City":{
       "type":"string"
     },
     "Country":{
       "properties":{
        "Code":{
         "type":"string"
       },
       "Name":{
         "type":"string"
       }
     },
     "required":[
     "Code"
     ],
     "type":"object"
   },
   "Email":{
     "type":"string"
   },
   "FirstName":{
     "type":"string"
   },
   "LastName":{
     "type":"string"
   },
   "Phones":{
     "items":{
      "properties":{
       "Number":{
        "type":"string"
      },
      "Type":{
        "properties":{
         "Code":{
          "type":"string"
        },
        "Description":{
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
  "Type",
  "Number"
  ],
  "type":"object"
},
"type":"array"
},
"State":{
 "properties":{
  "Code":{
   "type":"string"
 },
 "Name":{
   "type":"string"
 }
},
"type":"object"
},
"Street1":{
 "type":"string"
},
"Street2":{
 "type":"string"
},
"ZipCode":{
 "type":"string"
}
},
"type":"object"
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
"DiningWith":{
 "items":{
  "properties":{
   "BookingNum":{
    "type":"string"
  }
},
"required":[
"BookingNum"
],
"type":"object"
},
"type":"array"
},
"DocumentDelivery":{
 "properties":{
  "Code":{
   "type":"string"
 },
 "Description":{
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
  "Address":{
    "properties":{
     "City":{
      "type":"string"
    },
    "Country":{
      "properties":{
       "Code":{
        "type":"string"
      },
      "Name":{
        "type":"string"
      }
    },
    "required":[
    "Code"
    ],
    "type":"object"
  },
  "Email":{
    "type":"string"
  },
  "Phones":{
    "items":{
     "properties":{
      "Number":{
       "type":"string"
     },
     "Type":{
       "properties":{
        "Code":{
         "type":"string"
       },
       "Description":{
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
 "Type",
 "Number"
 ],
 "type":"object"
},
"type":"array"
},
"State":{
  "properties":{
   "Code":{
    "type":"string"
  },
  "Name":{
    "type":"string"
  }
},
"type":"object"
},
"Street1":{
  "type":"string"
},
"Street2":{
  "type":"string"
},
"ZipCode":{
  "type":"string"
}
},
"type":"object"
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
"EmergencyContacts":{
  "items":{
   "properties":{
    "FirstName":{
     "type":"string"
   },
   "LastName":{
     "type":"string"
   },
   "Number":{
     "type":"string"
   },
   "Type":{
     "properties":{
      "Code":{
       "type":"string"
     },
     "Description":{
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
"LastName",
"Type",
"Number",
"FirstName"
],
"type":"object"
},
"type":"array"
},
"FirstName":{
  "type":"string"
},
"Gender":{
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
"ImmigrationDocInfo":{
  "items":{
   "properties":{
    "ExpireDate":{
     "type":"string"
   },
   "IssueCountry":{
     "properties":{
      "Code":{
       "type":"string"
     },
     "Name":{
       "type":"string"
     }
   },
   "required":[
   "Code"
   ],
   "type":"object"
 },
 "IssueDate":{
   "type":"string"
 },
 "IssuePlace":{
   "type":"string"
 },
 "Number":{
   "type":"string"
 },
 "Type":{
   "properties":{
    "Code":{
     "type":"string"
   },
   "Description":{
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
"ExpireDate",
"Type",
"IssuePlace",
"Number",
"IssueDate",
"IssueCountry"
],
"type":"object"
},
"type":"array"
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
"LoyaltyNumber":{
  "type":"string"
},
"Nationality":{
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
"PlaceOfBirth":{
  "type":"string"
},
"Sailings":{
  "items":{
   "properties":{
    "Cabin":{
     "properties":{
      "Number":{
       "type":"string"
     },
     "Position":{
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
"SpecialServices":{
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
"Code"
],
"type":"object"
},
"type":"array"
},
"TravelWith":{
 "items":{
  "properties":{
   "BookingNum":{
    "type":"string"
  },
  "SeqNumber":{
    "type":"string"
  }
},
"required":[
"BookingNum",
"SeqNumber"
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
"SpecialItems":{
  "items":{
   "properties":{
    "IsAuto":{
     "type":"string"
   },
   "Notes":{
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
"Type":{
 "properties":{
  "Code":{
   "type":"string"
 },
 "Description":{
   "type":"string"
 }
},
"required":[
"Code"
],
"type":"object"
}
},
"type":"object"
},
"type":"array"
},
"Title":{
  "type":"string"
},
"Transportations":{
  "items":{
   "properties":{
    "Direction":{
     "type":"string"
   },
   "Type":{
     "type":"string"
   },
   "City": {"type": "object",
   "properties": {
    "Code": {"type": "string"},
    "Name": {"type": "string"}
  },
  "required": [ "Code"]
},            
"Class":{
 "type":"string"
},
"MainAirline":{
 "type":"string"
}
},
"required":[
"Direction",
"Type",
"City"
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
"SeqNumber",
"Action",         
"Title",        
"Gender",         
"FirstName",
"LastName",         
"Age",
"Sailings",
"Transportations"     
],
"type":"object"
},
"type":"array"
},
"Payment":{
 "properties":{
  "Amount":{
   "type":"string"
 },
 "CreditCard": {
  "properties": {
    "Instalments": {
      "properties": {
        "Number": {
          "type": "string"
        }
      },
      "type": "object"
    },
    "Token": {
      "properties": {
        "Amount": {
          "type": "string"
        },
        "Currency": {
          "properties": {
            "Code": {
              "type": "string"
            }
          },
          "type": "object"
        },
        "Id": {
          "type": "string"
        },
        "Merchant": {
          "properties": {
            "Code": {
              "type": "string"
            }
          },
          "type": "object"
        },
        "Provider": {
          "properties": {
            "Code": {
              "type": "string"
            }
          },
          "type": "object"
        }
      },
      "type": "object"
    }
  },
  "required":[
  "Instalments",
  "Token"
  ],       
  "type": "object"
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
"Ideal":{
 "properties":{
  "Bank":{
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
"RedirectsUrl":{
 "properties":{
  "CancelUrl":{
   "type":"string"
 },
 "ConfirmUrl":{
   "type":"string"
 },
 "ErrorUrl":{
   "type":"string"
 }
},
"required":[
"CancelUrl",
"ConfirmUrl",
"ErrorUrl"
],
"type":"object"
}
},
"required":[
"RedirectsUrl",
"Bank"
],
"type":"object"
},
"Type":{
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
"Currency",
"Amount",
"Type"
],
"type":"object"
},
"Rate":{
 "properties":{
  "AirPromo":{
   "properties":{
    "AirSolution":{
     "type":"string"
   },
   "Type":{
     "type":"string"
   }
 },
 "required":[
 "AirSolution",
 "Type"
 ],
 "type":"object"
},
"Code":{
 "type":"string"
},
"GroupId":{
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
     "Code"
     ],
     "type":"object"
   },
   "Dining":{
     "properties":{
      "DiningWith":{
       "items":{
        "properties":{
         "BookingNum":{
          "type":"string"
        },
        "SeqNumber":{
          "type":"string"
        }
      },
      "required":[
      "BookingNum",
      "SeqNumber"
      ],
      "type":"object"
    },
    "type":"array"
  },
  "Restaurant":{
   "properties":{
    "Code":{
     "type":"string"
   },
   "Name":{
     "type":"string"
   }
 },
 "required":[
 "Code"
 ],
 "type":"object"
},
"Seating":{
 "properties":{
  "Code":{
   "type":"string"
 },
 "Description":{
   "type":"string"
 }
},
"required":[
"Code"
],
"type":"object"
},
"Table":{
 "properties":{
  "Size":{
   "type":"string"
 }
},
"required":[
"Size"
],
"type":"object"
}
},
"required":[
"Seating"
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
},
"TravelWith":{
 "items":{
  "properties":{
   "BookingNum":{
    "type":"string"
  }
},
"required":[
"BookingNum"
],
"type":"object"
},
"type":"array"
}
},
"required":[
"Currency",
"Rate",
"Guests",
"Sailings"
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

var payNowTarget= context.getVariable("payNowTarget");
var locale = context.getVariable("request.header.locale");

var cruiseCode = cruiseId.split("/")[1];

backendRequest.Rate.Code = actualRequestObj.commonRateCode;
backendRequest.Currency.Code = currencyCode;

var backendsailingsArray = [];
var backendGuestArray = [];

for (var i = 0; i < actualRequestObj.selectedRooms.length; i++) {
  var emptyBackendGuestObject = JSON.parse(JSON.stringify(backendRequest.Guests[0]));
  var emptyBackendSailingsObj = JSON.parse(JSON.stringify(backendRequest.Sailings[0]));
  emptyBackendSailingsObj.Cabins[0].Category.Code = actualRequestObj.selectedRooms[i].categoryCode;
  emptyBackendSailingsObj.Cabins[0].Category.UpgradeCode = actualRequestObj.selectedRooms[i].categoryCode;
  emptyBackendSailingsObj.Cabins[0].Number = actualRequestObj.selectedRooms[i].cabin.number;
  emptyBackendSailingsObj.Cruise.Code = cruiseCode;
  backendsailingsArray.push(emptyBackendSailingsObj);

  if (actualRequestObj.selectedRooms[i] !== undefined && actualRequestObj.selectedRooms[i] !== null) {
    for (var j = 0; j < actualRequestObj.selectedRooms[i].guests.length; j++) {
      var populatedBackendGuestObject = JSON.parse(JSON.stringify(emptyBackendGuestObject));
      var actualGuestObj = actualRequestObj.selectedRooms[i].guests[j];
      if (actualGuestObj.primaryContact) {
        var primaryContactSelectedRoomIndex = i;
        var primaryContactGuestIndex = j;
      }
      populatedBackendGuestObject.SeqNumber = JSON.stringify(actualGuestObj.seqNo);
      populatedBackendGuestObject.Action = "N";
      populatedBackendGuestObject.Age.Code = actualGuestObj.type;
      if (actualGuestObj.dob) {
        populatedBackendGuestObject.Age.Amount = handleDOB(actualGuestObj.dob);
      } else {
        populatedBackendGuestObject.Age.Amount = actualGuestObj.age;
      }

      populatedBackendGuestObject.FirstName = actualGuestObj.firstName;
      populatedBackendGuestObject.LastName = actualGuestObj.lastName;
      populatedBackendGuestObject.BirthDate = actualGuestObj.dob;
      populatedBackendGuestObject.Title = actualGuestObj.title;
      populatedBackendGuestObject.LoyaltyNumber = actualGuestObj.marinerId;
      if(actualGuestObj.gender === 'female'){
		populatedBackendGuestObject.Gender.Code = "F";
	  }else if(actualGuestObj.gender === 'male'){
		populatedBackendGuestObject.Gender.Code = "M";
	  }else{
		populatedBackendGuestObject.Gender.Code = actualGuestObj.gender;
	  }

      if(actualGuestObj.countryOfResidence) {
        populatedBackendGuestObject.Nationality.Code = actualGuestObj.countryOfResidence;
        
      } else {
        delete populatedBackendGuestObject.Nationality;
      }

      if(actualGuestObj.travelInfo && actualGuestObj.travelInfo.length > 0) {         //CARNIVALCO-25328 - Added to support documents
        
        if(actualGuestObj.travelInfo[0].id) {
          populatedBackendGuestObject.TravelInfo.Id = actualGuestObj.travelInfo[0].id;

        }

        if(actualGuestObj.travelInfo[0].idInsurance) {
          populatedBackendGuestObject.TravelInfo.IdInsurance = actualGuestObj.travelInfo[0].idInsurance;

        }

        if(actualGuestObj.travelInfo[0].createTimestamp) {
          populatedBackendGuestObject.TravelInfo.CreateTimestamp = actualGuestObj.travelInfo[0].createTimestamp;

        }
      } else {
        delete populatedBackendGuestObject.TravelInfo;
      }

      populatedBackendGuestObject.Insurance.Code = actualGuestObj.insuranceCode;

      populatedBackendGuestObject.Sailings[0].Cruise.Code = cruiseCode;
      populatedBackendGuestObject.Sailings[0].Cabin.Number = actualRequestObj.selectedRooms[i].cabin.number;

      if (actualRequestObj.transportation !== undefined && actualRequestObj.transportation !== null) {
        populatedBackendGuestObject.Transportations[0].Direction = actualRequestObj.transportation.direction;
        populatedBackendGuestObject.Transportations[0].Type = actualRequestObj.transportation.type;
        populatedBackendGuestObject.Transportations[0].City.Code = actualRequestObj.transportation.code;
        populatedBackendGuestObject.Transportations[0].Class = actualRequestObj.transportation.class;
      }

      var backendSpecialItemsArray = [];

      for (var specialAssistance = 0; specialAssistance < actualGuestObj.specialAssistance.length; specialAssistance++) {
        var backendSpecialItemsObject = JSON.parse(JSON.stringify(emptyBackendGuestObject.SpecialItems[0]));
        backendSpecialItemsObject.Sailings[0].Cabin.Number = actualRequestObj.selectedRooms[i].cabin.number;
        backendSpecialItemsObject.Sailings[0].Cruise.Code = cruiseCode;

        backendSpecialItemsObject.Type.Code = actualGuestObj.specialAssistance[specialAssistance].code;

        backendSpecialItemsArray.push(backendSpecialItemsObject);
      }
      populatedBackendGuestObject.SpecialItems = backendSpecialItemsArray;

      var backendVouchersArray = [];
      if (actualGuestObj.voucherCodes !== undefined)
        for (var voucherCodes = 0; voucherCodes < actualGuestObj.voucherCodes.length; voucherCodes++) {
          var backendVoucherObject = JSON.parse(JSON.stringify(populatedBackendGuestObject.Vouchers[0]));
          backendVoucherObject.Id = actualGuestObj.voucherCodes[voucherCodes];
          backendVouchersArray.push(backendVoucherObject);
        }
        populatedBackendGuestObject.Vouchers = backendVouchersArray;

        if (actualGuestObj.address !== undefined) {
          populatedBackendGuestObject.Address.Street1 = actualGuestObj.address.address1;
          populatedBackendGuestObject.Address.Street2 = actualGuestObj.address.address2;
          populatedBackendGuestObject.Address.City = actualGuestObj.address.city;

          if(actualGuestObj.address.state) {
            populatedBackendGuestObject.Address.State.Code = actualGuestObj.address.state;

          } else {
            delete populatedBackendGuestObject.Address.State;
          }

          populatedBackendGuestObject.Address.Country.Code = actualGuestObj.address.country;
          populatedBackendGuestObject.Address.ZipCode = actualGuestObj.address.postalCode;
          populatedBackendGuestObject.Address.Email = actualGuestObj.emailAddress;
          populatedBackendGuestObject.Address.Phones[0].Number = actualGuestObj.address.phoneNumber;
        }

        backendGuestArray.push(populatedBackendGuestObject);

      }

    }

    backendRequest.Guests = backendGuestArray;

    backendRequest.ConsumerInfo.FirstName = actualRequestObj.selectedRooms[primaryContactSelectedRoomIndex].guests[primaryContactGuestIndex].firstName;
    backendRequest.ConsumerInfo.LastName = actualRequestObj.selectedRooms[primaryContactSelectedRoomIndex].guests[primaryContactGuestIndex].lastName;

    if (actualRequestObj.paymentDetails.courtesyHold !== undefined) {
      delete backendRequest.Payment;

    } else if (actualRequestObj.paymentDetails.bankTransfer !== undefined) {
      backendRequest.Payment.Type.Code = "BA";
      backendRequest.Payment.Amount = "500";
      backendRequest.Payment.Currency.Code = currencyCode;

      delete backendRequest.Payment.CreditCard;
      delete backendRequest.Payment.Ideal;

    } else if (actualRequestObj.paymentDetails.cardDetail !== undefined) {
      backendRequest.Payment.Type.Code = "CC";

      var total = 0;
      for (var payments = 0; payments < actualRequestObj.paymentDetails.cardDetail.payments.length; payments++) {

        total = total + actualRequestObj.paymentDetails.cardDetail.payments[payments].amount;
      }

      backendRequest.Payment.Amount = JSON.stringify(total);
      backendRequest.Payment.Currency.Code = currencyCode;

      if (actualRequestObj.paymentDetails.cardDetail.installment !== undefined) {
        backendRequest.Payment.CreditCard.Instalments.Number = actualRequestObj.paymentDetails.cardDetail.installment.code;
      }
      backendRequest.Payment.CreditCard.Token.Id = actualRequestObj.paymentDetails.cardDetail.payments[0].ccToken;
      backendRequest.Payment.CreditCard.Token.Currency.Code = currencyCode;
      backendRequest.Payment.CreditCard.Token.Amount = "100";
      backendRequest.Payment.CreditCard.Token.Merchant.Code = actualRequestObj.paymentDetails.cardDetail.payments[0].merchantType;
    }
    /**
     * Added ideal payment option to the back end request object as part of the implementation - CARNIVALCO-21589
     * consumer info will be populated as per the existing implementation from the first guest info.
     */
    else if(actualRequestObj.paymentDetails.ideal !== undefined){
    	 
    	  backendRequest.Payment.Type.Code = "ID";
          backendRequest.Payment.Amount = JSON.stringify(actualRequestObj.paymentDetails.ideal.amount);
          backendRequest.Payment.Currency.Code = currencyCode;
          backendRequest.Payment.Ideal.Bank.Code = actualRequestObj.paymentDetails.ideal.bankCode;;
          backendRequest.Payment.Ideal.RedirectsUrl.CancelUrl = actualRequestObj.paymentDetails.ideal.redirectsUrl.cancelUrl;
          backendRequest.Payment.Ideal.RedirectsUrl.ConfirmUrl = actualRequestObj.paymentDetails.ideal.redirectsUrl.confirmUrl;
          backendRequest.Payment.Ideal.RedirectsUrl.ErrorUrl = actualRequestObj.paymentDetails.ideal.redirectsUrl.errorUrl;
    }
  }

  if(actualRequestObj.paymentDetails)
  {
    if(actualRequestObj.paymentDetails.cardDetail && actualRequestObj.paymentDetails.cardDetail.payments && actualRequestObj.paymentDetails.cardDetail.payments.length > 0)
    {
	  payNowTarget=payNowTarget+"?AgentId="+agencyId;
	  context.setVariable("payNowTarget",payNowTarget);
      backendRequest.Guests[0].Address.Street1=actualRequestObj.paymentDetails.cardDetail.payments[0].address.address1;
      backendRequest.Guests[0].Address.Street2=actualRequestObj.paymentDetails.cardDetail.payments[0].address.address2;
      backendRequest.Guests[0].Address.City=actualRequestObj.paymentDetails.cardDetail.payments[0].address.city;
      backendRequest.Guests[0].Address.Country.Code=actualRequestObj.paymentDetails.cardDetail.payments[0].address.country;
      backendRequest.Guests[0].Address.Phones[0].Type.Code= "H";
	  backendRequest.Guests[0].Address.Phones[0].Number=actualRequestObj.selectedRooms[0].guests[0].address.phoneNumber;
      backendRequest.Guests[0].Address.ZipCode=actualRequestObj.paymentDetails.cardDetail.payments[0].address.postalCode;

      backendRequest.Guests[0].Address.State = {
          Code: actualRequestObj.paymentDetails.cardDetail.payments[0].address.state,
          Name:''
      };
    }else if (actualRequestObj.paymentDetails.courtesyHold && actualRequestObj.paymentDetails.courtesyHold.address)
    {
	  payNowTarget=payNowTarget+"?AgentId="+agencyId;
	  context.setVariable("payNowTarget",payNowTarget);

    if(locale === "de_DE") {
      backendRequest.Guests[0].Address.Country.Code=actualRequestObj.selectedRooms[0].guests[0].address.country;  //new changes CARNIVALCO-19521
      backendRequest.Guests[0].Address.ZipCode=actualRequestObj.selectedRooms[0].guests[0].address.postalCode;  //CARNIVALCO-19439 - TTG missing issue
      backendRequest.Guests[0].Address.State = {
          Code: actualRequestObj.selectedRooms[0].guests[0].address.state,
          Name:''
        };
    
    } else {
	     var stateCountryMap = context.getVariable("stateCountryMap");
	     var stateCountryMapObj = JSON.parse(stateCountryMap);
	     var countryCode = actualRequestObj.selectedRooms[0].guests[0].address.country;
	     var stateZip= stateCountryMapObj[countryCode];
	     if(stateZip){
        var mappingArray = stateZip.split("::");
        var state=mappingArray[0];
        var zip=mappingArray[1];
	     }
      
      backendRequest.Guests[0].Address.Country.Code=actualRequestObj.selectedRooms[0].guests[0].address.country;  //new changes CARNIVALCO-19521
      backendRequest.Guests[0].Address.ZipCode=zip;

      if(state)
      {
        backendRequest.Guests[0].Address.State = {
          Code: state,
          Name:''
        };
      }
    }
    if(actualRequestObj.selectedRooms[0].guests[0].address.address2) {
      backendRequest.Guests[0].Address.Street1=actualRequestObj.selectedRooms[0].guests[0].address.address1+" "+actualRequestObj.selectedRooms[0].guests[0].address.address2;   //CARNIVALCO-19439 - TTG missing issue
    }else{
      backendRequest.Guests[0].Address.Street1=actualRequestObj.selectedRooms[0].guests[0].address.address1;
    }
    backendRequest.Guests[0].Address.City=actualRequestObj.selectedRooms[0].guests[0].address.city; //CARNIVALCO-19439 - TTG missing issue
    backendRequest.Guests[0].Address.Street2="";
    backendRequest.Guests[0].Address.Phones[0].Type.Code="H";
    backendRequest.Guests[0].Address.Phones[0].Number=actualRequestObj.selectedRooms[0].guests[0].address.phoneNumber;

    }
    else if(actualRequestObj.paymentDetails.bankTransfer)
    {
	  payNowTarget=payNowTarget+"?AgentId="+agencyId;
	  context.setVariable("payNowTarget",payNowTarget);
	  
	  var stateCountryMap = context.getVariable("stateCountryMap");
	  var stateCountryMapObj = JSON.parse(stateCountryMap);
	  var countryCode = actualRequestObj.selectedRooms[0].guests[0].address.country;
	  var stateZip= stateCountryMapObj[countryCode];
	  var state;
	  var zip;
	  if(stateZip){
	   	  var mappingArray = stateZip.split("::");
		  state = mappingArray[0];
		  zip=mappingArray[1];
	  }
      if(actualRequestObj.paymentDetails.bankTransfer.address)
	  {
	  	 if(!actualRequestObj.paymentDetails.bankTransfer.address.state){
			actualRequestObj.paymentDetails.bankTransfer.address.state = state;
			actualRequestObj.paymentDetails.bankTransfer.address.postalCode = zip;
		  }
		  
		  if(actualRequestObj.paymentDetails.bankTransfer.address.address2) {
			backendRequest.Guests[0].Address.Street1=actualRequestObj.paymentDetails.bankTransfer.address.address1+" "+actualRequestObj.paymentDetails.bankTransfer.address.address2;
		  }else{
			backendRequest.Guests[0].Address.Street1=actualRequestObj.paymentDetails.bankTransfer.address.address1;
		  }
		  backendRequest.Guests[0].Address.Street2="";
		  backendRequest.Guests[0].Address.City=actualRequestObj.paymentDetails.bankTransfer.address.city;
		  backendRequest.Guests[0].Address.Country.Code=actualRequestObj.paymentDetails.bankTransfer.address.country;
		  backendRequest.Guests[0].Address.Phones[0].Type.Code="H";
		  backendRequest.Guests[0].Address.Phones[0].Number=actualRequestObj.selectedRooms[0].guests[0].address.phoneNumber;
		  backendRequest.Guests[0].Address.ZipCode=actualRequestObj.paymentDetails.bankTransfer.address.postalCode;
		  
			backendRequest.Guests[0].Address.State = {
			  Code: actualRequestObj.paymentDetails.bankTransfer.address.state,
			  Name:''
			}; 
	  }else if(locale === "de_DE"){
		  if(actualRequestObj.selectedRooms[0].guests[0].address.address2) {
        backendRequest.Guests[0].Address.Street1=actualRequestObj.selectedRooms[0].guests[0].address.address1+" "+actualRequestObj.selectedRooms[0].guests[0].address.address2;
      }else{
        backendRequest.Guests[0].Address.Street1=actualRequestObj.selectedRooms[0].guests[0].address.address1;
      }
      backendRequest.Guests[0].Address.Street2="";
		  backendRequest.Guests[0].Address.City=actualRequestObj.selectedRooms[0].guests[0].address.city;
		  backendRequest.Guests[0].Address.Country.Code=actualRequestObj.selectedRooms[0].guests[0].address.country;  //new changes CARNIVALCO-19521
		  backendRequest.Guests[0].Address.Phones[0].Type.Code="H";
		  backendRequest.Guests[0].Address.Phones[0].Number=actualRequestObj.selectedRooms[0].guests[0].address.phoneNumber;
		  backendRequest.Guests[0].Address.ZipCode=actualRequestObj.selectedRooms[0].guests[0].address.postalCode;        //CARNIVALCO-19439 - TTG missing issue

      backendRequest.Guests[0].Address.State = {
          Code: actualRequestObj.selectedRooms[0].guests[0].address.state,
          Name:''
        };

		  }
    }
   	
	backendRequest.ConsumerInfo.Street1 = backendRequest.Guests[0].Address.Street1;
    backendRequest.ConsumerInfo.Street2 = backendRequest.Guests[0].Address.Street2;
    backendRequest.ConsumerInfo.City = backendRequest.Guests[0].Address.City;

    //new changes CARNIVALCO-19521
    var stateCountryMap = context.getVariable("stateCountryMap");
    var stateCountryMapObj = JSON.parse(stateCountryMap);
    if(actualRequestObj.paymentDetails.courtesyHold && actualRequestObj.paymentDetails.courtesyHold.address && (locale === "it_IT" ||locale === "fr_FR" ||locale === "es_ES" ||locale === "en_US")) {
      var countryCode;
      if(locale === "fr_FR") {
          countryCode = "F";
      } else if(locale === "it_IT") {
        countryCode = "I";
      } else if (locale === "es_ES") {
		  countryCode = "E";
	  } else if (locale === "en_US") {
		  countryCode = "USA";
	  }

      var stateZip= stateCountryMapObj[countryCode];
      if(stateZip){
        var mappingArray = stateZip.split("::");
        var state=mappingArray[0];
        var zip=mappingArray[1];
      }
      backendRequest.ConsumerInfo.Country.Code = countryCode;
      backendRequest.ConsumerInfo.ZipCode=zip;

      if(state)
      {
        backendRequest.ConsumerInfo.State.Code = state;
      } else {
        delete backendRequest.ConsumerInfo.State;
      }

    } else if(!actualRequestObj.paymentDetails.ideal){
      backendRequest.ConsumerInfo.Country.Code = backendRequest.Guests[0].Address.Country.Code;
      if(backendRequest.Guests[0].Address.State) {
        backendRequest.ConsumerInfo.State.Code = backendRequest.Guests[0].Address.State.Code;

      } else {
        delete backendRequest.ConsumerInfo.State;
      }
      backendRequest.ConsumerInfo.ZipCode = backendRequest.Guests[0].Address.ZipCode;
    }

    backendRequest.ConsumerInfo.Phones[0].Number = actualRequestObj.selectedRooms[0].guests[0].address.phoneNumber;
	  backendRequest.ConsumerInfo.Phones[0].Type.Code="H";
    backendRequest.ConsumerInfo.Email = actualRequestObj.selectedRooms[0].guests[0].emailAddress;

    backendRequest.Sailings = backendsailingsArray;
    
    /**
     * Updating target with agency id for ideal payment option as part of the implementation - CARNIVALCO-21589
     */
    if(actualRequestObj.paymentDetails.ideal){
    	
    	   payNowTarget=payNowTarget+"?AgentId="+agencyId;
    	   context.setVariable("payNowTarget",payNowTarget);
		  
		  // Setting consumer info for ideal payment from ideal object
		   backendRequest.ConsumerInfo.FirstName = actualRequestObj.paymentDetails.ideal.firstName;
           backendRequest.ConsumerInfo.LastName = actualRequestObj.paymentDetails.ideal.lastName;
           backendRequest.ConsumerInfo.Street1 = actualRequestObj.paymentDetails.ideal.address.address1;
           backendRequest.ConsumerInfo.Street2 = actualRequestObj.paymentDetails.ideal.address.address2;
           backendRequest.ConsumerInfo.City = actualRequestObj.paymentDetails.ideal.address.city;
           backendRequest.ConsumerInfo.Country.Code = actualRequestObj.paymentDetails.ideal.address.country;
           backendRequest.ConsumerInfo.ZipCode = actualRequestObj.paymentDetails.ideal.address.postalCode;
           
           if(actualRequestObj.paymentDetails.ideal.address.state) {
              backendRequest.ConsumerInfo.State.Code = actualRequestObj.paymentDetails.ideal.address.state;
           }

           backendRequest.ConsumerInfo.Phones[0].Number = actualRequestObj.paymentDetails.ideal.address.phoneNumber;
           backendRequest.ConsumerInfo.Phones[0].Type.Code="H";
           backendRequest.ConsumerInfo.Email = actualRequestObj.paymentDetails.ideal.address.emailAddress;
    	
    }
    

    var transformedRequest=JSON.parse(JSON.stringify(backendRequest));
    var validSchema = tv4.validateMultiple(transformedRequest, jsonSchema);

    if (!validSchema.valid) {
      context.setVariable("schemaValidationFailed", "true");
      throw error;
    }

   
    context.setVariable("request.content", JSON.stringify(backendRequest));
    context.setVariable("targetRequest", JSON.stringify(backendRequest));

  } 
}
catch (error) {

    throw error;
  }