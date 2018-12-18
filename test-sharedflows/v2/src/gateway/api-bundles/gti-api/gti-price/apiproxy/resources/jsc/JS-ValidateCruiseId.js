try {

	var cruiseId = context.getVariable("costa.cruiseId");

	if((cruiseId === null)||(cruiseId==="")){
	    context.setVariable('api-error.code', '400');
	    context.setVariable('api-error.message', 'Bad Request');
	    context.setVariable('api-error.status_code', '400');
	    context.setVariable('api-error.reason_phrase', 'CruiseId is not present in Request');
	    throw new Error();
	}
} catch(error) {

	throw error;
}