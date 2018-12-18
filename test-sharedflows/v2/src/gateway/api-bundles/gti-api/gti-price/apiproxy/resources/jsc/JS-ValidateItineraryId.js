try {

	var itineraryId = context.getVariable("costa.itineraryId");
	if((itineraryId === null)||(itineraryId==="")){
	    context.setVariable('api-error.code', '400');
	    context.setVariable('api-error.message', 'Bad Request');
	    context.setVariable('api-error.status_code', '400');
	    context.setVariable('api-error.reason_phrase', 'ItineraryId is not present in Request');
    	throw new Error();
	}
} catch(error) {

	throw error;
} 