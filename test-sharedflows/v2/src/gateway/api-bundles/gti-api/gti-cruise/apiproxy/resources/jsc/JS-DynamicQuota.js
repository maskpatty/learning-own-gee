try {
    
    var pathsuffix = context.getVariable("proxy.pathsuffix");
    var resourceverb =context.getVariable("request.verb");

	if(pathsuffix.includes("/room/select") && resourceverb == "POST"){
		var selectRoomQuota = context.getVariable("selectRoomQuota");
        var selectRoomQuotaObj = JSON.parse(selectRoomQuota);
		context.setVariable("quota-limit",selectRoomQuotaObj.count);
		context.setVariable("timeInterval",selectRoomQuotaObj.timeInterval);
		context.setVariable("timeUnit",selectRoomQuotaObj.timeUnit);
        context.setVariable("identifier","/room/select");
	}
    else if (pathsuffix.includes("/room/search")) {
        var cruiseRoomInfoQuota = context.getVariable("cruiseRoomInfoQuota");
		var cruiseRoomInfoQuotaObj = JSON.parse(cruiseRoomInfoQuota);
		context.setVariable("quota-limit",cruiseRoomInfoQuotaObj.count);
		context.setVariable("timeInterval",cruiseRoomInfoQuotaObj.timeInterval);
		context.setVariable("timeUnit",cruiseRoomInfoQuotaObj.timeUnit);
        context.setVariable("identifier","/searchroom");

    } else if (pathsuffix.includes("/room") && resourceverb == "PUT") {
        var updateRoomQuota = context.getVariable("updateRoomQuota");
		var updateRoomQuotaObj = JSON.parse(updateRoomQuota);
		context.setVariable("quota-limit",updateRoomQuotaObj.count);
		context.setVariable("timeInterval",updateRoomQuotaObj.timeInterval);
		context.setVariable("timeUnit",updateRoomQuotaObj.timeUnit);
        context.setVariable("identifier","/updateroom");

    } else if (pathsuffix.includes("/room") && resourceverb == "POST") {
        var addRoomQuota = context.getVariable("addRoomQuota");
		var addRoomQuotaObj = JSON.parse(addRoomQuota);
		context.setVariable("quota-limit",addRoomQuotaObj.count);
		context.setVariable("timeInterval",addRoomQuotaObj.timeInterval);
		context.setVariable("timeUnit",addRoomQuotaObj.timeUnit);
        context.setVariable("identifier","/addroom");

    } else if (pathsuffix.includes("/price/payment/status")) {
        var paymentStatusQuota = context.getVariable("paymentStatusQuota");
        var paymentStatusQuotaObj = JSON.parse(paymentStatusQuota);
		context.setVariable("quota-limit",paymentStatusQuotaObj.count);
		context.setVariable("timeInterval",paymentStatusQuotaObj.timeInterval);
		context.setVariable("timeUnit",paymentStatusQuotaObj.timeUnit);
        context.setVariable("identifier","/status");

    } else if (pathsuffix.includes("/price/payment")) {
        var payNowQuota = context.getVariable("payNowQuota");
        var payNowQuotaObj = JSON.parse(payNowQuota);
		context.setVariable("quota-limit",payNowQuotaObj.count);
		context.setVariable("timeInterval",payNowQuotaObj.timeInterval);
		context.setVariable("timeUnit",payNowQuotaObj.timeUnit);
        context.setVariable("identifier","/payment");
    
   } else if (pathsuffix.includes("/checkout")) {
        var checkoutQuota = context.getVariable("checkoutQuota");
        var checkoutQuotaObj = JSON.parse(checkoutQuota);
		context.setVariable("quota-limit",checkoutQuotaObj.count);
		context.setVariable("timeInterval",checkoutQuotaObj.timeInterval);
		context.setVariable("timeUnit",checkoutQuotaObj.timeUnit);
        context.setVariable("identifier","/checkout");

    } else if (pathsuffix.includes("/bookingconfirmation")) {
        var bookingConfirmationQuota  = context.getVariable("bookingConfirmationQuota");
        var bookingConfirmationQuotaObj = JSON.parse(bookingConfirmationQuota);
		context.setVariable("quota-limit",bookingConfirmationQuotaObj.count);
		context.setVariable("timeInterval",bookingConfirmationQuotaObj.timeInterval);
		context.setVariable("timeUnit",bookingConfirmationQuotaObj.timeUnit);
        context.setVariable("identifier","/bookingconfirmation");
    
    } else if (pathsuffix.includes("/directive/list")) {
        var travelDirectiveListQuota = context.getVariable("travelDirectiveListQuota");
        var travelDirectiveListQuotaObj = JSON.parse(travelDirectiveListQuota);
		context.setVariable("quota-limit",travelDirectiveListQuotaObj.count);
		context.setVariable("timeInterval",travelDirectiveListQuotaObj.timeInterval);
		context.setVariable("timeUnit",travelDirectiveListQuotaObj.timeUnit);
        context.setVariable("identifier","/directivelist");

    } else if (pathsuffix.includes("/list")) {
        var listQuota  = context.getVariable("listQuota");
		var listQuotaObj = JSON.parse(listQuota);
		context.setVariable("quota-limit",listQuotaObj.count);
		context.setVariable("timeInterval",listQuotaObj.timeInterval);
		context.setVariable("timeUnit",listQuotaObj.timeUnit);
        context.setVariable("identifier","/list");
    } 

} catch(error) {

    throw error;
}