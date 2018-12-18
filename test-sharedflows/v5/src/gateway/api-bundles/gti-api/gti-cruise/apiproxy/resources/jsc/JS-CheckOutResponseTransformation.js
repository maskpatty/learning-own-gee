function replacer(key,value)
{
	if (value=="null") return "";
	else if (value==undefined) return "";
	else return value;
}

//Random integer 
var transactionId = "";

transactionId = generateUUID();

function generateUUID(){
    var d = new Date().getTime();
    var uuid = 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
        var r = (d + Math.random()*16)%16 | 0;
        d = Math.floor(d/16);
        return (c=='x' ? r : (r&0x7|0x8)).toString(16);
    });
    return uuid;
}

try{


    var targetResponse = context.getVariable('response.content');
    var backendRequest = context.getVariable('request.content');
    var clientRequest = context.getVariable('clientRequest');
    var backendRequestObj = JSON.parse(backendRequest);
    var clientRequestObj = JSON.parse(clientRequest);
    var targetResponseObj = JSON.parse(targetResponse);
    var enableBankTransfer = false;
	var enableIdeal = false;
    context.setVariable("targetRequest", context.getVariable('maskedRequest'));
	context.setVariable('targetResponse',context.getVariable('response.content'));
    var transformedResponseObj = {
		"errors": [],
        "data": {
			"userToken": "",
			"cruiseCode": "",
			"sailingDate": "",
			"shipVersion":"",
			"tourId": "",
			"shipCode" : "",
			"tourDeparture": "",
			"currencyCode": "",
			"cityCode":"",
            "appliedVouchers": [{
                "voucherCode": "",
                "message": ""
            }],
            "selectedRooms": [{
                "typeCode": "",
                "categoryCode": "",
				"categoryStatus":"",
                "subCategoryCode": "",
                "cabin": {
                    "section": "",
                    "deck": "",
                    "number": "",
                    "rateCode": ""
                },
                "subTotal": 0,
                "taxesAndFees": 0,
                "taxesAndFeesCombined": false,
                "guests": [{
                    "type": "",
                    "seqNo": 0,
                    "age": "",
                    "dob": "",
                    "insuranceCode": "",
                    "insuranceAmount": 0,
                    "price": 0,
                    "taxesAndFees": 0,
                    "total": 0
                }]
            }],
            "insurancePlans": [{
                "code": "",
                "amount": 0
            }],
            "onBoardCredits": [{
                "code": "",
                "amount": 0
            }],
            "priceSummary": {
                "subTotal": 0,
                "discount": 0,
                "taxesAndFees": 0,
                "insurance": 0,
                "serviceCharges": 0,
                "grandTotal": 0,
                "deposit": {
                    "amount": 0,
                    "dueDate": "",
                    "balanceDueDate": ""
                },
                "taxesAndFeesCombined": false
            },
            "paymentOption": {
                "cardDetail": {
                    "maximumAllowedCard": 1,
                    "balancePaymentOptions": {
                        "installments": [{
                            "code": "",
                            "breakupDetails": [{
                                "amount": 0,
                                "date": ""
                            }]
                        }],
                        "singlePaymentBankTransfer": true
                    }
                },
                "bankTransfer": {
                    "benificiary": "",
                    "ibanCode": "",
                    "bicCode": "",
                    "reason": "",
                    "dueDate": "",
                    "dueAmount": "",
                    "balanceDueDate": "",
                    "balanceAmount": ""
                },
                "courtesyHold": {
                    "maximumHoursToHold": 0,
                    "dueDate": ""
                },
                "ideal": {
                    "code": "",
                    "banks": []
                 }
            },
			"standardSpecialServiceChg" :[
			{
				"code":"",
				"amount":""
			}]
        }
    };
  

    var currencyCode = context.getVariable("request.header.currencyCode");

    if (targetResponseObj.AvailableIns[0] !== null) {

        for (i = 0; i < targetResponseObj.Prices.length; i++) {
            if (targetResponseObj.Prices[i].Code === "CAB") {
                transformedResponseObj.data.cruiseCode = targetResponseObj.Prices[i].Sailing.Cruise.Code;
            }
        }
      
        transformedResponseObj.data.sailingDate = clientRequestObj.sailingDate;
        transformedResponseObj.data.shipCode = clientRequestObj.shipCode;
        transformedResponseObj.data.currencyCode = currencyCode;

        var transformedPromosArray = [];
      
        if(targetResponseObj.Promos) {
            for (i = 0; i < targetResponseObj.Promos.length; i++) {
                var emptyTransformedAppliedVoucherObj = JSON.parse(JSON.stringify(transformedResponseObj.data.appliedVouchers[0]));
                emptyTransformedAppliedVoucherObj.voucherCode = targetResponseObj.Promos[i].Code;
                if(targetResponseObj.Promos[i].Description!== undefined) {
                    emptyTransformedAppliedVoucherObj.message = targetResponseObj.Promos[i].Description;
                }
                transformedPromosArray.push(emptyTransformedAppliedVoucherObj);
            }
            transformedResponseObj.data.appliedVouchers = transformedPromosArray;
        }
			

        transformedResponseObj.data.selectedRooms = clientRequestObj.selectedRooms;
		
        var guestSizeAsCabinArray = [];
        var guestSize = 0;
		//Add "categoryStatus" in the response and delete unused fields.
		for(var selectedRoom = 0; selectedRoom < transformedResponseObj.data.selectedRooms.length; selectedRoom++) {
			var selctRoom = transformedResponseObj.data.selectedRooms[selectedRoom];
			for(var guest = 0; guest < selctRoom.guests.length; guest++) {
				guestObj = selctRoom.guests[guest];
				delete guestObj.voucherCodes;
				delete guestObj.firstName;
				delete guestObj.lastName;
                guestObj.insuranceAmount = 0;
			}
            guestSize = guestSize + selctRoom.guests.length; 
            guestSizeAsCabinArray.push(parseInt(guestSize));
		}

        //Getting Index No. CAB Code as per the SelectedCabin
        var ascCabinTargetIndexNo = [0, 0, 0, 0, 0];
        var correctCabinIndex = 0;
        for (var selectedRooom = 0; selectedRooom < transformedResponseObj.data.selectedRooms.length; selectedRooom++) {
            for (price = 0; price < targetResponseObj.Prices.length; price++) {
                if (targetResponseObj.Prices[price].Code === "CAB") {
                    if(targetResponseObj.Prices[price].Sailing && targetResponseObj.Prices[price].Sailing.Cabin) {
                        if (targetResponseObj.Prices[price].Sailing.Cabin.Number === transformedResponseObj.data.selectedRooms[selectedRooom].cabin.number) {
                            ascCabinTargetIndexNo[correctCabinIndex] = price;
                            correctCabinIndex++;
                        }
                    }
                }
            }
        }
        
        var i;  
        var priceAmount = 0;
        var totalTaxesAndFeesGuestAmount = [0, 0, 0, 0, 0];
        var j = 0;
        var z;
        var subTotal = 0;
        var priceGrsAmount = 0;
        var taxesAndFeesPriceSummary = 0;
        var insuranceSummary = 0;
        var taxesAndFeesCombinedFlag = true;
        var taxesAndFeesCombinedSummaryFlag = true;
		var standardSpecialServiceChgArray = [];
        var targetInsuranceIndexNo = 0;
		var targetServiceCharges = 0;
		var cabinSubTotal = 0;
		var byGuestSUPSeqNo;
        var adultSUPPriceByGuest;
        var byGuestCHDSeqNo;
        var childPriceByGuest;
        var taxesAndFeesIndexNo = 0;
		var byGuestSSVSeqNo;
        var otherSSVPriceByGuest;
        var targetGrossTotalIndexNo = 0;
        var targetAirIndexNo = 0;
        var targetTransferIndexNo = 0;
        var targetTransportIndexNo = 0;
        var targetAirSupplementIndexNo = 0;
        var codeINSFlag = false;
        var codeGRSFlag = false;
        var codeAIRFlag = false;
        var codeTRFFlag = false;
        var codeTPTFlag = false;
        var codeASPFlag = false;
		var codeSUPFlag;
        var codeCHDFlag;
		var codeSSVFlag;
        var codeSURFlag;
        var byGuestSURSeqNo;
        var surChargeSURPriceByGuest;
        var usTaxesAndFeesCombinedFlag = true;
        var codeNCFFlag;
        var byGuestNCFSeqNo;
        var nonChargeNCFPriceByGuest;
        var locale = context.getVariable("request.header.locale");

        for (actualCabinIndexNo = 0; actualCabinIndexNo < correctCabinIndex; actualCabinIndexNo++) {
            i = ascCabinTargetIndexNo[actualCabinIndexNo];
            if (targetResponseObj.Prices[i].Code === "CAB") {
                var actualCabinNumber = targetResponseObj.Prices[i].Sailing.Cabin.Number;
                transformedResponseObj.data.selectedRooms[j].cabin.number = actualCabinNumber;
                //transformedResponseObj.data.selectedRooms[j].subTotal = parseFloat(targetResponseObj.Prices[i].Amount);
                subTotal = subTotal + parseFloat(targetResponseObj.Prices[i].Amount);
                priceAmount = 0;
                taxesAndFeesCombinedFlag = true;
                byGuestCHDSeqNo = [0, 0, 0, 0, 0];
                childPriceByGuest = [0, 0, 0, 0, 0];
				byGuestSUPSeqNo = [0, 0, 0, 0, 0];
                adultSUPPriceByGuest = [0, 0, 0, 0, 0];
				byGuestSSVSeqNo = [0, 0, 0, 0, 0];
                otherSSVPriceByGuest = [0, 0, 0, 0, 0];
                totalTaxesAndFeesGuestAmount = [0, 0, 0, 0, 0];
                usTaxesAndFeesCombinedFlag = true;
                byGuestSURSeqNo = [0, 0, 0, 0, 0];
                surChargeSURPriceByGuest = [0, 0, 0, 0, 0];
                byGuestNCFSeqNo = [0, 0, 0, 0, 0];
                nonChargeNCFPriceByGuest = [0, 0, 0, 0, 0];
				codeSUPFlag = false;
				codeCHDFlag = false;
				codeSSVFlag = false;
                codeSURFlag = false;
                codeNCFFlag = false;
                var tempTargetResponseObj = targetResponseObj.Prices;
                 for (var l = 0; l < targetResponseObj.Prices.length; l++) {
                     var priceCode = targetResponseObj.Prices[l].Code;
                   if ((priceCode === "TAX" || priceCode === "PCH" || priceCode === "TRX" || priceCode === "TPX" || priceCode === "THX"  || 	priceCode === "SNG")) {
					 if(targetResponseObj.Prices[l].Sailing && targetResponseObj.Prices[l].Sailing.Cabin){                      // CARNIVALCO-11648 For Sailing Attribute Taxes (Cabin Specific)
						   var currentCabinNumber = targetResponseObj.Prices[l].Sailing.Cabin.Number; /*"G00001";*/ 
						   if((currentCabinNumber === actualCabinNumber)){
							priceAmount = priceAmount + parseFloat(targetResponseObj.Prices[l].Amount);
							 for (k = 0; k < targetResponseObj.Prices[l].ByGuests.length; k++) {
                                 taxesAndFeesIndexNo = l;
								 totalTaxesAndFeesGuestAmount[k] = totalTaxesAndFeesGuestAmount[k] + parseFloat(targetResponseObj.Prices[l].ByGuests[k].Amount);
							 }
						   }
					   } else {
                            guestCount = 0;
                            for (byGuestIndex = 0; byGuestIndex < targetResponseObj.Prices[l].ByGuests.length; byGuestIndex++) {                                 // CARNIVALCO-11648 For Non-Sailing Attribute Taxes (Guest Specific)
                                if(j == 0 && targetResponseObj.Prices[l].ByGuests[byGuestIndex].SeqNumber <= guestSizeAsCabinArray[j]) {
                                    totalTaxesAndFeesGuestAmount[guestCount] = totalTaxesAndFeesGuestAmount[guestCount] + parseFloat(targetResponseObj.Prices[l].ByGuests[byGuestIndex].Amount);
                                    priceAmount = priceAmount + parseFloat(targetResponseObj.Prices[l].ByGuests[byGuestIndex].Amount);
                                    guestCount++;
                                }
                                else if(targetResponseObj.Prices[l].ByGuests[byGuestIndex].SeqNumber > guestSizeAsCabinArray[j-1] && targetResponseObj.Prices[l].ByGuests[byGuestIndex].SeqNumber <= guestSizeAsCabinArray[j]) {
                                    totalTaxesAndFeesGuestAmount[guestCount] = totalTaxesAndFeesGuestAmount[guestCount] + parseFloat(targetResponseObj.Prices[l].ByGuests[byGuestIndex].Amount);
                                    priceAmount = priceAmount + parseFloat(targetResponseObj.Prices[l].ByGuests[byGuestIndex].Amount);
                                    guestCount++;
                                }
                            }
                       }
                        taxesAndFeesCombinedFlag = false;
                   }

                    if (targetResponseObj.Prices[l].Code === "INS") {
                        targetInsuranceIndexNo = l;
                        codeINSFlag = true;
                    }
                    
                    if (targetResponseObj.Prices[l].Code === "GRS") {
                        targetGrossTotalIndexNo = l;
                        codeGRSFlag = true;
                    }

                    if (targetResponseObj.Prices[l].Code === "AIR") {                                                              // CARNIVALCO-12635 - Adding this for AIR transportation
                        targetAirIndexNo = l;
                        codeAIRFlag = true;
                    }
                    
                    if (targetResponseObj.Prices[l].Code === "TRF") {                                                              // CARNIVALCO-12635 - Adding this for transfer
                        targetTransferIndexNo = l;
                        codeTRFFlag = true;
                    }

                    if (targetResponseObj.Prices[l].Code === "TPT") {                                                              // CARNIVALCO-13711 - Adding this for Bus Transportation
                        targetTransportIndexNo = l;
                        codeTPTFlag = true;
                    }

                    if (targetResponseObj.Prices[l].Code === "ASP") {                                                              // CARNIVALCO-15253 - Adding this for AIR Suppemenet Charges
                        targetAirSupplementIndexNo = l;
                        codeASPFlag = true;
                    }

                    if (targetResponseObj.Prices[l].Code === "CHD") {                                                              //CARNIVALCO-7555 - Adding this for Child "CHD" Price Attribute Population
                        var currentCabinNumber = targetResponseObj.Prices[l].Sailing.Cabin.Number;
                        if((currentCabinNumber === actualCabinNumber)){
                            for (var byGuestPrice = 0; byGuestPrice < targetResponseObj.Prices[l].ByGuests.length; byGuestPrice++) {
                                byGuestCHDSeqNo[byGuestPrice] = targetResponseObj.Prices[l].ByGuests[byGuestPrice].SeqNumber;
                                childPriceByGuest[byGuestPrice] = parseFloat(targetResponseObj.Prices[l].ByGuests[byGuestPrice].Amount);
                            }
                        }
						codeCHDFlag = true;
                    }
					
					if (targetResponseObj.Prices[l].Code === "SUP") { 															//CARNIVALCO-7555 - Adding this for Child "SUP" Price Attribute Population
                        var currentCabinNumber = targetResponseObj.Prices[l].Sailing.Cabin.Number;
                        if ((currentCabinNumber === actualCabinNumber)) {
                            for (var byGuestPrice = 0; byGuestPrice < targetResponseObj.Prices[l].ByGuests.length; byGuestPrice++) {
                                byGuestSUPSeqNo[byGuestPrice] = targetResponseObj.Prices[l].ByGuests[byGuestPrice].SeqNumber;
                                adultSUPPriceByGuest[byGuestPrice] = parseFloat(targetResponseObj.Prices[l].ByGuests[byGuestPrice].Amount);
                            }
                        }
                        codeSUPFlag = true;
                    }
					
					if (targetResponseObj.Prices[l].Code === "SSV") {                                                           //CARNIVALCO-11071 - Adding this for Other Srvice "SSV" Price Attribute Population
                        var currentCabinNumber = targetResponseObj.Prices[l].Sailing.Cabin.Number;
                        if ((currentCabinNumber === actualCabinNumber)) {
                            for (var byGuestPrice = 0; byGuestPrice < targetResponseObj.Prices[l].ByGuests.length; byGuestPrice++) {
                                byGuestSSVSeqNo[byGuestPrice] = targetResponseObj.Prices[l].ByGuests[byGuestPrice].SeqNumber;
                                otherSSVPriceByGuest[byGuestPrice] = parseFloat(targetResponseObj.Prices[l].ByGuests[byGuestPrice].Amount);
                            }
                        }
                        codeSSVFlag = true;
                    }

                    if (targetResponseObj.Prices[l].Code === "SUR" && locale === "en_US") {                                     //CARNIVALCO-24328 - Adding this for Other Srvice "SUR" Price Attribute - Guest Level Population
                        var currentCabinNumber = targetResponseObj.Prices[l].Sailing.Cabin.Number;
                        if ((currentCabinNumber === actualCabinNumber)) {
                            for (var byGuestPrice = 0; byGuestPrice < targetResponseObj.Prices[l].ByGuests.length; byGuestPrice++) {
                                byGuestSURSeqNo[byGuestPrice] = targetResponseObj.Prices[l].ByGuests[byGuestPrice].SeqNumber;
                                surChargeSURPriceByGuest[byGuestPrice] = parseFloat(targetResponseObj.Prices[l].ByGuests[byGuestPrice].Amount);
                            }
                            if(targetResponseObj.Prices[l].Amount > 0) {
                                usTaxesAndFeesCombinedFlag = false;
                            }
                        }
                        codeSURFlag = true;
                    }

                    if (targetResponseObj.Prices[l].Code === "NCF" && locale === "en_US") {                                                           //CARNIVALCO-24328 - Adding this for Other Srvice "NCF" Price Attribute Population
                        var currentCabinNumber = targetResponseObj.Prices[l].Sailing.Cabin.Number;
                        if ((currentCabinNumber === actualCabinNumber)) {
                            for (var byGuestPrice = 0; byGuestPrice < targetResponseObj.Prices[l].ByGuests.length; byGuestPrice++) {
                                byGuestNCFSeqNo[byGuestPrice] = targetResponseObj.Prices[l].ByGuests[byGuestPrice].SeqNumber;
                                nonChargeNCFPriceByGuest[byGuestPrice] = parseFloat(targetResponseObj.Prices[l].ByGuests[byGuestPrice].Amount);
                            }
                        }
                        codeNCFFlag = true;
                    }
					
                }
                for (k = 0; k < targetResponseObj.Prices[i].ByGuests.length; k++) {
                    for (var cabSelectRooomguest = 0; cabSelectRooomguest < transformedResponseObj.data.selectedRooms[j].guests.length; cabSelectRooomguest++) {
                        if (transformedResponseObj.data.selectedRooms[j].guests[cabSelectRooomguest].seqNo == targetResponseObj.Prices[i].ByGuests[k].SeqNumber) {
                            transformedResponseObj.data.selectedRooms[j].guests[cabSelectRooomguest].price = parseFloat(targetResponseObj.Prices[i].ByGuests[k].Amount);
                        }
                    }
                }
                z = j;
                j++;

                var surSeqIndexno = 0;
                if (codeSURFlag && locale === "en_US") {
                    for (var surSelectRooomGuest = 0; surSelectRooomGuest < transformedResponseObj.data.selectedRooms[z].guests.length; surSelectRooomGuest++) {
                        if (transformedResponseObj.data.selectedRooms[z].guests[surSelectRooomGuest].seqNo == byGuestSURSeqNo[surSeqIndexno]) {
                            totalTaxesAndFeesGuestAmount[surSelectRooomGuest] = totalTaxesAndFeesGuestAmount[surSelectRooomGuest] + surChargeSURPriceByGuest[surSeqIndexno];
                            priceAmount = priceAmount + surChargeSURPriceByGuest[surSeqIndexno];
                            surSeqIndexno++;

                        }
                    }
                }

                taxesAndFeesPriceSummary = taxesAndFeesPriceSummary + priceAmount;
                transformedResponseObj.data.selectedRooms[z].taxesAndFees = priceAmount;
                transformedResponseObj.data.selectedRooms[z].taxesAndFeesCombined = taxesAndFeesCombinedFlag;

                if(locale === "en_US") {
                    transformedResponseObj.data.selectedRooms[z].taxesAndFeesCombined = usTaxesAndFeesCombinedFlag;
                }

                if(!taxesAndFeesCombinedFlag) {
                    for (k = 0; k < targetResponseObj.Prices[taxesAndFeesIndexNo].ByGuests.length; k++) {
                        transformedResponseObj.data.selectedRooms[z].guests[k].taxesAndFees = totalTaxesAndFeesGuestAmount[k];
                    }
                }   

                var chdSeqIndexno = 0;
				if (codeCHDFlag) {
					for (var chdSelectRooomGuest = 0; chdSelectRooomGuest < transformedResponseObj.data.selectedRooms[z].guests.length; chdSelectRooomGuest++) {
						if(transformedResponseObj.data.selectedRooms[z].guests[chdSelectRooomGuest].seqNo == byGuestCHDSeqNo[chdSeqIndexno]) {
							transformedResponseObj.data.selectedRooms[z].guests[chdSelectRooomGuest].price = childPriceByGuest[chdSeqIndexno];
							chdSeqIndexno++;
                    
						}
					}
				}
				 
				var supSeqIndexno = 0;
                if (codeSUPFlag) {
                    for (var supSelectRooomGuest = 0; supSelectRooomGuest < transformedResponseObj.data.selectedRooms[z].guests.length; supSelectRooomGuest++) {
                        if (transformedResponseObj.data.selectedRooms[z].guests[supSelectRooomGuest].seqNo == byGuestSUPSeqNo[supSeqIndexno]) {
                            transformedResponseObj.data.selectedRooms[z].guests[supSelectRooomGuest].price = adultSUPPriceByGuest[supSeqIndexno];
                            supSeqIndexno++;

                        }
                    }
                }
				
				var ssvSeqIndexno = 0;
                if (codeSSVFlag) {
                    for (var ssvSelectRooomGuest = 0; ssvSelectRooomGuest < transformedResponseObj.data.selectedRooms[z].guests.length; ssvSelectRooomGuest++) {
                        if (transformedResponseObj.data.selectedRooms[z].guests[ssvSelectRooomGuest].seqNo == byGuestSSVSeqNo[ssvSeqIndexno]) {
                            transformedResponseObj.data.selectedRooms[z].guests[ssvSelectRooomGuest].price = transformedResponseObj.data.selectedRooms[z].guests[ssvSelectRooomGuest].price + otherSSVPriceByGuest[ssvSeqIndexno];
                            ssvSeqIndexno++;

                        }
                    }
                }

                var ncfSeqIndexno = 0;
                if (codeNCFFlag && locale === "en_US") {
                    for (var ncfSelectRooomGuest = 0; ncfSelectRooomGuest < transformedResponseObj.data.selectedRooms[z].guests.length; ncfSelectRooomGuest++) {
                        if (transformedResponseObj.data.selectedRooms[z].guests[ncfSelectRooomGuest].seqNo == byGuestNCFSeqNo[ncfSeqIndexno]) {
                            transformedResponseObj.data.selectedRooms[z].guests[ncfSelectRooomGuest].price = transformedResponseObj.data.selectedRooms[z].guests[ncfSelectRooomGuest].price + nonChargeNCFPriceByGuest[ncfSeqIndexno];
                            ncfSeqIndexno++;

                        }
                    }
                }

            }
			
            if (taxesAndFeesCombinedFlag === false) {
                taxesAndFeesCombinedSummaryFlag = false;
            }
        }

        //For US Locale - Taxes and Fees Combined
        if (locale === "en_US") {
            taxesAndFeesCombinedSummaryFlag = false;
            for (var surSelectRooom = 0; surSelectRooom < transformedResponseObj.data.selectedRooms.length; surSelectRooom++) {
                if(transformedResponseObj.data.selectedRooms[surSelectRooom].taxesAndFeesCombined === true){
                    taxesAndFeesCombinedSummaryFlag = true;
                }
            }
        }
		
        //SSV mapped to priceSummary.services
        for (l = 0; l < targetResponseObj.Prices.length; l++) {
            if (targetResponseObj.Prices[l].Code === "SSV") {
                targetServiceCharges = targetServiceCharges + parseFloat(targetResponseObj.Prices[l].Amount);
            }
        }
        
        //GRS mapped to guests.total and cabin level subTotal
        if (codeGRSFlag) {
            for (var grsSelcetRooom = 0; grsSelcetRooom < transformedResponseObj.data.selectedRooms.length; grsSelcetRooom++) {
                cabinSubTotal = 0;
                for (var grsSelcetRooomguest = 0; grsSelcetRooomguest < transformedResponseObj.data.selectedRooms[grsSelcetRooom].guests.length; grsSelcetRooomguest++) {
                    for (k = 0; k < targetResponseObj.Prices[targetGrossTotalIndexNo].ByGuests.length; k++) {
                        if (transformedResponseObj.data.selectedRooms[grsSelcetRooom].guests[grsSelcetRooomguest].seqNo == targetResponseObj.Prices[targetGrossTotalIndexNo].ByGuests[k].SeqNumber) {
                            transformedResponseObj.data.selectedRooms[grsSelcetRooom].guests[grsSelcetRooomguest].total = parseFloat(targetResponseObj.Prices[targetGrossTotalIndexNo].ByGuests[k].Amount);
                            cabinSubTotal = cabinSubTotal + parseFloat(targetResponseObj.Prices[targetGrossTotalIndexNo].ByGuests[k].Amount);
                        }
                    }
                }
                transformedResponseObj.data.selectedRooms[grsSelcetRooom].subTotal = cabinSubTotal;
            }
            priceGrsAmount = priceGrsAmount + parseFloat(targetResponseObj.Prices[targetGrossTotalIndexNo].Amount);
        }
        
         if (codeINSFlag) {
            for (var insSelectedRooom = 0; insSelectedRooom < transformedResponseObj.data.selectedRooms.length; insSelectedRooom++) {
                for (var insSelectedRooomGuest = 0; insSelectedRooomGuest < transformedResponseObj.data.selectedRooms[insSelectedRooom].guests.length; insSelectedRooomGuest++) {
                    for (targetByGuestObj = 0; targetByGuestObj < targetResponseObj.Prices[targetInsuranceIndexNo].ByGuests.length; targetByGuestObj++) {
                        if (transformedResponseObj.data.selectedRooms[insSelectedRooom].guests[insSelectedRooomGuest].seqNo == targetResponseObj.Prices[targetInsuranceIndexNo].ByGuests[targetByGuestObj].SeqNumber) {
                            transformedResponseObj.data.selectedRooms[insSelectedRooom].guests[insSelectedRooomGuest].insuranceAmount = parseFloat(targetResponseObj.Prices[targetInsuranceIndexNo].ByGuests[targetByGuestObj].Amount);
                        }
                    }
                }
            }
            insuranceSummary = parseFloat(targetResponseObj.Prices[targetInsuranceIndexNo].Amount);
        }

        // CARNIVALCO-12635 AIR mapped to guests.price
        if (codeAIRFlag) {
            if(transformedResponseObj.data.selectedRooms) {
                for (var airSelectedRooom = 0; airSelectedRooom < transformedResponseObj.data.selectedRooms.length; airSelectedRooom++) {
                    if(transformedResponseObj.data.selectedRooms[airSelectedRooom] && transformedResponseObj.data.selectedRooms[airSelectedRooom].guests) {
                        for (var airSelectedRooomGuest = 0; airSelectedRooomGuest < transformedResponseObj.data.selectedRooms[airSelectedRooom].guests.length; airSelectedRooomGuest++) {
                            if(targetResponseObj.Prices[targetAirIndexNo] && targetResponseObj.Prices[targetAirIndexNo].ByGuests) {
                                for (targetByGuestObj = 0; targetByGuestObj < targetResponseObj.Prices[targetAirIndexNo].ByGuests.length; targetByGuestObj++) {
                                    if(transformedResponseObj.data.selectedRooms[airSelectedRooom].guests[airSelectedRooomGuest] && targetResponseObj.Prices[targetAirIndexNo].ByGuests[targetByGuestObj] && transformedResponseObj.data.selectedRooms[airSelectedRooom].guests[airSelectedRooomGuest].seqNo && targetResponseObj.Prices[targetAirIndexNo].ByGuests[targetByGuestObj].SeqNumber) {
                                        if (transformedResponseObj.data.selectedRooms[airSelectedRooom].guests[airSelectedRooomGuest].seqNo == targetResponseObj.Prices[targetAirIndexNo].ByGuests[targetByGuestObj].SeqNumber) {
                                            transformedResponseObj.data.selectedRooms[airSelectedRooom].guests[airSelectedRooomGuest].price = transformedResponseObj.data.selectedRooms[airSelectedRooom].guests[airSelectedRooomGuest].price + parseFloat(targetResponseObj.Prices[targetAirIndexNo].ByGuests[targetByGuestObj].Amount);
                                        }
                                    }
                                } 
                            }
                        }
                    }
                }
            }
        }

        // CARNIVALCO-12635 TRF mapped to guests.price
        if (codeTRFFlag) {
            if(transformedResponseObj.data.selectedRooms) {
                for (var trfSelectedRooom = 0; trfSelectedRooom < transformedResponseObj.data.selectedRooms.length; trfSelectedRooom++) {
                    if(transformedResponseObj.data.selectedRooms[trfSelectedRooom] && transformedResponseObj.data.selectedRooms[trfSelectedRooom].guests) {
                        for (var trfSelectedRooomGuest = 0; trfSelectedRooomGuest < transformedResponseObj.data.selectedRooms[trfSelectedRooom].guests.length; trfSelectedRooomGuest++) {
                            if(targetResponseObj.Prices[targetTransferIndexNo] && targetResponseObj.Prices[targetTransferIndexNo].ByGuests) {
                                for (targetByGuestObj = 0; targetByGuestObj < targetResponseObj.Prices[targetTransferIndexNo].ByGuests.length; targetByGuestObj++) {
                                    if(transformedResponseObj.data.selectedRooms[trfSelectedRooom].guests[trfSelectedRooomGuest] && targetResponseObj.Prices[targetTransferIndexNo].ByGuests[targetByGuestObj] && transformedResponseObj.data.selectedRooms[trfSelectedRooom].guests[trfSelectedRooomGuest].seqNo && targetResponseObj.Prices[targetTransferIndexNo].ByGuests[targetByGuestObj].SeqNumber) {
                                        if (transformedResponseObj.data.selectedRooms[trfSelectedRooom].guests[trfSelectedRooomGuest].seqNo == targetResponseObj.Prices[targetTransferIndexNo].ByGuests[targetByGuestObj].SeqNumber) {
                                            transformedResponseObj.data.selectedRooms[trfSelectedRooom].guests[trfSelectedRooomGuest].price = transformedResponseObj.data.selectedRooms[trfSelectedRooom].guests[trfSelectedRooomGuest].price + parseFloat(targetResponseObj.Prices[targetTransferIndexNo].ByGuests[targetByGuestObj].Amount);
                                        }
                                    }
                                }
                            }
                        }
                    }
                }
            }
        }

        // CARNIVALCO-13711 TPT mapped to guests.price for Bus Transportation
        if (codeTPTFlag) {
            if(transformedResponseObj.data.selectedRooms) {
                for (var tptSelectedRooom = 0; tptSelectedRooom < transformedResponseObj.data.selectedRooms.length; tptSelectedRooom++) {
                    if(transformedResponseObj.data.selectedRooms[tptSelectedRooom] && transformedResponseObj.data.selectedRooms[tptSelectedRooom].guests) {
                        for (var tptSelectedRooomGuest = 0; tptSelectedRooomGuest < transformedResponseObj.data.selectedRooms[tptSelectedRooom].guests.length; tptSelectedRooomGuest++) {
                            if(targetResponseObj.Prices[targetTransportIndexNo] && targetResponseObj.Prices[targetTransportIndexNo].ByGuests) {
                                for (targetByGuestObj = 0; targetByGuestObj < targetResponseObj.Prices[targetTransportIndexNo].ByGuests.length; targetByGuestObj++) {
                                    if(transformedResponseObj.data.selectedRooms[tptSelectedRooom].guests[tptSelectedRooomGuest] && targetResponseObj.Prices[targetTransportIndexNo].ByGuests[targetByGuestObj] && transformedResponseObj.data.selectedRooms[tptSelectedRooom].guests[tptSelectedRooomGuest].seqNo && targetResponseObj.Prices[targetTransportIndexNo].ByGuests[targetByGuestObj].SeqNumber) {
                                        if (transformedResponseObj.data.selectedRooms[tptSelectedRooom].guests[tptSelectedRooomGuest].seqNo == targetResponseObj.Prices[targetTransportIndexNo].ByGuests[targetByGuestObj].SeqNumber) {
                                            transformedResponseObj.data.selectedRooms[tptSelectedRooom].guests[tptSelectedRooomGuest].price = transformedResponseObj.data.selectedRooms[tptSelectedRooom].guests[tptSelectedRooomGuest].price + parseFloat(targetResponseObj.Prices[targetTransportIndexNo].ByGuests[targetByGuestObj].Amount);
                                        }
                                    }
                                }
                            }
                        }
                    }
                }
            }
        }

        // CARNIVALCO-15253 ASP mapped to guests.price
        if (codeASPFlag) {
            if(transformedResponseObj.data.selectedRooms) {
                for (var aspSelectedRooom = 0; aspSelectedRooom < transformedResponseObj.data.selectedRooms.length; aspSelectedRooom++) {
                    if(transformedResponseObj.data.selectedRooms[aspSelectedRooom] && transformedResponseObj.data.selectedRooms[aspSelectedRooom].guests) {
                        for (var aspSelectedRooomGuest = 0; aspSelectedRooomGuest < transformedResponseObj.data.selectedRooms[aspSelectedRooom].guests.length; aspSelectedRooomGuest++) {
                            if(targetResponseObj.Prices[targetAirSupplementIndexNo] && targetResponseObj.Prices[targetAirSupplementIndexNo].ByGuests) {
                                for (targetByGuestObj = 0; targetByGuestObj < targetResponseObj.Prices[targetAirSupplementIndexNo].ByGuests.length; targetByGuestObj++) {
                                    if(transformedResponseObj.data.selectedRooms[aspSelectedRooom].guests[aspSelectedRooomGuest] && targetResponseObj.Prices[targetAirSupplementIndexNo].ByGuests[targetByGuestObj] && transformedResponseObj.data.selectedRooms[aspSelectedRooom].guests[aspSelectedRooomGuest].seqNo && targetResponseObj.Prices[targetAirSupplementIndexNo].ByGuests[targetByGuestObj].SeqNumber) {
                                        if (transformedResponseObj.data.selectedRooms[aspSelectedRooom].guests[aspSelectedRooomGuest].seqNo == targetResponseObj.Prices[targetAirSupplementIndexNo].ByGuests[targetByGuestObj].SeqNumber) {
                                            transformedResponseObj.data.selectedRooms[aspSelectedRooom].guests[aspSelectedRooomGuest].price = transformedResponseObj.data.selectedRooms[aspSelectedRooom].guests[aspSelectedRooomGuest].price + parseFloat(targetResponseObj.Prices[targetAirSupplementIndexNo].ByGuests[targetByGuestObj].Amount);
                                        }
                                    }
                                } 
                            }
                        }
                    }
                }
            }
        }

		//transformedResponseObj.data.standardSpecialServiceChg = standardSpecialServiceChgArray;

        var transformedInsurancePlansArray = [];
        for (i = 0; i < targetResponseObj.AvailableIns.length; i++) {
            var emptyTransformedInsurancePlansObj = JSON.parse(JSON.stringify(transformedResponseObj.data.insurancePlans[0]));
            emptyTransformedInsurancePlansObj.code = targetResponseObj.AvailableIns[i].Code;
            var guestAmount = 0;
            for (j = 0; j < targetResponseObj.AvailableIns[i].ByGuests.length; j++) {
                guestAmount = guestAmount + parseFloat(targetResponseObj.AvailableIns[i].ByGuests[j].Amount);
            }
            emptyTransformedInsurancePlansObj.amount = guestAmount;
            transformedInsurancePlansArray.push(emptyTransformedInsurancePlansObj);
        }
        transformedResponseObj.data.insurancePlans = transformedInsurancePlansArray;


        
        for (price = 0; price < targetResponseObj.Prices.length; price++) {                 // CARNIVALCO-13885 Addition of all otherchages to the base_price and CARNIVALCO-15253 - addition of a code ASP
                if (targetResponseObj.Prices[price].Code === "CHD" || targetResponseObj.Prices[price].Code === "SUP" || targetResponseObj.Prices[price].Code === "AIR" || targetResponseObj.Prices[price].Code === "TRF" || targetResponseObj.Prices[price].Code === "TPT" || targetResponseObj.Prices[price].Code === "ASP") {
                     subTotal = subTotal + parseFloat(targetResponseObj.Prices[price].Amount);
            }
            if (targetResponseObj.Prices[price].Code === "NCF" && locale === "en_US") {
                     subTotal = subTotal + parseFloat(targetResponseObj.Prices[price].Amount);
            }
        }
        transformedResponseObj.data.priceSummary.subTotal = subTotal;

        var promoAmount = 0;                                                // CARNIVALCO-12529 Making changes to read all available Promos code
        if(targetResponseObj.Promos) {
            for (i = 0; i < targetResponseObj.Promos.length; i++) {
                if (targetResponseObj.Promos[i] && targetResponseObj.Promos[i].Class 
				    && targetResponseObj.Promos[i].Class.Code === "VOUCHER" && targetResponseObj.Promos[i].Amount) {
                    promoAmount = promoAmount + parseFloat(targetResponseObj.Promos[i].Amount);
                }
            }
        }
        //transformedResponseObj.data.priceSummary.discount = priceGrsAmount - promoAmount;
		transformedResponseObj.data.priceSummary.discount =  promoAmount;
        transformedResponseObj.data.priceSummary.taxesAndFees = taxesAndFeesPriceSummary;
        transformedResponseObj.data.priceSummary.insurance = insuranceSummary;
        transformedResponseObj.data.priceSummary.grandTotal = priceGrsAmount;
		transformedResponseObj.data.priceSummary.serviceCharges = parseFloat(targetServiceCharges);
		
        for (i = 0; i < targetResponseObj.PaymentInfo.PaymentSchedules.length; i++) {
            if (targetResponseObj.PaymentInfo.PaymentSchedules[i].Code === "D") {
                transformedResponseObj.data.priceSummary.deposit.amount = parseFloat(targetResponseObj.PaymentInfo.PaymentSchedules[i].Amount);
                transformedResponseObj.data.priceSummary.deposit.dueDate = targetResponseObj.PaymentInfo.PaymentSchedules[i].DueDate;
            }
        }
        transformedResponseObj.data.priceSummary.taxesAndFeesCombined = taxesAndFeesCombinedSummaryFlag;
        transformedResponseObj.data.paymentOption.cardDetail.balancePaymentOptions.singlePaymentBankTransfer = false;

        var transformedInstallmentsArray = [];
        for (var paymentType = 0; paymentType < targetResponseObj.PaymentInfo.PaymentTypes.length; paymentType++) {
            
            var code = targetResponseObj.PaymentInfo.PaymentTypes[paymentType].Code;
            if ((code === "CC") && (targetResponseObj.PaymentInfo.PaymentTypes[paymentType].CreditCard.PaymentSolutions) && (targetResponseObj.PaymentInfo.PaymentTypes[paymentType].CreditCard.PaymentSolutions.Solutions)) {
                var tempTargetResponseSolutionsObject = targetResponseObj.PaymentInfo.PaymentTypes[paymentType].CreditCard.PaymentSolutions.Solutions;
                
                if(tempTargetResponseSolutionsObject[0].Instalments) {
                    var tempTargetResponseObject = tempTargetResponseSolutionsObject[0].Instalments;
                }

                for (var solution = 0; solution < tempTargetResponseSolutionsObject.length; solution++) {
                    if(tempTargetResponseSolutionsObject[solution].Instalments) {
                        var transformedBreakUpDetailsArray = [];
                        var emptyTransformedInstallmentObj = JSON.parse(JSON.stringify(transformedResponseObj.data.paymentOption.cardDetail.balancePaymentOptions.installments[0]));
                        emptyTransformedInstallmentObj.code = tempTargetResponseSolutionsObject[solution].Instalments[0].Order;
                        var tempTargetResponseInstalmentsObject = tempTargetResponseSolutionsObject[solution].Instalments;
                        for (var instalment = 0; instalment < tempTargetResponseInstalmentsObject.length; instalment++) {
                            var emptyTransformedBreakUpDetailObj = JSON.parse(JSON.stringify(transformedResponseObj.data.paymentOption.cardDetail.balancePaymentOptions.installments[0].breakupDetails[0]));
                            emptyTransformedBreakUpDetailObj.amount = parseFloat(tempTargetResponseSolutionsObject[solution].Instalments[instalment].Amount);
                            emptyTransformedBreakUpDetailObj.date = tempTargetResponseSolutionsObject[solution].Instalments[instalment].DueDate;
                            transformedBreakUpDetailsArray.push(emptyTransformedBreakUpDetailObj);
                        }
                        emptyTransformedInstallmentObj.breakupDetails = transformedBreakUpDetailsArray;
                        transformedInstallmentsArray.push(emptyTransformedInstallmentObj);
                    }
                }
            }
            if ((code === "BW")) {
                transformedResponseObj.data.paymentOption.cardDetail.balancePaymentOptions.singlePaymentBankTransfer = true;
            }
        }
        //transformedInstallmentsArray.sort(function(a, b){return parseInt(a.code) - parseInt(b.code)});  //installments Array sorting
        transformedResponseObj.data.paymentOption.cardDetail.balancePaymentOptions.installments = transformedInstallmentsArray;

        for (var i = 0; i < targetResponseObj.PaymentInfo.PaymentTypes.length; i++) {
            var code = targetResponseObj.PaymentInfo.PaymentTypes[i].Code;
            var tempTargetResponseObject = targetResponseObj.PaymentInfo.PaymentTypes[i];
            if ((code === "BW") && (tempTargetResponseObject.BankWire)) {
            	enableBankTransfer = true; // setting bank transfer object flag when backend retruning BankWire Object - CARNIVALCO-23358,CARNIVALCO-23510
                if (tempTargetResponseObject.BankWire.HolderName)
                    transformedResponseObj.data.paymentOption.bankTransfer.benificiary = tempTargetResponseObject.BankWire.HolderName;
                if (tempTargetResponseObject.BankWire.IBAN)
                    transformedResponseObj.data.paymentOption.bankTransfer.ibanCode = tempTargetResponseObject.BankWire.IBAN;
                if (tempTargetResponseObject.BankWire.BIC)
                    transformedResponseObj.data.paymentOption.bankTransfer.bicCode = tempTargetResponseObject.BankWire.BIC;
                transformedResponseObj.data.paymentOption.bankTransfer.reason = transactionId;
                    break;
            }
        }

        var codeFDueDate;
        var depositAmount = transformedResponseObj.data.priceSummary.deposit.amount;
        if (depositAmount) {                        // if true, Means Code = D  is present
            for (var i = 0; i < targetResponseObj.PaymentInfo.PaymentSchedules.length; i++) {
                var code = targetResponseObj.PaymentInfo.PaymentSchedules[i].Code;
                var tempTargetResponseObject = targetResponseObj.PaymentInfo.PaymentSchedules[i];
                if (code === "F") {
                    codeFDueDate = tempTargetResponseObject.DueDate;
                    transformedResponseObj.data.paymentOption.bankTransfer.balanceDueDate = tempTargetResponseObject.DueDate;       //CARNIVALCO-11870 - Bank Transfer Later Payment
                    transformedResponseObj.data.paymentOption.bankTransfer.balanceAmount = parseFloat(tempTargetResponseObject.Amount);         //CARNIVALCO-11870 - Bank Transfer Current Payment
                } else if (code === "D") {
                    transformedResponseObj.data.paymentOption.courtesyHold.dueDate = tempTargetResponseObject.DueDate;
                    transformedResponseObj.data.paymentOption.bankTransfer.dueDate = tempTargetResponseObject.DueDate;              //CARNIVALCO-11870 - Bank Transfer Current Due Date
                    transformedResponseObj.data.paymentOption.bankTransfer.dueAmount = parseFloat(tempTargetResponseObject.Amount);            //CARNIVALCO-11870 - Bank Transfer Current Payment
                }
            }
        } else {                                    // Means Code = D  is not present        
            //delete transformedResponseObj.data.paymentOption.bankTransfer;            //CARNIVALCO-13954
            if(targetResponseObj.PaymentInfo.PaymentSchedules) {                          //CARNIVALCO-13954 - Bank Transfer Total Vacation
                for (var paymentSchedule = 0; paymentSchedule < targetResponseObj.PaymentInfo.PaymentSchedules.length; paymentSchedule++) {
                    if(targetResponseObj.PaymentInfo.PaymentSchedules[paymentSchedule].Code)
                        var code = targetResponseObj.PaymentInfo.PaymentSchedules[paymentSchedule].Code;
                    if(targetResponseObj.PaymentInfo.PaymentSchedules[paymentSchedule])
                        var tempTargetResponseObject = targetResponseObj.PaymentInfo.PaymentSchedules[paymentSchedule];
                    if (code === "F") {
                        if(tempTargetResponseObject.DueDate) {
                            transformedResponseObj.data.paymentOption.courtesyHold.dueDate = tempTargetResponseObject.DueDate;  //CARNIVALCO-13954 - CourtesyHold when Code = D is not present
                            transformedResponseObj.data.paymentOption.bankTransfer.dueDate = tempTargetResponseObject.DueDate;           
                            codeFDueDate = tempTargetResponseObject.DueDate;
                        }
                        if(tempTargetResponseObject.Amount)
                            transformedResponseObj.data.paymentOption.bankTransfer.dueAmount = parseFloat(tempTargetResponseObject.Amount);       //CARNIVALCO-11870 - Bank Transfer Full Payment
                    } 
                }
            }

            //delete transformedResponseObj.data.paymentOption.courtesyHold;    //CARNIVALCO-13954
            delete transformedResponseObj.data.priceSummary.deposit;        //CARNIVALCO-12567 if amount = 0 Dropping this attribute
            
        }
    // Start Implementation of response transformation for ideal payment option- CARNIVALCO-21589

        for (var i = 0; i < targetResponseObj.PaymentInfo.PaymentTypes.length; i++) {
            var code = targetResponseObj.PaymentInfo.PaymentTypes[i].Code;
            var tempTargetResponseObject = targetResponseObj.PaymentInfo.PaymentTypes[i];
            if ((code === "ID") && (tempTargetResponseObject.Ideal)) {
			    enableIdeal = true;
            	transformedResponseObj.data.paymentOption.ideal.code = "ID"
            	for(var i = 0; i < tempTargetResponseObject.Ideal.Banks.length; i++){
				      var bankObj = {};
            	      if (tempTargetResponseObject.Ideal.Banks[i].Code){
					      bankObj.code = tempTargetResponseObject.Ideal.Banks[i].Code;
						  }
                      if (tempTargetResponseObject.Ideal.Banks[i].Name){
					      bankObj.name = tempTargetResponseObject.Ideal.Banks[i].Name;
						  }
						  transformedResponseObj.data.paymentOption.ideal.banks.push(bankObj);
	              	}	
          
            }
        }
		if(enableIdeal === false){
		      delete transformedResponseObj.data.paymentOption.ideal; 
           }		
    // End -CARNIVALCO-21589

    if(transformedResponseObj.data.paymentOption.bankTransfer && transformedResponseObj.data.paymentOption.bankTransfer.balanceDueDate) {                         // CARNIVALCO-14536 Balance Due Date
        transformedResponseObj.data.priceSummary.deposit.balanceDueDate = transformedResponseObj.data.paymentOption.bankTransfer.balanceDueDate;
    }
		
    var ssvSum =0;
    var SSVMapping = context.getVariable("SSVMapping");
    var SSVMappingObj = JSON.parse(SSVMapping);
    var agencyId = context.getVariable("request.header.agencyId");
    var SSVCodes = SSVMappingObj[agencyId];
    var standardSpecialServiceChgArray = [];
    
    if(targetResponseObj.SpecialServices && SSVCodes) {                             // CARNIVALCO-13611 German Market adding SSvCode 
        standardSpecialServiceChgArray = targetResponseObj.SpecialServices;
        var SSVCodesArray = SSVCodes.split(",");
        var codeMatched = false;
        var matchedCodes ="";
        var matchedCodesCount = 0;
        
        for(var sscharge=0;sscharge<standardSpecialServiceChgArray.length;sscharge++) {
            if(SSVCodesArray.indexOf(standardSpecialServiceChgArray[sscharge].Code)!==-1) {
                ssvSum = ssvSum + parseFloat(standardSpecialServiceChgArray[sscharge].Amount);
                codeMatched =  true;
                
                if(matchedCodesCount!==0) {
                    matchedCodes = matchedCodes +","+ standardSpecialServiceChgArray[sscharge].Code;
                }else {
                    matchedCodes = matchedCodes + standardSpecialServiceChgArray[sscharge].Code;
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
        standardSpecialServiceChgObj.amount = parseFloat(ssvSum);
        standardSpecialServiceChgArray.push(standardSpecialServiceChgObj);
        
        
    }else {
        
        SSVCodes = "";
        var standardSpecialServiceChgObj={};
        standardSpecialServiceChgObj.code = SSVCodes;
        standardSpecialServiceChgObj.amount = parseFloat(ssvSum);
        standardSpecialServiceChgArray.push(standardSpecialServiceChgObj);
    }
    transformedResponseObj.data.standardSpecialServiceChg = standardSpecialServiceChgArray;

    if(transformedResponseObj.data.paymentOption.courtesyHold && targetResponseObj.Sailings && targetResponseObj.Sailings[0].Cruise && targetResponseObj.Sailings[0].Cruise.IsImmediateConfirm) {                                            //CARNIVALCO-10959 //CARNIVALCO-17385
       
        if(targetResponseObj.Sailings[0].Cruise.IsImmediateConfirm == "Y"){            //CARNIVALCO-17385 - CARNIVALCO-18002                                                  
            delete transformedResponseObj.data.paymentOption.courtesyHold;     
        }
    }
    // Removing bank transfer object if backend not retruning BankWire Object - CARNIVALCO-23358,CARNIVALCO-23510
    if(enableBankTransfer === false){
    	delete transformedResponseObj.data.paymentOption.bankTransfer; 
    }
    context.setVariable('response.content', JSON.stringify(transformedResponseObj,replacer));

  } 

} catch (e) {
    throw (e);
}