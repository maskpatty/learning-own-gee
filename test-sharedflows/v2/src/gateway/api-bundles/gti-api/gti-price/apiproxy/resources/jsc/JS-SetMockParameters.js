try {

	var priceByCruiseIdMock = context.getVariable("priceByCruiseIdMock");
	var priceByItineraryIdMock = context.getVariable("priceByItineraryIdMock");
	var pathSuffix= context.getVariable("proxy.pathsuffix");
	var verb = context.getVariable("request.verb");

	if(pathSuffix.includes("/cruise") && verb=="GET" && priceByCruiseIdMock=="true") {
		context.setVariable("request.queryparam.serviceName", "PricebycruiseId");
		context.setVariable("request.queryparam.responseType", "200");
		context.setVariable("request.verb", "POST");
	
	} else if(pathSuffix.includes("/itinerary") && verb=="GET" && priceByItineraryIdMock=="true") {
		context.setVariable("request.queryparam.serviceName", "PricebyitId");
		context.setVariable("request.queryparam.responseType", "200");
		context.setVariable("request.verb", "POST");
	}
}catch(error) {

	throw error;
}