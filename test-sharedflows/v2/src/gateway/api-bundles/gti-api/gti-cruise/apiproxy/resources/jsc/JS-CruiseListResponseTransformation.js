var transformedResponseJsonStructure = {
  "data": {
    "cruiseList": [
      {
        "arriveDate": "",
        "departDate": "",
        "isAvailable": "",
        "availabilityStatus": "",
        "isSellable": "",
        "duration": "",
        "cruiseCode": "",
        "sailingDate": "",
        "shipVersion": "",
        "shipCode": "",
        "tourId": "",
        "tourDeparture": "",
        "itineraryId": "",
        "lowestPrice": {
          "fare": "",
          "classification": "",
          "price": "",
          "currencyCode": "",
          "tax": "",
          "taxesAndFeesCombined": true,						//CARNIVALCO-24096
          "basePrice": "",
          "baseTax": "",
          "category": "",
          "flight": {
            "flightRequired": "",
            "gatewaycode": "",
            "direction": ""
          },
          "promoCodes": []
        },
        "portCharges": {
          "adultAmount": "",
          "childAmount": "",
          "infantAmount": ""
        },
        "serviceCharges": [
          {
            "currency": "",
            "adultAmount": "",
            "childAmount": "",
            "totalAdultAmount": "",
            "totalChildAmount": ""
          }
        ]
      }
    ]
  }
}

function replacer(key,value)
{
	if (value=="null") return "";
	else if (value==undefined) return "";
	else return value;
}

