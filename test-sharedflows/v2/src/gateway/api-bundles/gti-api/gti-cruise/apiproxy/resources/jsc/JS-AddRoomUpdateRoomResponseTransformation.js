function replacer(key, value) {
    if (value == "null") return "";
    else if (value == undefined) return "";
    else return value;
}


var targetResponse = context.getVariable('response.content');
var targetResponseObj = JSON.parse(targetResponse);
var transformedResopnseObj = targetResponseObj;
context.setVariable('targetResponse', context.getVariable('response.content'));


   if (targetResponseObj.data.deposit) {
        var depositAmount = targetResponseObj.data.deposit.amount;  
    }
	var depositDueDate;
	if(targetResponseObj.data.balance){
		depositDueDate = targetResponseObj.data.balance.dueDate;
	}

    transformedResopnseObj.data.cityCode = "";

    transformedResopnseObj.data.currencyCode =context.getVariable("request.header.currencyCode");
    
    var sectionMapping = context.getVariable("sectionMapping");
	var sectionMappingObj = JSON.parse(sectionMapping);

    delete transformedResopnseObj.data.deposit;

    for (i = 0; i < transformedResopnseObj.data.selectedRooms.length; i++) {
        var depositObj = {};
        if (i === 0) {
            depositObj.amount = depositAmount;
        } else {
            depositObj.amount = 0;
        }
        depositObj.dueDate = depositDueDate;
        transformedResopnseObj.data.selectedRooms[i].deposit = depositObj;

        var selectedRoom = transformedResopnseObj.data.selectedRooms[i];
        if ((selectedRoom.cabin.section === "" && (selectedRoom.cabin.deck === "" || selectedRoom.cabin.deck === "-"))) {
            selectedRoom.categoryStatus = "C";
        } else {
            selectedRoom.categoryStatus = "N";
        }
        
        var section = sectionMappingObj[selectedRoom.cabin.section];
		
		if(section){
			selectedRoom.cabin.section = section;
		}
			
		 // Add otherCharges to price per guest.CARNIVALCO-11071
		 
        if(transformedResopnseObj && transformedResopnseObj.data && transformedResopnseObj.data 
			&& transformedResopnseObj.data.selectedRooms[i] && transformedResopnseObj.data.selectedRooms[i].guests)
		{	
			var guests = transformedResopnseObj.data.selectedRooms[i].guests;
			if(guests && guests.length > 0){
				for(var guestCount = 0; guestCount<guests.length; guestCount++){
					guests[guestCount].price = guests[guestCount].price + guests[guestCount].otherCharges;
				}
			}
		}
    }
	
	var ssvSum =0;
	var SSVMapping = context.getVariable("SSVMapping");
	var SSVMappingObj = JSON.parse(SSVMapping);
	var agencyId = context.getVariable("request.header.agencyId");
	var SSVCodes = SSVMappingObj[agencyId];
	var standardSpecialServiceChgArray = [];
	
	if(transformedResopnseObj.data.standardSpecialServiceChg && SSVCodes) {							 // CARNIVALCO-13611 German Market adding SSvCode
		standardSpecialServiceChgArray = transformedResopnseObj.data.standardSpecialServiceChg;
		var SSVCodesArray = SSVCodes.split(",");
		var codeMatched = false;
		var matchedCodes ="";
		var matchedCodesCount = 0;
		
		for(var sscharge=0;sscharge<standardSpecialServiceChgArray.length;sscharge++) {
			if(SSVCodesArray.indexOf(standardSpecialServiceChgArray[sscharge].code)!==-1) {
				ssvSum = ssvSum + parseFloat(standardSpecialServiceChgArray[sscharge].amount);
				codeMatched =  true;
				
				if(matchedCodesCount!==0) {
					matchedCodes = matchedCodes +","+ standardSpecialServiceChgArray[sscharge].code;
				}else {
					matchedCodes = matchedCodes + standardSpecialServiceChgArray[sscharge].code;
				}
				matchedCodesCount++;
			}
		
		}
		
		standardSpecialServiceChgArray=[];
		var standardSpecialServiceChgObj={};
		if(codeMatched) {
			standardSpecialServiceChgObj.code = matchedCodes.trim();
		}else {
			standardSpecialServiceChgObj.code = "";
		}
		standardSpecialServiceChgObj.amount = JSON.stringify(ssvSum);
		standardSpecialServiceChgArray.push(standardSpecialServiceChgObj);
		
		
	}else {
		SSVCodes = "";
		var standardSpecialServiceChgObj={};
		standardSpecialServiceChgObj.code = SSVCodes;
		standardSpecialServiceChgObj.amount = JSON.stringify(ssvSum);
		standardSpecialServiceChgArray.push(standardSpecialServiceChgObj);
	}
	
	transformedResopnseObj.data.standardSpecialServiceChg = standardSpecialServiceChgArray;
	context.setVariable('response.content', JSON.stringify(transformedResopnseObj, replacer));