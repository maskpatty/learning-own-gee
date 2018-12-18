   try {
	   var responseBody = context.getVariable("response.content");
	   context.setVariable('targetResponse', responseBody);
	   
      
           var targetStatusCode = context.getVariable("message.status.code");
           
           var responseBodyObj = JSON.parse(responseBody);
           var backendErrorCode = "";
           var backendErrorMessage = null;
           var transformedErrorCode = "";
           var FE_ErrorCode = backendErrorCode;
           var FE_StatusCode = context.getVariable("message.status.code");

           var errorConfigCodes = context.getVariable("errorConfigCodes");

           if (context.getVariable("schemaValidationFailed") && context.getVariable("schemaValidationFailed") == "true") {
				context.setVariable('api-error.code', '420');
               context.setVariable('api-error.message', 'Schema Validation failed');
				context.setVariable('api-error.status_code', '420');
               context.setVariable('api-error.reason_phrase', 'Schema Validation failed');
               context.setVariable("response.header.brandApiError", true);
           } else {
               if (Array.isArray(responseBodyObj.errors)) {
                   backendErrorCode = targetStatusCode + "::" + responseBodyObj.errors[0].code;
                   backendErrorMessage = responseBodyObj.errors[0].message;
               } else if (responseBodyObj.errorCode) {
                   backendErrorCode = targetStatusCode + "::" + responseBodyObj.errorCode;
                   backendErrorMessage = responseBodyObj.errorDescription;
               } else if (responseBodyObj.code || responseBodyObj.message) {
                   backendErrorCode = targetStatusCode + "::" + responseBodyObj.code;
                   backendErrorMessage = responseBodyObj.message;
               } else if (responseBodyObj.errors) {
                   backendErrorCode = targetStatusCode + "::" + responseBodyObj.errors.code;
                   backendErrorMessage = responseBodyObj.errors.message;
               }

               errorConfigCodesObj = JSON.parse(errorConfigCodes);
               if (errorConfigCodesObj[backendErrorCode] !== undefined) {
                   transformedErrorCode = errorConfigCodesObj[backendErrorCode];
                   var apiErrorMapArr = transformedErrorCode.split("::");
                   FE_StatusCode = apiErrorMapArr[0];
                   FE_ErrorCode = apiErrorMapArr[1];
               } else if (errorConfigCodesObj[targetStatusCode] !== undefined) {
                   transformedErrorCode = errorConfigCodesObj[targetStatusCode];
                   var apiErrorMapArr = transformedErrorCode.split("::");
                   FE_StatusCode = apiErrorMapArr[0];
                   FE_ErrorCode = apiErrorMapArr[1];
               } else {
                   transformedErrorCode = errorConfigCodesObj.defaultError;
                   var apiErrorMapArr = transformedErrorCode.split("::");
                   FE_StatusCode = apiErrorMapArr[0];
                   FE_ErrorCode = apiErrorMapArr[1];
				   if(! backendErrorMessage){
						backendErrorMessage = "Back end API Error, New Error Mapping Found !!";
				   }
               }

               context.setVariable("api-error.code", FE_ErrorCode);
               context.setVariable('api-error.message', backendErrorMessage);
               context.setVariable('api-error.status_code', FE_StatusCode);
			   context.setVariable("api-error.reason_phrase", context.getVariable("message.reason.phrase"));
               context.setVariable("response.header.brandApiError", true);
           }

       

   } catch (error) {
       throw error;
   }