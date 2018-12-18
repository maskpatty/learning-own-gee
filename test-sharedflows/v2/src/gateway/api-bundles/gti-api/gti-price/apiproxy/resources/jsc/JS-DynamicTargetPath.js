try {
	
	context.setVariable("target.copy.pathsuffix", false);
	context.setVariable("request.header.Accept", "application/json");
	
	
	var cruisePriceTarget= context.getVariable("cruisePriceTarget");
	var itineraryPriceTarget= context.getVariable("itineraryPriceTarget");

	var agentId= context.getVariable("request.header.agencyId");
	var itineraryId=context.getVariable("costa.itineraryId");
	var cruiseId=context.getVariable("costa.cruiseId");
	var loyaltyLabel= context.getVariable("request.header.loyaltynumber");
	var pathSuffix = context.getVariable("proxy.pathsuffix");

	if(pathSuffix.includes("/cruise")) {
		if(loyaltyLabel){
			cruisePriceTarget=cruisePriceTarget+"?CruiseID="+cruiseId+"&AgentId="+agentId+"&loyaltyLabel="+loyaltyLabel;
		}else{
			cruisePriceTarget=cruisePriceTarget+"?CruiseID="+cruiseId+"&AgentId="+agentId;
		}
		context.setVariable("cruisePriceTarget",cruisePriceTarget);
		context.setVariable("errorConfigCodes",context.getVariable("priceByCruiseIdErrorConfig"));
	
	} else if (pathSuffix.includes("/itinerary")) {

		if(loyaltyLabel){
			itineraryPriceTarget=itineraryPriceTarget+"?ItineraryID="+itineraryId+"&AgentId="+agentId+"&loyaltyLabel="+loyaltyLabel;
		}else{
			itineraryPriceTarget=itineraryPriceTarget+"?ItineraryID="+itineraryId+"&AgentId="+agentId;
		}
	 	context.setVariable("itineraryPriceTarget",itineraryPriceTarget);
		context.setVariable("errorConfigCodes",context.getVariable("priceByItineraryIdErrorConfig"));
	}
}catch(error) {

	throw error;
}