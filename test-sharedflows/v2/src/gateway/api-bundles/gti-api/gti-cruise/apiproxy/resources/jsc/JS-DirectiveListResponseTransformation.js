try {

  var clientResponse ={
  "errors": [],
  "data": {
    "guests": [
      {
        "seqNumber": "",
        "travelInfo": [
          {
            "id": "",
            "idInsurance": "",
            "createTimestamp": ""
          }
        ]
      }
    ]
  }
};

var backendResponse = context.getVariable("response.content");
context.setVariable("targetRequest", backendResponse);

var backendResponseObj = JSON.parse(backendResponse);

var backendGuestArray = [];

if(backendResponseObj.Guests) {
for (var guestObj = 0; guestObj < backendResponseObj.Guests.length; guestObj++) {
  var emptyClientGuestObject = JSON.parse(JSON.stringify(clientResponse.data.guests[0]));
  var backendTravelInfoArray = [];
  if(backendResponseObj.Guests[guestObj].SeqNumber) {
	emptyClientGuestObject.seqNumber = backendResponseObj.Guests[guestObj].SeqNumber;
  }
    
  if (backendResponseObj.Guests[guestObj].TravelInfo !== undefined && backendResponseObj.Guests[guestObj].TravelInfo !== null) {
     
    for (var selectGuestTravelInfoObj = 0; selectGuestTravelInfoObj < backendResponseObj.Guests[guestObj].TravelInfo.length; selectGuestTravelInfoObj++) {
        
      var populatedClientTravelInfoObject = JSON.parse(JSON.stringify(emptyClientGuestObject.travelInfo[0]));
      var actualTravelInfoObj = backendResponseObj.Guests[guestObj].TravelInfo[selectGuestTravelInfoObj];
	  
	  if(actualTravelInfoObj.Id) {
      populatedClientTravelInfoObject.id = actualTravelInfoObj.Id;
	  }
	  
	  if(actualTravelInfoObj.IdInsurance) {
	  populatedClientTravelInfoObject.idInsurance = actualTravelInfoObj.IdInsurance;
	  }
	  
	  if(actualTravelInfoObj.CreateTimestamp) {
	  populatedClientTravelInfoObject.createTimestamp = actualTravelInfoObj.CreateTimestamp;
      }
	  
	  backendTravelInfoArray.push(populatedClientTravelInfoObject);

      }

    }

    emptyClientGuestObject.travelInfo = backendTravelInfoArray;
	backendGuestArray.push(emptyClientGuestObject);
  }
  
    clientResponse.data.guests = backendGuestArray;


    context.setVariable("response.content", JSON.stringify(clientResponse));
    context.setVariable("clientResponse", JSON.stringify(clientResponse));
}
  
}
catch (error) {

    throw error;
}
