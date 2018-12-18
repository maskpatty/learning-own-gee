try {

	var pathSuffix = context.getVariable("proxy.pathsuffix");
	
	if(pathSuffix.includes("/cruise")) {
		var priceByCruiseQuota = context.getVariable("priceByCruiseQuota");
		var priceByCruiseQuotaObj = JSON.parse(priceByCruiseQuota);
		context.setVariable("quota-limit",priceByCruiseQuotaObj.count);
		context.setVariable("timeInterval",priceByCruiseQuotaObj.timeInterval);
		context.setVariable("timeUnit",priceByCruiseQuotaObj.timeUnit);
		context.setVariable("identifier","/cruise");
	
	} else if (pathSuffix.includes("/itinerary")) {
		var priceByItineraryQuota = context.getVariable("priceByItineraryQuota");
		var priceByItineraryQuotaObj = JSON.parse(priceByItineraryQuota);
		context.setVariable("quota-limit",priceByItineraryQuotaObj.count);
		context.setVariable("timeInterval",priceByItineraryQuotaObj.timeInterval);
		context.setVariable("timeUnit",priceByItineraryQuotaObj.timeUnit);
		context.setVariable("identifier","/itinerary");	    
	}
}catch(error) {

	throw error;
}