try{  

var targetResponse = context.getVariable('response.content');
var targetResponseObj = JSON.parse(targetResponse);
var maxItems = context.getVariable('request.queryparam.MaxItems');
var expTransformedResponse = {
  "data": {
    "cruiseList": []
  }
};


if(targetResponseObj.Cruises) {

	if(maxItems) {                  //CARNIVALCO-13053 
	    if(maxItems > 3) {				
		    maxItems = 3;			
	    }
    } else {
        maxItems = 1;
    }

	for(var cruiseListIndex = 0; cruiseListIndex < maxItems && cruiseListIndex < targetResponseObj.Cruises.length; cruiseListIndex++) {
		var transformedResponse = JSON.parse(JSON.stringify(transformedResponseJsonStructure.data.cruiseList[0]));		//CARNIVALCO-13053 
		transformedResponse.arriveDate = targetResponseObj.Cruises[cruiseListIndex].ArrDate;
		transformedResponse.departDate = targetResponseObj.Cruises[cruiseListIndex].DepDate;
		transformedResponse.isAvailable = targetResponseObj.Cruises[cruiseListIndex].IsAvailable;
		transformedResponse.availabilityStatus = targetResponseObj.Cruises[cruiseListIndex].AvailabilityStatus;
		transformedResponse.isSellable = targetResponseObj.Cruises[cruiseListIndex].IsSellable;
		if(targetResponseObj.Cruises[cruiseListIndex].Duration){ // CARNIVALCO-12351
		    var duration = parseInt(targetResponseObj.Cruises[cruiseListIndex].Duration) + 1;
		    transformedResponse.duration = duration.toString();
		}
		transformedResponse.cruiseCode = targetResponseObj.Cruises[cruiseListIndex].Code;
		transformedResponse.sailingDate = targetResponseObj.Cruises[cruiseListIndex].DepDate;
		transformedResponse.shipCode = targetResponseObj.Cruises[cruiseListIndex].Ship.Code;
		transformedResponse.itineraryId = targetResponseObj.Cruises[cruiseListIndex].Itinerary.Code;
	
		transformedResponse.lowestPrice.fare = targetResponseObj.Cruises[cruiseListIndex].PricesInfo.BestPrice.Fare.Code;
		if(targetResponseObj.Cruises[cruiseListIndex].PricesInfo.BestPrice.Fare.serviceChargesIncluded){
		transformedResponse.lowestPrice.serviceChargesIncluded = targetResponseObj.Cruises[cruiseListIndex].PricesInfo.BestPrice.Fare.serviceChargesIncluded;
		}
		if(targetResponseObj.Cruises[cruiseListIndex].PricesInfo.BestPrice.Prices.ByOccupancy!== undefined) {
			transformedResponse.lowestPrice.price = targetResponseObj.Cruises[cruiseListIndex].PricesInfo.BestPrice.Prices.ByOccupancy[0].Amount; 
		}else {
			transformedResponse.lowestPrice.price =0;
		}
	
		transformedResponse.lowestPrice.currencyCode = targetResponseObj.Cruises[cruiseListIndex].PricesInfo.Currency;
		transformedResponse.lowestPrice.category = targetResponseObj.Cruises[cruiseListIndex].PricesInfo.BestPrice.Category.Code;
		transformedResponse.lowestPrice.flight.flightRequired = targetResponseObj.Cruises[cruiseListIndex].PricesInfo.BestPrice.Flight.IsMandatory;
		transformedResponse.lowestPrice.flight.gatewaycode = targetResponseObj.Cruises[cruiseListIndex].PricesInfo.BestPrice.Flight.Gateway.Code;
		transformedResponse.lowestPrice.flight.direction = targetResponseObj.Cruises[cruiseListIndex].PricesInfo.BestPrice.Flight.Direction;
		
		if(targetResponseObj.Cruises[cruiseListIndex].PricesInfo && targetResponseObj.Cruises[cruiseListIndex].PricesInfo.Taxes 
			&& targetResponseObj.Cruises[cruiseListIndex].PricesInfo.Taxes.Governative) {															//CARNIVALCO-24096
				if(typeof(targetResponseObj.Cruises[cruiseListIndex].PricesInfo.Taxes.Governative.AdultAmount) !== undefined) {
					transformedResponse.lowestPrice.tax = parseFloat(targetResponseObj.Cruises[cruiseListIndex].PricesInfo.Taxes.Governative.AdultAmount);
				}
				if(typeof(targetResponseObj.Cruises[cruiseListIndex].PricesInfo.Taxes.Governative.Included) !== undefined) {
					transformedResponse.lowestPrice.taxesAndFeesCombined = JSON.parse(targetResponseObj.Cruises[cruiseListIndex].PricesInfo.Taxes.Governative.Included);
				}
		}

		if(targetResponseObj.Cruises[cruiseListIndex].PricesInfo && targetResponseObj.Cruises[cruiseListIndex].PricesInfo.BestPrice 
			&& targetResponseObj.Cruises[cruiseListIndex].PricesInfo.BestPrice.Discounts) {
				for(var discounts=0;discounts < targetResponseObj.Cruises[cruiseListIndex].PricesInfo.BestPrice.Discounts.length;discounts++) {
					transformedResponse.lowestPrice.promoCodes.push(targetResponseObj.Cruises[cruiseListIndex].PricesInfo.BestPrice.Discounts[discounts].Code);
				}
		}
	
		transformedResponse.portCharges.adultAmount = targetResponseObj.Cruises[cruiseListIndex].PortCharges.AdultAmount;
		transformedResponse.portCharges.childAmount = targetResponseObj.Cruises[cruiseListIndex].PortCharges.ChildAmount;
		transformedResponse.portCharges.infantAmount = targetResponseObj.Cruises[cruiseListIndex].PortCharges.InfantAmount;
	
		var  serviceChargeArray=[];
		
		if(targetResponseObj.Cruises[cruiseListIndex].ServiceCharges) {
			for(var serviceCharge=0; serviceCharge < targetResponseObj.Cruises[cruiseListIndex].ServiceCharges.length; serviceCharge++) {
				var serviceChargeEmptyObj = JSON.parse(JSON.stringify(transformedResponse.serviceCharges[0]));
				serviceChargeEmptyObj.currency = targetResponseObj.Cruises[cruiseListIndex].ServiceCharges[serviceCharge].Currency;
				serviceChargeEmptyObj.adultAmount = targetResponseObj.Cruises[cruiseListIndex].ServiceCharges[serviceCharge].AdultAmount;
				serviceChargeEmptyObj.childAmount = targetResponseObj.Cruises[cruiseListIndex].ServiceCharges[serviceCharge].ChildAmount;
				serviceChargeEmptyObj.totalAdultAmount = targetResponseObj.Cruises[cruiseListIndex].ServiceCharges[serviceCharge].TotalAdultAmount;
				serviceChargeEmptyObj.totalChildAmount = targetResponseObj.Cruises[cruiseListIndex].ServiceCharges[serviceCharge].TotalChildAmount;
				serviceChargeArray.push(serviceChargeEmptyObj);
			}
		}
	
		transformedResponse.serviceCharges = serviceChargeArray;
		expTransformedResponse.data.cruiseList.push(transformedResponse);
	}
}

context.setVariable('response.content',JSON.stringify(expTransformedResponse,replacer));

}catch(error) {
	throw error;
}