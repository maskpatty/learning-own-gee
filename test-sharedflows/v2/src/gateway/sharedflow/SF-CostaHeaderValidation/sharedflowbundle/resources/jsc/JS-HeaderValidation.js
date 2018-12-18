var agencyId=context.getVariable("request.header.agencyId");


if((agencyId === null)||(agencyId==="")){
    context.setVariable('api-error.code', '401');
    context.setVariable('api-error.message', 'Request not authorized because Agency or Network dont match');
    context.setVariable('api-error.status_code', '401');
    context.setVariable('api-error.reason_phrase', 'Unauthorized Request');

    throw new Error();
}