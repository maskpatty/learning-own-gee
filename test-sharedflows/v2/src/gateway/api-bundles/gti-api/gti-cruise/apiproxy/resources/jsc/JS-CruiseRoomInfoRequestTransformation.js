 var req = context.getVariable('request.content');
 
 var reqObj = JSON.parse(req);
 
 delete reqObj.marinerId;
 delete reqObj.firstName;
 delete reqObj.lastName;
  
 context.setVariable('request.content',JSON.stringify(reqObj));