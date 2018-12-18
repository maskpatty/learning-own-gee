var actualRequest = context.getVariable("request.content");
var cruiseCode = context.getVariable("cruiseCode");
context.setVariable("initialRequest",actualRequest);
var data = JSON.parse(actualRequest);

try {

    var releaseJsonPayload = {
        "Sailing": {
            "Cruise": {
                "Code": ""
            },
            "Cabin": {
                "Number": "",
                "Category": {
                    "Code": ""
                }
            }
			},
            "Rate": {
                "Code": ""
            },
            "Guests": [{
                "SeqNumber": ""
            }]
    };
	
    var holdJsonPayload = {
        "Sailing": {
            "Cruise": {
                "Code": ""
            },
            "Cabin": {
                "Number": "",
                "Category": {
                    "Code": ""
                }
			}
            },
            "Rate": {
                "Code": ""
            },
            "Guests": [{
                "SeqNumber": ""
            }]
    };

    
    if (data !== null) {
	
        if (data.currentSelections !== null && data.currentSelections.length > 0) {
			var Guests = [];
            holdJsonPayload.Sailing.Cruise.Code = cruiseCode;
            holdJsonPayload.Sailing.Cabin.Number = data.currentSelections[0].number;
            holdJsonPayload.Sailing.Cabin.Category.Code = data.currentSelections[0].categoryCode;
            holdJsonPayload.Rate.Code = data.currentSelections[0].rateCode;
            var GuestsObject = {};
			if(data.currentSelections[0].noOfGuest){
				GuestsObject.SeqNumber = data.currentSelections[0].noOfGuest.toString();
			}
            Guests.push(GuestsObject);
            holdJsonPayload.Guests = Guests;
            context.setVariable("holdJsonPayload",JSON.stringify(holdJsonPayload));
        }
            
        if (data.previousSelections !== null && data.previousSelections.length > 0) {
				var Guests = [];
                releaseJsonPayload.Sailing.Cruise.Code = cruiseCode;
                releaseJsonPayload.Sailing.Cabin.Number = data.previousSelections[0].number;
                releaseJsonPayload.Sailing.Cabin.Category.Code = data.previousSelections[0].categoryCode;
                releaseJsonPayload.Rate.Code = data.previousSelections[0].rateCode;
                var GuestsObject = {};
				if(data.previousSelections[0].noOfGuest){
					GuestsObject.SeqNumber = data.previousSelections[0].noOfGuest.toString();
				}
                Guests.push(GuestsObject);
                releaseJsonPayload.Guests = Guests;
            }
            context.setVariable("releaseJsonPayload",JSON.stringify(releaseJsonPayload));
        }
    } catch (error) {

		throw error;
	}