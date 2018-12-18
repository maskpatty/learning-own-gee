try {

    var addRoomMock = context.getVariable("addRoomMock");
    var cruiseRoomInfoMock = context.getVariable("cruiseRoomInfoMock");
    var updateRoomMock = context.getVariable("updateRoomMock");
    var checkoutMock = context.getVariable("checkoutMock");
    var payNowMock = context.getVariable("payNowMock");
    var bookingConfirmationMock= context.getVariable("bookingConfirmationMock");
    var pathSuffix= context.getVariable("proxy.pathsuffix");
    var verb = context.getVariable("request.verb");

     
    if(pathSuffix.includes("/room/search") && verb=="POST" && cruiseRoomInfoMock=="true") {
        context.setVariable("request.queryparam.serviceName", "RoomByType");
        context.setVariable("request.queryparam.responseType", "201");
     
    } else if(pathSuffix.includes("/room") && verb=="PUT" && updateRoomMock=="true") {
        context.setVariable("request.queryparam.serviceName", "UpdateRoom");
        context.setVariable("request.queryparam.responseType", "201");
        context.setVariable("request.verb", "POST");
        
    } else if(pathSuffix.includes("/room") && verb=="POST" && addRoomMock=="true" && !pathSuffix.includes("/select") && !pathSuffix.includes("/search")) {
        context.setVariable("request.queryparam.serviceName", "AddRoomId");
        context.setVariable("request.queryparam.responseType", "201");
        
    } else if(pathSuffix.includes("/price/payment") && verb=="POST" && payNowMock=="true") {
        context.setVariable("request.queryparam.serviceName", "PayNow");
        context.setVariable("request.queryparam.responseType", "201");
        
    } else if(pathSuffix.includes("/checkout") && verb=="POST" && checkoutMock=="true") {
        context.setVariable("request.queryparam.serviceName", "Checkout");
        context.setVariable("request.queryparam.responseType", "200");
        
    } else if(pathSuffix.includes("/bookingconfirmation") && verb=="POST" && bookingConfirmationMock=="true") {
        context.setVariable("request.queryparam.serviceName", "BookingDetails");
        context.setVariable("request.queryparam.responseType", "200");
        
    } 

} catch(error) {

    throw e;
}