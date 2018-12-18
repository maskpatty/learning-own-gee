function replacer(key,value)
	{
		if (value=="null") return "";
		else if (value==undefined) return "";
		else return value;
	}

try{
    
 var targetResponse = context.getVariable('response.content');
 var backendRequest = context.getVariable('request.content');
 context.setVariable("targetRequest", context.getVariable('maskedRequest'));
 context.setVariable('targetResponse',context.getVariable('maskedResponse'));
 var backendRequestObj = JSON.parse(backendRequest);
 
 var targetResponseObj = JSON.parse(targetResponse);
 var transformedResopnseObj ={
  "errors": [],
  "data": {

  }
};
context.setVariable('response.content',JSON.stringify(transformedResopnseObj,replacer));
 
  
} catch(error) {
    throw error;
}