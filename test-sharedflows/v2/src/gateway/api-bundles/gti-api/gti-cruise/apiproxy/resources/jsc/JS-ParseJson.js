try {

	var req = context.getVariable("request.content");
	var cruiseId = context.getVariable("request.header.cruiseId");
	 
	var reqObj = JSON.parse(req);
	 
	 
	context.setVariable("cruiseId", cruiseId);
	context.setVariable("shipCode", reqObj.shipCode);
	context.setVariable("sailingCode", reqObj.sailingCode);
	context.setVariable("sailingDate", reqObj.sailingDate);
	context.setVariable("cabin", reqObj.cabin);

} catch(error) {

    throw e;
}