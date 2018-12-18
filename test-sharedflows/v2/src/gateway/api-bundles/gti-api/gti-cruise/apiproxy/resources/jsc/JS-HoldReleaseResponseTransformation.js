var actualRequest = context.getVariable("initialRequest");

var intialRequest = JSON.parse(actualRequest);
function replacer(key,value)
{
	if (value=="null") return "";
	else if (value==undefined) return "";
	else return value;
}

try {    
    var data = {
        "errors": [],
		"data":{
		"previousSelections" : [
		{
			"number": "",
			"accessibleType" : "",
			"rateCode" : "",
			"releaseStatus": ""
		}
	],
	"currentSelections" : [
		{
			"number": "",
			"accessibleType" : "",
			"rateCode" : "",
			"holdStatus": ""
		}
	]
		}
    }
	
    if (intialRequest != null) {
	
        if (intialRequest.previousSelections != null && intialRequest.previousSelections.length > 0) {
            data.data.previousSelections[0].number = intialRequest.previousSelections[0].number;
			data.data.previousSelections[0].accessibleType = intialRequest.previousSelections[0].accessibleType;
			data.data.previousSelections[0].rateCode = intialRequest.previousSelections[0].rateCode;
			data.data.previousSelections[0].releaseStatus = "200";
        }
		if (intialRequest.currentSelections != null && intialRequest.currentSelections.length > 0) {
            data.data.currentSelections[0].number = intialRequest.currentSelections[0].number;
			data.data.currentSelections[0].accessibleType = intialRequest.currentSelections[0].accessibleType;
			data.data.currentSelections[0].rateCode = intialRequest.currentSelections[0].rateCode;
			data.data.currentSelections[0].holdStatus = "200";
        }
		
		
		context.setVariable("targetResopnse",JSON.stringify(data,replacer));
        context.setVariable("response.content",JSON.stringify(data,replacer));
        }
    }
catch (error) {
	
	throw error;
}