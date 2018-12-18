try{
	var bookingId = "";
	var myRequest = "";
	var isError = false;

	context.setVariable("target.copy.pathsuffix", false);
	context.setVariable("request.verb","GET");
	var myRequest = context.getVariable("request.content"); 
	var bookingConfirmationTarget= context.getVariable("bookingConfirmationTarget");
	myRequest = JSON.parse(myRequest);
	var agencyId = context.getVariable("request.header.agencyId");
	
	if (myRequest.confirmationDetails[0] !== null) {
		bookingId = myRequest.confirmationDetails[0].confirmationNumber;
		context.setVariable("bookingId",bookingId);
		bookingConfirmationTarget=bookingConfirmationTarget+bookingId+"?AgentId="+agencyId;
		context.setVariable('bookingConfirmationTarget',bookingConfirmationTarget);
	}
	context.setVariable('targetRequest',context.getVariable('request.content')); 
}
catch(error)
{
		throw e;
}