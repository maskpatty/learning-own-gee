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
    "countryCode": "",
    "confirmationDetails": [
      {
        "lastName": "",
        "emailAddress": "",
        "confirmationNumber": "",
		"paymentInfo":{
             "paymentUrl":"",
			 "ref":""
		}
        
      }
    ]
  }
};

 
 if(targetResponseObj.BookingNum !== null) {
     
     transformedResopnseObj.data.confirmationDetails[0].confirmationNumber= targetResponseObj.BookingNum;
     transformedResopnseObj.data.confirmationDetails[0].lastName = backendRequestObj.ConsumerInfo.LastName;
     transformedResopnseObj.data.confirmationDetails[0].emailAddress = backendRequestObj.ConsumerInfo.Email;
     transformedResopnseObj.data.countryCode = backendRequestObj.ConsumerInfo.Country.Code;
     //Added ideal payment url to response object as part of the implementation - CARNIVALCO-21589
	 if(targetResponseObj.PaymentInfo && targetResponseObj.PaymentInfo.Payment){
	     if(targetResponseObj.PaymentInfo.Payment.Url)
            transformedResopnseObj.data.confirmationDetails[0].paymentInfo.paymentUrl  = targetResponseObj.PaymentInfo.Payment.Url;
	    if(targetResponseObj.PaymentInfo.Payment.Ref)
	        transformedResopnseObj.data.confirmationDetails[0].paymentInfo.ref  = targetResponseObj.PaymentInfo.Payment.Ref;
	 }else {
	    delete transformedResopnseObj.data.confirmationDetails[0].paymentInfo; 
	 }
	 context.setVariable('response.content',JSON.stringify(transformedResopnseObj,replacer));
 }
 
} catch(error) {

    throw error;
}