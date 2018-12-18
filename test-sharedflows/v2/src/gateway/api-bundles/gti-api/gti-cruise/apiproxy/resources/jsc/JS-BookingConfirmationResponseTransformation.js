function replacer(key,value)
{
	if (value=="null") return "";
	else if (value===undefined) return "";
	else if (value===null) return "";
	else return value;
}

 try {

  var targetRequest = context.getVariable("targetRequest");
  var targetRequestObj = JSON.parse(targetRequest);
  
  var targetResponse = context.getVariable("response.content");
  var targetResponseObj = JSON.parse(targetResponse);
  context.setVariable('targetResponse',context.getVariable("maskedResponse"));
  var data = {};
  var roomCategory="";
  var voucherCode="";
  var number= "";
  var Guests={};
  var Category="";
  var Id="";
  var Code="";
  var Email="";
  var PaymentSchedules={};
  var Type="";
  var Direction="";
  var City="";
  var Amount="";
  var discount=0;
  var jsonPayLoad = {
	  "errors": [],
      "data": {}
  };
  data.summary = {};
  data.summary.priceSummary={};
  //
  data.summary.priceSummary.deposit = {};
  data.summary.priceSummary.deposit.amount = 0;
  data.summary.priceSummary.deposit.balanceAmount = 0;
  data.summary.priceSummary.deposit.dueDate = "";
  data.summary.displayMessage = "";
  data.summary.emailAddress = "";
  data.summary.creditCardDetails = [];
  data.summary.priceSummary.insurance="";
  data.summary.priceSummary.serviceCharges= 0;
  data.summary.priceSummary.grandTotal="";
  data.summary.priceSummary.discount = 0;
  
  //
  
  data.summary.transportation= {}; 
  data.summary.courtesyHold = {}; 
  data.summary.bankTransfer = {};
  data.summary.confirmationDetails=[];
  data.summary.appliedVouchers=[];
  targetResponseObj.Guests.Transportations={};
  targetResponseObj.Guests.Vouchers={};
  targetResponseObj.Sailings.Cabins={};
  data.summary.confirmationDetails.Guests={};
  data.summary.taxesAndFeesCombined = true;
 if (targetResponseObj.Status.Code)
    data.summary.status = targetResponseObj.Status.Code;

  var statusCode = targetResponseObj.Status.Code;
  var agencyPaymentType = targetResponseObj.PaymentInfo.AgencyPaymentType;
  var paymentAmount = parseFloat(targetResponseObj.PaymentInfo.Amount);
  
 if((statusCode === "OP" || statusCode === "BK") && (agencyPaymentType === "DA") && (paymentAmount > 0 )) {
  data.summary.paymentType = "CC";
  
 } else if((statusCode === "BK") && (agencyPaymentType === "DA") && (paymentAmount == 0 )) {
  data.summary.paymentType = "BN";
  
 } else if((statusCode === "OP") && (agencyPaymentType === "DA") && (paymentAmount == 0 )) {
  data.summary.paymentType = "CH";
  
 }else if((statusCode === "BK") && (agencyPaymentType === "CR") && (paymentAmount > 0 )) {
  data.summary.paymentType = "ID";
  
 }

for (i = 0; i < targetResponseObj.Sailings.length; i++) {
    data.summary.cruiseCode = targetResponseObj.Sailings[i].Cruise.Code;
    data.summary.sailingDate = targetResponseObj.Sailings[i].Cruise.Date;
}

var confirmationDetailsEmptyObj = {};

if (Array.isArray(targetResponseObj.Sailings[0].Cabins)) {
   
    for (i = 0; i < targetResponseObj.Sailings[0].Cabins.length; i++) {
        var confirmationDetailsObj = JSON.parse(JSON.stringify(confirmationDetailsEmptyObj));
        confirmationDetailsObj.roomCategory = targetResponseObj.Sailings[0].Cabins[i].Category.Code;
        confirmationDetailsObj.number = targetResponseObj.Sailings[0].Cabins[i].Number;
		if(targetRequestObj.confirmationDetails[0].roomType!== undefined)
        confirmationDetailsObj.roomType = targetRequestObj.confirmationDetails[0].roomType;
        confirmationDetailsObj.confirmationNumber = targetRequestObj.confirmationDetails[0].confirmationNumber;
        data.summary.confirmationDetails.push(confirmationDetailsObj);
    }

} else {
    var confirmationDetailsObj = {};
    confirmationDetailsObj.roomCategory = targetResponseObj.Sailings.Cabins.Category.Code;
    confirmationDetailsObj.number = targetResponseObj.Sailings.Cabins.Number;
    confirmationDetailsObj.confirmationNumber = targetRequestObj.confirmationDetails[0].confirmationNumber;
    data.summary.confirmationDetails.push(confirmationDetailsObj);
}



if (targetResponseObj.ConsumerInfo.Email) {
    data.summary.emailAddress = targetResponseObj.ConsumerInfo.Email;

} else {
  
    if (targetResponseObj.Guests[0].Address.Email) {
        data.summary.emailAddress = targetResponseObj.Guests[0].Address.Email;
    }

}

data.summary.currencyCode = targetResponseObj.Currency.Code;

var appliedVouchersEmptyObj = {};
for (var guest = 0; guest < targetResponseObj.Guests.length; guest++) {
    if (targetResponseObj.Guests[guest].Vouchers !== undefined) {
        var appliedVouchersObj = JSON.parse(JSON.stringify(appliedVouchersEmptyObj));
        for (var voucher; voucher < targetResponseObj.Guests[guest].Vouchers.length; voucher++) {
            appliedVouchersObj.voucherCode = targetResponseObj.Guests[guest].Vouchers[voucher].Id;
        }
        data.summary.appliedVouchers.push(appliedVouchersObj);
    }

}


if (targetResponseObj.Guests[0].Transportations[0]) {
    data.summary.transportation.type = targetResponseObj.Guests[0].Transportations[0].Type;
    data.summary.transportation.direction = targetResponseObj.Guests[0].Transportations[0].Direction;

    if (targetResponseObj.Guests[0].Transportations[0].Type === 'A' || targetResponseObj.Guests[0].Transportations[0].Type === 'B' || targetResponseObj.Guests[0].Transportations[0].Type === 'R') {
        data.summary.transportation.code = targetResponseObj.Guests[0].Transportations[0].City.Code;
        data.summary.transportation.class = targetResponseObj.Guests[0].Transportations[0].class;
    }
}

var taxesAndFees = 0;
var subTotal = 0;
var insurance = 0;
var grandTotal = 0;
var discount = 0;
var promos = 0;
var serviceCharges = 0;

for (i = 0; i < targetResponseObj.Prices.length; i++) {
    if(targetResponseObj.Prices[i].Code) {                        // CARNIVALCO-13885 Addition of all otherchages + base_price
        if (targetResponseObj.Prices[i].Code == "CAB" || targetResponseObj.Prices[i].Code === "CHD" || targetResponseObj.Prices[i].Code === "SUP" || targetResponseObj.Prices[i].Code === "AIR" || targetResponseObj.Prices[i].Code === "TRF" || targetResponseObj.Prices[i].Code === "TPT" || targetResponseObj.Prices[i].Code === "ASP") {
            subTotal = subTotal + parseFloat(targetResponseObj.Prices[i].Amount);

        }
        if (targetResponseObj.Prices[i].Code == "TAX" || targetResponseObj.Prices[i].Code == "PCH" || targetResponseObj.Prices[i].Code == "TRX" || targetResponseObj.Prices[i].Code == "TPX" || targetResponseObj.Prices[i].Code == "THX" || targetResponseObj.Prices[i].Code == "SNG") {
            taxesAndFees = taxesAndFees + parseFloat(targetResponseObj.Prices[i].Amount);
            data.summary.taxesAndFeesCombined = false;

        }
        if (targetResponseObj.Prices[i].Code == "INS") {
            insurance = insurance + parseFloat(targetResponseObj.Prices[i].Amount);

        }
        if (targetResponseObj.Prices[i].Code == "SSV") {      // CARNIVALCO-13885 special Charges
            if (targetResponseObj.Prices[i].Amount) {
                serviceCharges = serviceCharges + parseFloat(targetResponseObj.Prices[i].Amount);
            }
        }

        if (targetResponseObj.Prices[i].Code === "GRS") {
            if (targetResponseObj.Prices[i].Amount !== undefined) {
                grandTotal = grandTotal + parseFloat(targetResponseObj.Prices[i].Amount);
            }

        }
    }
}

if(targetResponseObj.Promos) {          // CARNIVALCO-13885 Promos Code - Discount
    for (var promo = 0; promo < targetResponseObj.Promos.length; promo++) {
        if (targetResponseObj.Promos[promo] && targetResponseObj.Promos[promo].Class 
			&& targetResponseObj.Promos[promo].Class.Code === "VOUCHER" && targetResponseObj.Prices[promo].Amount) {
            promos = promos + parseFloat(targetResponseObj.Promos[promo].Amount);
        }
    }
}

//discount = grandTotal - promos;
discount = promos;
data.summary.priceSummary.taxesAndFees = parseFloat(taxesAndFees);
data.summary.priceSummary.subTotal = parseFloat(subTotal);
data.summary.priceSummary.insurance = insurance;
data.summary.priceSummary.grandTotal = parseFloat(grandTotal);
data.summary.priceSummary.discount = discount;
data.summary.priceSummary.serviceCharges= serviceCharges;

var paymentType = data.summary.paymentType;
var amountForCodeD = 0;
var amountForCodeF = 0;
var responseStatusCode = targetResponseObj.Status.Code;
var presentCodeF = false;
var presentCodeD = false;
var dueDateForCodeF;
var dueDateForCodeD;
var paymentScheduleObj = targetResponseObj.PaymentInfo.PaymentSchedules;
var paymentInfoObj = targetResponseObj.PaymentInfo;
var bankTransferType = targetRequestObj.confirmationDetails[0].bookingType;
var totalAmount=0;

for (paymentSchedule = 0; paymentSchedule < paymentScheduleObj.length; paymentSchedule++) {
  
  if (paymentScheduleObj[paymentSchedule].Code === "F") {
    presentCodeF = true;
    amountForCodeF = parseFloat(paymentScheduleObj[paymentSchedule].Amount);
    dueDateForCodeF = paymentScheduleObj[paymentSchedule].DueDate;
    
  } else if (paymentScheduleObj[paymentSchedule].Code === "D") {
    presentCodeD = true;
    amountForCodeD = parseFloat(paymentScheduleObj[paymentSchedule].Amount);
    dueDateForCodeD = paymentScheduleObj[paymentSchedule].DueDate; 
  }
  if(bankTransferType === "todaysDeposit" && paymentType === "BN"){
	if (paymentScheduleObj[paymentSchedule].Code === "F") {
		data.summary.bankTransfer.balanceAmount = parseFloat(paymentScheduleObj[paymentSchedule].Amount);
		data.summary.bankTransfer.balanceDueDate = paymentScheduleObj[paymentSchedule].DueDate;
	}else if (paymentScheduleObj[paymentSchedule].Code === "D") {
		data.summary.bankTransfer.dueDate = paymentScheduleObj[paymentSchedule].DueDate;
		data.summary.bankTransfer.dueAmount = parseFloat(paymentScheduleObj[paymentSchedule].Amount);
	}
  }else if (bankTransferType === "totalVacation" && paymentType === "BN"){
	if (paymentScheduleObj[paymentSchedule].Code === "D") {
		data.summary.bankTransfer.dueDate = paymentScheduleObj[paymentSchedule].DueDate;
	}	
	if (paymentScheduleObj[paymentSchedule].Code === "D" || paymentScheduleObj[paymentSchedule].Code === "F") {
		totalAmount = totalAmount + parseFloat(paymentScheduleObj[paymentSchedule].Amount);
	}
	data.summary.bankTransfer.dueAmount = totalAmount;
	delete data.summary.bankTransfer.balanceAmount;
	delete data.summary.bankTransfer.balanceDueDate;		
  }
}
  
if ((paymentType == "CH") || (paymentType == "BN" )) {
    data.summary.priceSummary.deposit.amount = 0;
  data.summary.priceSummary.deposit.balanceAmount = amountForCodeF + amountForCodeD;
  if(presentCodeD) {
    data.summary.priceSummary.deposit.dueDate = dueDateForCodeD;
  
  } else if(presentCodeF) {
    data.summary.priceSummary.deposit.dueDate = dueDateForCodeF;
    
  }
  
} else if (paymentType == "CC" || paymentType == "ID") {
  if(paymentInfoObj.AgencyPaymentType === "DA" || paymentInfoObj.AgencyPaymentType === "CR" ) {
    data.summary.priceSummary.deposit.amount = parseFloat(paymentInfoObj.Amount);
    if(paymentInfoObj.Full === "true") {
      data.summary.priceSummary.deposit.balanceAmount = 0;
      data.summary.priceSummary.deposit.dueDate = "";
      
    } else if(paymentInfoObj.Full === "false") {
      data.summary.priceSummary.deposit.balanceAmount = amountForCodeF ;            // CARNIVALCO-7061 As per this ticket making changes
      data.summary.priceSummary.deposit.dueDate = dueDateForCodeF;
    }
  }
}

if((responseStatusCode !== "OP") || (paymentType == "CC") || (paymentType == "BN" ) || (paymentType == "ID")) {
  delete data.summary.courtesyHold; 

} else if(presentCodeD) {
  data.summary.courtesyHold.dueDate = dueDateForCodeD;
  
} else if(presentCodeF) {
  data.summary.courtesyHold.dueDate = dueDateForCodeF;
  
}

if(targetResponseObj && targetResponseObj.Guests && targetResponseObj.Guests.length > 0) {                  //CARNIVALCO-13725 Guest Details should br cabin specific
  for(var confirmationDetails = 0; confirmationDetails < data.summary.confirmationDetails.length; confirmationDetails++) {
    var guestsEmptyObj = {};
    var Guests = [];
    for (i = 0; i < targetResponseObj.Guests.length; i++) {
      if(targetResponseObj.Guests[i].Sailings[0].Cabin && targetResponseObj.Guests[i].Sailings[0].Cabin.Number && data.summary.confirmationDetails[confirmationDetails] && data.summary.confirmationDetails[confirmationDetails].number) {
        if(targetResponseObj.Guests[i].Sailings[0].Cabin.Number === data.summary.confirmationDetails[confirmationDetails].number) {
          var guestsDetailsObj = JSON.parse(JSON.stringify(guestsEmptyObj));
          guestsDetailsObj.seqNo = targetResponseObj.Guests[i].SeqNumber;
          guestsDetailsObj.firstName = targetResponseObj.Guests[i].FirstName;
          guestsDetailsObj.lastName = targetResponseObj.Guests[i].LastName;
          Guests.push(guestsDetailsObj);
        }
      }     
    }
    data.summary.confirmationDetails[confirmationDetails].guests = Guests;
  }
}

if( paymentType != "BN" ) {
  delete data.summary.bankTransfer; 
}

jsonPayLoad.data = data;

context.setVariable('response.content', JSON.stringify(jsonPayLoad, replacer));
} catch(error) { 
  throw error;
}