try {
	
	context.setVariable("request.header.Accept", "application/json");
	 
    var addRoomTarget= context.getVariable("addRoomTarget");
    var cruiseRoomInfoTarget= context.getVariable("cruiseRoomInfoTarget");
    var bookingConfirmationTarget= context.getVariable("bookingConfirmationTarget");
    var updateRoomTarget= context.getVariable("updateRoomTarget");
    var checkoutTarget= context.getVariable("checkoutTarget");
    var payNowTarget= context.getVariable("payNowTarget");
    var paymentStatusTarget= context.getVariable("paymentStatusTarget");
    var listTarget = context.getVariable("listTarget");
    var travelDirectiveListTarget = context.getVariable("travelDirectiveListTarget");
    var agentId= context.getVariable("request.header.agencyId");
    var bookingId= context.getVariable("bookingId");
    var pathSuffix = context.getVariable("proxy.pathsuffix");
    var verb =context.getVariable("request.verb");
	context.setVariable('targetRequest',context.getVariable('request.content'));

	if(pathSuffix.includes("/room/select") && verb == "POST"){
        
		var cruiseId = context.getVariable("proxy.pathsuffix");
        var cruiseCode = cruiseId.split("/")[1];
		
		context.setVariable("target.copy.pathsuffix", false);
        var actualRequest = context.getVariable("request.content");
		
        var releaseTarget = context.getVariable("releaseTarget");
        var holdTarget = context.getVariable("holdTarget");
        
		holdTarget = holdTarget+"?AgentId="+agentId;
		releaseTarget = releaseTarget+"?AgentId="+agentId;
		
		context.setVariable("holdTarget",holdTarget);
		context.setVariable("releaseTarget",releaseTarget);
		
        context.setVariable("errorConfigCodes",context.getVariable("roomSelectErrorConfig"));
        context.setVariable("myRequest", context.getVariable("request.content"));
		context.setVariable("cruiseCode", cruiseCode);
    }
    if (pathSuffix.includes("/room/search")) {
        cruiseRoomInfoTarget=cruiseRoomInfoTarget+"?AgentId="+agentId;
        context.setVariable("cruiseRoomInfoTarget",cruiseRoomInfoTarget);
		context.setVariable("errorConfigCodes",context.getVariable("cruiseRoomInfoErrorConfig"));
    }
    else if (pathSuffix.includes("/room") && verb == "PUT")
    {
        updateRoomTarget=updateRoomTarget+"?AgentId="+agentId; 
        context.setVariable("updateRoomTarget",updateRoomTarget); 
		context.setVariable("errorConfigCodes",context.getVariable("updateRoomErrorConfig"));	
    }
    else if (pathSuffix.includes("/room") && verb == "POST")
    {
        addRoomTarget=addRoomTarget+"?AgentId="+agentId;
        context.setVariable("addRoomTarget",addRoomTarget);
		context.setVariable("errorConfigCodes",context.getVariable("addRoomErrorConfig"));
    }
	else if (pathSuffix.includes("/price/payment/status"))
    {    
        paymentStatusTarget=paymentStatusTarget+"?AgentId="+agentId;
        context.setVariable("paymentStatusTarget",paymentStatusTarget);
        context.setVariable("target.copy.pathsuffix", false);
        context.setVariable("errorConfigCodes",context.getVariable("paymentStatusErrorConfig"));
    }
    else if (pathSuffix.includes("/price/payment"))
    {    
//      payNowTarget=payNowTarget+"?AgentId="+agentId;
        context.setVariable("payNowTarget",payNowTarget);
        context.setVariable("target.copy.pathsuffix", false);
		context.setVariable("errorConfigCodes",context.getVariable("payNowErrorConfig"));
    } 
    else if (pathSuffix.includes("/checkout"))
    {
        checkoutTarget=checkoutTarget+"?AgentId="+agentId;
        context.setVariable("checkoutTarget",checkoutTarget);
		context.setVariable("target.copy.pathsuffix", false);
		context.setVariable("errorConfigCodes",context.getVariable("checkOutErrorConfig"));
    }
    else if (pathSuffix.includes("/bookingconfirmation"))
    {
  //    bookingConfirmationTarget=bookingConfirmationTarget+bookingId+"?AgentId="+agentId;
        context.setVariable("bookingConfirmationTarget",bookingConfirmationTarget);
		context.setVariable("target.copy.pathsuffix", false);
		context.setVariable("errorConfigCodes",context.getVariable("bookingConfirmationErrorConfig"));
    }
    else if (pathSuffix.includes("/directive/list"))
    {
        travelDirectiveListTarget=travelDirectiveListTarget+"?AgentId="+agentId;
        context.setVariable("travelDirectiveListTarget",travelDirectiveListTarget);
        context.setVariable("target.copy.pathsuffix", false);
        context.setVariable("errorConfigCodes",context.getVariable("travelDirectiveListErrorConfig"));
    }
    else if (pathSuffix.includes("/list"))
    {
        listTarget=listTarget+"?AgentId="+agentId;
        context.setVariable("listTarget",listTarget);
        context.setVariable("target.copy.pathsuffix", false);
        context.setVariable("errorConfigCodes",context.getVariable("listErrorConfig"));
    }

} catch(error) {

    throw error;
}
